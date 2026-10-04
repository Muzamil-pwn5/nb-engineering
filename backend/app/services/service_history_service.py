from sqlalchemy import select

from app.core.database import SessionLocal
from app.models.equipment import Equipment
from app.models.service_history import ServiceHistory


def create_service_history(data):
    db = SessionLocal()

    try:
        equipment = db.scalar(
            select(Equipment).where(
                Equipment.id == data.equipment_id,
                Equipment.is_active.is_(True),
            )
        )

        if not equipment:
            raise ValueError("Equipment not found")

        record = ServiceHistory(**data.model_dump())

        db.add(record)
        db.commit()
        db.refresh(record)

        return record

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


def get_all_service_history():
    db = SessionLocal()

    try:
        return list(
            db.scalars(
                select(ServiceHistory)
                .order_by(ServiceHistory.id.desc())
            ).all()
        )

    finally:
        db.close()


def get_service_history_by_equipment(equipment_id: int):
    db = SessionLocal()

    try:
        return list(
            db.scalars(
                select(ServiceHistory)
                .where(ServiceHistory.equipment_id == equipment_id)
                .order_by(ServiceHistory.service_date.desc())
            ).all()
        )

    finally:
        db.close()


def get_service_history_by_id(service_history_id: int):
    db = SessionLocal()

    try:
        return db.scalar(
            select(ServiceHistory).where(
                ServiceHistory.id == service_history_id
            )
        )

    finally:
        db.close()
