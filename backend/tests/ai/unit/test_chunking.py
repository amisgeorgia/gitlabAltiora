import pytest

from app.ai.ingestion.chunker import TextChunk, TextChunker


def test_text_chunk_char_count() -> None:
    chunk = TextChunk(content="Bonjour ALTIORA", chunk_index=0)

    assert chunk.char_count == 15


def test_chunker_returns_empty_list_for_empty_text() -> None:
    chunker = TextChunker()

    assert chunker.split("") == []
    assert chunker.split("   ") == []


def test_chunker_extracts_and_normalizes_paragraphs() -> None:
    chunker = TextChunker(max_characters=50)

    chunks = chunker.split(
        "  Premier   paragraphe.  \n\n"
        "Deuxième\tparagraphe. "
    )

    assert len(chunks) == 1
    assert chunks[0].content == "Premier paragraphe.\n\nDeuxième paragraphe."
    assert chunks[0].chunk_index == 0


def test_chunker_creates_new_section_on_numbered_heading() -> None:
    chunker = TextChunker(max_characters=100)

    chunks = chunker.split(
        "Introduction\n\n"
        "1. Première section\n\n"
        "Contenu de la première section\n\n"
        "2. Deuxième section\n\n"
        "Contenu de la deuxième section"
    )

    assert len(chunks) == 3
    assert chunks[0].content == "Introduction"
    assert chunks[1].content == (
        "1. Première section\n\n"
        "Contenu de la première section"
    )
    assert chunks[2].content == (
        "2. Deuxième section\n\n"
        "Contenu de la deuxième section"
    )


def test_chunker_creates_new_section_on_markdown_heading() -> None:
    chunker = TextChunker(max_characters=100)

    chunks = chunker.split(
        "Introduction\n\n"
        "# Première section\n\n"
        "Contenu\n\n"
        "## Deuxième section\n\n"
        "Autre contenu"
    )

    assert len(chunks) == 3
    assert chunks[0].content == "Introduction"
    assert chunks[1].content == "# Première section\n\nContenu"
    assert chunks[2].content == "## Deuxième section\n\nAutre contenu"


def test_chunker_keeps_short_section_in_one_chunk() -> None:
    chunker = TextChunker(max_characters=50)

    chunks = chunker.split("Bonjour ALTIORA")

    assert len(chunks) == 1
    assert chunks[0].content == "Bonjour ALTIORA"
    assert chunks[0].chunk_index == 0
    assert chunks[0].char_count == len("Bonjour ALTIORA")


def test_chunker_splits_long_text() -> None:
    chunker = TextChunker(
        max_characters=20,
        overlap_characters=0,
    )

    chunks = chunker.split(
        "un deux trois quatre cinq six sept huit neuf dix"
    )

    assert len(chunks) > 1
    assert all(chunk.char_count <= 20 for chunk in chunks)
    assert [chunk.chunk_index for chunk in chunks] == list(range(len(chunks)))


def test_chunker_applies_overlap() -> None:
    chunker = TextChunker(
        max_characters=20,
        overlap_characters=5,
    )

    chunks = chunker.split(
        "un deux trois quatre cinq six sept huit neuf dix"
    )

    assert len(chunks) > 1

    # Le deuxième chunk doit reprendre une partie de la fin
    # du premier chunk.
    assert chunks[1].content.split()[0] in chunks[0].content.split()


def test_chunker_allows_custom_boundary_patterns() -> None:
    chunker = TextChunker(
        max_characters=100,
        section_boundary_patterns=(r"^SECTION\s+\S",),
    )

    chunks = chunker.split(
        "Introduction\n\n"
        "SECTION A\n\n"
        "Contenu A\n\n"
        "SECTION B\n\n"
        "Contenu B"
    )

    assert len(chunks) == 3
    assert chunks[1].content == "SECTION A\n\nContenu A"
    assert chunks[2].content == "SECTION B\n\nContenu B"


@pytest.mark.parametrize(
    ("max_characters", "overlap_characters"),
    [
        (0, 0),
        (-1, 0),
        (10, -1),
        (10, 10),
        (10, 11),
    ],
)
def test_chunker_rejects_invalid_configuration(
    max_characters: int,
    overlap_characters: int,
) -> None:
    with pytest.raises(ValueError):
        TextChunker(
            max_characters=max_characters,
            overlap_characters=overlap_characters,
        )


def test_chunker_allows_zero_overlap() -> None:
    chunker = TextChunker(
        max_characters=20,
        overlap_characters=0,
    )

    assert chunker._get_text_overlap("un deux trois") == ""


def test_chunker_returns_full_text_when_overlap_is_larger_than_text() -> None:
    chunker = TextChunker(
        max_characters=100,
        overlap_characters=20,
    )

    assert chunker._get_text_overlap("Bonjour") == "Bonjour"


def test_chunker_returns_final_overlap_without_partial_word() -> None:
    chunker = TextChunker(
        max_characters=100,
        overlap_characters=10,
    )

    overlap = chunker._get_text_overlap(
        "un deux trois quatre cinq"
    )

    assert overlap == "quatre cinq"
