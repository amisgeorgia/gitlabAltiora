import uuid
from typing import Annotated

from pydantic import BaseModel, Field

from app.models.enums import QrType

OptionalQrText = Annotated[str | None, Field(default=None, max_length=255)]


class QrCreate(BaseModel):
    target_url: Annotated[str, Field(min_length=1, max_length=2048)]
    qr_type: QrType
    campaign: OptionalQrText
    utm_source: OptionalQrText
    utm_medium: OptionalQrText
    utm_campaign: OptionalQrText


class QrResponse(BaseModel):
    id: uuid.UUID
    code: str
    short_url: str
    target_url: str
    qr_type: QrType
    campaign: str | None
    utm_source: str | None
    utm_medium: str | None
    utm_campaign: str | None
    svg: str
