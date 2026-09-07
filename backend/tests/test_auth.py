import uuid
from collections.abc import Generator
from datetime import datetime, timedelta, timezone

import pytest
from fastapi import HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from fastapi.testclient import TestClient

from app.auth.repository import AuthRepository
from app.auth.router import get_auth_service, get_current_user, require_admin_user
from app.auth.schemas import AuthenticatedUser
from app.auth.security import create_access_token, hash_password, verify_password
from app.auth.service import AuthService
from app.contacts.email_client import EmailMessage
from app.core.config import JwtSettings
from app.db.session import get_db
from app.main import app
from app.models import PasswordResetToken, User
from app.models.enums import UserRole

client = TestClient(app)


class FakeRepository(AuthRepository):
    def __init__(self) -> None:
        self.users: list[User] = []
        self.reset_tokens: list[PasswordResetToken] = []

    def get_user_by_email(self, database: object, email: str) -> User | None:
        del database
        return next((user for user in self.users if user.email == email), None)

    def get_user_by_id(self, database: object, user_id: uuid.UUID) -> User | None:
        del database
        return next((user for user in self.users if user.id == user_id), None)

    def create_user(self, database: object, user: User) -> User:
        del database
        self.users.append(user)
        return user

    def create_reset_token(self, database: object, reset_token: PasswordResetToken) -> PasswordResetToken:
        del database
        self.reset_tokens.append(reset_token)
        return reset_token

    def get_reset_token(self, database: object, token_hash: str) -> PasswordResetToken | None:
        del database
        return next((item for item in self.reset_tokens if item.token_hash == token_hash), None)

    def update_password_and_mark_token_used(
        self,
        database: object,
        user: User,
        password_hash: str,
        reset_token: PasswordResetToken,
        used_at: datetime,
    ) -> None:
        del database
        user.password_hash = password_hash
        reset_token.used_at = used_at


class FakeEmailSender:
    def __init__(self) -> None:
        self.messages: list[EmailMessage] = []

    def send(self, message: EmailMessage) -> None:
        self.messages.append(message)


@pytest.fixture(autouse=True)
def auth_dependencies(monkeypatch: pytest.MonkeyPatch) -> Generator[tuple[FakeRepository, FakeEmailSender], None, None]:
    repository = FakeRepository()
    email_sender = FakeEmailSender()
    monkeypatch.setenv("JWT_SECRET_KEY", "test-only-secret-with-at-least-thirty-two-characters")

    def override_database() -> object:
        return object()

    def override_service() -> AuthService:
        return AuthService(repository=repository, email_sender=email_sender)

    app.dependency_overrides[get_db] = override_database
    app.dependency_overrides[get_auth_service] = override_service
    yield repository, email_sender
    app.dependency_overrides.clear()


def create_user(email: str = "admin@example.test", role: UserRole = UserRole.ADMIN) -> User:
    return User(id=uuid.uuid4(), email=email, password_hash=hash_password("password-secure"), role=role)


def test_login_returns_token_and_user(auth_dependencies: tuple[FakeRepository, FakeEmailSender]) -> None:
    repository, _ = auth_dependencies
    user = create_user()
    repository.users.append(user)

    response = client.post("/auth/login", json={"email": user.email, "password": "password-secure"})

    assert response.status_code == 200
    assert response.json()["token_type"] == "Bearer"
    assert response.json()["user"] == {"id": str(user.id), "email": user.email, "role": "admin"}
    assert "password_hash" not in response.text


@pytest.mark.parametrize(
    ("email", "password"),
    [("unknown@example.test", "password-secure"), ("admin@example.test", "incorrect-password")],
)
def test_login_rejects_invalid_credentials(
    auth_dependencies: tuple[FakeRepository, FakeEmailSender], email: str, password: str
) -> None:
    repository, _ = auth_dependencies
    repository.users.append(create_user())

    response = client.post("/auth/login", json={"email": email, "password": password})

    assert response.status_code == 401
    assert response.json() == {"detail": "Identifiants invalides."}


def test_login_returns_503_without_jwt_secret(
    auth_dependencies: tuple[FakeRepository, FakeEmailSender], monkeypatch: pytest.MonkeyPatch
) -> None:
    repository, _ = auth_dependencies
    repository.users.append(create_user())
    monkeypatch.delenv("JWT_SECRET_KEY")

    response = client.post(
        "/auth/login", json={"email": "admin@example.test", "password": "password-secure"}
    )

    assert response.status_code == 503
    assert "secret" not in response.text.lower()


