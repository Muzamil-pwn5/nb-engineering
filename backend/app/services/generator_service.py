from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.generator import Generator


def get_all_generators(db: Session) -> list[Generator]:
    statement = (
        select(Generator)
        .where(Generator.is_active.is_(True))
        .order_by(Generator.name.asc())
    )

    return list(db.scalars(statement).all())


def get_generator_by_slug(
    db: Session,
    slug: str,
) -> Generator | None:
    statement = select(Generator).where(
        Generator.slug == slug,
        Generator.is_active.is_(True),
    )

    return db.scalar(statement)