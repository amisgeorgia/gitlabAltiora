from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path


@dataclass
class DocumentMetadata:
    """Métadonnées associées à un document ingéré."""

    title: str | None = None
    source: str | None = None
    document_type: str | None = None
    extra: dict[str, str] = field(default_factory=dict)

class MetadataExtractor:
    """Extrait des métadonnées de base à partir d'une source."""
    def extract(
        self,
        source: str | Path,
        document_type: str | None = None,
        title: str | None = None,
    ) -> DocumentMetadata:
        """
        Construit les métadonnées d'un document.

        La classe reste volontairement générique et ne dépend
        d'aucun document métier particulier.
        """

        source_value = str(source)

        resolved_title = title

        if not resolved_title:
            resolved_title = self._extract_title(source)

        resolved_type = document_type

        if not resolved_type:
            resolved_type = self._detect_document_type(source)

        return DocumentMetadata(
            title=resolved_title,
            source=source_value,
            document_type=resolved_type,
        )

    @staticmethod
    def _extract_title(source: str | Path) -> str | None:
        """Utilise le nom du fichier comme titre par défaut."""

        path = Path(source)

        if not path.name:
            return None

        return path.stem

    @staticmethod
    def _detect_document_type(source: str | Path) -> str | None:
        """Détermine le type de document à partir de son extension."""

        suffix = Path(source).suffix.lower()

        document_types = {
            ".pdf": "pdf",
            ".docx": "docx",
            ".txt": "text",
            ".md": "markdown",
        }
        return document_types.get(suffix)
