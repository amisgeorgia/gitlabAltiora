from loguru import logger

from app.ai.ingestion.pipeline import IngestionPipeline

DOCUMENT = "scripts/data/altiora_prest_test.docx"

def main() -> None:
    logger.info("TEST INGESTION PIPELINE")

    pipeline = IngestionPipeline()

    print("\n" + "=" * 70)
    print("INGESTION DU DOCUMENT")
    print("=" * 70)

    document = pipeline.ingest(
        source=DOCUMENT,
        title="ALTIORA PREST - Nos expertises",
        source_url="https://www.altiora-prest.com",
        status="published",
    )

    print("\nDocument créé")
    print(f"ID     : {document.id}")
    print(f"Titre  : {document.title}")
    print(f"Source : {document.source_url}")
    print(f"Status : {document.status}")

    print("\n" + "=" * 70)
    print("VÉRIFICATIONS")
    print("=" * 70)

    assert document.id is not None
    assert document.title == "ALTIORA PREST - Nos expertises"
    assert document.status == "published"

    logger.success("INGESTION PIPELINE RÉUSSIE")


if __name__ == "__main__":
    main()
