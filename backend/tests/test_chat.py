import json
import uuid
from collections.abc import Generator

import pytest
from fastapi.testclient import TestClient

from app.chat.ai_client import MockAIClient
from app.chat.router import get_chat_service
from app.chat.service import ChatService
from app.db.session import get_db
from app.main import app
from app.models import Conversation, Message
from app.models.enums import MessageRole

client = TestClient(app)


class FakeSession:
    def __init__(self) -> None:
        self.conversations: list[Conversation] = []
        self.messages: list[Message] = []

    def add(self, model: Conversation | Message) -> None:
        if isinstance(model, Conversation):
            self.conversations.append(model)
        else:
            self.messages.append(model)

    def get(self, model_type: type[Conversation], model_id: uuid.UUID) -> Conversation | None:
        if model_type is not Conversation:
            return None
        return next((conversation for conversation in self.conversations if conversation.id == model_id), None)

    def commit(self) -> None:
        pass

    def refresh(self, model: Conversation | Message) -> None:
        pass


@pytest.fixture(autouse=True)
def fake_session() -> Generator[FakeSession, None, None]:
    session = FakeSession()

    def override_get_db() -> FakeSession:
        return session

    app.dependency_overrides[get_db] = override_get_db

    app.dependency_overrides[get_chat_service] = lambda: ChatService(
        ai_client=MockAIClient()
    )
    yield session
    app.dependency_overrides.clear()


def read_sse_events(response_text: str) -> list[dict[str, object]]:
    events: list[dict[str, object]] = []
    for event in response_text.strip().split("\n\n"):
        data_line = next(line for line in event.splitlines() if line.startswith("data: "))
        events.append(json.loads(data_line.removeprefix("data: ")))
    return events


def test_chat_creates_conversation_and_stores_messages(fake_session: FakeSession) -> None:
    response = client.post("/chat", json={"message": "Bonjour ALTIORA"})

    assert response.status_code == 200
    assert response.headers["content-type"].startswith("text/event-stream")
    assert len(fake_session.conversations) == 1
    assert [message.role for message in fake_session.messages] == [
        MessageRole.USER,
        MessageRole.ASSISTANT,
    ]
    assert fake_session.messages[0].content == "Bonjour ALTIORA"
    assert read_sse_events(response.text)[0]["conversation_id"] == str(fake_session.conversations[0].id)


def test_chat_reuses_an_existing_conversation(fake_session: FakeSession) -> None:
    conversation = Conversation(id=uuid.uuid4())
    fake_session.conversations.append(conversation)

    response = client.post(
        "/chat",
        json={"message": "Pouvez-vous m'aider ?", "conversation_id": str(conversation.id)},
    )

    assert response.status_code == 200
    assert fake_session.conversations == [conversation]
    assert all(message.conversation_id == conversation.id for message in fake_session.messages)


@pytest.mark.parametrize("message", ["", "   "])
def test_chat_rejects_empty_message(message: str) -> None:
    response = client.post("/chat", json={"message": message})

    assert response.status_code == 422


def test_chat_rejects_an_invalid_conversation_id() -> None:
    response = client.post("/chat", json={"message": "Bonjour", "conversation_id": "incorrect"})

    assert response.status_code == 422


def test_chat_streams_a_safe_error_when_the_ai_client_fails() -> None:
    class FailingAIClient:
        def generate_reply(self, message: str) -> str:
            raise RuntimeError("secret provider failure")

    app.dependency_overrides[get_chat_service] = lambda: ChatService(ai_client=FailingAIClient())

    response = client.post("/chat", json={"message": "Bonjour"})

    assert response.status_code == 200
    assert read_sse_events(response.text) == [
        {"message": "Le service de conversation est temporairement indisponible."}
    ]
    assert "secret provider failure" not in response.text
