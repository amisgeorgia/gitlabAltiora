from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.contacts.schemas import ContactCreate, ContactResponse
from app.contacts.service import ContactService
from app.db.session import get_db

router = APIRouter(tags=["contact"])
service = ContactService()

DatabaseSession = Annotated[Session, Depends(get_db)]


@router.post(
    "/contact",
    response_model=ContactResponse,
    status_code=status.HTTP_201_CREATED,
)
def submit_contact(contact: ContactCreate, database: DatabaseSession) -> ContactResponse:
    service.submit(database, contact)
    return ContactResponse()
