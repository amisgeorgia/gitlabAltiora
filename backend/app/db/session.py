from collections.abc import Generator
from functools import lru_cache

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import get_database_url


@lru_cache
def get_session_factory() -> sessionmaker[Session]:
    """Create the database session factory only when it is needed."""
    engine = create_engine(get_database_url(), pool_pre_ping=True)
    return sessionmaker(bind=engine, autoflush=False, autocommit=False)


def get_db() -> Generator[Session, None, None]:
    """Provide a database session for one HTTP request."""
    database = get_session_factory()()
    try:
        yield database
    finally:
        database.close()
