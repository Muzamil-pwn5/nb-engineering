from sqlalchemy import select

from app.core.database import SessionLocal
from app.models.customer import Customer
from app.models.equipment import Equipment
from app.models.service_history import ServiceHistory


def seed_service_history() -> None:
    db = SessionLocal()

    try:
        equipment_records = list(
            db.scalars(
                select(Equipment)
                .join(Equipment.site)
                .join(Equipment.site.property.mapper.class_.customer)
                .where(
                    Equipment.is_active.is_(True),
                    Equipment.equipment_type == "generator",
                )
                .order_by(Equipment.id.asc())
            ).all()
        )

        created = 0
        skipped = 0

        for equipment in equipment_records:
            existing = db.scalar(
                select(ServiceHistory).where(
                    ServiceHistory.equipment_id == equipment.id
                )
            )

            if existing:
                skipped += 1
                continue

            customer = db.scalar(
                select(Customer)
                .join(Customer.sites)
                .join(Customer.sites.property.mapper.class_.equipment)
                .where(
                    Equipment.id == equipment.id
                )
            )

            if not customer:
                continue

            source_notes = customer.notes or ""

            service_type = None

            notes_lower = source_notes.lower()

            if "amc" in notes_lower:
                service_type = "AMC / Maintenance"
            elif "maintenance" in notes_lower:
                service_type = "Maintenance"
            elif "repair" in notes_lower:
                service_type = "Repair"
            elif "service" in notes_lower:
                service_type = "Service"
            elif "generator" in notes_lower:
                service_type = "Generator Service"

            if not service_type:
                continue

            record = ServiceHistory(
                equipment_id=equipment.id,
                service_type=service_type,
                service_date=None,
                issue=None,
                work_performed=None,
                findings=None,
                parts_used=None,
                status="unknown",
                notes=(
                    "Service reference identified in the source records. "
                    "Specific service date, issue, work performed, findings, "
                    "and parts were not provided."
                ),
            )

            db.add(record)
            created += 1

        db.commit()

        print("SERVICE HISTORY SEED COMPLETE")
        print(f"EQUIPMENT PROCESSED: {len(equipment_records)}")
        print(f"RECORDS CREATED: {created}")
        print(f"RECORDS SKIPPED: {skipped}")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_service_history()
