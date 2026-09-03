from __future__ import annotations

from pathlib import Path
from uuid import uuid4

from sqlalchemy.orm import Session

from app.ai.embeddings.base import EmbeddingService
from app.ai.embeddings.embedding_service import VoyageEmbeddingService
from app.ai.ingestion.cleaner import TextCleaner
from app.ai.ingestion.chunker import TextChunker
from app.ai.ingestion.loaders.docx_loader import DOCXLoader
from app.ai.ingestion.loaders.pdf_loader import PDFLoader
from app.ai.ingestion.loaders.text_loader import TextLoader
from app.ai.vector_store.pgvector_store import PgVectorStore
from app.db.session import get_session_factory
from app.models import KnowledgeChunk, KnowledgeDocument
class IngestionPipeline:
    """Pipeline complet d'ingestion des documents."""

    def __init__(
        self,
        cleaner: TextCleaner | None = None,
        chunker: TextChunker | None = None,
        embedding_service: EmbeddingService | None = None,
        vector_store: PgVectorStore | None = None,
        session: Session | None = None,
    ) -> None:
        self.cleaner = cleaner or TextCleaner()
        self.chunker = chunker or TextChunker()
        self.embedding_service = (
            embedding_service or VoyageEmbeddingService()
        )
        self.vector_store = vector_store or PgVectorStore(session=session)

        self._loaders = {
            ".pdf": PDFLoader(),
            ".docx": DOCXLoader(),
            ".txt": TextLoader(),
        }

        self._session = session

    def ingest(
        self,
        source: str | Path,
        title: str | None = None,
        source_url: str | None = None,
        status: str = "published",
    ) -> KnowledgeDocument:
        """
        Ingère un document complet dans PostgreSQL.

        Étapes :
        1. sélection du loader ;
        2. extraction du texte ;
        3. nettoyage ;
        4. découpage en chunks ;
        5. génération des embeddings ;
        6. création du document ;
        7. création des chunks.
        """

        path = Path(source)

        if not path.exists():
            raise FileNotFoundError(
                f"Document introuvable : {path}"
            )

        if not path.is_file():
            raise ValueError(
                f"La source n'est pas un fichier : {path}"
            )

        loader = self._get_loader(path)

        raw_text = loader.load(path)

        cleaned_text = self.cleaner.clean(raw_text)

        if not cleaned_text:
            raise ValueError(
                f"Le document ne contient aucun texte exploitable : {path}"
            )

        chunks = self.chunker.split(cleaned_text)

        if not chunks:
            raise ValueError(
                f"Aucun chunk généré pour le document : {path}"
            )

        embeddings = self.embedding_service.embed_documents(
            [chunk.content for chunk in chunks]
        )

        if len(embeddings) != len(chunks):
            raise RuntimeError(
                "Le nombre d'embeddings ne correspond pas "
                "au nombre de chunks."
            )

        document = KnowledgeDocument(
            id=uuid4(),
            title=title or path.stem,
            source_url=source_url,
            status=status,
        )

        session, owns_session = self._get_session()

        try:
            session.add(document)
            session.flush()

            for chunk, embedding in zip(chunks, embeddings):
                knowledge_chunk = KnowledgeChunk(
                    id=uuid4(),
                    document_id=document.id,
                    content=chunk.content,
                    embedding=embedding,
                    chunk_index=chunk.chunk_index,
                )

                session.add(knowledge_chunk)

            session.commit()
            session.refresh(document)

            return document

        except Exception:
            session.rollback()
            raise

        finally:
            if owns_session:
                session.close()

    def _get_loader(self, path: Path):
        """Retourne le loader correspondant à l'extension."""

        suffix = path.suffix.lower()

        loader = self._loaders.get(suffix)

        if loader is None:
            supported = ", ".join(sorted(self._loaders))

            raise ValueError(
                f"Format de document non supporté : {suffix or '[aucune extension]'}. "
                f"Formats acceptés : {supported}"
            )

        return loader

    def _get_session(self) -> tuple[Session, bool]:
        """Retourne la session injectée ou crée une nouvelle session."""

        if self._session is not None:
            return self._session, False

        session = get_session_factory()()

        return session, True