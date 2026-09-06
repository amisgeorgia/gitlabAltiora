from unittest.mock import Mock, patch

import pytest

from app.ai.embeddings.embedding_service import VoyageEmbeddingService


def create_service(dimension=3):
    with patch(
        "app.ai.embeddings.embedding_service.Client"
    ) as client_class:
        client = client_class.return_value

        with patch(
            "app.ai.embeddings.embedding_service.get_voyage_api_key",
            return_value="fake-api-key",
        ), patch(
            "app.ai.embeddings.embedding_service.get_embedding_model",
            return_value="voyage-test-model",
        ), patch(
            "app.ai.embeddings.embedding_service.get_embedding_dimension",
            return_value=dimension,
        ):
            service = VoyageEmbeddingService()

    return service, client


def test_init_loads_configuration():
    service, client = create_service(dimension=3)

    assert service.client is client
    assert service.model == "voyage-test-model"
    assert service.dimension == 3


def test_init_rejects_non_positive_dimension():
    with patch(
        "app.ai.embeddings.embedding_service.Client",
    ), patch(
        "app.ai.embeddings.embedding_service.get_voyage_api_key",
        return_value="fake-api-key",
    ), patch(
        "app.ai.embeddings.embedding_service.get_embedding_model",
        return_value="voyage-test-model",
    ), patch(
        "app.ai.embeddings.embedding_service.get_embedding_dimension",
        return_value=0,
    ):
        with pytest.raises(
            ValueError,
            match="EMBEDDING_DIMENSION doit être positive",
        ):
            VoyageEmbeddingService()


def test_init_raises_when_client_is_falsy():
    with patch(
        "app.ai.embeddings.embedding_service.Client",
        return_value=None,
    ), patch(
        "app.ai.embeddings.embedding_service.get_voyage_api_key",
        return_value="fake-api-key",
    ), patch(
        "app.ai.embeddings.embedding_service.get_embedding_model",
        return_value="voyage-test-model",
    ), patch(
        "app.ai.embeddings.embedding_service.get_embedding_dimension",
        return_value=3,
    ):
        with pytest.raises(
            RuntimeError,
            match="voyage_api_key est absente",
        ):
            VoyageEmbeddingService()


def test_embed_documents_returns_empty_list_for_empty_input():
    service, client = create_service()

    result = service.embed_documents([])

    assert result == []
    client.embed.assert_not_called()


def test_embed_documents_calls_voyage_with_expected_parameters():
    service, client = create_service(dimension=3)

    response = Mock()
    response.embeddings = [
        [0.1, 0.2, 0.3],
        [0.4, 0.5, 0.6],
    ]
    client.embed.return_value = response

    texts = [
        "Premier document",
        "Deuxième document",
    ]

    result = service.embed_documents(texts)

    assert result == response.embeddings

    client.embed.assert_called_once_with(
        texts,
        model="voyage-test-model",
        input_type="document",
        output_dimension=3,
        output_dtype="float",
    )


def test_embed_documents_rejects_invalid_dimension():
    service, client = create_service(dimension=3)

    response = Mock()
    response.embeddings = [
        [0.1, 0.2],
    ]
    client.embed.return_value = response

    with pytest.raises(
        ValueError,
        match="Invalid embedding dimension",
    ):
        service.embed_documents(["Document"])


def test_embed_query_rejects_empty_text():
    service, client = create_service()

    with pytest.raises(
        ValueError,
        match="Query text must not be empty",
    ):
        service.embed_query("")

    client.embed.assert_not_called()


def test_embed_query_rejects_whitespace_text():
    service, client = create_service()

    with pytest.raises(
        ValueError,
        match="Query text must not be empty",
    ):
        service.embed_query("   ")

    client.embed.assert_not_called()


def test_embed_query_calls_voyage_with_expected_parameters():
    service, client = create_service(dimension=3)

    response = Mock()
    response.embeddings = [
        [0.1, 0.2, 0.3],
    ]
    client.embed.return_value = response

    result = service.embed_query("Quelle est la politique ALTIORA ?")

    assert result == [0.1, 0.2, 0.3]

    client.embed.assert_called_once_with(
        ["Quelle est la politique ALTIORA ?"],
        model="voyage-test-model",
        input_type="query",
        output_dimension=3,
        output_dtype="float",
    )


def test_embed_query_rejects_invalid_dimension():
    service, client = create_service(dimension=3)

    response = Mock()
    response.embeddings = [
        [0.1, 0.2],
    ]
    client.embed.return_value = response

    with pytest.raises(
        ValueError,
        match="Invalid embedding dimension",
    ):
        service.embed_query("Question")


def test_validate_dimensions_accepts_correct_dimensions():
    service, _ = create_service(dimension=3)

    service._validate_dimensions(
        [
            [0.1, 0.2, 0.3],
            [0.4, 0.5, 0.6],
        ]
    )


def test_validate_dimensions_accepts_empty_embeddings():
    service, _ = create_service(dimension=3)

    service._validate_dimensions([])


def test_validate_dimensions_rejects_wrong_dimension():
    service, _ = create_service(dimension=3)

    with pytest.raises(
        ValueError,
        match="expected 3, got 2",
    ):
        service._validate_dimensions(
            [[0.1, 0.2]]
        )
