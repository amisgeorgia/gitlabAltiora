from __future__ import annotations
import re
from dataclasses import dataclass
from typing import Iterable
@dataclass
class TextChunk:
    """Représente un morceau de texte issu d'un document."""

    content: str
    chunk_index: int

    @property
    def char_count(self) -> int:
        """Retourne le nombre de caractères du chunk."""
        return len(self.content)


class TextChunker:

    _DEFAULT_BOUNDARY_PATTERNS: tuple[str, ...] = (r"^\d+[.)]\s+\S",r"^#{1,6}\s+\S",)

    def __init__(
        self,
        max_characters: int = 800,
        overlap_characters: int = 100,
        section_boundary_patterns: Iterable[str] | None = None,
    ) -> None:
        if max_characters <= 0:
            raise ValueError(
                "max_characters doit être supérieur à zéro."
            )

        if overlap_characters < 0:
            raise ValueError(
                "overlap_characters ne peut pas être négatif."
            )

        if overlap_characters >= max_characters:
            raise ValueError(
                "overlap_characters doit être inférieur à "
                "max_characters."
            )

        self.max_characters = max_characters
        self.overlap_characters = overlap_characters

        patterns = (
            tuple(section_boundary_patterns)
            if section_boundary_patterns is not None
            else self._DEFAULT_BOUNDARY_PATTERNS
        )

        self._boundary_patterns = tuple(
            re.compile(pattern)
            for pattern in patterns
        )

    # ------------------------------------------------------------------
    # API publique
    # ------------------------------------------------------------------

    def split(self, text: str) -> list[TextChunk]:
        """
        Découpe le document en chunks.
        """

        if not text or not text.strip():
            return []

        paragraphs = self._extract_paragraphs(text)

        sections = self._group_into_sections(paragraphs)

        chunks: list[TextChunk] = []

        for section in sections:
            section_chunks = self._chunk_section(
                section,
                start_index=len(chunks),
            )

            chunks.extend(section_chunks)

        return chunks

    # ------------------------------------------------------------------
    # Étape 1 : extraction des paragraphes
    # ------------------------------------------------------------------

    @staticmethod
    def _extract_paragraphs(text: str) -> list[str]:
        """
        Nettoie les espaces et conserve uniquement les paragraphes utiles.

        Plusieurs espaces ou retours à la ligne internes sont normalisés.
        """

        paragraphs: list[str] = []

        for paragraph in text.split("\n\n"):
            cleaned = " ".join(paragraph.split())

            if cleaned:
                paragraphs.append(cleaned)

        return paragraphs

    # ------------------------------------------------------------------
    # Étape 2 : regroupement en sections
    # ------------------------------------------------------------------

    def _group_into_sections(
        self,
        paragraphs: list[str],
    ) -> list[list[str]]:
        """
        Regroupe les paragraphes consécutifs en sections.
        """

        if not paragraphs:
            return []

        sections: list[list[str]] = []
        current_section: list[str] = []

        for paragraph in paragraphs:
            if (
                current_section
                and self._is_section_boundary(paragraph)
            ):
                sections.append(current_section)
                current_section = []

            current_section.append(paragraph)

        if current_section:
            sections.append(current_section)

        return sections

    def _is_section_boundary(self, paragraph: str) -> bool:
        """Indique si un paragraphe représente une nouvelle section."""

        return any(
            pattern.match(paragraph)
            for pattern in self._boundary_patterns
        )

    # ------------------------------------------------------------------
    # Étape 3 : découpage des sections
    # ------------------------------------------------------------------

    def _chunk_section(
        self,
        paragraphs: list[str],
        start_index: int,
    ) -> list[TextChunk]:
        """
        Transforme une section en un ou plusieurs chunks.
        """

        text = "\n\n".join(paragraphs)

        if len(text) <= self.max_characters:
            return [
                TextChunk(
                    content=text,
                    chunk_index=start_index,
                )
            ]

        raw_chunks = self._split_long_text(text)

        return [
            TextChunk(
                content=content,
                chunk_index=start_index + index,
            )
            for index, content in enumerate(raw_chunks)
        ]

    def _split_long_text(self, text: str) -> list[str]:
        """
        Découpe un texte trop long en respectant la limite de caractères.
        """

        words = text.split()

        if not words:
            return []

        chunks: list[str] = []

        current_words: list[str] = []
        current_length = 0

        for word in words:
            additional_length = len(word)

            if current_words:
                additional_length += 1

            if (
                current_words
                and current_length + additional_length
                > self.max_characters
            ):
                chunk = " ".join(current_words)
                chunks.append(chunk)

                overlap_text = self._get_text_overlap(chunk)

                if overlap_text:
                    current_words = overlap_text.split()
                    current_length = len(overlap_text)
                else:
                    current_words = []
                    current_length = 0

            if current_words:
                current_length += 1

            current_words.append(word)
            current_length += len(word)

        if current_words:
            chunks.append(" ".join(current_words))

        return chunks

    def _get_text_overlap(self, text: str) -> str:
        """
        Retourne la partie finale du chunk utilisée comme overlap.
        """

        if self.overlap_characters <= 0:
            return ""

        if len(text) <= self.overlap_characters:
            return text

        overlap = text[-self.overlap_characters:]

        first_space = overlap.find(" ")

        if first_space != -1:
            overlap = overlap[first_space + 1 :]

        return overlap.strip()