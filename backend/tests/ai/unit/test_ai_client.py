from unittest.mock import Mock

import pytest

from app.ai.rag.pipeline import RAGResult
from app.chat.ai_client import MockAIClient, RAGChatClient


def test_mock_ai_client_returns_simulated_response():
    client = MockAIClient()

    result = client.generate_reply("  Bonjour ALTIORA  ")

    assert result == "Réponse simulée ALTIORA : Bonjour ALTIORA"


@pytest.mark.parametrize("message", ["", "   "])
def test_mock_ai_client_rejects_empty_message(message: str):
    client = MockAIClient()

    with pytest.raises(
        ValueError,
        match="Le message ne peut pas être vide",
    ):
        client.generate_reply(message)


def test_rag_chat_client_uses_rag_pipeline():
    rag_pipeline = Mock()

    rag_pipeline.run.return_value = RAGResult(
        question="Question ALTIORA",
        answer="  Réponse depuis le RAG  ",
        context="Contexte",
    )

    client = RAGChatClient(rag_pipeline=rag_pipeline)

    result = client.generate_reply("  Question ALTIORA  ")

    assert result == "Réponse depuis le RAG"

    rag_pipeline.run.assert_called_once_with(
        question="Question ALTIORA",
        top_k=3,
    )


@pytest.mark.parametrize("message", ["", "   "])
def test_rag_chat_client_rejects_empty_message(message: str):
    rag_pipeline = Mock()
    client = RAGChatClient(rag_pipeline=rag_pipeline)

    with pytest.raises(
        ValueError,
        match="Le message ne peut pas être vide",
    ):
        client.generate_reply(message)

    rag_pipeline.run.assert_not_called()


def test_rag_chat_client_rejects_empty_rag_answer():
    rag_pipeline = Mock()

    rag_pipeline.run.return_value = RAGResult(
        question="Question",
        answer="",
        context="Contexte",
    )

    client = RAGChatClient(rag_pipeline=rag_pipeline)

    with pytest.raises(
        RuntimeError,
        match="Le pipeline RAG n'a retourné aucune réponse",
    ):
        client.generate_reply("Question")


def test_rag_chat_client_rejects_whitespace_rag_answer():
    rag_pipeline = Mock()

    rag_pipeline.run.return_value = RAGResult(
        question="Question",
        answer="   ",
        context="Contexte",
    )

    client = RAGChatClient(rag_pipeline=rag_pipeline)

    with pytest.raises(
        RuntimeError,
        match="Le pipeline RAG n'a retourné aucune réponse",
    ):
        client.generate_reply("Question")


def test_rag_chat_client_creates_default_pipeline():
    with pytest.MonkeyPatch.context() as monkeypatch:
        pipeline = Mock()

        monkeypatch.setattr(
            "app.chat.ai_client.RAGPipeline",
            Mock(return_value=pipeline),
        )

        client = RAGChatClient()

        assert client._rag_pipeline is pipeline
