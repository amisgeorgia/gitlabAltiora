from loguru import logger

from app.ai.ingestion.cleaner import TextCleaner


def main() -> None:
    logger.info("TEST TEXT CLEANER")

    cleaner = TextCleaner()

    tests = {
        "texte normal": (
            "ALTIORA PREST propose plusieurs services.\n"
            "La formation accompagne les entreprises."
        ),
        "espaces multiples": (
            "ALTIORA     PREST    propose   des   services."
        ),
        "retours Windows": (
            "Première ligne\r\n"
            "Deuxième ligne\r\n"
            "\r\n"
            "Troisième ligne"
        ),
        "lignes vides multiples": (
            "Titre\n\n\n\n\n"
            "Paragraphe"
        ),
        "tabulations": (
            "Titre\t\timportant\n"
            "\tContenu du paragraphe"
        ),
        "document vide": "",
        "document espaces": "   \n   \n   ",
    }

    for name, text in tests.items():
        print("\n" + "=" * 70)
        print(f"TEST : {name}")
        print("=" * 70)

        result = cleaner.clean(text)

        print(result if result else "[TEXTE VIDE]")

    print("\n" + "=" * 70)
    print("VÉRIFICATIONS")
    print("=" * 70)

    assert cleaner.clean("") == ""
    assert cleaner.clean("   ") == ""

    result = cleaner.clean("A    B")
    assert result == "A B"

    result = cleaner.clean("A\r\nB")
    assert result == "A\nB"

    result = cleaner.clean("A\n\n\n\nB")
    assert result == "A\n\nB"

    logger.success("TEXT CLEANER RÉUSSI")


if __name__ == "__main__":
    main()