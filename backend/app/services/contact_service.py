from sqlalchemy import select

from app.core.database import SessionLocal
from app.models.contact import Contact
from app.models.customer import Customer
from app.models.site import Site


def create_contact(data):
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

        contact = Contact(**data.model_dump())

        db.add(contact)
        db.commit()
        db.refresh(contact)

        return contact

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


def get_all_contacts():
    db = SessionLocal()

    try:
        return list(
            db.scalars(
                select(Contact)
                .order_by(Contact.id.desc())
            ).all()
        )

    finally:
        db.close()


def get_contact_by_id(contact_id: int):
    db = SessionLocal()

    try:
        return db.scalar(
            select(Contact).where(
                Contact.id == contact_id
            )
        )

    finally:
        db.close()


def get_contacts_by_customer(customer_id: int):
    db = SessionLocal()

    try:
        return list(
            db.scalars(
                select(Contact)
                .where(
                    Contact.customer_id == customer_id
                )
                .order_by(Contact.id.desc())
            ).all()
        )

    finally:
        db.close()


def get_contacts_by_site(site_id: int):
    db = SessionLocal()

    try:
        return list(
            db.scalars(
                select(Contact)
                .where(
                    Contact.site_id == site_id
                )
                .order_by(Contact.id.desc())
            ).all()
        )

    finally:
        db.close()
