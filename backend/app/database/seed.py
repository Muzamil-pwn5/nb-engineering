from sqlalchemy import select

from app.core.database import SessionLocal
from app.models.brand import Brand
from app.models.service import Service


BRANDS = [
    {
        "name": "FG Wilson",
        "slug": "fg-wilson",
        "description": "FG Wilson diesel generator solutions.",
    },
    {
        "name": "Cummins",
        "slug": "cummins",
        "description": "Cummins generator and power generation solutions.",
    },
    {
        "name": "Caterpillar",
        "slug": "caterpillar",
        "description": "Caterpillar power generation equipment and solutions.",
    },
    {
        "name": "Perkins",
        "slug": "perkins",
        "description": "Perkins-powered generator solutions.",
    },
]


SERVICES = [
    {
        "name": "Generator Sales",
        "slug": "generator-sales",
        "description": "Sale of generators and complete power generation solutions.",
        "is_featured": True,
    },
    {
        "name": "Generator Purchase",
        "slug": "generator-purchase",
        "description": "Purchase and sourcing of generators according to customer requirements.",
        "is_featured": False,
    },
    {
        "name": "Generator Rental",
        "slug": "generator-rental",
        "description": "Generator rental solutions for temporary and project-based power requirements.",
        "is_featured": True,
    },
    {
        "name": "Generator Repair",
        "slug": "generator-repair",
        "description": "Generator inspection, troubleshooting, repair and restoration services.",
        "is_featured": True,
    },
    {
        "name": "Generator Maintenance",
        "slug": "generator-maintenance",
        "description": "Preventive and corrective generator maintenance services.",
        "is_featured": True,
    },
    {
        "name": "ATS Panels",
        "slug": "ats-panels",
        "description": "Automatic Transfer Switch panel solutions for reliable power transfer.",
        "is_featured": True,
    },
    {
        "name": "Spare Parts",
        "slug": "spare-parts",
        "description": "Generator spare parts and replacement components.",
        "is_featured": True,
    },
    {
        "name": "Canopy Work",
        "slug": "canopy-work",
        "description": "Generator canopy fabrication and related engineering work.",
        "is_featured": False,
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


def seed_services() -> None:
    with SessionLocal() as db:
        for service_data in SERVICES:
            existing = db.scalar(
                select(Service).where(
                    Service.slug == service_data["slug"]
                )
            )

            if existing:
                continue

            db.add(Service(**service_data))

        db.commit()


def main() -> None:
    seed_brands()
    seed_services()

    print("NB Engineering seed data inserted successfully.")


if __name__ == "__main__":
    main()