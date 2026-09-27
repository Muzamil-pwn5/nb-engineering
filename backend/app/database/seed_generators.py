from sqlalchemy import select

from app.core.database import SessionLocal
from app.models.brand import Brand
from app.models.generator import Generator


GENERATORS = [
    {
        "brand_slug": "fg-wilson",
        "name": "FG Wilson P22.5-1S",
        "slug": "fg-wilson-p22-5-1s",
        "model": "P22.5-1S",
        "description": "FG Wilson diesel generator suitable for commercial, industrial and standby power applications.",
        "kva": 22.5,
        "kw": 18,
        "fuel_type": "Diesel",
        "condition": "New",
        "year": None,
        "engine_model": None,
        "alternator_model": None,
        "image_url": None,
        "is_available": True,
        "is_featured": True,
    },
    {
        "brand_slug": "fg-wilson",
        "name": "FG Wilson P110-3",
        "slug": "fg-wilson-p110-3",
        "model": "P110-3",
        "description": "FG Wilson diesel generator designed for dependable commercial and industrial power requirements.",
        "kva": 110,
        "kw": 88,
        "fuel_type": "Diesel",
        "condition": "New",
        "year": None,
        "engine_model": None,
        "alternator_model": None,
        "image_url": None,
        "is_available": True,
        "is_featured": True,
    },
    {
        "brand_slug": "cummins",
        "name": "Cummins C33D5",
        "slug": "cummins-c33d5",
        "model": "C33D5",
        "description": "Cummins diesel generator for standby and commercial power applications.",
        "kva": 33,
        "kw": 26.4,
        "fuel_type": "Diesel",
        "condition": "New",
        "year": None,
        "engine_model": None,
        "alternator_model": None,
        "image_url": None,
        "is_available": True,
        "is_featured": True,
    },
    {
        "brand_slug": "cummins",
        "name": "Cummins C110D5",
        "slug": "cummins-c110d5",
        "model": "C110D5",
        "description": "Cummins diesel generator suitable for commercial and industrial applications.",
        "kva": 110,
        "kw": 88,
        "fuel_type": "Diesel",
        "condition": "New",
        "year": None,
        "engine_model": None,
        "alternator_model": None,
        "image_url": None,
        "is_available": True,
        "is_featured": True,
    },
    {
        "brand_slug": "caterpillar",
        "name": "CAT C18 Generator",
        "slug": "cat-c18-generator",
        "model": "C18",
        "description": "Caterpillar diesel generator solution for demanding industrial and commercial power applications.",
        "kva": 500,
        "kw": 400,
        "fuel_type": "Diesel",
        "condition": "New",
        "year": None,
        "engine_model": "C18",
        "alternator_model": None,
        "image_url": None,
        "is_available": True,
        "is_featured": True,
    },
    {
        "brand_slug": "perkins",
        "name": "Perkins 1104A Generator",
        "slug": "perkins-1104a-generator",
        "model": "1104A",
        "description": "Perkins-powered diesel generator suitable for reliable commercial and standby power.",
        "kva": 60,
        "kw": 48,
        "fuel_type": "Diesel",
        "condition": "New",
        "year": None,
        "engine_model": "1104A",
        "alternator_model": None,
        "image_url": None,
        "is_available": True,
        "is_featured": False,
    },
]


def seed_generators() -> None:
    with SessionLocal() as db:
        for generator_data in GENERATORS:
            brand_slug = generator_data.pop("brand_slug")

            brand = db.scalar(
                select(Brand).where(
                    Brand.slug == brand_slug
                )
            )

            if brand is None:
                print(
                    f"Skipping {generator_data['name']}: "
                    f"brand '{brand_slug}' not found."
                )
                continue

            existing = db.scalar(
                select(Generator).where(
                    Generator.slug == generator_data["slug"]
                )
            )

            if existing:
                continue

            generator = Generator(
                brand_id=brand.id,
                **generator_data,
            )

            db.add(generator)

        db.commit()


def main() -> None:
    seed_generators()
    print("NB Engineering generator seed data inserted successfully.")


if __name__ == "__main__":
    main()