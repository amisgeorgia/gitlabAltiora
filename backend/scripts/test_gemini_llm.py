from loguru import logger

from app.ai.llm.gemini import GeminiLLM


def main() -> None:
    logger.info("Test du service LLM Gemini")

    llm = GeminiLLM()

    response = llm.generate(
        "Réponds simplement : Bonjour ALTIORA CONNECT"
    )

    if not response:
        raise RuntimeError("Gemini n'a retourné aucune réponse.")

    print("Modèle :", llm.model)
    print("Réponse :", response)

    logger.info("Test du service Gemini réussi")


if __name__ == "__main__":
    main()
