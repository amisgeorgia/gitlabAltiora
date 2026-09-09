from loguru import logger

from app.ai.ingestion.loaders.text_loader import TextLoader

SOURCE = "scripts/data/altiora_prest_test.txt"
def main() -> None:
    logger.info("TEST TEXT LOADER")
    loader = TextLoader()

    text = loader.load(SOURCE)

    if not text.strip():
        raise RuntimeError(
            "Le TextLoader a retourné un contenu vide."
        )

    print("\n" + "=" * 70)
    print("CONTENU CHARGÉ")
    print("=" * 70)
    print(text)

    print("\n" + "=" * 70)
    print("VÉRIFICATIONS")
    print("=" * 70)

    if "ALTIORA PREST" not in text:
        raise AssertionError(
            "Le contenu ALTIORA PREST est absent."
        )

    if "FORMATION & IA" not in text:
        raise AssertionError(
            "La section FORMATION & IA est absente."
        )

    if "DÉVELOPPEMENT LOGICIEL" not in text:
        raise AssertionError(
            "La section DÉVELOPPEMENT LOGICIEL est absente."
        )

    logger.success("TEXT LOADER RÉUSSI")


if __name__ == "__main__":
    main()
