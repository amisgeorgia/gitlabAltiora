import pytest
from fastapi.testclient import TestClient

from app.contacts.email_client import EmailDeliveryError, EmailMessage
from app.contacts.notification_service import ContactNotificationService
from app.contacts.router import get_contact_service
from app.contacts.service import ContactService
from app.db.session import get_db
from app.main import app
from app.models import ContactRequest

client = TestClient(app)


class FakeSession:
    def __init__(self) -> None:
        self.contact_requests: list[ContactRequest] = []

    def add(self, contact_request: ContactRequest) -> None:
        self.contact_requests.append(contact_request)

    def commit(self) -> None:
        pass

    def refresh(self, contact_request: ContactRequest) -> None:
        pass


class FakeEmailSender:
    def __init__(self, should_fail: bool = False) -> None:
        self.messages: list[EmailMessage] = []
        self.should_fail = should_fail

    def send(self, message: EmailMessage) -> None:
        if self.should_fail:
            raise EmailDeliveryError("Email provider unavailable")
        self.messages.append(message)


@pytest.fixture(autouse=True)
def fake_session() -> tuple[FakeSession, FakeEmailSender]:
    session = FakeSession()
    email_sender = FakeEmailSender()

    def override_get_db() -> FakeSession:
        return session

    def override_contact_service() -> ContactService:
        notifier = ContactNotificationService(email_sender, "internal@example.test")
        return ContactService(notification_service=notifier)

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_contact_service] = override_contact_service
    yield session, email_sender
    app.dependency_overrides.clear()


def valid_payload() -> dict[str, str]:
    return {
        "first_name": "Jean",
        "last_name": "Dupont",
        "email": "jean.dupont@example.com",
        "subject": "formation",
        "message": "Je souhaite obtenir des informations sur vos formations.",
    }

def test_submit_contact_returns_created(fake_session: tuple[FakeSession, FakeEmailSender]) -> None:
    response = client.post("/contact", json=valid_payload())

    assert response.status_code == 201
    assert response.json() == {"message": "Votre demande a été envoyée."}
    session, email_sender = fake_session
    assert session.contact_requests[0].name == "Jean Dupont"
    assert len(email_sender.messages) == 2
    assert "Demande de formation" in email_sender.messages[0].text


@pytest.mark.parametrize(
    ("subject", "qualification"),
    [
        ("formation", "Demande de formation"),
        ("conseil", "Conseil & Stratégie"),
        ("bpo", "Externalisation / BPO"),
        ("developpement", "Solutions Numériques"),
        ("autre", "Demande générale"),
    ],
)
def test_submit_contact_qualifies_subjects(
    fake_session: tuple[FakeSession, FakeEmailSender], subject: str, qualification: str
) -> None:
    payload = valid_payload()
    payload["subject"] = subject

    response = client.post("/contact", json=payload)

    assert response.status_code == 201
    _, email_sender = fake_session
    assert qualification in email_sender.messages[0].text


def test_submit_contact_rejects_missing_first_name() -> None:
    payload = valid_payload()
    payload.pop("first_name")

    response = client.post("/contact", json=payload)

    assert response.status_code == 422


def test_submit_contact_rejects_missing_last_name() -> None:
    payload = valid_payload()
    payload.pop("last_name")

    response = client.post("/contact", json=payload)

    assert response.status_code == 422


def test_submit_contact_rejects_invalid_email() -> None:
    payload = valid_payload()
    payload["email"] = "invalid-email"

    response = client.post("/contact", json=payload)

    assert response.status_code == 422


def test_submit_contact_rejects_missing_subject() -> None:
    payload = valid_payload()
    payload.pop("subject")

    response = client.post("/contact", json=payload)

    assert response.status_code == 422


def test_submit_contact_rejects_unknown_subject() -> None:
    payload = valid_payload()
    payload["subject"] = "inconnu"

    response = client.post("/contact", json=payload)

    assert response.status_code == 422


def test_submit_contact_rejects_short_message() -> None:
    payload = valid_payload()
    payload["message"] = "Court"

    response = client.post("/contact", json=payload)

    assert response.status_code == 422


def test_submit_contact_honeypot_does_not_store_request(
    fake_session: tuple[FakeSession, FakeEmailSender],
) -> None:
    payload = valid_payload()
    payload["website"] = "https://spam.example"

    response = client.post("/contact", json=payload)

    assert response.status_code == 201
    assert response.json() == {"message": "Votre demande a été envoyée."}
    session, email_sender = fake_session
    assert session.contact_requests == []
    assert email_sender.messages == []


def test_submit_contact_keeps_request_when_email_delivery_fails(
    fake_session: tuple[FakeSession, FakeEmailSender],
) -> None:
    session, _ = fake_session
    failing_sender = FakeEmailSender(should_fail=True)

    notifier = ContactNotificationService(failing_sender, "internal@example.test")
    app.dependency_overrides[get_contact_service] = lambda: ContactService(
        notification_service=notifier
    )
    response = client.post("/contact", json=valid_payload())

    assert response.status_code == 503
    assert response.json() == {"detail": "Le service e-mail est temporairement indisponible."}
    assert len(session.contact_requests) == 1


def test_submit_contact_returns_503_without_email_settings(
    fake_session: tuple[FakeSession, FakeEmailSender], monkeypatch: pytest.MonkeyPatch
) -> None:
    session, email_sender = fake_session
    app.dependency_overrides.pop(get_contact_service)
    for variable_name in ("EMAIL_API_KEY", "EMAIL_FROM", "EMAIL_INTERNAL_TO"):
        monkeypatch.delenv(variable_name, raising=False)

    response = client.post("/contact", json=valid_payload())

    assert response.status_code == 503
    assert response.json() == {"detail": "Le service e-mail est temporairement indisponible."}
    assert len(session.contact_requests) == 1
    assert email_sender.messages == []


def test_contact_allows_frontend_origin() -> None:
    response = client.options(
        "/contact",
        headers={
            "Origin": "http://localhost:3000",
            "Access-Control-Request-Method": "POST",
        },
    )

    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == "http://localhost:3000"
