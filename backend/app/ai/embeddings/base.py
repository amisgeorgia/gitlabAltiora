from abc import ABC, abstractmethod


class EmbeddingService(ABC):
    """Interface commune pour les fournisseurs d'embeddings."""

    @abstractmethod
    def embed_documents(self, texts: list[str]) -> list[list[float]]:
        """Generate embeddings for document chunks."""
        raise NotImplementedError

    @abstractmethod
    def embed_query(self, text: str) -> list[float]:
        """Generate an embedding for a user query."""
        raise NotImplementedError
