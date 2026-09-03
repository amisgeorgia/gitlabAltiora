from loguru import logger

from app.ai.retrieval import Retriever


def main() -> None:
    logger.info("TEST RETRIEVER AVEC VOYAGE AI")

    retriever = Retriever()

    questions = [
        "Quelles solutions d'intelligence artificielle propose ALTIORA PREST ?",
        "Quels sont les services proposés par ALTIORA PREST ?",
        "Que propose ALTIORA PREST dans le domaine de la transformation digitale ?",
    ]

    for question in questions:
        print("\n" + "=" * 70)
        print(f"QUESTION : {question}")
        print("=" * 70)

        results = retriever.retrieve(
            question=question,
            top_k=3,
        )

        if not results:
            print("Aucun résultat trouvé.")
            continue

        for rank, chunk in enumerate(results, start=1):
            print(f"\nRésultat #{rank}")
            print(f"Chunk index : {chunk.chunk_index}")
            print(f"Contenu : {chunk.content[:500]}")

    print("\nTEST RETRIEVER RÉUSSI")


if __name__ == "__main__":
    main()