from abc import ABC, abstractmethod
from typing import Any


class VectorStore(ABC):
    """Interface commune pour les systèmes de stockage vectoriel."""

    @abstractmethod
    def add(self, item: Any) -> Any:
        """Ajoute un élément dans le stockage vectoriel."""
        raise NotImplementedError

    @abstractmethod
    def search(
        self,
        embedding: list[float],
        top_k: int = 5,
    ) -> list[Any]:
        """Recherche les éléments les plus proches d'un vecteur."""
        raise NotImplementedError

    @abstractmethod
    def delete(self, item_id: Any) -> None:
        """Supprime un élément du stockage vectoriel."""
        raise NotImplementedError
