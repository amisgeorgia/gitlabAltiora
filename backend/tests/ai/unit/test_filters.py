from uuid import uuid4

from app.ai.retrieval.filters import RetrievalFilters


def test_retrieval_filters_defaults():
    filters = RetrievalFilters()

    assert filters.document_id is None
    assert filters.status is None


def test_retrieval_filters_with_document_id():
    document_id = uuid4()

    filters = RetrievalFilters(
        document_id=document_id,
    )

    assert filters.document_id == document_id
    assert filters.status is None


def test_retrieval_filters_with_status():
    filters = RetrievalFilters(
        status="published",
    )

    assert filters.document_id is None
    assert filters.status == "published"


def test_retrieval_filters_with_all_values():
    document_id = uuid4()

    filters = RetrievalFilters(
        document_id=document_id,
        status="published",
    )

    assert filters.document_id == document_id
    assert filters.status == "published"
