from pathlib import Path

from docx import Document


class DOCXLoader:
    """Charge le contenu textuel d'un fichier DOCX."""

    def load(self, source: str | Path) -> str:
        """
        Extrait le texte d'un fichier DOCX.

        Args:
            source: Chemin vers le fichier DOCX.

        Returns:
            Le texte extrait du document.

        Raises:
            FileNotFoundError: Si le fichier n'existe pas.
            ValueError: Si la source n'est pas un fichier DOCX.
        """

        path = Path(source)

        if not path.exists():
            raise FileNotFoundError(
                f"Fichier introuvable : {path}"
            )

        if not path.is_file():
            raise ValueError(
                f"La source n'est pas un fichier : {path}"
            )

        if path.suffix.lower() != ".docx":
            raise ValueError(
                f"La source doit être un fichier DOCX : {path}"
            )

        document = Document(path)

        paragraphs: list[str] = []

        for paragraph in document.paragraphs:
            text = paragraph.text.strip()

            if text:
                paragraphs.append(text)

        return "\n\n".join(paragraphs)
