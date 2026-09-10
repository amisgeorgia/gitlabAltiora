import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.auth.router import require_admin_user
from app.auth.schemas import AuthenticatedUser
from app.chat.history_service import ConversationHistoryService
from app.chat.schemas import ConversationDetail, ConversationPage
from app.db.session import get_db

router = APIRouter(prefix="/admin/conversations", tags=["admin conversations"])
DatabaseSession = Annotated[Session, Depends(get_db)]
AdminUser = Annotated[AuthenticatedUser, Depends(require_admin_user)]


def get_history_service() -> ConversationHistoryService:
    return ConversationHistoryService()


HistoryServiceDependency = Annotated[ConversationHistoryService, Depends(get_history_service)]


@router.get("", response_model=ConversationPage)
def list_conversations(
    database: DatabaseSession,
    _: AdminUser,
    history_service: HistoryServiceDependency,
    page: Annotated[int, Query(ge=1)] = 1,
    page_size: Annotated[int, Query(ge=1, le=100)] = 20,
) -> ConversationPage:
    return history_service.list_conversations(database, page, page_size)


@router.get("/{conversation_id}", response_model=ConversationDetail)
def get_conversation(
    conversation_id: uuid.UUID,
    database: DatabaseSession,
    _: AdminUser,
    history_service: HistoryServiceDependency,
) -> ConversationDetail:
    conversation = history_service.get_conversation(database, conversation_id)
    if conversation is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conversation introuvable.")
    return conversation
