from dataclasses import dataclass
from typing import Protocol

import httpx


class EmailDeliveryError(Exception):
    """Raised when the transactional email provider cannot deliver an email."""


@dataclass(frozen=True)
class EmailMessage:
    to: str
    subject: str
    text: str


class EmailSender(Protocol):
    def send(self, message: EmailMessage) -> None: ...


class ResendEmailSender:
    def __init__(self, api_key: str, from_email: str) -> None:
        self._api_key = api_key
        self._from_email = from_email

    def send(self, message: EmailMessage) -> None:
        try:
            response = httpx.post(
                "https://api.resend.com/emails",
                headers={"Authorization": f"Bearer {self._api_key}"},
                json={
                    "from": self._from_email,
                    "to": [message.to],
                    "subject": message.subject,
                    "text": message.text,
                },
                timeout=10.0,
            )
            response.raise_for_status()
        except httpx.HTTPError as error:
            raise EmailDeliveryError("Email provider unavailable") from error


class UnavailableEmailSender:
    """Safe fallback used when email settings have not been configured."""

    def send(self, message: EmailMessage) -> None:
        del message
        raise EmailDeliveryError("Email service is not configured")
