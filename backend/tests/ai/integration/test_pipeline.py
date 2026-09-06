from pathlib import Path
from types import SimpleNamespace
from unittest.mock import Mock, patch

import pytest

from app.ai.ingestion.pipeline import IngestionPipeline


def create_pipeline(
    cleaner=None,
    chunker=None,
    embedding_service=None,
    vector_store=None,
    session=None,
):
    return IngestionPipeline(
        cleaner=cleaner or Mock(),
        chunker=chunker or Mock(),
        embedding_service=embedding_service or Mock(),
        vector_store=vector_store or Mock(),
        session=session,
    )


def test_ingest_raises_when_source_does_not_exist(tmp_path):
    pipeline = create_pipeline()

    source = tmp_path / "missing.txt"

    with pytest.raises(FileNotFoundError, match="Document introuvable"):
        pipeline.ingest(source)


def test_ingest_raises_when_source_is_directory(tmp_path):
    pipeline = create_pipeline()

    source = tmp_path / "documents"
    source.mkdir()

    with pytest.raises(ValueError, match="La source n'est pas un fichier"):
        pipeline.ingest(source)


def test_get_loader_returns_loader_for_supported_extension():
    pipeline = create_pipeline()

    pdf_loader = Mock()
    docx_loader = Mock()
    txt_loader = Mock()

    pipeline._loaders = {
        ".pdf": pdf_loader,
        ".docx": docx_loader,
        ".txt": txt_loader,
    }

    assert pipeline._get_loader(Path("document.pdf")) is pdf_loader
    assert pipeline._get_loader(Path("document.docx")) is docx_loader
    assert pipeline._get_loader(Path("document.txt")) is txt_loader


def test_get_loader_is_case_insensitive():
    pipeline = create_pipeline()

    pdf_loader = Mock()
    pipeline._loaders = {".pdf": pdf_loader}

    assert pipeline._get_loader(Path("DOCUMENT.PDF")) is pdf_loader


def test_get_loader_raises_for_unsupported_extension():
    pipeline = create_pipeline()

    with pytest.raises(ValueError, match="Format de document non supporté"):
        pipeline._get_loader(Path("document.xlsx"))


def test_get_loader_raises_for_file_without_extension():
    pipeline = create_pipeline()

    with pytest.raises(
        ValueError,
        match="Format de document non supporté",
    ):
        pipeline._get_loader(Path("document"))


def test_ingest_raises_when_cleaned_text_is_empty(tmp_path):
    source = tmp_path / "document.txt"
    source.write_text("Texte brut", encoding="utf-8")

    loader = Mock()
    loader.load.return_value = "Texte brut"

    cleaner = Mock()
    cleaner.clean.return_value = ""

    pipeline = create_pipeline(cleaner=cleaner)
    pipeline._loaders = {".txt": loader}

    with pytest.raises(
        ValueError,
        match="aucun texte exploitable",
    ):
        pipeline.ingest(source)

    loader.load.assert_called_once_with(source)
    cleaner.clean.assert_called_once_with("Texte brut")


def test_ingest_raises_when_no_chunks_are_generated(tmp_path):
    source = tmp_path / "document.txt"
    source.write_text("Texte brut", encoding="utf-8")

    loader = Mock()
    loader.load.return_value = "Texte brut"

    cleaner = Mock()
    cleaner.clean.return_value = "Texte nettoyé"

    chunker = Mock()
    chunker.split.return_value = []

    pipeline = create_pipeline(
        cleaner=cleaner,
        chunker=chunker,
    )
    pipeline._loaders = {".txt": loader}

    with pytest.raises(
        ValueError,
        match="Aucun chunk généré",
    ):
        pipeline.ingest(source)

    chunker.split.assert_called_once_with("Texte nettoyé")


def test_ingest_raises_when_embedding_count_does_not_match_chunks(
    tmp_path,
):
    source = tmp_path / "document.txt"
    source.write_text("Texte brut", encoding="utf-8")

    loader = Mock()
    loader.load.return_value = "Texte brut"

    cleaner = Mock()
    cleaner.clean.return_value = "Texte nettoyé"

    chunker = Mock()
    chunker.split.return_value = [
        SimpleNamespace(
            content="Premier chunk",
            chunk_index=0,
        ),
        SimpleNamespace(
            content="Deuxième chunk",
            chunk_index=1,
        ),
    ]

    embedding_service = Mock()
    embedding_service.embed_documents.return_value = [
        [0.1, 0.2, 0.3],
    ]

    pipeline = create_pipeline(
        cleaner=cleaner,
        chunker=chunker,
        embedding_service=embedding_service,
    )
    pipeline._loaders = {".txt": loader}

    with pytest.raises(
        RuntimeError,
        match="nombre d'embeddings",
    ):
        pipeline.ingest(source)

    embedding_service.embed_documents.assert_called_once_with(
        ["Premier chunk", "Deuxième chunk"],
    )


