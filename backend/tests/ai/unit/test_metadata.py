from pathlib import Path

from app.ai.ingestion.metadata import DocumentMetadata, MetadataExtractor


def test_document_metadata_defaults():
    metadata = DocumentMetadata()

    assert metadata.title is None
    assert metadata.source is None
    assert metadata.document_type is None
    assert metadata.extra == {}


def test_document_metadata_with_values():
    metadata = DocumentMetadata(
        title="Guide ALTIORA",
        source="guide.pdf",
        document_type="pdf",
        extra={"author": "ALTIORA"},
    )

    assert metadata.title == "Guide ALTIORA"
    assert metadata.source == "guide.pdf"
    assert metadata.document_type == "pdf"
    assert metadata.extra == {"author": "ALTIORA"}


def test_document_metadata_extra_is_independent():
    first = DocumentMetadata()
    second = DocumentMetadata()

    first.extra["author"] = "ALTIORA"

    assert first.extra == {"author": "ALTIORA"}
    assert second.extra == {}


def test_extract_with_explicit_title_and_type():
    extractor = MetadataExtractor()

    metadata = extractor.extract(
        "documents/guide.pdf",
        title="Mon guide",
        document_type="custom",
    )

    assert metadata.title == "Mon guide"
    assert metadata.source == "documents/guide.pdf"
    assert metadata.document_type == "custom"


def test_extract_title_from_filename():
    extractor = MetadataExtractor()

    metadata = extractor.extract("documents/guide.pdf")

    assert metadata.title == "guide"


def test_extract_accepts_path_object():
    extractor = MetadataExtractor()

    metadata = extractor.extract(Path("documents/guide.pdf"))

    assert metadata.source == "documents/guide.pdf"
    assert metadata.title == "guide"
    assert metadata.document_type == "pdf"


def test_detect_supported_document_types():
    extractor = MetadataExtractor()

    assert extractor.extract("document.pdf").document_type == "pdf"
    assert extractor.extract("document.docx").document_type == "docx"
    assert extractor.extract("document.txt").document_type == "text"
    assert extractor.extract("document.md").document_type == "markdown"


def test_detect_document_type_is_case_insensitive():
    extractor = MetadataExtractor()

    assert extractor.extract("document.PDF").document_type == "pdf"
    assert extractor.extract("document.DOCX").document_type == "docx"


def test_unknown_document_type_returns_none():
    extractor = MetadataExtractor()

    metadata = extractor.extract("document.xyz")

    assert metadata.title == "document"
    assert metadata.document_type is None