from types import SimpleNamespace

from app.ai.retrieval.context_builder import ContextBuilder


def test_build_empty_chunks_returns_empty_string():
    builder = ContextBuilder()

    result = builder.build([])

    assert result == ""


def test_build_single_chunk():
    builder = ContextBuilder()

    chunk = SimpleNamespace(
        content="Le contenu du document.",
    )

    result = builder.build([chunk])

    assert result == "[Source 1]\nLe contenu du document."


def test_build_multiple_chunks():
    builder = ContextBuilder()

    chunks = [
        SimpleNamespace(content="Premier passage."),
        SimpleNamespace(content="Deuxième passage."),
        SimpleNamespace(content="Troisième passage."),
    ]

    result = builder.build(chunks)

    assert result == (
        "[Source 1]\nPremier passage.\n\n"
        "[Source 2]\nDeuxième passage.\n\n"
        "[Source 3]\nTroisième passage."
    )


def test_build_preserves_chunk_order():
    builder = ContextBuilder()

    chunks = [
        SimpleNamespace(content="Chunk A"),
        SimpleNamespace(content="Chunk B"),
    ]

    result = builder.build(chunks)

    assert result.index("Chunk A") < result.index("Chunk B")