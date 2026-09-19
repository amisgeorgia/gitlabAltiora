import uuid
import xml.etree.ElementTree as element_tree
from collections.abc import Generator
from types import SimpleNamespace

import pytest
from fastapi.testclient import TestClient

from app.auth.router import get_auth_service
from app.auth.schemas import AuthenticatedUser
from app.auth.security import create_access_token
from app.auth.service import AuthService
from app.core.config import JwtSettings, QrConfigurationError
from app.db.session import get_db
from app.main import app
from app.models.enums import QrType, UserRole
from app.qr.generator import QrGenerator
from app.qr.router import get_qr_service
from app.qr.schemas import QrCreate, QrResponse
from app.qr.service import QrService

client = TestClient(app)
_jwt_settings = JwtSettings("test-only-secret-with-at-least-thirty-two-characters", 60, 30)


class FakeAuthRepository:
    def __init__(self, users: dict[uuid.UUID, AuthenticatedUser]) -> None:
        self._users = users

    def get_user_by_id(self, database: object, user_id: uuid.UUID) -> AuthenticatedUser | None:
        del database
        return self._users.get(user_id)


class FakeQrService:
    def __init__(self) -> None:
        self.requests: list[tuple[uuid.UUID, QrCreate]] = []

    def create(self, database: object, user_id: uuid.UUID, request: QrCreate) -> QrResponse:
        del database
        self.requests.append((user_id, request))
        return QrResponse(
            id=uuid.uuid4(),
            code="ABCDEFGHJK",
            short_url="https://test.invalid/q/ABCDEFGHJK",
            target_url=request.target_url,
            qr_type=request.qr_type,
            campaign=request.campaign,
            utm_source=request.utm_source,
            utm_medium=request.utm_medium,
            utm_campaign=request.utm_campaign,
            svg="<svg xmlns='http://www.w3.org/2000/svg'/>",
        )


class FakeQrRepository:
    def __init__(self, existing_codes: set[str] | None = None) -> None:
        self.existing_codes = existing_codes or set()

    def code_exists(self, database: object, code: str) -> bool:
        del database
        return code in self.existing_codes

    def create(self, database: object, request: QrCreate, code: str, created_by_id: uuid.UUID) -> object:
        del database
        return SimpleNamespace(
            id=uuid.uuid4(),
            code=code,
            target_url=request.target_url,
            qr_type=request.qr_type,
            campaign=request.campaign,
            utm_source=request.utm_source,
            utm_medium=request.utm_medium,
            utm_campaign=request.utm_campaign,
            created_by_id=created_by_id,
        )


class FakeQrGenerator:
    def __init__(self, codes: list[str]) -> None:
        self._codes = iter(codes)

    def generate_code(self) -> str:
        return next(self._codes)

    def generate_svg(self, short_url: str) -> str:
        return f"<svg xmlns='http://www.w3.org/2000/svg'><title>{short_url}</title></svg>"


class MissingSettingsQrService:
    def create(self, database: object, user_id: uuid.UUID, request: QrCreate) -> QrResponse:
        del database, user_id, request
        raise QrConfigurationError("missing configuration")


def authenticated_user(role: UserRole) -> AuthenticatedUser:
    return AuthenticatedUser(id=uuid.uuid4(), email=f"{role.value}@example.test", role=role)


def authorization(user: AuthenticatedUser) -> dict[str, str]:
    token = create_access_token(user.id, user.role, _jwt_settings)
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture(autouse=True)
def qr_dependencies(monkeypatch: pytest.MonkeyPatch) -> Generator[FakeQrService, None, None]:
    admin = authenticated_user(UserRole.ADMIN)
    editor = authenticated_user(UserRole.EDITOR)
    qr_service = FakeQrService()
    auth_service = AuthService(repository=FakeAuthRepository({admin.id: admin, editor.id: editor}))

    monkeypatch.setenv("JWT_SECRET_KEY", _jwt_settings.secret_key)
    app.dependency_overrides[get_db] = lambda: object()
    app.dependency_overrides[get_auth_service] = lambda: auth_service
    app.dependency_overrides[get_qr_service] = lambda: qr_service
    qr_service.admin = admin
    qr_service.editor = editor
    yield qr_service
    app.dependency_overrides.clear()


