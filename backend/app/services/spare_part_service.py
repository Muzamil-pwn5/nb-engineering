from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.spare_part import SparePart


def get_all_spare_parts(db: Session) -> list[SparePart]:
    statement = (
        select(SparePart)
        .where(SparePart.is_active.is_(True))
        .order_by(SparePart.name.asc())
    )

    return list(db.scalars(statement).all())


def get_spare_part_by_slug(
    db: Session,
    slug: str,
) -> SparePart | None:
    statement = select(SparePart).where(
        SparePart.slug == slug,
        SparePart.is_active.is_(True),
    )

    return db.scalar(statement)