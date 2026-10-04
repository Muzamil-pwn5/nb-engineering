from sqlalchemy import select

from app.core.database import SessionLocal
from app.models.contract import Contract
from app.models.customer import Customer


CONTRACT_REFERENCES = [
    (
        "Mauritius Embassy",
        "Maintenance Contract",
        "Generator maintenance contract reference",
    ),
    (
        "Mauritius High Commission",
        "Maintenance Contract",
        "Generator maintenance contract reference",
    ),
]


def seed_contracts() -> None:
    db = SessionLocal()

    try:
        created = 0
        skipped = 0

        for customer_name, contract_type, notes in CONTRACT_REFERENCES:
            customer = db.scalar(
                select(Customer).where(
                    Customer.name == customer_name
                )
            )

            if not customer:
                print(f"CUSTOMER NOT FOUND: {customer_name}")
                continue

            existing = db.scalar(
                select(Contract).where(
                    Contract.customer_id == customer.id,
                    Contract.contract_type == contract_type,
                    Contract.title == contract_type,
                )
            )

            if existing:
                skipped += 1
                continue

            contract = Contract(
                customer_id=customer.id,
                site_id=None,
                contract_type=contract_type,
                title=contract_type,
                start_date=None,
                end_date=None,
                status="unknown",
                scope="Generator maintenance",
                notes=notes,
                is_active=True,
            )

            db.add(contract)
            created += 1

        db.commit()

        print("CONTRACT SEED COMPLETE")
        print(f"RECORDS CREATED: {created}")
        print(f"RECORDS SKIPPED: {skipped}")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_contracts()
