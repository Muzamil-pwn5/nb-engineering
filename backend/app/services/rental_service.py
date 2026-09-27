from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.rental import RentalRequest
from app.schemas.rental import RentalRequestCreate


def create_rental_request(
    db: Session,
    rental_data: RentalRequestCreate,
) -> RentalRequest:
    rental_request = RentalRequest(
        **rental_data.model_dump(),
    )

    db.add(rental_request)
    db.commit()
    db.refresh(rental_request)

    return rental_request


def get_all_rental_requests(
    db: Session,
) -> list[RentalRequest]:
    statement = (
        select(RentalRequest)
        .order_by(RentalRequest.created_at.desc())
    )

    return list(db.scalars(statement).all())


def get_rental_request_by_id(
    db: Session,
    rental_id: int,
) -> RentalRequest | None:
    return db.scalar(
        select(RentalRequest).where(
            RentalRequest.id == rental_id
        )
    )