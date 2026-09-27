from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.service import ServiceResponse
from app.services.service_service import (
    get_all_services,
    get_service_by_slug,
)


router = APIRouter(
    prefix="/services",
    tags=["Services"],
)


@router.get(
    "",
    response_model=list[ServiceResponse],
)
def list_services(
    db: Session = Depends(get_db),
):
    return get_all_services(db)


@router.get(
    "/{slug}",
    response_model=ServiceResponse,
)
def retrieve_service(
    slug: str,
    db: Session = Depends(get_db),
):
    service = get_service_by_slug(db, slug)

    if service is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service not found",
        )

    return service