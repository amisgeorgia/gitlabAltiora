from unittest.mock import Mock, patch
from uuid import uuid4

import pytest

from app.ai.vector_store.pgvector_store import PgVectorStore


def create_store(session=None):
    return PgVectorStore(session=session)


def test_get_session_returns_injected_session():
    session = Mock()
    store = create_store(session=session)

    result, owns_session = store._get_session()

    assert result is session
    assert owns_session is False


def test_get_session_creates_new_session():
    session = Mock()
    session_factory = Mock(return_value=session)

    store = create_store()

    with patch(
        "app.ai.vector_store.pgvector_store.get_session_factory",
        return_value=session_factory,
    ):
        result, owns_session = store._get_session()

    assert result is session
    assert owns_session is True
    session_factory.assert_called_once_with()


def test_add_stores_item_and_returns_it():
    session = Mock()
    store = create_store(session=session)

    item = Mock()

    result = store.add(item)

    assert result is item
    session.add.assert_called_once_with(item)
    session.commit.assert_called_once()
    session.refresh.assert_called_once_with(item)
    session.rollback.assert_not_called()
    session.close.assert_not_called()


def test_add_rolls_back_when_database_operation_fails():
    session = Mock()
    session.commit.side_effect = RuntimeError("Erreur DB")

    store = create_store(session=session)
    item = Mock()

    with pytest.raises(RuntimeError, match="Erreur DB"):
        store.add(item)

    session.add.assert_called_once_with(item)
    session.rollback.assert_called_once()
    session.refresh.assert_not_called()
    session.close.assert_not_called()


def test_add_closes_owned_session():
    session = Mock()
    session_factory = Mock(return_value=session)

    store = create_store()
    item = Mock()

    with patch(
        "app.ai.vector_store.pgvector_store.get_session_factory",
        return_value=session_factory,
    ):
        result = store.add(item)

    assert result is item
    session.add.assert_called_once_with(item)
    session.commit.assert_called_once()
    session.refresh.assert_called_once_with(item)
    session.close.assert_called_once()


def test_search_rejects_empty_embedding():
    session = Mock()
    store = create_store(session=session)

    with pytest.raises(
        ValueError,
        match="embedding de recherche ne peut pas être vide",
    ):
        store.search([])

    session.scalars.assert_not_called()


def test_search_rejects_invalid_top_k():
    session = Mock()
    store = create_store(session=session)

    with pytest.raises(
        ValueError,
        match="top_k doit être supérieur à zéro",
    ):
        store.search([0.1, 0.2, 0.3], top_k=0)

    session.scalars.assert_not_called()


def test_search_rejects_negative_top_k():
    session = Mock()
    store = create_store(session=session)

    with pytest.raises(
        ValueError,
        match="top_k doit être supérieur à zéro",
    ):
        store.search([0.1, 0.2, 0.3], top_k=-1)

    session.scalars.assert_not_called()

def test_search_returns_matching_chunks():
    session = Mock()
    scalars_result = Mock()

    expected_chunks = [
        Mock(),
        Mock(),
    ]

    scalars_result.all.return_value = expected_chunks
    session.scalars.return_value = scalars_result

    store = create_store(session=session)

    distance = Mock()

    with patch(
        "app.ai.vector_store.pgvector_store.KnowledgeChunk.embedding"
    ) as embedding_expression, patch(
        "app.ai.vector_store.pgvector_store.select"
    ) as select_mock:
        embedding_expression.cosine_distance.return_value = distance

        query = Mock()
        select_mock.return_value = query
        query.order_by.return_value = query
        query.limit.return_value = query

        result = store.search(
            [0.1, 0.2, 0.3],
            top_k=3,
        )

    assert result == expected_chunks

    embedding_expression.cosine_distance.assert_called_once_with(
        [0.1, 0.2, 0.3],
    )
    select_mock.assert_called_once()
    query.order_by.assert_called_once_with(distance)
    query.limit.assert_called_once_with(3)
    session.scalars.assert_called_once_with(query)
    scalars_result.all.assert_called_once()


