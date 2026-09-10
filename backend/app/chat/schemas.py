import uuid
from datetime import datetime

from pydantic import BaseModel, Field, field_validator


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4000)
    conversation_id: uuid.UUID | None = None

    @field_validator("message", mode="before")
    @classmethod
    def strip_message(cls, value: str) -> str:
        return value.strip()


class ConversationSummary(BaseModel):
    id: uuid.UUID
    started_at: datetime
    ended_at: datetime | None
    message_count: int


class ConversationPage(BaseModel):
    items: list[ConversationSummary]
    page: int
    page_size: int
    total: int


class ConversationMessage(BaseModel):
    id: uuid.UUID
    role: str
    content: str
    created_at: datetime


class ConversationDetail(BaseModel):
    id: uuid.UUID
    started_at: datetime
    ended_at: datetime | None
    messages: list[ConversationMessage]
