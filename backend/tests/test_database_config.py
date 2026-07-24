import pytest


def test_database_url_uses_psycopg_driver(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setenv(
        "DATABASE_URL",
        "postgresql://altiora:secret@db:5432/altiora_connect",
    )

    from app.core.config import get_database_url

    assert (
        get_database_url()
        == "postgresql+psycopg://altiora:secret@db:5432/altiora_connect"
    )


def test_database_url_is_required(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.delenv("DATABASE_URL", raising=False)

    from app.core.config import get_database_url

    with pytest.raises(RuntimeError, match="DATABASE_URL"):
        get_database_url()
