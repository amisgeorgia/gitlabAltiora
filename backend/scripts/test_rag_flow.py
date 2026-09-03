from loguru import logger
from app.ai.llm.gemini import GeminiLLM
from app.ai.prompts.prompt_manager import PromptManager
from app.ai.retrieval.context_builder import ContextBuilder
from app.ai.retrieval.retriever import Retriever

def main() -> None:
    logger.info("TEST RAG FLOW")

    question = (
        "Quelles sont les solutions proposées par ALTIORA PREST "
        "dans le domaine de l'intelligence artificielle ?"
    )

    print("\n" + "=" * 70)
    print("QUESTION")
    print("=" * 70)
    print(question)

    # ------------------------------------------------------------
    # 1. Recherche vectorielle
    # ------------------------------------------------------------

    print("\n" + "=" * 70)
    print("1. RETRIEVAL")
    print("=" * 70)

    retriever = Retriever()

    chunks = retriever.retrieve(
        question=question,
        top_k=3,
    )

    if not chunks:
        raise RuntimeError(
            "Aucun chunk n'a été retrouvé par le Retriever."
        )

    print(f"Nombre de chunks retrouvés : {len(chunks)}")

    for rank, chunk in enumerate(chunks, start=1):
        print(f"\n[Résultat {rank}]")
        print(f"Chunk index : {chunk.chunk_index}")
        print(f"Contenu     : {chunk.content}")

    # ------------------------------------------------------------
    # 2. Construction du contexte
    # ------------------------------------------------------------

    print("\n" + "=" * 70)
    print("2. CONTEXT BUILDER")
    print("=" * 70)

    context_builder = ContextBuilder()
    context = context_builder.build(chunks)

    if not context:
        raise RuntimeError(
            "Le ContextBuilder a produit un contexte vide."
        )

    print(context)

    # ------------------------------------------------------------
    # 3. Construction du prompt
    # ------------------------------------------------------------

    print("\n" + "=" * 70)
    print("3. PROMPT MANAGER")
    print("=" * 70)

    prompt_manager = PromptManager()

    prompt = prompt_manager.build_rag_prompt(
        question=question,
        context=context,
    )

    if not prompt:
        raise RuntimeError(
            "Le PromptManager a produit un prompt vide."
        )

    print(prompt)

    # ------------------------------------------------------------
    # 4. Génération avec Gemini
    # ------------------------------------------------------------

    print("\n" + "=" * 70)
    print("4. GEMINI")
    print("=" * 70)

    llm = GeminiLLM()

    response = llm.generate(prompt)

    if not response:
        raise RuntimeError(
            "Gemini n'a retourné aucune réponse."
        )

    print("RÉPONSE GEMINI")
    print("-" * 70)
    print(response)

    # ------------------------------------------------------------
    # 5. Validation finale
    # ------------------------------------------------------------

    print("\n" + "=" * 70)
    print("VÉRIFICATIONS")
    print("=" * 70)

    if len(chunks) > 3:
        raise RuntimeError(
            "Le Retriever a retourné plus de 3 chunks."
        )

    if "[Source 1]" not in context:
        raise RuntimeError(
            "La Source 1 est absente du contexte."
        )

    if question not in prompt:
        raise RuntimeError(
            "La question est absente du prompt."
        )

    if context not in prompt:
        raise RuntimeError(
            "Le contexte est absent du prompt."
        )

    if not response.strip():
        raise RuntimeError(
            "La réponse Gemini est vide."
        )

    logger.success("RAG FLOW RÉUSSI")


if __name__ == "__main__":
    main()