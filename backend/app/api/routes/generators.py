from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.generator import GeneratorResponse
from app.services.generator_service import (
    get_all_generators,
    get_generator_by_slug,
)


router = APIRouter(
    prefix="/generators",
    tags=["Generators"],
)


@router.get(
    "",
    response_model=list[GeneratorResponse],
)
def list_generators(
    db: Session = Depends(get_db),
):
    return get_all_generators(db)


@router.get(
    "/{slug}",
    response_model=GeneratorResponse,
)
def retrieve_generator(
    slug: str,
    db: Session = Depends(get_db),
):
    generator = get_generator_by_slug(db, slug)

    if generator is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Generator not found",
        )

    return generator