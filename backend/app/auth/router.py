from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.auth.schemas import (
    AuthenticatedUser,
    LoginRequest,
    LoginResponse,
    MessageResponse,
    PasswordResetConfirm,
    PasswordResetRequest,
)
from app.auth.security import InvalidTokenError, decode_access_token
from app.auth.service import AuthService, InvalidCredentialsError, InvalidResetTokenError
from app.contacts.email_client import EmailDeliveryError
from app.core.config import AuthConfigurationError, EmailConfigurationError, get_jwt_settings
from app.db.session import get_db
from app.models.enums import UserRole

router = APIRouter(prefix="/auth", tags=["auth"])
bearer_scheme = HTTPBearer(auto_error=False)
DatabaseSession = Annotated[Session, Depends(get_db)]


def get_auth_service() -> AuthService:
    return AuthService()


AuthServiceDependency = Annotated[AuthService, Depends(get_auth_service)]
BearerCredentials = Annotated[HTTPAuthorizationCredentials | None, Depends(bearer_scheme)]


def service_unavailable(error: Exception) -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        detail="Le service d'authentification est temporairement indisponible.",
    )


@router.post("/login", response_model=LoginResponse)
def login(
    request: LoginRequest,
    database: DatabaseSession,
    auth_service: AuthServiceDependency,
) -> LoginResponse:
    try:
        return auth_service.login(database, request.email, request.password)
    except InvalidCredentialsError as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Identifiants invalides.",
            headers={"WWW-Authenticate": "Bearer"},
        ) from error
    except AuthConfigurationError as error:
        raise service_unavailable(error) from error


@router.post("/password-reset/request", response_model=MessageResponse, status_code=status.HTTP_202_ACCEPTED)
def request_password_reset(
    request: PasswordResetRequest,
    database: DatabaseSession,
    auth_service: AuthServiceDependency,
) -> MessageResponse:
    try:
        auth_service.request_password_reset(database, request.email)
    except (AuthConfigurationError, EmailConfigurationError, EmailDeliveryError) as error:
        raise service_unavailable(error) from error

    return MessageResponse(message="Si un compte existe, un message de réinitialisation a été envoyé.")


@router.post("/password-reset/confirm", response_model=MessageResponse)
def confirm_password_reset(
    request: PasswordResetConfirm,
    database: DatabaseSession,
    auth_service: AuthServiceDependency,
) -> MessageResponse:
    try:
        auth_service.confirm_password_reset(database, request.token, request.new_password)
    except InvalidResetTokenError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Jeton de réinitialisation invalide ou expiré.",
        ) from error

    return MessageResponse(message="Le mot de passe a été réinitialisé.")


def get_current_user(
    database: DatabaseSession,
    auth_service: AuthServiceDependency,
    credentials: BearerCredentials,
) -> AuthenticatedUser:
    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentification requise.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        user_id = decode_access_token(credentials.credentials, get_jwt_settings())
    except AuthConfigurationError as error:
        raise service_unavailable(error) from error
    except InvalidTokenError as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Jeton d'accès invalide.",
            headers={"WWW-Authenticate": "Bearer"},
        ) from error

    user = auth_service.get_user(database, user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Jeton d'accès invalide.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return AuthenticatedUser(id=user.id, email=user.email, role=user.role)


CurrentUser = Annotated[AuthenticatedUser, Depends(get_current_user)]


def require_admin_user(current_user: CurrentUser) -> AuthenticatedUser:
    if current_user.role is not UserRole.ADMIN:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Accès administrateur requis.")
    return current_user
