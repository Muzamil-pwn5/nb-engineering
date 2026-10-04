from sqlalchemy import select

from app.core.database import SessionLocal
from app.models.contact import Contact
from app.models.customer import Customer


CONTACT_REFERENCES = [
    (
        "Mauritius Embassy",
        "Embassy / Diplomatic",
        "Maintenance-related business reference",
    ),
    (
        "Mauritius High Commission",
        "High Commission / Diplomatic",
        "Maintenance-related business reference",
    ),
]


def seed_contacts() -> None:
    db = SessionLocal()

    try:
        created = 0
        skipped = 0

        for customer_name, role, notes in CONTACT_REFERENCES:
            customer = db.scalar(
                select(Customer).where(
                    Customer.name == customer_name
                )
            )

            if not customer:
                print(f"CUSTOMER NOT FOUND: {customer_name}")
                continue

            existing = db.scalar(
                select(Contact).where(
                    Contact.customer_id == customer.id,
                    Contact.name == customer.name,
                )
            )

            if existing:
                skipped += 1
                continue

            contact = Contact(
                customer_id=customer.id,
                site_id=None,
                name=customer.name,
                role=role,
                department=None,
                notes=notes,
                is_active=True,
            )

            db.add(contact)
            created += 1

        db.commit()

        print("CONTACT SEED COMPLETE")
        print(f"RECORDS CREATED: {created}")
        print(f"RECORDS SKIPPED: {skipped}")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_contacts()
