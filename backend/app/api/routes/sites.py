from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.site import SiteCreate, SiteResponse
from app.services.site_service import (
    create_site,
    get_all_sites,
    get_site_by_id,
    get_sites_by_customer,
)


router = APIRouter(
    prefix="/sites",
    tags=["Sites"],
)


@router.post(
    "",
    response_model=SiteResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_site_record(
    site_data: SiteCreate,
    db: Session = Depends(get_db),
):
    try:
        return create_site(db, site_data)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )


@router.get(
    "",
    response_model=list[SiteResponse],
)
def list_sites(
    db: Session = Depends(get_db),
):
    return get_all_sites(db)


@router.get(
    "/customer/{customer_id}",
    response_model=list[SiteResponse],
)
def list_customer_sites(
    customer_id: int,
    db: Session = Depends(get_db),
):
    return get_sites_by_customer(db, customer_id)


@router.get(
    "/{site_id}",
    response_model=SiteResponse,
)
def retrieve_site(
    site_id: int,
    db: Session = Depends(get_db),
):
    site = get_site_by_id(db, site_id)

    if site is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Site not found",
        )

    return site
