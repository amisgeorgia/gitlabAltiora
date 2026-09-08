import uuid

from pydantic import BaseModel, Field, field_validator

from app.models.enums import UserRole


class LoginRequest(BaseModel):
    email: str = Field(max_length=255)
    password: str = Field(min_length=8, max_length=128)

    @field_validator("email", mode="before")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        return value.strip().lower()


class AuthenticatedUser(BaseModel):
    id: uuid.UUID
    email: str
    role: UserRole


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "Bearer"
    user: AuthenticatedUser


class PasswordResetRequest(BaseModel):
    email: str = Field(max_length=255)

    @field_validator("email", mode="before")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        return value.strip().lower()


class PasswordResetConfirm(BaseModel):
    token: str = Field(min_length=1, max_length=512)
    new_password: str = Field(min_length=8, max_length=128)


class MessageResponse(BaseModel):
    message: str
