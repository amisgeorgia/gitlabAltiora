from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.ai.vector_store.base import VectorStore
from app.db.session import get_session_factory
from app.models.models import KnowledgeChunk


class PgVectorStore(VectorStore):
    """Stockage vectoriel basé sur PostgreSQL et pgvector."""

    def __init__(self, session: Session | None = None) -> None:
        self._session = session

    def _get_session(self) -> tuple[Session, bool]:
        """Retourne la session existante ou en crée une nouvelle."""
        if self._session is not None:
            return self._session, False

        session = get_session_factory()()
        return session, True

    def add(self, item: KnowledgeChunk) -> KnowledgeChunk:
        """Ajoute un chunk avec son embedding dans PostgreSQL."""

        session, owns_session = self._get_session()

        try:
            session.add(item)
            session.commit()
            session.refresh(item)

            return item

        except Exception:
            session.rollback()
            raise

        finally:
            if owns_session:
                session.close()

    def search(
        self,
        embedding: list[float],
        top_k: int = 5,
    ) -> list[KnowledgeChunk]:
        """Retourne les chunks les plus proches du vecteur fourni."""

        if not embedding:
            raise ValueError("L'embedding de recherche ne peut pas être vide.")

        if top_k <= 0:
            raise ValueError("top_k doit être supérieur à zéro.")

        session, owns_session = self._get_session()

        try:
            distance = KnowledgeChunk.embedding.cosine_distance(embedding)

            query = (
                select(KnowledgeChunk)
                .order_by(distance)
                .limit(top_k)
            )

            return list(session.scalars(query).all())

        finally:
            if owns_session:
                session.close()

    def delete(self, item_id: UUID) -> None:
        """Supprime un chunk à partir de son identifiant."""

        session, owns_session = self._get_session()

        try:
            chunk = session.get(KnowledgeChunk, item_id)

            if chunk is None:
                return

            session.delete(chunk)
            session.commit()

        except Exception:
            session.rollback()
            raise

        finally:
            if owns_session:
                session.close()
