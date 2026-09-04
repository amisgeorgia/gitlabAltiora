from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.contacts.email_client import EmailDeliveryError, ResendEmailSender, UnavailableEmailSender
from app.contacts.notification_service import ContactNotificationService
from app.contacts.schemas import ContactCreate, ContactResponse
from app.contacts.service import ContactService
from app.core.config import EmailConfigurationError, get_email_settings
from app.db.session import get_db

router = APIRouter(tags=["contact"])
DatabaseSession = Annotated[Session, Depends(get_db)]


def get_contact_service() -> ContactService:
    try:
        settings = get_email_settings()
    except EmailConfigurationError:
        notifier = ContactNotificationService(UnavailableEmailSender(), "")
    else:
        sender = ResendEmailSender(settings.api_key, settings.from_email)
        notifier = ContactNotificationService(sender, settings.internal_to)
    return ContactService(notification_service=notifier)


ContactServiceDependency = Annotated[ContactService, Depends(get_contact_service)]


@router.post(
    "/contact",
    response_model=ContactResponse,
    status_code=status.HTTP_201_CREATED,
)
def submit_contact(
    contact: ContactCreate,
    database: DatabaseSession,
    contact_service: ContactServiceDependency,
) -> ContactResponse:
    try:
        contact_service.submit(database, contact)
    except (EmailConfigurationError, EmailDeliveryError) as error:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Le service e-mail est temporairement indisponible.",
        ) from error

    return ContactResponse()
