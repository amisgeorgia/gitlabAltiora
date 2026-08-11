import uuid

from sqlalchemy.orm import Session

from app.models import Conversation, Message
from app.models.enums import MessageRole


class ChatRepository:
    """Persistence operations for conversations and their messages."""

    def create_conversation(self, database: Session) -> Conversation:
        conversation = Conversation()
        database.add(conversation)
        database.commit()
        database.refresh(conversation)
        return conversation

    def get_conversation(self, database: Session, conversation_id: uuid.UUID) -> Conversation | None:
        return database.get(Conversation, conversation_id)

    def create_message(
        self,
        database: Session,
        conversation_id: uuid.UUID,
        role: MessageRole,
        content: str,
    ) -> Message:
        message = Message(conversation_id=conversation_id, role=role, content=content)
        database.add(message)
        database.commit()
        database.refresh(message)
        return message
