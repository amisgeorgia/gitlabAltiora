from voyageai import Client

from app.ai.embeddings.base import EmbeddingService
from app.core.config import (
    get_embedding_dimension,
    get_embedding_model,
    get_voyage_api_key,)

class VoyageEmbeddingService(EmbeddingService):
    """Generate embeddings with Voyage AI."""

    def __init__(self) -> None:
        self.client = Client(api_key=get_voyage_api_key())
        self.model = get_embedding_model()
        self.dimension = get_embedding_dimension()

        if not self.client:
            raise RuntimeError("voyage_api_key est absente.")

        if self.dimension <= 0:
            raise ValueError("EMBEDDING_DIMENSION doit être positive.")

    def embed_documents(self, texts: list[str]) -> list[list[float]]:
        """Generate embeddings for document chunks."""
        if not texts:
            return []

        response = self.client.embed(
            texts,
            model=self.model,
            input_type="document",
            output_dimension=self.dimension,
            output_dtype="float",
        )

        embeddings = response.embeddings
        self._validate_dimensions(embeddings)

        return embeddings

    def embed_query(self, text: str) -> list[float]:
        """Generate an embedding for a user query."""
        if not text.strip():
            raise ValueError("Query text must not be empty")

        response = self.client.embed(
            [text],
            model=self.model,
            input_type="query",
            output_dimension=self.dimension,
            output_dtype="float",
        )

        embedding = response.embeddings[0]
        self._validate_dimensions([embedding])

        return embedding

    def _validate_dimensions(
        self,
        embeddings: list[list[float]],
    ) -> None:
        """Ensure all vectors match the configured database dimension."""
        for embedding in embeddings:
            if len(embedding) != self.dimension:
                raise ValueError(
                    f"Invalid embedding dimension: expected "
                    f"{self.dimension}, got {len(embedding)}"
                )