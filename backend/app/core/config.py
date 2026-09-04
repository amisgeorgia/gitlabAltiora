import os
from dataclasses import dataclass


class EmailConfigurationError(RuntimeError):
    """Raised when required email environment variables are absent."""


@dataclass(frozen=True)
class EmailSettings:
    api_key: str
    from_email: str
    internal_to: str


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
