import uuid

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import QrCode
from app.qr.schemas import QrCreate


class QrRepository:
    """SQLAlchemy persistence for dynamic QR codes."""

    def code_exists(self, database: Session, code: str) -> bool:
        statement = select(QrCode.id).where(QrCode.code == code)
        return database.scalar(statement) is not None

    def create(self, database: Session, request: QrCreate, code: str, created_by_id: uuid.UUID) -> QrCode:
        qr_code = QrCode(
            code=code,
            target_url=request.target_url,
            qr_type=request.qr_type,
            campaign=request.campaign,
            utm_source=request.utm_source,
            utm_medium=request.utm_medium,
            utm_campaign=request.utm_campaign,
            created_by_id=created_by_id,
        )
        database.add(qr_code)
        database.commit()
        database.refresh(qr_code)
        return qr_code
