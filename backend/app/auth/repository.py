import uuid
from datetime import datetime

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import PasswordResetToken, User


class AuthRepository:
    def get_user_by_email(self, database: Session, email: str) -> User | None:
        statement = select(User).where(User.email == email)
        return database.scalars(statement).first()

    def get_user_by_id(self, database: Session, user_id: uuid.UUID) -> User | None:
        return database.get(User, user_id)

    def create_user(self, database: Session, user: User) -> User:
        database.add(user)
        database.commit()
        database.refresh(user)
        return user

    def create_reset_token(self, database: Session, reset_token: PasswordResetToken) -> PasswordResetToken:
        database.add(reset_token)
        database.commit()
        database.refresh(reset_token)
        return reset_token

    def get_reset_token(self, database: Session, token_hash: str) -> PasswordResetToken | None:
        statement = select(PasswordResetToken).where(PasswordResetToken.token_hash == token_hash)
        return database.scalars(statement).first()

    def update_password_and_mark_token_used(
        self,
        database: Session,
        user: User,
        password_hash: str,
        reset_token: PasswordResetToken,
        used_at: datetime,
    ) -> None:
        user.password_hash = password_hash
        reset_token.used_at = used_at
        database.commit()
