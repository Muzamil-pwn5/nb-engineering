from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.customer import CustomerCreate, CustomerResponse
from app.services.customer_service import (
    create_customer,
    get_all_customers,
    get_customer_by_id,
)


router = APIRouter(
    prefix="/customers",
    tags=["Customers"],
)


@router.post(
    "",
    response_model=CustomerResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_customer_record(
    customer_data: CustomerCreate,
    db: Session = Depends(get_db),
):
    return create_customer(db, customer_data)


@router.get(
    "",
    response_model=list[CustomerResponse],
)
def list_customers(
    db: Session = Depends(get_db),
):
    return get_all_customers(db)


@router.get(
    "/{customer_id}",
    response_model=CustomerResponse,
)
def retrieve_customer(
    customer_id: int,
    db: Session = Depends(get_db),
):
    customer = get_customer_by_id(
        db,
        customer_id,
    )

    if customer is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found",
        )

    return customer
