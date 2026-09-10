import uuid

from sqlalchemy.orm import Session

from app.chat.repository import ChatRepository
from app.chat.schemas import (
    ConversationDetail,
    ConversationMessage,
    ConversationPage,
    ConversationSummary,
)


class ConversationHistoryService:
    """Provides read-only administrative access to conversation history."""

    def __init__(self, repository: ChatRepository | None = None) -> None:
        self._repository = repository or ChatRepository()

    def list_conversations(self, database: Session, page: int, page_size: int) -> ConversationPage:
        rows, total = self._repository.list_conversations(database, (page - 1) * page_size, page_size)
        return ConversationPage(
            items=[
                ConversationSummary(
                    id=conversation.id,
                    started_at=conversation.started_at,
                    ended_at=conversation.ended_at,
                    message_count=message_count,
                )
                for conversation, message_count in rows
            ],
            page=page,
            page_size=page_size,
            total=total,
        )

    def get_conversation(self, database: Session, conversation_id: uuid.UUID) -> ConversationDetail | None:
        result = self._repository.get_conversation_with_messages(database, conversation_id)
        if result is None:
            return None

        conversation, messages = result
        return ConversationDetail(
            id=conversation.id,
            started_at=conversation.started_at,
            ended_at=conversation.ended_at,
            messages=[
                ConversationMessage(
                    id=message.id,
                    role=message.role.value,
                    content=message.content,
                    created_at=message.created_at,
                )
                for message in messages
            ],
        )
