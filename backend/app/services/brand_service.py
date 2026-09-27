from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.brand import Brand


def get_all_brands(db: Session) -> list[Brand]:
    statement = (
        select(Brand)
        .where(Brand.is_active.is_(True))
        .order_by(Brand.name.asc())
    )

    return list(db.scalars(statement).all())


def get_brand_by_slug(db: Session, slug: str) -> Brand | None:
    statement = select(Brand).where(
        Brand.slug == slug,
        Brand.is_active.is_(True),
    )

    return db.scalar(statement)