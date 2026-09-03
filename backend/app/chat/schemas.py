import uuid

from pydantic import BaseModel, Field, field_validator


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4000)
    conversation_id: uuid.UUID | None = None

    @field_validator("message", mode="before")
    @classmethod
    def strip_message(cls, value: str) -> str:
        return value.strip()
