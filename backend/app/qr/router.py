from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth.router import require_admin_user
from app.auth.schemas import AuthenticatedUser
from app.core.config import QrConfigurationError
from app.db.session import get_db
from app.qr.schemas import QrCreate, QrResponse
from app.qr.service import QrCodeGenerationError, QrService

router = APIRouter(tags=["qr"])
DatabaseSession = Annotated[Session, Depends(get_db)]
AdminUser = Annotated[AuthenticatedUser, Depends(require_admin_user)]


def get_qr_service() -> QrService:
    return QrService()


QrServiceDependency = Annotated[QrService, Depends(get_qr_service)]


@router.post("/qr", response_model=QrResponse, status_code=status.HTTP_201_CREATED)
def create_qr(
    request: QrCreate,
    database: DatabaseSession,
    admin_user: AdminUser,
    qr_service: QrServiceDependency,
) -> QrResponse:
    try:
        return qr_service.create(database, admin_user.id, request)
    except (QrConfigurationError, QrCodeGenerationError) as error:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Le service QR est temporairement indisponible.",
        ) from error
