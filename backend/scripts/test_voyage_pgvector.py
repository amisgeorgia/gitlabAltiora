from uuid import uuid4

from sqlalchemy import select

from app.ai.embeddings.embedding_service import VoyageEmbeddingService
from app.db.session import get_session_factory
from app.models import KnowledgeChunk, KnowledgeDocument


def main() -> None:
    print("Voyage AI + PostgreSQL/pgvector test")
    embedding_service = VoyageEmbeddingService()
    session_factory = get_session_factory()

    document_id = uuid4()

    document = KnowledgeDocument(
        id=document_id,
        title="Test Voyage AI",
        source_url="https://example.com/test-voyage",
        status="test",
    )

    content = (
        "ALTIORA CONNECT est une plateforme qui intègre "
        "un système de recherche augmentée par génération."
    )

    print("\n1. Génération de l'embedding...")

    embedding = embedding_service.embed_documents([content])[0]

    print(f"Model     : {embedding_service.model}")
    print(f"Dimension : {len(embedding)}")

    if len(embedding) != 1024:
        raise ValueError(
            f"Dimension incorrecte : {len(embedding)} au lieu de 1024"
        )

    chunk = KnowledgeChunk(
        id=uuid4(),
        document_id=document_id,
        content=content,
        embedding=embedding,
        chunk_index=0,
    )

    with session_factory() as session:
        print("\n2. Insertion dans PostgreSQL...")

        session.add(document)
        session.add(chunk)
        session.commit()

        print("Insertion : OK")

        print("\n3. Lecture depuis PostgreSQL...")

        saved_chunk = session.scalar(
            select(KnowledgeChunk).where(
                KnowledgeChunk.id == chunk.id
            )
        )

        if saved_chunk is None:
            raise RuntimeError("Le chunk n'a pas été retrouvé.")

        saved_embedding = saved_chunk.embedding

        print(f"Chunk ID  : {saved_chunk.id}")
        print(f"Dimension : {len(saved_embedding)}")

        if len(saved_embedding) != 1024:
            raise ValueError(
                f"Dimension PostgreSQL incorrecte : "
                f"{len(saved_embedding)} au lieu de 1024"
            )

        print("Lecture : OK")

        print("\n4. Test de recherche vectorielle...")

        query = "Que propose ALTIORA CONNECT ?"

        query_embedding = embedding_service.embed_query(query)

        distance_expression = KnowledgeChunk.embedding.cosine_distance(
            query_embedding
        )

        result = session.execute(
            select(
                KnowledgeChunk,
                distance_expression.label("distance"),
            )
            .order_by(distance_expression)
            .limit(1)
        ).first()

        if result is None:
            raise RuntimeError(
                "Aucun résultat trouvé par la recherche vectorielle."
            )

        chunk, distance = result

        print(f"Query    : {query}")
        print(f"Result   : {chunk.content}")
        print(f"Distance : {distance}")

        print("Voyage AI -> 1024D -> pgvector -> Retrieval")


if __name__ == "__main__":
    main()