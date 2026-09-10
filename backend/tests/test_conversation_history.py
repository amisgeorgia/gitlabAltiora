import uuid
from collections.abc import Generator
from datetime import datetime, timedelta, timezone

import pytest
from fastapi.testclient import TestClient

from app.auth.router import get_auth_service
from app.auth.schemas import AuthenticatedUser
from app.auth.security import create_access_token
from app.auth.service import AuthService
from app.chat.history_router import get_history_service
from app.chat.schemas import (
    ConversationDetail,
    ConversationMessage,
    ConversationPage,
    ConversationSummary,
)
from app.core.config import JwtSettings
from app.db.session import get_db
from app.main import app
from app.models.enums import MessageRole, UserRole

client = TestClient(app)
_jwt_settings = JwtSettings("test-only-secret-with-at-least-thirty-two-characters", 60, 30)


class FakeAuthRepository:
    def __init__(self, users: dict[uuid.UUID, AuthenticatedUser]) -> None:
        self._users = users

    def get_user_by_id(self, database: object, user_id: uuid.UUID) -> AuthenticatedUser | None:
        del database
        return self._users.get(user_id)


class FakeHistoryService:
    def __init__(self, page: ConversationPage, details: dict[uuid.UUID, ConversationDetail]) -> None:
        self.page = page
        self.details = details
        self.page_requests: list[tuple[int, int]] = []

    def list_conversations(self, database: object, page: int, page_size: int) -> ConversationPage:
        del database
        self.page_requests.append((page, page_size))
        return self.page

    def get_conversation(
        self, database: object, conversation_id: uuid.UUID
    ) -> ConversationDetail | None:
        del database
        return self.details.get(conversation_id)


def authenticated_user(role: UserRole) -> AuthenticatedUser:
    return AuthenticatedUser(id=uuid.uuid4(), email=f"{role.value}@example.test", role=role)


def authorization(user: AuthenticatedUser) -> dict[str, str]:
    token = create_access_token(user.id, user.role, _jwt_settings)
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture(autouse=True)
def history_dependencies(monkeypatch: pytest.MonkeyPatch) -> Generator[FakeHistoryService, None, None]:
    admin = authenticated_user(UserRole.ADMIN)
    editor = authenticated_user(UserRole.EDITOR)
    now = datetime.now(timezone.utc)
    newest_id = uuid.uuid4()
    oldest_id = uuid.uuid4()
    page = ConversationPage(
        items=[
            ConversationSummary(id=newest_id, started_at=now, ended_at=None, message_count=2),
            ConversationSummary(
                id=oldest_id,
                started_at=now - timedelta(days=1),
                ended_at=None,
                message_count=1,
            ),
        ],
        page=1,
        page_size=20,
        total=2,
    )
    detail = ConversationDetail(
        id=newest_id,
        started_at=now,
        ended_at=None,
        messages=[
            ConversationMessage(
                id=uuid.uuid4(),
                role=MessageRole.USER.value,
                content="Bonjour",
                created_at=now,
            ),
            ConversationMessage(
                id=uuid.uuid4(),
                role=MessageRole.ASSISTANT.value,
                content="Bonjour, comment puis-je vous aider ?",
                created_at=now + timedelta(seconds=1),
            ),
        ],
    )
    history_service = FakeHistoryService(page, {newest_id: detail})
    auth_service = AuthService(repository=FakeAuthRepository({admin.id: admin, editor.id: editor}))

    monkeypatch.setenv("JWT_SECRET_KEY", _jwt_settings.secret_key)
    app.dependency_overrides[get_db] = lambda: object()
    app.dependency_overrides[get_auth_service] = lambda: auth_service
    app.dependency_overrides[get_history_service] = lambda: history_service
    history_service.admin = admin
    history_service.editor = editor
    history_service.conversation_id = newest_id
    yield history_service
    app.dependency_overrides.clear()


def test_admin_can_list_conversations_with_pagination(history_dependencies: FakeHistoryService) -> None:
    response = client.get(
        "/admin/conversations?page=1&page_size=20",
        headers=authorization(history_dependencies.admin),
    )

    assert response.status_code == 200
    assert response.json()["total"] == 2
    assert response.json()["items"][0]["id"] == str(history_dependencies.conversation_id)
    assert history_dependencies.page_requests == [(1, 20)]


def test_conversations_are_ordered_most_recent_first(history_dependencies: FakeHistoryService) -> None:
    response = client.get("/admin/conversations", headers=authorization(history_dependencies.admin))

    started_at = [item["started_at"] for item in response.json()["items"]]
    assert started_at == sorted(started_at, reverse=True)


def test_conversation_pagination_validation(history_dependencies: FakeHistoryService) -> None:
    response = client.get(
        "/admin/conversations?page=2&page_size=10",
        headers=authorization(history_dependencies.admin),
    )
    invalid_response = client.get(
        "/admin/conversations?page=0", headers=authorization(history_dependencies.admin)
    )

    assert response.status_code == 200
    assert history_dependencies.page_requests == [(2, 10)]
    assert invalid_response.status_code == 422


def test_admin_can_read_conversation_messages_in_chronological_order(
    history_dependencies: FakeHistoryService,
) -> None:
    response = client.get(
        f"/admin/conversations/{history_dependencies.conversation_id}",
        headers=authorization(history_dependencies.admin),
    )

    assert response.status_code == 200
    created_at = [message["created_at"] for message in response.json()["messages"]]
    assert created_at == sorted(created_at)
    assert [message["role"] for message in response.json()["messages"]] == ["user", "assistant"]


def test_unknown_conversation_returns_not_found(history_dependencies: FakeHistoryService) -> None:
    response = client.get(
        f"/admin/conversations/{uuid.uuid4()}", headers=authorization(history_dependencies.admin)
    )

    assert response.status_code == 404


def test_history_requires_jwt() -> None:
    response = client.get("/admin/conversations")

    assert response.status_code == 401


def test_history_rejects_editor(history_dependencies: FakeHistoryService) -> None:
    response = client.get("/admin/conversations", headers=authorization(history_dependencies.editor))

    assert response.status_code == 403
