from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.spare_part import SparePartResponse
from app.services.spare_part_service import (
    get_all_spare_parts,
    get_spare_part_by_slug,
)


router = APIRouter(
    prefix="/spare-parts",
    tags=["Spare Parts"],
)


@router.get(
    "",
    response_model=list[SparePartResponse],
)
def list_spare_parts(
    db: Session = Depends(get_db),
):
    return get_all_spare_parts(db)


@router.get(
    "/{slug}",
    response_model=SparePartResponse,
)
def retrieve_spare_part(
    slug: str,
    db: Session = Depends(get_db),
):
    spare_part = get_spare_part_by_slug(db, slug)

    if spare_part is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Spare part not found",
        )

    return spare_part