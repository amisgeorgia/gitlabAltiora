from loguru import logger

from app.chat.ai_client import RAGChatClient


def main() -> None:
    logger.info("TEST RAG CHAT CLIENT")

    client = RAGChatClient()

    questions = [
        "Quelles solutions d'intelligence artificielle propose ALTIORA PREST ?",
        "Quels sont les services proposés par ALTIORA PREST ?",
        "Que propose ALTIORA PREST dans le domaine de la transformation digitale ?",
    ]

    for question in questions:
        print("\n" + "=" * 70)
        print(f"QUESTION : {question}")
        print("=" * 70)

        response = client.generate_reply(question)

        if not response:
            raise RuntimeError(
                "RAGChatClient n'a retourné aucune réponse."
            )

        print("\nRÉPONSE :")
        print(response)

    logger.success("TEST RAG CHAT CLIENT RÉUSSI")


if __name__ == "__main__":
    main()