from google import genai
from google.genai import errors

from app.ai.llm.base import LLMProvider
from app.core.config import get_gemini_api_key, get_gemini_model


class GeminiLLM(LLMProvider):
    """Fournisseur LLM utilisant Gemini."""
    def __init__(
        self,
        api_key: str | None = None,
        model: str | None = None,
    ) -> None:
        self.api_key = api_key or get_gemini_api_key()
        self.model = model or get_gemini_model()

        self.client = genai.Client(api_key=self.api_key)

    def generate(self, prompt: str) -> str:
        """Génère une réponse à partir du prompt."""

        if not prompt or not prompt.strip():
            raise ValueError("Le prompt ne peut pas être vide.")

        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
            )

        except errors.ClientError as exc:
            if exc.code == 429:
                raise RuntimeError(
                    "Le quota Gemini a été atteint. "
                    "Veuillez réessayer plus tard ou vérifier "
                    "les limites et la facturation de l'API Gemini."
                ) from exc

            raise

        if not response.text:
            raise RuntimeError(
                "Gemini n'a retourné aucune réponse."
            )

        return response.text.strip()
