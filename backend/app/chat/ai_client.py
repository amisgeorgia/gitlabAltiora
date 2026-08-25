from typing import Protocol


class AIClient(Protocol):
    """Contract for a future external conversational AI client."""

    def generate_reply(self, message: str) -> str:
        """Return one assistant reply for a user message."""


class MockAIClient:
    """Deterministic local client used until an external provider is integrated."""

    def generate_reply(self, message: str) -> str:
        return f"Réponse simulée ALTIORA : {message}"
