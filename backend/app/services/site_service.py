from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.models.site import Site
from app.schemas.site import SiteCreate


def create_site(
    db: Session,
    site_data: SiteCreate,
) -> Site:
    customer = db.scalar(
        select(Customer).where(
            Customer.id == site_data.customer_id,
            Customer.is_active.is_(True),
        )
    )

    if customer is None:
        raise ValueError("Customer not found")

    site = Site(**site_data.model_dump())

    db.add(site)
    db.commit()
    db.refresh(site)

    return site


def get_all_sites(
    db: Session,
) -> list[Site]:
    statement = (
        select(Site)
        .where(Site.is_active.is_(True))
        .order_by(Site.name.asc())
    )

    return list(db.scalars(statement).all())


def get_sites_by_customer(
    db: Session,
    customer_id: int,
) -> list[Site]:
    statement = (
        select(Site)
        .where(
            Site.customer_id == customer_id,
            Site.is_active.is_(True),
        )
        .order_by(Site.name.asc())
    )

    return list(db.scalars(statement).all())


def get_site_by_id(
    db: Session,
    site_id: int,
) -> Site | None:
    statement = select(Site).where(
        Site.id == site_id,
        Site.is_active.is_(True),
    )

    return db.scalar(statement)
