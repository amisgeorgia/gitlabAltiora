from loguru import logger

from app.ai.ingestion.chunker import TextChunker

TEXT = """
ALTIORA PREST propose plusieurs services.

La formation est importante pour les entreprises.

Le conseil permet d'améliorer les décisions.

L'entreprise propose également du développement logiciel.

""".strip()


def main() -> None:
    logger.info("TEST CHUNKER")

    chunker = TextChunker(
        max_characters=800,
        overlap_characters=100,
    )

    chunks = chunker.split(TEXT)

    if not chunks:
        raise RuntimeError("Le chunker n'a produit aucun chunk.")

    print(f"\nNombre de chunks : {len(chunks)}")

    for expected_index, chunk in enumerate(chunks):
        print("\n" + "=" * 70)
        print(f"Chunk #{chunk.chunk_index}")
        print(f"Taille : {len(chunk.content)} caractères")
        print("=" * 70)
        print(chunk.content)

        # Vérification de l'index.
        if chunk.chunk_index != expected_index:
            raise AssertionError(
                f"Index incorrect : attendu {expected_index}, "
                f"obtenu {chunk.chunk_index}"
            )

        # Vérification du contenu.
        if not chunk.content.strip():
            raise AssertionError(
                f"Le chunk #{chunk.chunk_index} est vide."
            )

        # Vérification de la taille.
        if len(chunk.content) > chunker.max_characters:
            raise AssertionError(
                f"Le chunk #{chunk.chunk_index} dépasse la limite : "
                f"{len(chunk.content)} > {chunker.max_characters}"
            )

    print("\n" + "=" * 70)
    print("VÉRIFICATIONS")
    print("=" * 70)

    logger.success("TEST CHUNKER RÉUSSI")

if __name__ == "__main__":
    main()
