import uuid
from datetime import datetime, timedelta, timezone

from sqlalchemy.orm import Session

from app.auth.repository import AuthRepository
from app.auth.schemas import AuthenticatedUser, LoginResponse
from app.auth.security import (
    create_access_token,
    generate_password_reset_token,
    hash_password,
    hash_reset_token,
    verify_password,
)
from app.contacts.email_client import EmailMessage, EmailSender, ResendEmailSender
from app.core.config import get_email_settings, get_jwt_settings
from app.models import PasswordResetToken, User
from app.models.enums import UserRole


class InvalidCredentialsError(ValueError):
    """Raised when login credentials are invalid."""


class InvalidResetTokenError(ValueError):
    """Raised when a password reset token cannot be used."""


class AuthService:
    def __init__(
        self,
        repository: AuthRepository | None = None,
        email_sender: EmailSender | None = None,
    ) -> None:
        self._repository = repository or AuthRepository()
        self._email_sender = email_sender

    def login(self, database: Session, email: str, password: str) -> LoginResponse:
        user = self._repository.get_user_by_email(database, email)
        if user is None or not verify_password(password, user.password_hash):
            raise InvalidCredentialsError("Invalid credentials")

        token = create_access_token(user.id, user.role, get_jwt_settings())
        return LoginResponse(
            access_token=token,
            user=AuthenticatedUser(id=user.id, email=user.email, role=user.role),
        )

    def get_user(self, database: Session, user_id: uuid.UUID) -> User | None:
        return self._repository.get_user_by_id(database, user_id)

    def request_password_reset(self, database: Session, email: str) -> None:
        user = self._repository.get_user_by_email(database, email)
        if user is None:
            return

        settings = get_jwt_settings()
        raw_token = generate_password_reset_token()
        expires_at = datetime.now(timezone.utc) + timedelta(
            minutes=settings.password_reset_expire_minutes
        )
        self._repository.create_reset_token(
            database,
            PasswordResetToken(user_id=user.id, token_hash=hash_reset_token(raw_token), expires_at=expires_at),
        )
        self._get_email_sender().send(
            EmailMessage(
                to=user.email,
                subject="Réinitialisation de votre mot de passe",
                text=(
                    "Une demande de réinitialisation a été reçue.\n\n"
                    f"Jeton de réinitialisation : {raw_token}\n\n"
                    "Si vous n'êtes pas à l'origine de cette demande, ignorez ce message."
                ),
            )
        )

    def confirm_password_reset(self, database: Session, token: str, new_password: str) -> None:
        reset_token = self._repository.get_reset_token(database, hash_reset_token(token))
        now = datetime.now(timezone.utc)
        if reset_token is None or reset_token.used_at is not None or reset_token.expires_at <= now:
            raise InvalidResetTokenError("Invalid reset token")

        user = self._repository.get_user_by_id(database, reset_token.user_id)
        if user is None:
            raise InvalidResetTokenError("Invalid reset token")

        self._repository.update_password_and_mark_token_used(
            database, user, hash_password(new_password), reset_token, now
        )

    def create_initial_admin(self, database: Session, email: str, password: str) -> bool:
        if self._repository.get_user_by_email(database, email) is not None:
            return False

        self._repository.create_user(
            database,
            User(email=email.strip().lower(), password_hash=hash_password(password), role=UserRole.ADMIN),
        )
        return True

    def _get_email_sender(self) -> EmailSender:
        if self._email_sender is not None:
            return self._email_sender

        settings = get_email_settings()
        return ResendEmailSender(settings.api_key, settings.from_email)
