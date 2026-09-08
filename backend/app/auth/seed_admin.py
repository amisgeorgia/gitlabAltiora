import os

from app.auth.service import AuthService
from app.db.session import get_session_factory


def main() -> None:
    email = os.getenv("ADMIN_EMAIL")
    password = os.getenv("ADMIN_PASSWORD")
    if not email or not password:
        raise SystemExit("ADMIN_EMAIL and ADMIN_PASSWORD must be configured")

    database = get_session_factory()()
    try:
        created = AuthService().create_initial_admin(database, email, password)
    finally:
        database.close()

    if created:
        print("Initial administrator created.")
    else:
        print("Administrator already exists.")


if __name__ == "__main__":
    main()
