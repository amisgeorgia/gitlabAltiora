from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.chat.schemas import ChatRequest
from app.chat.service import ChatService
from app.db.session import get_db

router = APIRouter(tags=["chat"])

def get_chat_service() -> ChatService:
    return ChatService()

DatabaseSession = Annotated[Session, Depends(get_db)]
ChatServiceDependency = Annotated[ChatService, Depends(get_chat_service)]
@router.post("/chat")
def chat(
    request: ChatRequest,
    database: DatabaseSession,
    service: ChatServiceDependency,
) -> StreamingResponse:
    return StreamingResponse(
        service.stream_reply(database, request),
        media_type="text/event-stream",)
