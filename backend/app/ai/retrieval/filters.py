from dataclasses import dataclass
from uuid import UUID


@dataclass
class RetrievalFilters:
    """Filtres facultatifs utilisés lors d'une recherche."""

    document_id: UUID | None = None
    status: str | None = None
