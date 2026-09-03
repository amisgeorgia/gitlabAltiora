from typing import Protocol

from app.ai.rag import RAGPipeline


class AIClient(Protocol):
    """Contrat commun pour les clients IA du module chat."""

    def generate_reply(self, message: str) -> str:
        """Génère une réponse à partir du message utilisateur."""
        ...


class MockAIClient:
    """Client local déterministe utilisé pour les tests."""

    def generate_reply(self, message: str) -> str:
        if not message or not message.strip():
            raise ValueError("Le message ne peut pas être vide.")

        return f"Réponse simulée ALTIORA : {message.strip()}"


class RAGChatClient:
    """Client IA du chat basé sur le pipeline RAG."""

    def __init__(
        self,
        rag_pipeline: RAGPipeline | None = None,
    ) -> None:
        self._rag_pipeline = rag_pipeline or RAGPipeline()

    def generate_reply(self, message: str) -> str:
        """Génère une réponse à partir du pipeline RAG."""

        if not message or not message.strip():
            raise ValueError("Le message ne peut pas être vide.")

        result = self._rag_pipeline.run(
            question=message.strip(),
            top_k=3,
        )

        if not result.answer or not result.answer.strip():
            raise RuntimeError(
                "Le pipeline RAG n'a retourné aucune réponse."
            )

        return result.answer.strip()
