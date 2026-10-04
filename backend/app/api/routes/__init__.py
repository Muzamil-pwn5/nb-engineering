from app.api.routes.auth import router as auth_router
from app.api.routes.brands import router as brands_router
from app.api.routes.generators import router as generators_router
from app.api.routes.services import router as services_router
from app.api.routes.spare_parts import router as spare_parts_router
from app.api.routes.inquiries import router as inquiries_router
from app.api.routes.rentals import router as rentals_router
from app.api.routes.customers import router as customers_router
from app.api.routes.sites import router as sites_router
from app.api.routes.equipment import router as equipment_router
from app.api.routes.service_history import router as service_history_router
from app.api.routes.contracts import router as contracts_router
from app.api.routes.contacts import router as contacts_router
from app.api.routes.experience import router as experience_router


__all__ = [
    "auth_router",
    "brands_router",
    "generators_router",
    "services_router",
    "spare_parts_router",
    "inquiries_router",
    "rentals_router",
    "customers_router",
    "sites_router",
    "equipment_router",
    "service_history_router",
    "contracts_router",
    "contacts_router",
    "experience_router",
]
