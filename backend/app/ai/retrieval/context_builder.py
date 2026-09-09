from app.models.models import KnowledgeChunk


class ContextBuilder:
    """Construit le contexte utilisé par le modèle à partir des chunks retrouvés."""

    def build(self, chunks: list[KnowledgeChunk]) -> str:
        """Transforme les chunks récupérés en un contexte textuel."""

        if not chunks:
            return ""

        context_parts: list[str] = []

        for index, chunk in enumerate(chunks, start=1):
            context_parts.append(
                f"[Source {index}]\n"
                f"{chunk.content}"
            )

        return "\n\n".join(context_parts)
