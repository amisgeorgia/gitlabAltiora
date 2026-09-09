from app.ai.embeddings.base import EmbeddingService
from app.ai.embeddings.embedding_service import VoyageEmbeddingService
from app.ai.vector_store import PgVectorStore
from app.models.models import KnowledgeChunk


class Retriever:
    """Recherche les passages les plus pertinents pour une question."""

    def __init__(
        self,
        embedding_service: EmbeddingService | None = None,
        vector_store: PgVectorStore | None = None,
    ) -> None:
        self.embedding_service = (
            embedding_service or VoyageEmbeddingService()
        )
        self.vector_store = vector_store or PgVectorStore()

    def retrieve(
        self,
        question: str,
        top_k: int = 5,
    ) -> list[KnowledgeChunk]:
        """Retourne les chunks les plus pertinents pour une question."""

        if not question or not question.strip():
            raise ValueError("La question ne peut pas être vide.")

        if top_k <= 0:
            raise ValueError("top_k doit être supérieur à zéro.")

        question_embedding = self.embedding_service.embed_query(question)

        return self.vector_store.search(
            embedding=question_embedding,
            top_k=top_k,
        )
