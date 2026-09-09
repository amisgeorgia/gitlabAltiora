from unittest.mock import Mock

import pytest

from app.ai.rag.pipeline import RAGPipeline, RAGResult


def create_pipeline(
    retriever=None,
    context_builder=None,
    prompt_manager=None,
    llm=None,
):
    return RAGPipeline(
        retriever=retriever or Mock(),
        context_builder=context_builder or Mock(),
        prompt_manager=prompt_manager or Mock(),
        llm=llm or Mock(),
    )


def test_run_rejects_empty_question():
    pipeline = create_pipeline()

    with pytest.raises(
        ValueError,
        match="question ne peut pas être vide",
    ):
        pipeline.run("")


def test_run_rejects_whitespace_question():
    pipeline = create_pipeline()

    with pytest.raises(
        ValueError,
        match="question ne peut pas être vide",
    ):
        pipeline.run("   ")


def test_run_rejects_invalid_top_k():
    pipeline = create_pipeline()

    with pytest.raises(
        ValueError,
        match="top_k doit être supérieur à zéro",
    ):
        pipeline.run("Question de test", top_k=0)


def test_run_rejects_negative_top_k():
    pipeline = create_pipeline()

    with pytest.raises(
        ValueError,
        match="top_k doit être supérieur à zéro",
    ):
        pipeline.run("Question de test", top_k=-1)


def test_run_executes_complete_rag_pipeline():
    retriever = Mock()
    context_builder = Mock()
    prompt_manager = Mock()
    llm = Mock()

    chunks = [
        Mock(content="Premier passage"),
        Mock(content="Deuxième passage"),
    ]

    retriever.retrieve.return_value = chunks
    context_builder.build.return_value = (
        "[Source 1]\nPremier passage\n\n"
        "[Source 2]\nDeuxième passage"
    )
    prompt_manager.build_rag_prompt.return_value = (
        "Prompt RAG construit"
    )
    llm.generate.return_value = " Réponse générée "

    pipeline = create_pipeline(
        retriever=retriever,
        context_builder=context_builder,
        prompt_manager=prompt_manager,
        llm=llm,
    )

    result = pipeline.run(
        "  Quelle est la politique ALTIORA ?  ",
        top_k=5,
    )

    assert isinstance(result, RAGResult)
    assert result.question == "Quelle est la politique ALTIORA ?"
    assert result.answer == "Réponse générée"
    assert result.context == (
        "[Source 1]\nPremier passage\n\n"
        "[Source 2]\nDeuxième passage"
    )

    retriever.retrieve.assert_called_once_with(
        question="Quelle est la politique ALTIORA ?",
        top_k=5,
    )

    context_builder.build.assert_called_once_with(chunks)

    prompt_manager.build_rag_prompt.assert_called_once_with(
        question="Quelle est la politique ALTIORA ?",
        context=result.context,
    )

    llm.generate.assert_called_once_with(
        "Prompt RAG construit",
    )


def test_run_uses_default_top_k():
    retriever = Mock()
    context_builder = Mock()
    prompt_manager = Mock()
    llm = Mock()

    retriever.retrieve.return_value = []
    context_builder.build.return_value = ""
    prompt_manager.build_rag_prompt.return_value = "Prompt"
    llm.generate.return_value = "Réponse"

    pipeline = create_pipeline(
        retriever=retriever,
        context_builder=context_builder,
        prompt_manager=prompt_manager,
        llm=llm,
    )

    result = pipeline.run("Question de test")

    assert result.answer == "Réponse"

    retriever.retrieve.assert_called_once_with(
        question="Question de test",
        top_k=3,
    )


def test_run_raises_when_llm_returns_empty_answer():
    retriever = Mock()
    context_builder = Mock()
    prompt_manager = Mock()
    llm = Mock()

    retriever.retrieve.return_value = []
    context_builder.build.return_value = ""
    prompt_manager.build_rag_prompt.return_value = "Prompt"
    llm.generate.return_value = ""

    pipeline = create_pipeline(
        retriever=retriever,
        context_builder=context_builder,
        prompt_manager=prompt_manager,
        llm=llm,
    )

    with pytest.raises(
        RuntimeError,
        match="LLM n'a retourné aucune réponse",
    ):
        pipeline.run("Question de test")


def test_run_raises_when_llm_returns_whitespace():
    retriever = Mock()
    context_builder = Mock()
    prompt_manager = Mock()
    llm = Mock()

    retriever.retrieve.return_value = []
    context_builder.build.return_value = ""
    prompt_manager.build_rag_prompt.return_value = "Prompt"
    llm.generate.return_value = "   "

    pipeline = create_pipeline(
        retriever=retriever,
        context_builder=context_builder,
        prompt_manager=prompt_manager,
        llm=llm,
    )

    with pytest.raises(
        RuntimeError,
        match="LLM n'a retourné aucune réponse",
    ):
        pipeline.run("Question de test")


def test_run_strips_llm_answer():
    retriever = Mock()
    context_builder = Mock()
    prompt_manager = Mock()
    llm = Mock()

    retriever.retrieve.return_value = []
    context_builder.build.return_value = ""
    prompt_manager.build_rag_prompt.return_value = "Prompt"
    llm.generate.return_value = "   Réponse propre   "

    pipeline = create_pipeline(
        retriever=retriever,
        context_builder=context_builder,
        prompt_manager=prompt_manager,
        llm=llm,
    )

    result = pipeline.run("Question")

    assert result.answer == "Réponse propre"


def test_rag_result_contains_question_answer_and_context():
    result = RAGResult(
        question="Question",
        answer="Réponse",
        context="Contexte",
    )

    assert result.question == "Question"
    assert result.answer == "Réponse"
    assert result.context == "Contexte"
