from sqlalchemy import select

from app.core.database import SessionLocal
from app.models.brand import Brand
from app.models.spare_part import SparePart


SPARE_PARTS = [
    {
        "brand_slug": "fg-wilson",
        "name": "FG Wilson Oil Filter",
        "slug": "fg-wilson-oil-filter",
        "part_number": "FGW-OIL-001",
        "category": "Filters",
        "description": "Oil filter suitable for selected FG Wilson generator applications.",
        "price": None,
        "quantity": 10,
        "image_url": None,
        "is_available": True,
        "is_featured": True,
    },
    {
        "brand_slug": "fg-wilson",
        "name": "FG Wilson Fuel Filter",
        "slug": "fg-wilson-fuel-filter",
        "part_number": "FGW-FUEL-001",
        "category": "Filters",
        "description": "Fuel filter for selected FG Wilson generator applications.",
        "price": None,
        "quantity": 10,
        "image_url": None,
        "is_available": True,
        "is_featured": False,
    },
    {
        "brand_slug": "cummins",
        "name": "Cummins Oil Filter",
        "slug": "cummins-oil-filter",
        "part_number": "CUM-OIL-001",
        "category": "Filters",
        "description": "Oil filter for selected Cummins generator applications.",
        "price": None,
        "quantity": 10,
        "image_url": None,
        "is_available": True,
        "is_featured": True,
    },
    {
        "brand_slug": "cummins",
        "name": "Cummins Fuel Filter",
        "slug": "cummins-fuel-filter",
        "part_number": "CUM-FUEL-001",
        "category": "Filters",
        "description": "Fuel filter for selected Cummins generator applications.",
        "price": None,
        "quantity": 10,
        "image_url": None,
        "is_available": True,
        "is_featured": False,
    },
    {
        "brand_slug": "caterpillar",
        "name": "CAT Oil Filter",
        "slug": "cat-oil-filter",
        "part_number": "CAT-OIL-001",
        "category": "Filters",
        "description": "Oil filter for selected Caterpillar generator applications.",
        "price": None,
        "quantity": 10,
        "image_url": None,
        "is_available": True,
        "is_featured": True,
    },
    {
        "brand_slug": "perkins",
        "name": "Perkins Oil Filter",
        "slug": "perkins-oil-filter",
        "part_number": "PER-OIL-001",
        "category": "Filters",
        "description": "Oil filter for selected Perkins-powered generator applications.",
        "price": None,
        "quantity": 10,
        "image_url": None,
        "is_available": True,
        "is_featured": False,
    },
]


def seed_spare_parts() -> None:
    with SessionLocal() as db:
        for spare_part_data in SPARE_PARTS:
            data = spare_part_data.copy()
            brand_slug = data.pop("brand_slug")

            brand = db.scalar(
                select(Brand).where(
                    Brand.slug == brand_slug
                )
            )

            if brand is None:
                print(
                    f"Skipping {data['name']}: "
                    f"brand '{brand_slug}' not found."
                )
                continue

            existing = db.scalar(
                select(SparePart).where(
                    SparePart.slug == data["slug"]
                )
            )

            if existing:
                continue

            spare_part = SparePart(
                brand_id=brand.id,
                **data,
            )

            db.add(spare_part)

        db.commit()


def main() -> None:
    seed_spare_parts()
    print("NB Engineering spare-part seed data inserted successfully.")


if __name__ == "__main__":
    main()