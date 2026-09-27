from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.service import Service


def get_all_services(db: Session) -> list[Service]:
    statement = (
        select(Service)
        .where(Service.is_active.is_(True))
        .order_by(Service.name.asc())
    )

    return list(db.scalars(statement).all())


def get_service_by_slug(
    db: Session,
    slug: str,
) -> Service | None:
    statement = select(Service).where(
        Service.slug == slug,
        Service.is_active.is_(True),
    )

    return db.scalar(statement)