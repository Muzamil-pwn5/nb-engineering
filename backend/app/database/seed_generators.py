from sqlalchemy import select

from app.core.database import SessionLocal
from app.models.brand import Brand
from app.models.generator import Generator


BRANDS = [
    {
        "name": "Doosan",
        "slug": "doosan",
        "description": "Doosan diesel generator and power generation solutions.",
        "logo_url": None,
        "is_active": True,
    },
    {
        "name": "JCB",
        "slug": "jcb",
        "description": "JCB diesel generator solutions for commercial, industrial and rental applications.",
        "logo_url": None,
        "is_active": True,
    },
]


GENERATORS = [
    # =========================================================
    # EXISTING CATALOGUE
    # =========================================================
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

    # =========================================================
    # DOOSAN
    # =========================================================
    {
        "brand_slug": "doosan",
        "name": "Doosan G60XW",
        "slug": "doosan-g60xw",
        "model": "G60XW",
        "description": "Doosan diesel generator for commercial, industrial and standby power applications.",
        "kva": 58,
        "kw": 46.4,
        "fuel_type": "Diesel",
        "condition": "New",
        "year": None,
        "engine_model": "DB58",
        "alternator_model": None,
        "image_url": None,
        "is_available": True,
        "is_featured": True,
    },
    {
        "brand_slug": "doosan",
        "name": "Doosan G80XW",
        "slug": "doosan-g80xw",
        "model": "G80XW",
        "description": "Doosan diesel generator designed for dependable commercial and industrial power requirements.",
        "kva": 82,
        "kw": 65.6,
        "fuel_type": "Diesel",
        "condition": "New",
        "year": None,
        "engine_model": "DP066TA",
        "alternator_model": None,
        "image_url": None,
        "is_available": True,
        "is_featured": True,
    },
    {
        "brand_slug": "doosan",
        "name": "Doosan G115XW",
        "slug": "doosan-g115xw",
        "model": "G115XW",
        "description": "Doosan diesel generator for commercial and industrial power applications.",
        "kva": 115,
        "kw": 92,
        "fuel_type": "Diesel",
        "condition": "New",
        "year": None,
        "engine_model": "DP066LA",
        "alternator_model": None,
        "image_url": None,
        "is_available": True,
        "is_featured": True,
    },
    {
        "brand_slug": "doosan",
        "name": "Doosan G150XW",
        "slug": "doosan-g150xw",
        "model": "G150XW",
        "description": "Doosan diesel generator engineered for reliable medium-capacity industrial power.",
        "kva": 146,
        "kw": 116.8,
        "fuel_type": "Diesel",
        "condition": "New",
        "year": None,
        "engine_model": "DP086TA",
        "alternator_model": None,
        "image_url": None,
        "is_available": True,
        "is_featured": False,
    },
    {
        "brand_slug": "doosan",
        "name": "Doosan G200XW",
        "slug": "doosan-g200xw",
        "model": "G200XW",
        "description": "Doosan diesel generator for higher-demand commercial and industrial applications.",
        "kva": 197,
        "kw": 157.6,
        "fuel_type": "Diesel",
        "condition": "New",
        "year": None,
        "engine_model": "P086TI",
        "alternator_model": None,
        "image_url": None,
        "is_available": True,
        "is_featured": True,
    },

    # =========================================================
    # JCB
    # =========================================================
    {
        "brand_slug": "jcb",
        "name": "JCB G40RS V",
        "slug": "jcb-g40rs-v",
        "model": "G40RS V",
        "description": "JCB diesel rental generator designed for flexible prime and standby power applications.",
        "kva": 40,
        "kw": 32,
        "fuel_type": "Diesel",
        "condition": "New",
        "year": None,
        "engine_model": None,
        "alternator_model": None,
        "image_url": None,
        "is_available": True,
        "is_featured": False,
    },
    {
        "brand_slug": "jcb",
        "name": "JCB G60RS V",
        "slug": "jcb-g60rs-v",
        "model": "G60RS V",
        "description": "JCB diesel generator for commercial, construction and temporary power requirements.",
        "kva": 58,
        "kw": 46,
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
        "brand_slug": "jcb",
        "name": "JCB G100RS V",
        "slug": "jcb-g100rs-v",
        "model": "G100RS V",
        "description": "JCB diesel generator providing 100 kVA prime power for demanding commercial applications.",
        "kva": 100,
        "kw": 80,
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
        "brand_slug": "jcb",
        "name": "JCB G150RS V",
        "slug": "jcb-g150rs-v",
        "model": "G150RS V",
        "description": "JCB diesel generator for higher-capacity commercial and industrial power requirements.",
        "kva": 150,
        "kw": 120,
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
        "brand_slug": "jcb",
        "name": "JCB G200RS V",
        "slug": "jcb-g200rs-v",
        "model": "G200RS V",
        "description": "JCB diesel generator for substantial commercial, industrial and rental power requirements.",
        "kva": 200,
        "kw": 160,
        "fuel_type": "Diesel",
        "condition": "New",
        "year": None,
        "engine_model": None,
        "alternator_model": None,
        "image_url": None,
        "is_available": True,
        "is_featured": True,
    },
]


def seed_brands() -> None:
    with SessionLocal() as db:
        for brand_data in BRANDS:
            existing = db.scalar(
                select(Brand).where(
                    Brand.slug == brand_data["slug"]
                )
            )

            if existing:
                continue

            db.add(Brand(**brand_data))

        db.commit()


def seed_generators() -> None:
    with SessionLocal() as db:
        for original_data in GENERATORS:
            generator_data = {
                **original_data
            }

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
    seed_brands()
    seed_generators()

    print(
        "NB Engineering generator and brand seed data "
        "inserted successfully."
    )


if __name__ == "__main__":
    main()
