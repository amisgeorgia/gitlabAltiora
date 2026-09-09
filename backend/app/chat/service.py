import json
from collections.abc import Iterator

from sqlalchemy.orm import Session

from app.chat.ai_client import AIClient, RAGChatClient
from app.chat.repository import ChatRepository
from app.chat.schemas import ChatRequest
from app.models.enums import MessageRole


class ChatService:
    """Coordinates persistence and an injectable conversational AI client."""
    def __init__(
        self,
        repository: ChatRepository | None = None,
        ai_client: AIClient | None = None,
    ) -> None:
        self._repository = repository or ChatRepository()
        self._ai_client = ai_client or RAGChatClient()
    def stream_reply(self, database: Session, request: ChatRequest) -> Iterator[str]:
        conversation = self._get_or_create_conversation(database, request)
        self._repository.create_message(database, conversation.id, MessageRole.USER, request.message)
        try:
            assistant_reply = self._ai_client.generate_reply(request.message)
            self._repository.create_message(
                database,
                conversation.id,
                MessageRole.ASSISTANT,
                assistant_reply,
            )
            yield self._sse_event(
                "message",
                {
                    "conversation_id": str(conversation.id),
                    "message": assistant_reply,
                },
            )
            yield self._sse_event("done", {"conversation_id": str(conversation.id)})
        except Exception:
            yield self._sse_event(
                "error",
                {"message": "Le service de conversation est temporairement indisponible."},
            )

    def _get_or_create_conversation(self, database: Session, request: ChatRequest):
        if request.conversation_id is None:
            return self._repository.create_conversation(database)

        conversation = self._repository.get_conversation(database, request.conversation_id)
        if conversation is None:
            raise ValueError("Conversation inconnue")
        return conversation

    @staticmethod
    def _sse_event(event: str, data: dict[str, str]) -> str:
        payload = json.dumps(data, ensure_ascii=False)
        return f"event: {event}\ndata: {payload}\n\n"
