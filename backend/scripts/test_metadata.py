from loguru import logger

from app.ai.ingestion.metadata import MetadataExtractor


def main() -> None:
    logger.info("TEST DOCUMENT METADATA")

    extractor = MetadataExtractor()

    tests = [
        "documents/services.pdf",
        "documents/presentation.docx",
        "documents/faq.txt",
        "documents/guide.md",
    ]

    for source in tests:
        metadata = extractor.extract(source)

        print("\n" + "=" * 70)
        print(f"Source : {source}")
        print("=" * 70)
        print(f"Titre          : {metadata.title}")
        print(f"Source         : {metadata.source}")
        print(f"Type document  : {metadata.document_type}")

    print("\n" + "=" * 70)
    print("VÉRIFICATIONS")
    print("=" * 70)

    pdf = extractor.extract("documents/test.pdf")

    assert pdf.title == "test"
    assert pdf.source == "documents/test.pdf"
    assert pdf.document_type == "pdf"

    docx = extractor.extract("documents/test.docx")

    assert docx.title == "test"
    assert docx.document_type == "docx"

    txt = extractor.extract("documents/test.txt")

    assert txt.title == "test"
    assert txt.document_type == "text"

    custom = extractor.extract(
        "documents/test.pdf",
        title="Mon document",
    )

    assert custom.title == "Mon document"

    logger.success("METADATA RÉUSSI")


if __name__ == "__main__":
    main()
