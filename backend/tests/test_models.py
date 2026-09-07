from app.models import Base


def test_model_metadata_contains_the_validated_tables() -> None:
    assert set(Base.metadata.tables) == {
        "users",
        "password_reset_tokens",
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


def test_sqlalchemy_enums_store_postgresql_values() -> None:
    expected_values = {
        "users": ("role", ["admin", "editor"]),
        "contents": ("type", ["page", "formation", "actualite"]),
        "contact_requests": ("status", ["nouveau", "en_cours", "traite", "archive"]),
        "qr_codes": ("qr_type", ["url", "page", "social", "vcard"]),
        "messages": ("role", ["user", "assistant", "system"]),
    }

    for table_name, (column_name, values) in expected_values.items():
        enum_type = Base.metadata.tables[table_name].columns[column_name].type
        assert enum_type.enums == values
