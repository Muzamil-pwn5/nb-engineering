from fastapi import APIRouter, HTTPException

from app.schemas.contact import (
    ContactCreate,
    ContactResponse,
)
from app.services.contact_service import (
    create_contact,
    get_all_contacts,
    get_contact_by_id,
    get_contacts_by_customer,
    get_contacts_by_site,
)


router = APIRouter(
    prefix="/contacts",
    tags=["Contacts"],
)


@router.post("", response_model=ContactResponse)
def create(data: ContactCreate):
    try:
        return create_contact(data)

    except ValueError as exc:
        raise HTTPException(
            status_code=404,
            detail=str(exc),
        )


@router.get("", response_model=list[ContactResponse])
def get_all():
    return get_all_contacts()


@router.get(
    "/customer/{customer_id}",
    response_model=list[ContactResponse],
)
def get_by_customer(customer_id: int):
    return get_contacts_by_customer(customer_id)


@router.get(
    "/site/{site_id}",
    response_model=list[ContactResponse],
)
def get_by_site(site_id: int):
    return get_contacts_by_site(site_id)


@router.get(
    "/{contact_id}",
    response_model=ContactResponse,
)
def get_one(contact_id: int):
    contact = get_contact_by_id(contact_id)

    if not contact:
        raise HTTPException(
            status_code=404,
            detail="Contact not found",
        )

    return contact
