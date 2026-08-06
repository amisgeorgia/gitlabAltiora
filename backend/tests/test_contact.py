import pytest
from fastapi.testclient import TestClient

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


@pytest.fixture(autouse=True)
def fake_session() -> FakeSession:
    session = FakeSession()

    def override_get_db() -> FakeSession:
        return session

    app.dependency_overrides[get_db] = override_get_db
    yield session
    app.dependency_overrides.clear()


def valid_payload() -> dict[str, str]:
    return {
        "first_name": "Jean",
        "last_name": "Dupont",
        "email": "jean.dupont@example.com",
        "subject": "Formation & IA",
        "message": "Je souhaite obtenir des informations sur vos formations.",
    }

def test_submit_contact_returns_created(fake_session: FakeSession) -> None:
    response = client.post("/contact", json=valid_payload())

    assert response.status_code == 201
    assert response.json() == {"message": "Votre demande a été envoyée."}
    assert fake_session.contact_requests[0].name == "Jean Dupont"


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


def test_submit_contact_rejects_short_message() -> None:
    payload = valid_payload()
    payload["message"] = "Court"

    response = client.post("/contact", json=payload)

    assert response.status_code == 422


def test_submit_contact_honeypot_does_not_store_request(fake_session: FakeSession) -> None:
    payload = valid_payload()
    payload["website"] = "https://spam.example"

    response = client.post("/contact", json=payload)

    assert response.status_code == 201
    assert response.json() == {"message": "Votre demande a été envoyée."}
    assert fake_session.contact_requests == []


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
