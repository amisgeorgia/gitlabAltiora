from app.models import Base


def test_model_metadata_contains_the_validated_tables() -> None:
    assert set(Base.metadata.tables) == {
        "users",
        "contents",
        "contact_requests",
        "qr_codes",
        "qr_scans",
        "knowledge_documents",
        "knowledge_chunks",
        "conversations",
        "messages",
    }


def test_knowledge_chunks_prevents_duplicate_chunk_indexes() -> None:
    table = Base.metadata.tables["knowledge_chunks"]
    constraint_columns = {
        tuple(column.name for column in constraint.columns)
        for constraint in table.constraints
        if constraint.name == "uq_knowledge_chunks_document_chunk"
    }

    assert constraint_columns == {("document_id", "chunk_index")}
