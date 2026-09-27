from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.rental import (
    RentalRequestCreate,
    RentalRequestResponse,
)
from app.services.rental_service import (
    create_rental_request,
    get_all_rental_requests,
    get_rental_request_by_id,
)


router = APIRouter(
    prefix="/rentals",
    tags=["Rentals"],
)


@router.post(
    "",
    response_model=RentalRequestResponse,
    status_code=status.HTTP_201_CREATED,
)
def submit_rental_request(
    rental_data: RentalRequestCreate,
    db: Session = Depends(get_db),
):
    return create_rental_request(db, rental_data)


@router.get(
    "",
    response_model=list[RentalRequestResponse],
)
def list_rental_requests(
    db: Session = Depends(get_db),
):
    return get_all_rental_requests(db)


@router.get(
    "/{rental_id}",
    response_model=RentalRequestResponse,
)
def retrieve_rental_request(
    rental_id: int,
    db: Session = Depends(get_db),
):
    rental_request = get_rental_request_by_id(
        db,
        rental_id,
    )

    if rental_request is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Rental request not found",
        )

    return rental_request