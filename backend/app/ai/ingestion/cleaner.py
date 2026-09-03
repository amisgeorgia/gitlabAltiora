from __future__ import annotations
import re
class TextCleaner:
    """Nettoie et normalise le texte extrait d'un document."""

    def clean(self, text: str) -> str:
        """
        Nettoie un texte brut provenant d'un loader.
        """

        if not text or not text.strip():
            return ""

        text = self._normalize_line_endings(text)
        text = self._remove_control_characters(text)
        text = self._normalize_spaces(text)
        text = self._normalize_blank_lines(text)
        text = self._strip_lines(text)

        return text.strip()

    @staticmethod
    def _normalize_line_endings(text: str) -> str:
        """Uniformise les différents types de retours à la ligne."""

        return text.replace("\r\n", "\n").replace("\r", "\n")

    @staticmethod
    def _remove_control_characters(text: str) -> str:
        """
        Supprime les caractères de contrôle inutiles tout en conservant
        les retours à la ligne et les tabulations.
        """

        return "".join(
            character
            for character in text
            if character in ("\n", "\t") or not ord(character) < 32
        )

    @staticmethod
    def _normalize_spaces(text: str) -> str:
        """
        Réduit les espaces et tabulations inutiles sans supprimer
        les retours à la ligne.
        """

        lines = text.split("\n")

        cleaned_lines = [
            re.sub(r"[ \t]+", " ", line).strip()
            for line in lines
        ]

        return "\n".join(cleaned_lines)

    @staticmethod
    def _normalize_blank_lines(text: str) -> str:
        """
        Limite les lignes vides consécutives à une seule.
        """

        return re.sub(r"\n{3,}", "\n\n", text)

    @staticmethod
    def _strip_lines(text: str) -> str:
        """Supprime les espaces inutiles au début et à la fin du texte."""

        lines = [line.strip() for line in text.split("\n")]

        return "\n".join(lines)