from loguru import logger

from app.ai.prompts.prompt_manager import PromptManager


def main() -> None:
    logger.info("TEST PROMPT MANAGER")

    manager = PromptManager()

    question = "Quelles solutions d'intelligence artificielle propose ALTIORA PREST ?"

    context = (
        "[Source 1]\n"
        "ALTIORA PREST propose des formations professionnelles "
        "et des solutions d'intelligence artificielle sur mesure.\n\n"
        "[Source 2]\n"
        "ALTIORA PREST accompagne les entreprises dans leur "
        "transformation digitale."
    )

    print("\n" + "=" * 70)
    print("PROMPT RAG")
    print("=" * 70)

    prompt = manager.build_rag_prompt(
        question=question,
        context=context,
    )

    print(prompt)

    print("\n" + "=" * 70)
    print("VÉRIFICATIONS")
    print("=" * 70)

    if not prompt.strip():
        raise RuntimeError("Le prompt ne doit pas être vide.")

    if question not in prompt:
        raise RuntimeError(
            "La question utilisateur n'a pas été injectée dans le prompt."
        )

    if context not in prompt:
        raise RuntimeError(
            "Le contexte n'a pas été injecté dans le prompt."
        )

    if "{question}" in prompt:
        raise RuntimeError(
            "Le placeholder {question} n'a pas été remplacé."
        )

    if "{context}" in prompt:
        raise RuntimeError(
            "Le placeholder {context} n'a pas été remplacé."
        )

    # Test question vide
    try:
        manager.build_rag_prompt(
            question="",
            context=context,
        )
    except ValueError:
        pass
    else:
        raise RuntimeError(
            "Une question vide aurait dû provoquer une ValueError."
        )

    # Test contexte vide
    try:
        manager.build_rag_prompt(
            question=question,
            context="",
        )
    except ValueError:
        pass
    else:
        raise RuntimeError(
            "Un contexte vide aurait dû provoquer une ValueError."
        )

    logger.success("PROMPT MANAGER RÉUSSI")


if __name__ == "__main__":
    main()
