from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.brand import BrandResponse
from app.services.brand_service import (
    get_all_brands,
    get_brand_by_slug,
)


router = APIRouter(
    prefix="/brands",
    tags=["Brands"],
)


@router.get(
    "",
    response_model=list[BrandResponse],
)
def list_brands(
    db: Session = Depends(get_db),
):
    return get_all_brands(db)


@router.get(
    "/{slug}",
    response_model=BrandResponse,
)
def retrieve_brand(
    slug: str,
    db: Session = Depends(get_db),
):
    brand = get_brand_by_slug(db, slug)

    if brand is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Brand not found",
        )

    return brand