def test_request_password_reset_stores_hash_and_sends_email(
    auth_dependencies: tuple[FakeRepository, FakeEmailSender],
) -> None:
    repository, sender = auth_dependencies
    user = create_user()
    repository.users.append(user)

    response = client.post("/auth/password-reset/request", json={"email": user.email})

    assert response.status_code == 202
    assert len(repository.reset_tokens) == 1
    assert len(repository.reset_tokens[0].token_hash) == 64
    assert len(sender.messages) == 1
    raw_token = sender.messages[0].text.split("Jeton de réinitialisation : ")[1].split("\n")[0]
    assert raw_token != repository.reset_tokens[0].token_hash


def test_request_password_reset_hides_unknown_email(
    auth_dependencies: tuple[FakeRepository, FakeEmailSender],
) -> None:
    repository, sender = auth_dependencies

    response = client.post("/auth/password-reset/request", json={"email": "unknown@example.test"})

    assert response.status_code == 202
    assert repository.reset_tokens == []
    assert sender.messages == []


def test_confirm_password_reset_changes_password_and_marks_token_used(
    auth_dependencies: tuple[FakeRepository, FakeEmailSender],
) -> None:
    repository, sender = auth_dependencies
    user = create_user()
    repository.users.append(user)
    client.post("/auth/password-reset/request", json={"email": user.email})
    raw_token = sender.messages[0].text.split("Jeton de réinitialisation : ")[1].split("\n")[0]

    response = client.post(
        "/auth/password-reset/confirm", json={"token": raw_token, "new_password": "new-secure-password"}
    )

    assert response.status_code == 200
    assert verify_password("new-secure-password", user.password_hash)
    assert repository.reset_tokens[0].used_at is not None


def test_confirm_password_reset_rejects_expired_or_used_token(
    auth_dependencies: tuple[FakeRepository, FakeEmailSender],
) -> None:
    repository, _ = auth_dependencies
    user = create_user()
    repository.users.append(user)
    repository.reset_tokens.append(
        PasswordResetToken(
            user_id=user.id,
            token_hash="a" * 64,
            expires_at=datetime.now(timezone.utc) - timedelta(minutes=1),
        )
    )

    response = client.post(
        "/auth/password-reset/confirm", json={"token": "expired-token", "new_password": "new-secure-password"}
    )

    assert response.status_code == 400
    assert response.json() == {"detail": "Jeton de réinitialisation invalide ou expiré."}


def test_admin_dependency_rejects_editor() -> None:
    editor = AuthenticatedUser(id=uuid.uuid4(), email="editor@example.test", role=UserRole.EDITOR)

    with pytest.raises(HTTPException, match="403"):
        require_admin_user(editor)


def test_admin_dependency_accepts_admin() -> None:
    admin = AuthenticatedUser(id=uuid.uuid4(), email="admin@example.test", role=UserRole.ADMIN)

    assert require_admin_user(admin) is admin


def test_current_user_rejects_missing_and_invalid_tokens(
    auth_dependencies: tuple[FakeRepository, FakeEmailSender],
) -> None:
    repository, sender = auth_dependencies
    service = AuthService(repository=repository, email_sender=sender)

    with pytest.raises(HTTPException, match="401"):
        get_current_user(object(), service, None)

    with pytest.raises(HTTPException, match="401"):
        get_current_user(
            object(), service, HTTPAuthorizationCredentials(scheme="Bearer", credentials="invalid")
        )


def test_current_user_rejects_expired_token(
    auth_dependencies: tuple[FakeRepository, FakeEmailSender],
) -> None:
    repository, sender = auth_dependencies
    user = create_user()
    repository.users.append(user)
    service = AuthService(repository=repository, email_sender=sender)
    expired_token = create_access_token(
        user.id,
        UserRole.ADMIN,
        JwtSettings("test-only-secret-with-at-least-thirty-two-characters", -1, 30),
    )

    with pytest.raises(HTTPException, match="401"):
        get_current_user(
            object(),
            service,
            HTTPAuthorizationCredentials(scheme="Bearer", credentials=expired_token),
        )


def test_access_token_is_signed_and_expires() -> None:
    token = create_access_token(
        uuid.uuid4(), UserRole.ADMIN, JwtSettings("test-only-secret-with-at-least-thirty-two-characters", 60, 30)
    )

    assert token.count(".") == 2


def test_seed_creates_one_administrator(auth_dependencies: tuple[FakeRepository, FakeEmailSender]) -> None:
    repository, sender = auth_dependencies
    service = AuthService(repository=repository, email_sender=sender)

    assert service.create_initial_admin(object(), "admin@example.test", "password-secure")
    assert not service.create_initial_admin(object(), "admin@example.test", "password-secure")
    assert repository.users[0].role is UserRole.ADMIN
    assert verify_password("password-secure", repository.users[0].password_hash)
