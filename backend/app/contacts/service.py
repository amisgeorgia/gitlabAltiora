from sqlalchemy.orm import Session

from app.contacts.repository import ContactRepository
from app.contacts.schemas import ContactCreate


class ContactService:
    def __init__(self, repository: ContactRepository | None = None) -> None:
        self._repository = repository or ContactRepository()

    def submit(self, database: Session, contact: ContactCreate) -> None:
        if contact.website:
            return

        self._repository.create(database, contact)
