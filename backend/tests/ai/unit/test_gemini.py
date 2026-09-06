from unittest.mock import Mock, patch

import pytest

from app.ai.llm.gemini import GeminiLLM


def test_gemini_llm_uses_provided_configuration():
    with patch(
        "app.ai.llm.gemini.genai.Client"
    ) as client_mock:
        llm = GeminiLLM(
            api_key="test-api-key",
            model="test-model",
        )

    assert llm.api_key == "test-api-key"
    assert llm.model == "test-model"
    client_mock.assert_called_once_with(
        api_key="test-api-key",
    )


def test_gemini_llm_uses_configuration_from_environment():
    with patch(
        "app.ai.llm.gemini.get_gemini_api_key",
        return_value="env-api-key",
    ) as api_key_mock, patch(
        "app.ai.llm.gemini.get_gemini_model",
        return_value="env-model",
    ) as model_mock, patch(
        "app.ai.llm.gemini.genai.Client"
    ) as client_mock:
        llm = GeminiLLM()

    assert llm.api_key == "env-api-key"
    assert llm.model == "env-model"

    api_key_mock.assert_called_once()
    model_mock.assert_called_once()
    client_mock.assert_called_once_with(
        api_key="env-api-key",
    )


def test_generate_rejects_empty_prompt():
    llm = GeminiLLM(
        api_key="test-api-key",
        model="test-model",
    )

    with pytest.raises(
        ValueError,
        match="Le prompt ne peut pas être vide",
    ):
        llm.generate("")


def test_generate_rejects_whitespace_prompt():
    llm = GeminiLLM(
        api_key="test-api-key",
        model="test-model",
    )

    with pytest.raises(
        ValueError,
        match="Le prompt ne peut pas être vide",
    ):
        llm.generate("   ")


def test_generate_returns_gemini_response():
    llm = GeminiLLM(
        api_key="test-api-key",
        model="test-model",
    )

    response = Mock()
    response.text = "  Réponse Gemini  "

    llm.client.models.generate_content = Mock(
        return_value=response
    )

    result = llm.generate("Bonjour")

    assert result == "Réponse Gemini"

    llm.client.models.generate_content.assert_called_once_with(
        model="test-model",
        contents="Bonjour",
    )


def test_generate_raises_when_gemini_returns_empty_response():
    llm = GeminiLLM(
        api_key="test-api-key",
        model="test-model",
    )

    response = Mock()
    response.text = ""

    llm.client.models.generate_content = Mock(
        return_value=response
    )

    with pytest.raises(
        RuntimeError,
        match="Gemini n'a retourné aucune réponse",
    ):
        llm.generate("Bonjour")


def test_generate_raises_when_gemini_returns_none():
    llm = GeminiLLM(
        api_key="test-api-key",
        model="test-model",
    )

    response = Mock()
    response.text = None

    llm.client.models.generate_content = Mock(
        return_value=response
    )

    with pytest.raises(
        RuntimeError,
        match="Gemini n'a retourné aucune réponse",
    ):
        llm.generate("Bonjour")
