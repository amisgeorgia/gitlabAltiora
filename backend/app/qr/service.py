import uuid

from sqlalchemy.orm import Session

from app.core.config import get_qr_settings
from app.qr.generator import QrGenerator
from app.qr.repository import QrRepository
from app.qr.schemas import QrCreate, QrResponse

MAX_CODE_GENERATION_ATTEMPTS = 10


class QrCodeGenerationError(RuntimeError):
    """Raised when a unique QR code cannot be generated."""


class QrService:
    """Coordinates QR persistence, short URL construction and SVG generation."""

    def __init__(
        self,
        repository: QrRepository | None = None,
        generator: QrGenerator | None = None,
    ) -> None:
        self._repository = repository or QrRepository()
        self._generator = generator or QrGenerator()

    def create(self, database: Session, user_id: uuid.UUID, request: QrCreate) -> QrResponse:
        code = self._generate_unique_code(database)
        settings = get_qr_settings()
        short_url = f"{settings.redirect_base_url}/q/{code}"
        qr_code = self._repository.create(database, request, code, user_id)

        return QrResponse(
            id=qr_code.id,
            code=qr_code.code,
            short_url=short_url,
            target_url=qr_code.target_url,
            qr_type=qr_code.qr_type,
            campaign=qr_code.campaign,
            utm_source=qr_code.utm_source,
            utm_medium=qr_code.utm_medium,
            utm_campaign=qr_code.utm_campaign,
            svg=self._generator.generate_svg(short_url),
        )

    def _generate_unique_code(self, database: Session) -> str:
        for _ in range(MAX_CODE_GENERATION_ATTEMPTS):
            code = self._generator.generate_code()
            if not self._repository.code_exists(database, code):
                return code
        raise QrCodeGenerationError("Unable to generate a unique QR code")
