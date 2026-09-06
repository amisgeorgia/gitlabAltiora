from types import SimpleNamespace
from unittest.mock import Mock

import pytest

from app.ai.retrieval.retriever import Retriever


def test_retrieve_rejects_empty_question():
    embedding_service = Mock()
    vector_store = Mock()

    retriever = Retriever(
        embedding_service=embedding_service,
        vector_store=vector_store,
    )

    with pytest.raises(ValueError, match="question ne peut pas être vide"):
        retriever.retrieve("")


def test_retrieve_rejects_whitespace_question():
    embedding_service = Mock()
    vector_store = Mock()

    retriever = Retriever(
        embedding_service=embedding_service,
        vector_store=vector_store,
    )

    with pytest.raises(ValueError, match="question ne peut pas être vide"):
        retriever.retrieve("   ")


def test_retrieve_rejects_invalid_top_k():
    embedding_service = Mock()
    vector_store = Mock()

    retriever = Retriever(
        embedding_service=embedding_service,
        vector_store=vector_store,
    )

    with pytest.raises(ValueError, match="top_k doit être supérieur à zéro"):
        retriever.retrieve("Quelle est la politique ALTIORA ?", top_k=0)


def test_retrieve_rejects_negative_top_k():
    embedding_service = Mock()
    vector_store = Mock()

    retriever = Retriever(
        embedding_service=embedding_service,
        vector_store=vector_store,
    )

    with pytest.raises(ValueError, match="top_k doit être supérieur à zéro"):
        retriever.retrieve("Quelle est la politique ALTIORA ?", top_k=-1)


def test_retrieve_embeds_question_and_searches_vector_store():
    embedding_service = Mock()
    vector_store = Mock()

    embedding_service.embed_query.return_value = [0.1, 0.2, 0.3]

    expected_chunks = [
        SimpleNamespace(content="Premier résultat"),
        SimpleNamespace(content="Deuxième résultat"),
    ]

    vector_store.search.return_value = expected_chunks

    retriever = Retriever(
        embedding_service=embedding_service,
        vector_store=vector_store,
    )

    result = retriever.retrieve(
        "Quelle est la politique ALTIORA ?",
        top_k=3,
    )

    assert result == expected_chunks

    embedding_service.embed_query.assert_called_once_with(
        "Quelle est la politique ALTIORA ?"
    )

    vector_store.search.assert_called_once_with(
        embedding=[0.1, 0.2, 0.3],
        top_k=3,
    )


def test_retrieve_uses_default_top_k():
    embedding_service = Mock()
    vector_store = Mock()

    embedding_service.embed_query.return_value = [0.1, 0.2]

    vector_store.search.return_value = []

    retriever = Retriever(
        embedding_service=embedding_service,
        vector_store=vector_store,
    )

    result = retriever.retrieve("Question de test")

    assert result == []

    vector_store.search.assert_called_once_with(
        embedding=[0.1, 0.2],
        top_k=5,
    )