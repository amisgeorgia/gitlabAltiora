import uuid

from sqlalchemy import func, select
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

    def list_conversations(
        self, database: Session, offset: int, limit: int
    ) -> tuple[list[tuple[Conversation, int]], int]:
        message_count = func.count(Message.id).label("message_count")
        statement = (
            select(Conversation, message_count)
            .outerjoin(Message, Message.conversation_id == Conversation.id)
            .group_by(Conversation.id)
            .order_by(Conversation.started_at.desc())
            .offset(offset)
            .limit(limit)
        )
        rows = list(database.execute(statement).all())
        total = database.scalar(select(func.count()).select_from(Conversation)) or 0
        return rows, total

    def get_conversation_with_messages(
        self, database: Session, conversation_id: uuid.UUID
    ) -> tuple[Conversation, list[Message]] | None:
        conversation = self.get_conversation(database, conversation_id)
        if conversation is None:
            return None

        statement = (
            select(Message)
            .where(Message.conversation_id == conversation_id)
            .order_by(Message.created_at.asc())
        )
        return conversation, list(database.scalars(statement).all())
