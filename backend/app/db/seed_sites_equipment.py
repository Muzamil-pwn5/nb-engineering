from sqlalchemy import select

from app.core.database import SessionLocal
from app.models.customer import Customer
from app.models.equipment import Equipment
from app.models.site import Site


def seed_sites_and_equipment() -> None:
    db = SessionLocal()

    try:
        customers = list(
            db.scalars(
                select(Customer)
                .where(Customer.is_active.is_(True))
                .order_by(Customer.id.asc())
            ).all()
        )

        sites_created = 0
        sites_skipped = 0
        equipment_created = 0
        equipment_skipped = 0

        for customer in customers:
            existing_site = db.scalar(
                select(Site).where(
                    Site.customer_id == customer.id,
                    Site.name == "Primary Site",
                )
            )

            if existing_site:
                site = existing_site
                sites_skipped += 1
            else:
                site = Site(
                    customer_id=customer.id,
                    name="Primary Site",
                    site_type="primary",
                    city=customer.city or "Not provided",
                    area="Not provided",
                    address=None,
                    notes="Site location details not fully provided in source records.",
                    is_active=True,
                )

                db.add(site)
                db.flush()

                sites_created += 1

            notes = (customer.notes or "").lower()

            generator_reference = any(
                keyword in notes
                for keyword in [
                    "generator",
                    "maintenance",
                    "service",
                    "amc",
                    "on-call",
                    "electrical",
                ]
            )

            if generator_reference:
                existing_equipment = db.scalar(
                    select(Equipment).where(
                        Equipment.site_id == site.id,
                        Equipment.equipment_type == "generator",
                    )
                )

                if existing_equipment:
                    equipment_skipped += 1
                else:
                    equipment = Equipment(
                        site_id=site.id,
                        equipment_type="generator",
                        brand="Not provided",
                        model="Not provided",
                        capacity_kva=None,
                        capacity_kw=None,
                        fuel_type="Not provided",
                        condition="Not provided",
                        status="unknown",
                        year=None,
                        notes=(
                            "Generator/equipment service reference exists in "
                            "the source records, but specific equipment "
                            "details were not provided."
                        ),
                        is_active=True,
                    )

                    db.add(equipment)
                    equipment_created += 1

        db.commit()

        print("Site and equipment seed complete.")
        print(f"Customers processed: {len(customers)}")
        print(f"Sites created: {sites_created}")
        print(f"Sites skipped: {sites_skipped}")
        print(f"Equipment created: {equipment_created}")
        print(f"Equipment skipped: {equipment_skipped}")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_sites_and_equipment()
