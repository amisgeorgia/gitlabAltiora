import re
from enum import Enum

from pydantic import BaseModel, Field, field_validator


class ProspectSubject(str, Enum):
    FORMATION = "formation"
    CONSEIL = "conseil"
    BPO = "bpo"
    DEVELOPPEMENT = "developpement"
    AUTRE = "autre"


class ContactCreate(BaseModel):
    first_name: str = Field(min_length=2, max_length=255)
    last_name: str = Field(min_length=2, max_length=255)
    email: str = Field(max_length=255)
    phone: str | None = Field(default=None, max_length=50)
    subject: ProspectSubject
    message: str = Field(min_length=10, max_length=2000)
    website: str | None = Field(default=None, max_length=255)

    @field_validator("first_name", "last_name", "message", mode="before")
    @classmethod
    def strip_required_values(cls, value: str) -> str:
        return value.strip()

    @field_validator("phone", "website", mode="before")
    @classmethod
    def strip_optional_values(cls, value: str | None) -> str | None:
        return value.strip() if value is not None else None

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        normalized_value = value.strip().lower()
        if not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", normalized_value):
            raise ValueError("Adresse e-mail invalide")
        return normalized_value


class ContactResponse(BaseModel):
    message: str = "Votre demande a été envoyée."
