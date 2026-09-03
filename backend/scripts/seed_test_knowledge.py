import uuid

from loguru import logger

from app.ai.embeddings.embedding_service import VoyageEmbeddingService
from app.db.session import get_session_factory
from app.models import KnowledgeChunk, KnowledgeDocument


DOCUMENT_TITLE = "ALTIORA PREST - Nos expertises"

DOCUMENT_CONTENT = """
ALTIORA PREST est un partenaire de confiance pour les projets des entreprises,
organisations et porteurs de projets.

ALTIORA PREST accompagne ses clients vers la performance et la croissance durable.

Nos expertises comprennent :

1. Formation & IA
Formations professionnelles et solutions d'intelligence artificielle sur mesure.

2. Conseil stratégique
Accompagnement stratégique pour des décisions éclairées et un avantage compétitif.

3. Études financières
Analyses financières approfondies et business plans solides pour les investissements.

4. Services aux entreprises
Solutions administratives, organisationnelles et opérationnelles sur mesure.

5. Externalisation (BPO)
Externalisation de processus métiers pour plus d'efficacité et de gain de temps.

6. Développement logiciel
Conception de logiciels de gestion performants et adaptés à l'activité.

7. Transformation digitale
Accompagnement de la transition digitale pour innover et automatiser.

8. Optimisation des processus
Amélioration continue pour accroître productivité, qualité et rentabilité.

ALTIORA PREST est située à Antananarivo, Madagascar.

Site web : www.altiora-prest.com
Téléphone : 034 44 544 40
WhatsApp : 034 35 506 00
Email : administration@altiora-prest.com
""".strip()


def main() -> None:
    logger.info("SEED TEST KNOWLEDGE")

    embedding_service = VoyageEmbeddingService()
    session = get_session_factory()()

    try:
        document = KnowledgeDocument(
            id=uuid.uuid4(),
            title=DOCUMENT_TITLE,
            source_url="https://www.altiora-prest.com",
            status="published",
        )

        session.add(document)
        session.flush()

        logger.info("Document créé : {}", document.id)

        embeddings = embedding_service.embed_documents(
            [DOCUMENT_CONTENT]
        )

        chunk = KnowledgeChunk(
            id=uuid.uuid4(),
            document_id=document.id,
            content=DOCUMENT_CONTENT,
            embedding=embeddings[0],
            chunk_index=0,
        )

        session.add(chunk)
        session.commit()

        logger.info("Chunk créé : {}", chunk.id)
        logger.info("Dimension embedding : {}", len(embeddings[0]))
        logger.success("SEED TERMINÉ AVEC SUCCÈS")

    except Exception:
        session.rollback()
        raise

    finally:
        session.close()


if __name__ == "__main__":
    main()