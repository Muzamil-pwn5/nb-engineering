from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

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
from app.core.security import require_admin


app = FastAPI(
    title="NB Engineering & Services API",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://nbengineering.netlify.app",
        "https://nbengineerings.com",
        "https://www.nbengineerings.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
