from sqlalchemy.orm import Session

from app.contacts.notification_service import ContactNotificationService
from app.contacts.repository import ContactRepository
from app.contacts.schemas import ContactCreate
from app.models import ContactRequest


class ContactService:
    def __init__(
        self,
        repository: ContactRepository | None = None,
        notification_service: ContactNotificationService | None = None,
    ) -> None:
        self._repository = repository or ContactRepository()
        self._notification_service = notification_service

    def submit(self, database: Session, contact: ContactCreate) -> ContactRequest | None:
        if contact.website:
            return None

        contact_request = self._repository.create(database, contact)
        if self._notification_service:
            self._notification_service.send_notifications(contact, contact_request.created_at)

        return contact_request
