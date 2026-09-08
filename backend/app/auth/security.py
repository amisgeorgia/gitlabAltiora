import hashlib
import secrets
import uuid
from datetime import datetime, timedelta, timezone

import jwt
from pwdlib import PasswordHash

from app.core.config import JwtSettings
from app.models.enums import UserRole

_password_hash = PasswordHash.recommended()


class InvalidTokenError(ValueError):
    """Raised when a bearer token cannot be trusted."""


def hash_password(password: str) -> str:
    return _password_hash.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    return _password_hash.verify(password, password_hash)


def create_access_token(user_id: uuid.UUID, role: UserRole, settings: JwtSettings) -> str:
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=settings.access_token_expire_minutes)
    return jwt.encode(
        {"sub": str(user_id), "role": role.value, "exp": expires_at},
        settings.secret_key,
        algorithm="HS256",
    )


def decode_access_token(token: str, settings: JwtSettings) -> uuid.UUID:
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=["HS256"])
        return uuid.UUID(str(payload["sub"]))
    except (jwt.InvalidTokenError, KeyError, ValueError) as error:
        raise InvalidTokenError("Invalid access token") from error


def generate_password_reset_token() -> str:
    return secrets.token_urlsafe(32)


def hash_reset_token(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()