def test_ingest_successfully_creates_document_and_chunks(tmp_path):
    source = tmp_path / "guide.txt"
    source.write_text("Texte brut", encoding="utf-8")

    loader = Mock()
    loader.load.return_value = "Texte brut"

    cleaner = Mock()
    cleaner.clean.return_value = "Texte nettoyé"

    chunker = Mock()
    chunks = [
        SimpleNamespace(
            content="Premier chunk",
            chunk_index=0,
        ),
        SimpleNamespace(
            content="Deuxième chunk",
            chunk_index=1,
        ),
    ]
    chunker.split.return_value = chunks

    embedding_service = Mock()
    embeddings = [
        [0.1, 0.2, 0.3],
        [0.4, 0.5, 0.6],
    ]
    embedding_service.embed_documents.return_value = embeddings

    session = Mock()

    pipeline = create_pipeline(
        cleaner=cleaner,
        chunker=chunker,
        embedding_service=embedding_service,
        session=session,
    )
    pipeline._loaders = {".txt": loader}

    result = pipeline.ingest(
        source,
        title="Guide ALTIORA",
        source_url="https://example.com/guide",
        status="published",
    )

    assert result.title == "Guide ALTIORA"
    assert result.source_url == "https://example.com/guide"
    assert result.status == "published"

    loader.load.assert_called_once_with(source)
    cleaner.clean.assert_called_once_with("Texte brut")
    chunker.split.assert_called_once_with("Texte nettoyé")

    embedding_service.embed_documents.assert_called_once_with(
        ["Premier chunk", "Deuxième chunk"],
    )

    assert session.add.call_count == 3
    session.flush.assert_called_once()
    session.commit.assert_called_once()
    session.refresh.assert_called_once_with(result)
    session.rollback.assert_not_called()
    session.close.assert_not_called()


def test_ingest_uses_filename_as_default_title(tmp_path):
    source = tmp_path / "guide_interne.txt"
    source.write_text("Texte brut", encoding="utf-8")

    loader = Mock()
    loader.load.return_value = "Texte brut"

    cleaner = Mock()
    cleaner.clean.return_value = "Texte nettoyé"

    chunker = Mock()
    chunker.split.return_value = [
        SimpleNamespace(
            content="Chunk",
            chunk_index=0,
        ),
    ]

    embedding_service = Mock()
    embedding_service.embed_documents.return_value = [
        [0.1, 0.2],
    ]

    session = Mock()

    pipeline = create_pipeline(
        cleaner=cleaner,
        chunker=chunker,
        embedding_service=embedding_service,
        session=session,
    )
    pipeline._loaders = {".txt": loader}

    result = pipeline.ingest(source)

    assert result.title == "guide_interne"


def test_ingest_rolls_back_when_database_operation_fails(tmp_path):
    source = tmp_path / "document.txt"
    source.write_text("Texte brut", encoding="utf-8")

    loader = Mock()
    loader.load.return_value = "Texte brut"

    cleaner = Mock()
    cleaner.clean.return_value = "Texte nettoyé"

    chunker = Mock()
    chunker.split.return_value = [
        SimpleNamespace(
            content="Chunk",
            chunk_index=0,
        ),
    ]

    embedding_service = Mock()
    embedding_service.embed_documents.return_value = [
        [0.1, 0.2],
    ]

    session = Mock()
    session.commit.side_effect = RuntimeError("Erreur DB")

    pipeline = create_pipeline(
        cleaner=cleaner,
        chunker=chunker,
        embedding_service=embedding_service,
        session=session,
    )
    pipeline._loaders = {".txt": loader}

    with pytest.raises(RuntimeError, match="Erreur DB"):
        pipeline.ingest(source)

    session.rollback.assert_called_once()
    session.close.assert_not_called()


def test_get_session_returns_injected_session():
    session = Mock()

    pipeline = create_pipeline(session=session)

    result, owns_session = pipeline._get_session()

    assert result is session
    assert owns_session is False


def test_get_session_creates_and_owns_new_session():
    session = Mock()
    session_factory = Mock(return_value=session)

    pipeline = create_pipeline()

    with patch(
        "app.ai.ingestion.pipeline.get_session_factory",
        return_value=session_factory,
    ):
        result, owns_session = pipeline._get_session()

    assert result is session
    assert owns_session is True
    session_factory.assert_called_once_with()


def test_ingest_closes_owned_session(tmp_path):
    source = tmp_path / "document.txt"
    source.write_text("Texte brut", encoding="utf-8")

    loader = Mock()
    loader.load.return_value = "Texte brut"

    cleaner = Mock()
    cleaner.clean.return_value = "Texte nettoyé"

    chunker = Mock()
    chunker.split.return_value = [
        SimpleNamespace(
            content="Chunk",
            chunk_index=0,
        ),
    ]

    embedding_service = Mock()
    embedding_service.embed_documents.return_value = [
        [0.1, 0.2],
    ]

    session = Mock()
    session_factory = Mock(return_value=session)

    pipeline = create_pipeline(
        cleaner=cleaner,
        chunker=chunker,
        embedding_service=embedding_service,
    )
    pipeline._loaders = {".txt": loader}

    with patch(
        "app.ai.ingestion.pipeline.get_session_factory",
        return_value=session_factory,
    ):
        pipeline.ingest(source)

    session.commit.assert_called_once()
    session.close.assert_called_once()
