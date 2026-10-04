from sqlalchemy import select

from app.core.database import SessionLocal
from app.models.contract import Contract
from app.models.customer import Customer
from app.models.site import Site


def create_contract(data):
    db = SessionLocal()

    try:
        customer = db.scalar(
            select(Customer).where(
                Customer.id == data.customer_id,
                Customer.is_active.is_(True),
            )
        )

        if not customer:
            raise ValueError("Customer not found")

        if data.site_id is not None:
            site = db.scalar(
                select(Site).where(
                    Site.id == data.site_id,
                    Site.customer_id == data.customer_id,
                    Site.is_active.is_(True),
                )
            )

            if not site:
                raise ValueError("Site not found for this customer")

        contract = Contract(**data.model_dump())

        db.add(contract)
        db.commit()
        db.refresh(contract)

        return contract

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


def get_all_contracts():
    db = SessionLocal()

    try:
        return list(
            db.scalars(
                select(Contract)
                .order_by(Contract.id.desc())
            ).all()
        )

    finally:
        db.close()


def get_contract_by_id(contract_id: int):
    db = SessionLocal()

    try:
        return db.scalar(
            select(Contract).where(
                Contract.id == contract_id
            )
        )

    finally:
        db.close()


def get_contracts_by_customer(customer_id: int):
    db = SessionLocal()

    try:
        return list(
            db.scalars(
                select(Contract)
                .where(
                    Contract.customer_id == customer_id
                )
                .order_by(Contract.id.desc())
            ).all()
        )

    finally:
        db.close()


def get_contracts_by_site(site_id: int):
    db = SessionLocal()

    try:
        return list(
            db.scalars(
                select(Contract)
                .where(
                    Contract.site_id == site_id
                )
                .order_by(Contract.id.desc())
            ).all()
        )

    finally:
        db.close()
