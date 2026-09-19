from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.auth.router import router as auth_router
from app.chat.history_router import router as conversation_history_router
from app.chat.router import router as chat_router
from app.contacts.router import router as contacts_router
from app.qr.router import router as qr_router

app = FastAPI(
    title="ALTIORA CONNECT API",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)

app.include_router(contacts_router)
app.include_router(chat_router)
app.include_router(auth_router)
app.include_router(conversation_history_router)
app.include_router(qr_router)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}
