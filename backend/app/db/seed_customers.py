from sqlalchemy import select

from app.core.database import SessionLocal
from app.models.customer import Customer


CUSTOMERS = [
    # Banks / Financial
    ("Habib Bank Ltd", "bank", "North Zone", "Reference indicates on-call generator/service work."),
    ("Dubai Islamic Bank", "bank", "North Zone", "Reference indicates AMC/service work."),
    ("Al Baraka Bank", "bank", "North Zone", "Reference indicates on-call generator/service work."),
    ("Burj Bank", "bank", "Multiple locations", "Generator/service reference."),
    ("HBL", "bank", "Rawalpindi", "Generator reference."),
    ("Summit Bank", "bank", "Islamabad", "Generator/service work reference."),

    # Embassies / Diplomatic
    ("Ethiopia Embassy", "embassy", "Islamabad", "Reference in company records."),
    ("Mauritius Embassy", "embassy", "Islamabad", "Reference includes maintenance-contract material."),
    ("Romania Embassy", "embassy", "Islamabad", "Reference in company records."),
    ("Bangladesh Embassy", "embassy", "Islamabad", "Reference in company records."),
    ("Egypt Embassy", "embassy", "Islamabad", "Reference in company records."),
    ("Mauritius High Commission", "high_commission", "Islamabad", "Reference in company records."),

    # Hotels / Hospitality
    ("Serena Hotel", "hotel", "Islamabad", "Hospitality reference."),
    ("Zefra Restaurant", "restaurant", "Islamabad", "Hospitality reference."),
    ("Hotel Albader", "hotel", "Rawalpindi", "Hospitality reference."),
    ("R.K. Hotel", "hotel", "Islamabad", "Hospitality reference."),
    ("Ambassador Hotel & Sweets", "hotel", "Islamabad", "Hospitality reference."),
    ("Ramada Hotel", "hotel", "Islamabad", "Hospitality reference."),
    ("Grand Arena Hotel", "hotel", "Rawalpindi", "Hospitality reference."),
    ("Potohar Hotel", "hotel", "Rawalpindi", "Hospitality reference."),
    ("Sarosh Wedding Complex", "hospitality", None, "Hospitality/event venue reference."),
    ("Pakistan Marriage Hall", "hospitality", "Islamabad", "Hospitality/event venue reference."),
    ("Rawal Banquet Hall", "hospitality", "Rawalpindi", "Hospitality/event venue reference."),

    # Healthcare
    ("KKT Hospital", "hospital", "Rawalpindi", "Healthcare reference."),
    ("Azmat Rasheed Hospital", "hospital", "Rawalpindi", "Healthcare reference."),
    ("Batool Hospital", "hospital", None, "Healthcare reference."),
    ("Hayat Wali Hospital", "hospital", "Rawalpindi", "Healthcare reference."),
    ("Instant Health Care", "healthcare", None, "Healthcare reference."),
    ("Nusrat Hospital", "hospital", "Rawalpindi", "Healthcare reference."),

    # Corporate / Commercial
    ("Base Line 110", "corporate", "Islamabad", "Corporate/commercial reference."),
    ("CPPA", "corporate", "Islamabad", "Corporate/public-sector reference."),
    ("Teresol Pvt Ltd", "corporate", "Islamabad", "Corporate reference."),
    ("Family Cash & Carry", "commercial", "Islamabad", "Commercial reference."),
    ("SMEC", "corporate", "Islamabad", "Corporate reference."),
    ("W&A Builders", "construction", "DHA", "Construction reference."),
    ("Depilex", "commercial", "Islamabad", "Commercial reference."),
    ("Pac Square", "commercial", "Islamabad", "Commercial reference."),
    ("Protege Global", "corporate", "Islamabad", "Corporate reference."),
    ("Green Tower Building", "commercial", "Islamabad", "Commercial/building reference."),
    ("SMS Security", "security", "Islamabad", "Security-services reference."),
    ("App Snapp Office", "corporate", "Gulberg Greens", "Office reference."),
    ("High Precision Engineering", "engineering", "Islamabad", "Engineering reference."),
    ("Eracon Technologies", "technology", "Rawalpindi", "Technology reference."),
    ("Errands Services", "services", None, "Services reference."),
    ("Over Step BPO", "bpo", "Rawalpindi", "BPO reference."),
    ("Pakistan Steel", "industrial", "Rawalpindi", "Industrial reference."),
    ("Atlas Honda", "automotive", "Rawalpindi", "Automotive reference."),
    ("Atlas Battery Warehouse", "automotive", "Islamabad", "Warehouse/automotive reference."),
    ("Sehgal Motors", "automotive", "Rawalpindi", "Automotive reference."),
    ("LOK Virsa", "institution", "Islamabad", "Institutional reference."),
    ("Bake Man Warehouse", "commercial", "Islamabad", "Warehouse/commercial reference."),
    ("Rahat Bakers", "commercial", "Rawalpindi", "Commercial reference."),
    ("OTRP Scheme 3", "commercial", "Rawalpindi", "Reference in company records."),
    ("Out Fitters Clothing", "retail", None, "Retail reference."),
    ("All Honda Office", "automotive", "Rawalpindi", "Automotive/office reference."),

    # Government / Public Sector
    ("Motorway Police", "government", "North Zone", "Government/public-sector reference."),
    ("Custom House", "government", "Islamabad", "Government/public-sector reference."),
    ("Revenue Office", "government", "Gujar Khan", "Government/public-sector reference."),
    ("Revenue Office / Exchange", "government", "Chakwal", "Government/public-sector reference."),
    ("Revenue Office", "government", "Wah Cantt", "Government/public-sector reference."),

    # Telecom
    ("Apollo Telecom (Pvt) Ltd", "telecom", None, "Purchase-order references for electrical and earthing work."),
    ("Relacom", "telecom", None, "Purchase-order references for electrical/site work."),
]


def seed_customers() -> None:
    db = SessionLocal()

    try:
        created = 0
        skipped = 0

        for name, organization_type, city, notes in CUSTOMERS:
            existing = db.scalar(
                select(Customer).where(
                    Customer.name == name,
                    Customer.city == city,
                )
            )

            if existing:
                skipped += 1
                continue

            customer = Customer(
                name=name,
                customer_type="organization",
                organization_type=organization_type,
                relationship_status="unknown",
                phone=None,
                email=None,
                company=None,
                address=None,
                city=city,
                notes=notes,
                is_active=True,
            )

            db.add(customer)
            created += 1

        db.commit()

        print("Customer seed complete.")
        print(f"Created: {created}")
        print(f"Skipped existing: {skipped}")
        print(f"Total seed records: {len(CUSTOMERS)}")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_customers()
