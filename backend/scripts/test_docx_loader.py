from loguru import logger

from app.ai.ingestion.loaders.docx_loader import DOCXLoader

SOURCE = "scripts/data/altiora_prest_test.docx"

def main() -> None:
    logger.info("TEST DOCX LOADER")

    loader = DOCXLoader()

    text = loader.load(SOURCE)

    if not text.strip():
        raise RuntimeError(
            "Le DOCXLoader a retourné un contenu vide."
        )

    print("\n" + "=" * 70)
    print("CONTENU EXTRAIT DU DOCX")
    print("=" * 70)
    print(text)

    print("\n" + "=" * 70)
    print("VÉRIFICATIONS")
    print("=" * 70)

    if "ALTIORA PREST" not in text:
        raise AssertionError(
            "ALTIORA PREST est absent du texte extrait."
        )

    if "FORMATION" not in text:
        raise AssertionError(
            "La section FORMATION est absente."
        )

    if "DÉVELOPPEMENT" not in text:
        raise AssertionError(
            "La section DÉVELOPPEMENT est absente."
        )

    if "TRANSFORMATION DIGITALE" not in text:
        raise AssertionError(
            "La section TRANSFORMATION DIGITALE est absente."
        )

    logger.success("DOCX LOADER RÉUSSI")


if __name__ == "__main__":
    main()
