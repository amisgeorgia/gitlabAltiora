import os
from dataclasses import dataclass


class EmailConfigurationError(RuntimeError):
    """Raised when required email environment variables are absent."""


@dataclass(frozen=True)
class EmailSettings:
    api_key: str
    from_email: str
    internal_to: str


class AuthConfigurationError(RuntimeError):
    """Raised when required authentication settings are absent."""


class QrConfigurationError(RuntimeError):
    """Raised when required QR settings are absent."""


@dataclass(frozen=True)
class JwtSettings:
    secret_key: str
    access_token_expire_minutes: int
    password_reset_expire_minutes: int


@dataclass(frozen=True)
class QrSettings:
    redirect_base_url: str


def get_database_url() -> str:
    """Return the synchronous SQLAlchemy URL from the environment."""
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        raise RuntimeError("DATABASE_URL must be configured")

    if database_url.startswith("postgresql://"):
        return database_url.replace("postgresql://", "postgresql+psycopg://", 1)

    return database_url


def get_email_settings() -> EmailSettings:
    api_key = os.getenv("EMAIL_API_KEY")
    from_email = os.getenv("EMAIL_FROM")
    internal_to = os.getenv("EMAIL_INTERNAL_TO")

    if not all((api_key, from_email, internal_to)):
        raise EmailConfigurationError("Email settings must be configured")

    return EmailSettings(api_key=api_key, from_email=from_email, internal_to=internal_to)


def get_jwt_settings() -> JwtSettings:
    secret_key = os.getenv("JWT_SECRET_KEY")
    if not secret_key:
        raise AuthConfigurationError("JWT secret must be configured")

    return JwtSettings(
        secret_key=secret_key,
        access_token_expire_minutes=int(os.getenv("JWT_ACCESS_TOKEN_EXPIRE_MINUTES", "60")),
        password_reset_expire_minutes=int(os.getenv("PASSWORD_RESET_EXPIRE_MINUTES", "30")),
    )


def get_qr_settings() -> QrSettings:
    redirect_base_url = os.getenv("QR_REDIRECT_BASE_URL")
    if not redirect_base_url:
        raise QrConfigurationError("QR redirect base URL must be configured")

    return QrSettings(redirect_base_url=redirect_base_url.rstrip("/"))


def get_voyage_api_key() -> str:
    """Return the Voyage AI API key from the environment."""
    api_key = os.getenv("VOYAGE_API_KEY")

    if not api_key:
        raise RuntimeError("VOYAGE_API_KEY must be configured")

    return api_key


def get_embedding_model() -> str:
    """Return the configured embedding model."""
    return os.getenv(
        "VOYAGE_EMBEDDING_MODEL",
        "voyage-4-large",
    )


def get_embedding_dimension() -> int:
    """Return the configured embedding dimension."""
    return int(
        os.getenv(
            "EMBEDDING_DIMENSION",
            "1024",
        )
    )


def get_gemini_api_key() -> str:
    """Return the Gemini API key."""
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise RuntimeError("GEMINI_API_KEY must be configured")

    return api_key


def get_gemini_model() -> str:
    """Return the configured Gemini LLM model."""
    return os.getenv(
        "GEMINI_MODEL",
        "gemini-3.6-flash",
    )
