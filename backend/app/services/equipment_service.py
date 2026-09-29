from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.equipment import Equipment
from app.models.site import Site
from app.schemas.equipment import EquipmentCreate


def create_equipment(
    db: Session,
    equipment_data: EquipmentCreate,
) -> Equipment:
    site = db.scalar(
        select(Site).where(
            Site.id == equipment_data.site_id,
            Site.is_active.is_(True),
        )
    )

    if site is None:
        raise ValueError("Site not found")

    equipment = Equipment(
        **equipment_data.model_dump(),
    )

    db.add(equipment)
    db.commit()
    db.refresh(equipment)

    return equipment


def get_all_equipment(
    db: Session,
) -> list[Equipment]:
    statement = (
        select(Equipment)
        .where(Equipment.is_active.is_(True))
        .order_by(Equipment.id.asc())
    )

    return list(db.scalars(statement).all())


def get_equipment_by_site(
    db: Session,
    site_id: int,
) -> list[Equipment]:
    statement = (
        select(Equipment)
        .where(
            Equipment.site_id == site_id,
            Equipment.is_active.is_(True),
        )
        .order_by(Equipment.id.asc())
    )

    return list(db.scalars(statement).all())


def get_equipment_by_id(
    db: Session,
    equipment_id: int,
) -> Equipment | None:
    statement = select(Equipment).where(
        Equipment.id == equipment_id,
        Equipment.is_active.is_(True),
    )

    return db.scalar(statement)
