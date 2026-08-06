from sqlalchemy.orm import Session

from app.contacts.schemas import ContactCreate
from app.models import ContactRequest


class ContactRepository:
    def create(self, database: Session, contact: ContactCreate) -> ContactRequest:
        contact_request = ContactRequest(
            name=f"{contact.first_name} {contact.last_name}",
            email=contact.email,
            phone=contact.phone,
            subject=contact.subject,
            message=contact.message,
        )
        database.add(contact_request)
        database.commit()
        database.refresh(contact_request)
        return contact_request
