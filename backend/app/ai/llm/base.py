from abc import ABC, abstractmethod


class LLMProvider(ABC):
    """Interface commune pour les fournisseurs de modèles de langage."""

    @abstractmethod
    def generate(self, prompt: str) -> str:
        """Génère une réponse à partir d'un prompt."""
        raise NotImplementedError
