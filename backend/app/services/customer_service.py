from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.schemas.customer import CustomerCreate


def create_customer(
    db: Session,
    customer_data: CustomerCreate,
) -> Customer:
    customer = Customer(
        **customer_data.model_dump(),
    )

    db.add(customer)
    db.commit()
    db.refresh(customer)

    return customer


def get_all_customers(
    db: Session,
) -> list[Customer]:
    statement = (
        select(Customer)
        .where(Customer.is_active.is_(True))
        .order_by(Customer.name.asc())
    )

    return list(db.scalars(statement).all())


def get_customer_by_id(
    db: Session,
    customer_id: int,
) -> Customer | None:
    return db.scalar(
        select(Customer).where(
            Customer.id == customer_id,
            Customer.is_active.is_(True),
        )
    )