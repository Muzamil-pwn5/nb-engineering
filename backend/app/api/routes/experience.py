from collections import defaultdict

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.customer import Customer
from app.models.site import Site
from app.models.equipment import Equipment
from app.models.service_history import ServiceHistory
from app.models.contract import Contract


router = APIRouter(
    prefix="/experience",
    tags=["Public Experience"],
)


SECTORS = [
    {
        "name": "Banks / Financial",
        "description": "Power infrastructure for banking and financial operations.",
    },
    {
        "name": "Embassies / Diplomatic",
        "description": "Dependable power support for diplomatic facilities.",
    },
    {
        "name": "Hotels / Hospitality",
        "description": "Power systems supporting hospitality and guest operations.",
    },
    {
        "name": "Healthcare",
        "description": "Generator and electrical support for healthcare environments.",
    },
    {
        "name": "Corporate / Commercial",
        "description": "Power solutions for commercial and business facilities.",
    },
    {
        "name": "Government / Public Sector",
        "description": "Infrastructure support across public-sector facilities.",
    },
]


def classify_sector(customer: Customer) -> str | None:
    value = " ".join(
        filter(
            None,
            [
                customer.organization_type,
                customer.name,
                customer.notes,
            ],
        )
    ).lower()

    if "telecom" in value or "relacom" in value or "apollo telecom" in value:
        return None

    if "bank" in value or "financial" in value:
        return "Banks / Financial"

    if (
        "embassy" in value
        or "high commission" in value
        or "diplomatic" in value
    ):
        return "Embassies / Diplomatic"

    if (
        "hotel" in value
        or "restaurant" in value
        or "banquet" in value
        or "marriage hall" in value
        or "wedding" in value
    ):
        return "Hotels / Hospitality"

    if (
        "hospital" in value
        or "health" in value
        or "clinic" in value
    ):
        return "Healthcare"

    if (
        "government" in value
        or "public sector" in value
        or "motorway" in value
        or "custom" in value
        or "revenue" in value
    ):
        return "Government / Public Sector"

    return "Corporate / Commercial"


@router.get("")
def get_public_experience(
    db: Session = Depends(get_db),
):
    customers = list(
        db.scalars(
            select(Customer).order_by(Customer.name)
        ).all()
    )

    sites = list(
        db.scalars(
            select(Site)
        ).all()
    )

    equipment = list(
        db.scalars(
            select(Equipment)
        ).all()
    )

    service_history = list(
        db.scalars(
            select(ServiceHistory)
        ).all()
    )

    contracts = list(
        db.scalars(
            select(Contract)
        ).all()
    )

    sites_by_customer = defaultdict(list)

    for site in sites:
        sites_by_customer[site.customer_id].append(site)

    equipment_by_site = defaultdict(list)

    for item in equipment:
        equipment_by_site[item.site_id].append(item)

    service_by_equipment = defaultdict(list)

    for record in service_history:
        service_by_equipment[record.equipment_id].append(record)

    contracts_by_customer = defaultdict(list)

    for contract in contracts:
        contracts_by_customer[contract.customer_id].append(contract)

    sector_lookup = {
        sector["name"]: {
            "name": sector["name"],
            "description": sector["description"],
            "customers": [],
        }
        for sector in SECTORS
    }

    visible_customers = []

    for customer in customers:
        sector = classify_sector(customer)

        if sector is None:
            continue

        customer_sites = sites_by_customer[customer.id]

        equipment_count = sum(
            len(equipment_by_site[site.id])
            for site in customer_sites
        )

        service_count = 0

        for site in customer_sites:
            for item in equipment_by_site[site.id]:
                service_count += len(
                    service_by_equipment[item.id]
                )

        customer_data = {
            "id": customer.id,
            "name": customer.name,
            "city": customer.city or "Location not provided",
            "sector": sector,
            "sites": len(customer_sites),
            "equipment": equipment_count,
            "service_records": service_count,
            "contracts": len(
                contracts_by_customer[customer.id]
            ),
        }

        sector_lookup[sector]["customers"].append(
            customer_data
        )

        visible_customers.append(customer_data)

    sectors = []

    for sector in SECTORS:
        data = sector_lookup[sector["name"]]

        data["customers"].sort(
            key=lambda item: item["name"].lower()
        )

        data["organization_count"] = len(
            data["customers"]
        )

        sectors.append(data)

    return {
        "stats": {
            "organizations": len(visible_customers),
            "sectors": sum(
                1
                for sector in sectors
                if sector["organization_count"] > 0
            ),
            "sites": sum(
                item["sites"]
                for item in visible_customers
            ),
            "equipment": sum(
                item["equipment"]
                for item in visible_customers
            ),
            "service_records": sum(
                item["service_records"]
                for item in visible_customers
            ),
            "contracts": sum(
                item["contracts"]
                for item in visible_customers
            ),
        },
        "sectors": sectors,
        "capabilities": [
            "Generator Sales",
            "Generator Purchase",
            "Generator Rental",
            "Generator Repair",
            "Generator Maintenance",
            "ATS / AMF Panels",
            "Electrical Work",
            "Spare Parts",
            "Installation & Commissioning",
        ],
    }
