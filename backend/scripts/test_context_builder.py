from uuid import uuid4

from loguru import logger

from app.ai.retrieval.context_builder import ContextBuilder
from app.models import KnowledgeChunk


def main() -> None:
    logger.info("TEST CONTEXT BUILDER")

    builder = ContextBuilder()

    chunks = [
        KnowledgeChunk(
            id=uuid4(),
            document_id=uuid4(),
            content=(
                "ALTIORA PREST propose des formations "
                "professionnelles et des solutions d'intelligence "
                "artificielle sur mesure."
            ),
            embedding=[0.0] * 1024,
            chunk_index=0,
        ),
        KnowledgeChunk(
            id=uuid4(),
            document_id=uuid4(),
            content=(
                "ALTIORA PREST propose également du conseil "
                "stratégique pour accompagner les entreprises."
            ),
            embedding=[0.0] * 1024,
            chunk_index=1,
        ),
        KnowledgeChunk(
            id=uuid4(),
            document_id=uuid4(),
            content=(
                "ALTIORA PREST accompagne aussi les entreprises "
                "dans leur transformation digitale."
            ),
            embedding=[0.0] * 1024,
            chunk_index=2,
        ),
    ]

    print("\n" + "=" * 70)
    print("CONTEXTE CONSTRUIT")
    print("=" * 70)

    context = builder.build(chunks)

    print(context)

    print("\n" + "=" * 70)
    print("VÉRIFICATIONS")
    print("=" * 70)

    if not context:
        raise RuntimeError("Le contexte ne doit pas être vide.")

    if "[Source 1]" not in context:
        raise RuntimeError("La Source 1 est absente.")

    if "[Source 2]" not in context:
        raise RuntimeError("La Source 2 est absente.")

    if "[Source 3]" not in context:
        raise RuntimeError("La Source 3 est absente.")

    if chunks[0].content not in context:
        raise RuntimeError("Le contenu du premier chunk est absent.")

    if chunks[1].content not in context:
        raise RuntimeError("Le contenu du deuxième chunk est absent.")

    if chunks[2].content not in context:
        raise RuntimeError("Le contenu du troisième chunk est absent.")

    empty_context = builder.build([])

    if empty_context != "":
        raise RuntimeError(
            "Un contexte construit à partir d'une liste vide "
            "doit retourner une chaîne vide."
        )

    logger.success("CONTEXT BUILDER RÉUSSI")


if __name__ == "__main__":
    main()