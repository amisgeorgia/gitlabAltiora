from pathlib import Path


class TextLoader:
    """Charge le contenu textuel d'un fichier TXT."""

    def load(self, source: str | Path) -> str:
        """
        Lit un fichier texte et retourne son contenu.

        Args:
            source: Chemin vers le fichier TXT.

        Returns:
            Le contenu du fichier sous forme de chaîne.

        Raises:
            FileNotFoundError: Si le fichier n'existe pas.
            ValueError: Si le chemin pointe vers un répertoire.
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

        return path.read_text(encoding="utf-8")