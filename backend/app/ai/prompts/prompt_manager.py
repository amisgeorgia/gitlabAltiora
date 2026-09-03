from pathlib import Path
class PromptManager:
    """Gère les templates utilisés pour construire les prompts."""

    def __init__(self) -> None:
        self.templates_dir = Path(__file__).parent / "templates"

    def _load_template(self, template_path: Path) -> str:
        """Charge un template depuis un fichier texte."""

        if not template_path.exists():
            raise FileNotFoundError(
                f"Template introuvable : {template_path}"
            )

        return template_path.read_text(encoding="utf-8")

    def build_rag_prompt(
        self,
        question: str,
        context: str,
    ) -> str:
        """Construit le prompt utilisé pour une réponse RAG."""

        if not question or not question.strip():
            raise ValueError("La question ne peut pas être vide.")

        if not context or not context.strip():
            raise ValueError("Le contexte ne peut pas être vide.")

        template_path = (
            self.templates_dir
            / "rag"
            / "answer.txt"
        )

        template = self._load_template(template_path)

        return template.format(
            question=question.strip(),
            context=context.strip(),
        )