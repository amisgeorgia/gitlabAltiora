from app.ai.embeddings.embedding_service import VoyageEmbeddingService
def main() -> None:
    service = VoyageEmbeddingService()

    text = (
        "ALTIORA CONNECT est une plateforme intégrant "
        "un chatbot basé sur un système RAG."
    )
    embedding = service.embed_documents([text])[0]
    print("Voyage AI embedding test")
    print(f"Model     : {service.model}")
    print(f"Dimension : {len(embedding)}")
    print(f"First 5   : {embedding[:5]}")
if __name__ == "__main__":
    main()