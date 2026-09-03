from pathlib import Path

from pypdf import PdfReader


class PDFLoader:
    """Charge le contenu textuel d'un fichier PDF."""

    def load(self, source: str | Path) -> str:
        """
        Extrait le texte de toutes les pages d'un fichier PDF.

        Args:
            source: Chemin vers le fichier PDF.

        Returns:
            Le texte extrait du PDF.

        Raises:
            FileNotFoundError: Si le fichier n'existe pas.
            ValueError: Si la source n'est pas un fichier PDF.
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

        if path.suffix.lower() != ".pdf":
            raise ValueError(
                f"La source doit être un fichier PDF : {path}"
            )

        reader = PdfReader(str(path))

        pages: list[str] = []

        for page in reader.pages:
            text = page.extract_text()

            if text and text.strip():
                pages.append(text.strip())

        return "\n\n".join(pages)
