from loguru import logger

from app.ai.rag.pipeline import RAGPipeline
def main() -> None:
    logger.info("TEST RAG PIPELINE")

    pipeline = RAGPipeline()

    questions = [
        "Quelles solutions d'intelligence artificielle propose ALTIORA PREST ?",
        "Quels sont les services proposés par ALTIORA PREST ?",
        "Que propose ALTIORA PREST dans le domaine de la transformation digitale ?",
    ]

    for question in questions:
        print("\n" + "=" * 70)
        print("QUESTION")
        print("=" * 70)
        print(question)

        result = pipeline.run(
            question=question,
            top_k=3,
        )

        print("\n" + "=" * 70)
        print("RÉPONSE")
        print("=" * 70)
        print(result.answer)

        print("\n" + "=" * 70)
        print("CONTEXTE UTILISÉ")
        print("=" * 70)
        print(result.context)

        if not result.answer:
            raise RuntimeError(
                "Le pipeline n'a produit aucune réponse."
            )

    print("\n" + "=" * 70)
    logger.success("RAG PIPELINE RÉUSSI")


if __name__ == "__main__":
    main()