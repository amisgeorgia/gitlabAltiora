from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.contacts.router import router as contacts_router

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


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}