def payload(**overrides: object) -> dict[str, object]:
    data: dict[str, object] = {
        "target_url": "https://target.example/resource",
        "qr_type": "url",
        "campaign": "lancement",
        "utm_source": "newsletter",
        "utm_medium": "email",
        "utm_campaign": "septembre",
    }
    data.update(overrides)
    return data


def test_admin_can_create_qr(qr_dependencies: FakeQrService) -> None:
    response = client.post("/qr", json=payload(), headers=authorization(qr_dependencies.admin))

    assert response.status_code == 201
    assert response.json()["code"] == "ABCDEFGHJK"
    assert response.json()["qr_type"] == "url"
    assert len(qr_dependencies.requests) == 1


def test_qr_creation_requires_authentication() -> None:
    response = client.post("/qr", json=payload())

    assert response.status_code == 401


def test_editor_cannot_create_qr(qr_dependencies: FakeQrService) -> None:
    response = client.post("/qr", json=payload(), headers=authorization(qr_dependencies.editor))

    assert response.status_code == 403


@pytest.mark.parametrize("qr_type", list(QrType))
def test_admin_can_use_each_supported_qr_type(
    qr_dependencies: FakeQrService, qr_type: QrType
) -> None:
    response = client.post(
        "/qr",
        json=payload(qr_type=qr_type.value),
        headers=authorization(qr_dependencies.admin),
    )

    assert response.status_code == 201
    assert response.json()["qr_type"] == qr_type.value


def test_qr_payload_rejects_empty_target_url(qr_dependencies: FakeQrService) -> None:
    response = client.post(
        "/qr",
        json=payload(target_url=""),
        headers=authorization(qr_dependencies.admin),
    )

    assert response.status_code == 422


@pytest.mark.parametrize(
    ("field", "value"),
    [("target_url", "x" * 2049), ("campaign", "x" * 256)],
)
def test_qr_payload_rejects_fields_that_exceed_their_limit(
    qr_dependencies: FakeQrService, field: str, value: str
) -> None:
    response = client.post(
        "/qr",
        json=payload(**{field: value}),
        headers=authorization(qr_dependencies.admin),
    )

    assert response.status_code == 422


def test_generator_creates_valid_svg_and_non_ambiguous_codes() -> None:
    generator = QrGenerator()

    first_code = generator.generate_code()
    second_code = generator.generate_code()
    svg = generator.generate_svg("https://test.invalid/q/ABCDEFGHJK")

    assert len(first_code) == 10
    assert len(second_code) == 10
    assert first_code != second_code
    assert set(first_code).issubset(set("ABCDEFGHJKLMNPQRSTUVWXYZ23456789"))
    assert element_tree.fromstring(svg).tag.endswith("svg")


def test_service_retries_collisions_and_builds_short_url(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv("QR_REDIRECT_BASE_URL", "https://short.example/")
    service = QrService(
        repository=FakeQrRepository(existing_codes={"AAAAAAAAAA"}),
        generator=FakeQrGenerator(["AAAAAAAAAA", "BCDEFGHJKL"]),
    )

    response = service.create(
        object(),
        uuid.uuid4(),
        QrCreate(target_url="https://target.example", qr_type=QrType.URL),
    )

    assert response.code == "BCDEFGHJKL"
    assert response.short_url == "https://short.example/q/BCDEFGHJKL"


def test_missing_qr_domain_returns_safe_service_unavailable(
    qr_dependencies: FakeQrService,
) -> None:
    app.dependency_overrides[get_qr_service] = lambda: MissingSettingsQrService()

    response = client.post("/qr", json=payload(), headers=authorization(qr_dependencies.admin))

    assert response.status_code == 503
    assert response.json()["detail"] == "Le service QR est temporairement indisponible."
