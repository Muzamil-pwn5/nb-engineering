from pathlib import Path

from alembic import command
from alembic.config import Config
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware

from app.api.routes import (
    auth_router,
    brands_router,
    generators_router,
    services_router,
    spare_parts_router,
    inquiries_router,
    rentals_router,
    customers_router,
    sites_router,
    equipment_router,
    service_history_router,
    contracts_router,
    contacts_router,
    experience_router,
)
from app.core.config import settings
from app.core.security import require_admin


app = FastAPI(
    title="NB Engineering & Services API",
    version="1.0.0",
)


@app.on_event("startup")
def run_database_migrations() -> None:
    """Bring the deployed database to the checked-in schema before serving traffic."""
    backend_dir = Path(__file__).resolve().parents[2]
    alembic_config = Config(str(backend_dir / "alembic.ini"))
    command.upgrade(alembic_config, "head")


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "camera=(), geolocation=(), microphone=()"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        return response


app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in settings.cors_origins.split(",") if origin.strip()],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Accept", "Authorization", "Content-Type"],
)


API_PREFIX = "/api/v1"
ADMIN_ONLY = [Depends(require_admin)]


# Public
app.include_router(auth_router, prefix=API_PREFIX)
app.include_router(brands_router, prefix=API_PREFIX)
app.include_router(generators_router, prefix=API_PREFIX)
app.include_router(services_router, prefix=API_PREFIX)
app.include_router(spare_parts_router, prefix=API_PREFIX)
app.include_router(experience_router, prefix=API_PREFIX)

# Inquiries:
# POST /api/v1/inquiries is public so website visitors can submit inquiries.
# GET /api/v1/inquiries remains protected by require_admin.
app.include_router(
    inquiries_router,
    prefix=API_PREFIX,
    dependencies=[],
)

# Admin only
app.include_router(
    rentals_router,
    prefix=API_PREFIX,
    dependencies=ADMIN_ONLY,
)
app.include_router(
    customers_router,
    prefix=API_PREFIX,
    dependencies=ADMIN_ONLY,
)
app.include_router(
    sites_router,
    prefix=API_PREFIX,
    dependencies=ADMIN_ONLY,
)
app.include_router(
    equipment_router,
    prefix=API_PREFIX,
    dependencies=ADMIN_ONLY,
)
app.include_router(
    service_history_router,
    prefix=API_PREFIX,
    dependencies=ADMIN_ONLY,
)
app.include_router(
    contracts_router,
    prefix=API_PREFIX,
    dependencies=ADMIN_ONLY,
)
app.include_router(
    contacts_router,
    prefix=API_PREFIX,
    dependencies=ADMIN_ONLY,
)


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "NB Engineering & Services API",
    }


@app.get("/")
def root():
    return {
        "message": "NB Engineering & Services API",
        "status": "running",
    }