def test_search_uses_default_top_k():
    session = Mock()
    scalars_result = Mock()
    scalars_result.all.return_value = []

    session.scalars.return_value = scalars_result

    store = create_store(session=session)

    embedding_expression = Mock()
    distance = Mock()
    embedding_expression.cosine_distance.return_value = distance

    with patch(
        "app.ai.vector_store.pgvector_store.KnowledgeChunk.embedding",
        embedding_expression,
    ), patch(
        "app.ai.vector_store.pgvector_store.select",
    ) as select_mock:
        query = Mock()
        select_mock.return_value = query

        query.order_by.return_value = query
        query.limit.return_value = query

        result = store.search([0.1, 0.2])

    assert result == []
    select_mock.assert_called_once()
    query.order_by.assert_called_once_with(distance)
    query.limit.assert_called_once_with(5)


def test_search_closes_owned_session():
    session = Mock()
    scalars_result = Mock()
    scalars_result.all.return_value = []

    session.scalars.return_value = scalars_result

    session_factory = Mock(return_value=session)

    store = create_store()

    distance = Mock()

    with patch(
        "app.ai.vector_store.pgvector_store.get_session_factory",
        return_value=session_factory,
    ), patch(
        "app.ai.vector_store.pgvector_store.KnowledgeChunk.embedding"
    ) as embedding_expression, patch(
        "app.ai.vector_store.pgvector_store.select"
    ) as select_mock:
        embedding_expression.cosine_distance.return_value = distance

        query = Mock()
        select_mock.return_value = query
        query.order_by.return_value = query
        query.limit.return_value = query

        result = store.search(
            [0.1, 0.2, 0.3],
        )

    assert result == []

    embedding_expression.cosine_distance.assert_called_once_with(
        [0.1, 0.2, 0.3],
    )
    select_mock.assert_called_once()
    query.order_by.assert_called_once_with(distance)
    query.limit.assert_called_once_with(5)
    session.scalars.assert_called_once_with(query)
    scalars_result.all.assert_called_once()
    session.close.assert_called_once()


def test_delete_does_nothing_when_chunk_does_not_exist():
    session = Mock()
    session.get.return_value = None

    store = create_store(session=session)

    item_id = uuid4()

    result = store.delete(item_id)

    assert result is None
    session.get.assert_called_once()
    session.delete.assert_not_called()
    session.commit.assert_not_called()
    session.rollback.assert_not_called()


def test_delete_removes_existing_chunk():
    session = Mock()
    chunk = Mock()

    session.get.return_value = chunk

    store = create_store(session=session)

    item_id = uuid4()

    result = store.delete(item_id)

    assert result is None
    session.get.assert_called_once()
    session.delete.assert_called_once_with(chunk)
    session.commit.assert_called_once()
    session.rollback.assert_not_called()
    session.close.assert_not_called()


def test_delete_rolls_back_when_database_operation_fails():
    session = Mock()
    chunk = Mock()

    session.get.return_value = chunk
    session.delete.side_effect = RuntimeError("Erreur DB")

    store = create_store(session=session)

    with pytest.raises(RuntimeError, match="Erreur DB"):
        store.delete(uuid4())

    session.rollback.assert_called_once()
    session.commit.assert_not_called()
    session.close.assert_not_called()


def test_delete_closes_owned_session():
    session = Mock()
    chunk = Mock()
    session.get.return_value = chunk

    session_factory = Mock(return_value=session)

    store = create_store()

    with patch(
        "app.ai.vector_store.pgvector_store.get_session_factory",
        return_value=session_factory,
    ):
        store.delete(uuid4())

    session.delete.assert_called_once_with(chunk)
    session.commit.assert_called_once()
    session.close.assert_called_once()