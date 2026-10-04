from fastapi import APIRouter, HTTPException

from app.schemas.contract import (
    ContractCreate,
    ContractResponse,
)
from app.services.contract_service import (
    create_contract,
    get_all_contracts,
    get_contract_by_id,
    get_contracts_by_customer,
    get_contracts_by_site,
)


router = APIRouter(
    prefix="/contracts",
    tags=["Contracts"],
)


@router.post("", response_model=ContractResponse)
def create(data: ContractCreate):
    try:
        return create_contract(data)

    except ValueError as exc:
        raise HTTPException(
            status_code=404,
            detail=str(exc),
        )


@router.get("", response_model=list[ContractResponse])
def get_all():
    return get_all_contracts()


@router.get(
    "/customer/{customer_id}",
    response_model=list[ContractResponse],
)
def get_by_customer(customer_id: int):
    return get_contracts_by_customer(customer_id)


@router.get(
    "/site/{site_id}",
    response_model=list[ContractResponse],
)
def get_by_site(site_id: int):
    return get_contracts_by_site(site_id)


@router.get(
    "/{contract_id}",
    response_model=ContractResponse,
)
def get_one(contract_id: int):
    contract = get_contract_by_id(contract_id)

    if not contract:
        raise HTTPException(
            status_code=404,
            detail="Contract not found",
        )

    return contract
