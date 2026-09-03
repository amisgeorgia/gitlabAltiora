from __future__ import annotations

from dataclasses import dataclass

from app.ai.llm.base import LLMProvider
from app.ai.llm.gemini import GeminiLLM
from app.ai.prompts.prompt_manager import PromptManager
from app.ai.retrieval.context_builder import ContextBuilder
from app.ai.retrieval.retriever import Retriever


@dataclass
class RAGResult:
    """Résultat complet d'une exécution RAG."""

    question: str
    answer: str
    context: str


class RAGPipeline:
    """Orchestre le processus Retrieval-Augmented Generation."""

    def __init__(
        self,
        retriever: Retriever | None = None,
        context_builder: ContextBuilder | None = None,
        prompt_manager: PromptManager | None = None,
        llm: LLMProvider | None = None,
    ) -> None:
        self.retriever = retriever or Retriever()
        self.context_builder = context_builder or ContextBuilder()
        self.prompt_manager = prompt_manager or PromptManager()
        self.llm = llm or GeminiLLM()

    def run(
        self,
        question: str,
        top_k: int = 3,
    ) -> RAGResult:
        """Exécute le pipeline RAG complet."""

        if not question or not question.strip():
            raise ValueError("La question ne peut pas être vide.")

        if top_k <= 0:
            raise ValueError("top_k doit être supérieur à zéro.")

        question = question.strip()

        # 1. Retrieval
        chunks = self.retriever.retrieve(
            question=question,
            top_k=top_k,
        )

        # 2. Construction du contexte
        context = self.context_builder.build(chunks)

        # 3. Construction du prompt
        prompt = self.prompt_manager.build_rag_prompt(
            question=question,
            context=context,
        )

        # 4. Génération LLM
        answer = self.llm.generate(prompt)

        if not answer or not answer.strip():
            raise RuntimeError(
                "Le LLM n'a retourné aucune réponse."
            )

        return RAGResult(
            question=question,
            answer=answer.strip(),
            context=context,
        )
