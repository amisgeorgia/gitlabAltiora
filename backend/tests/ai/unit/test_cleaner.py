from app.ai.ingestion.cleaner import TextCleaner


def test_cleaner_returns_empty_string_for_empty_text() -> None:
    cleaner = TextCleaner()

    assert cleaner.clean("") == ""
    assert cleaner.clean("   ") == ""


def test_cleaner_normalizes_windows_and_old_mac_line_endings() -> None:
    cleaner = TextCleaner()

    result = cleaner.clean("Ligne 1\r\nLigne 2\rLigne 3")

    assert result == "Ligne 1\nLigne 2\nLigne 3"


def test_cleaner_removes_control_characters() -> None:
    cleaner = TextCleaner()

    result = cleaner.clean("Bonjour\x00\x01ALTIORA\nTexte")

    assert result == "BonjourALTIORA\nTexte"


def test_cleaner_preserves_tabs_during_control_character_removal() -> None:
    cleaner = TextCleaner()

    result = cleaner.clean("Nom:\tALTIORA")

    assert result == "Nom: ALTIORA"


def test_cleaner_normalizes_multiple_spaces_and_tabs() -> None:
    cleaner = TextCleaner()

    result = cleaner.clean(
        "Bonjour     ALTIORA\t\tMadagascar"
    )

    assert result == "Bonjour ALTIORA Madagascar"


def test_cleaner_limits_consecutive_blank_lines() -> None:
    cleaner = TextCleaner()

    result = cleaner.clean(
        "Première ligne\n\n\n\nDeuxième ligne"
    )

    assert result == "Première ligne\n\nDeuxième ligne"


def test_cleaner_strips_spaces_from_lines() -> None:
    cleaner = TextCleaner()

    result = cleaner.clean(
        "   Première ligne   \n"
        "   Deuxième ligne   "
    )

    assert result == "Première ligne\nDeuxième ligne"


def test_cleaner_combines_all_normalization_steps() -> None:
    cleaner = TextCleaner()

    result = cleaner.clean(
        "  Bonjour   ALTIORA  \r\n"
        "\r\n"
        "\r\n"
        "  Madagascar\t  "
    )

    assert result == "Bonjour ALTIORA\n\nMadagascar"
