from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.equipment import EquipmentCreate, EquipmentResponse
from app.services.equipment_service import (
    create_equipment,
    get_all_equipment,
    get_equipment_by_id,
    get_equipment_by_site,
)


router = APIRouter(
    prefix="/equipment",
    tags=["Equipment"],
)


@router.post(
    "",
    response_model=EquipmentResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_equipment_record(
    equipment_data: EquipmentCreate,
    db: Session = Depends(get_db),
):
    try:
        return create_equipment(
            db,
            equipment_data,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )


@router.get(
    "",
    response_model=list[EquipmentResponse],
)
def list_equipment(
    db: Session = Depends(get_db),
):
    return get_all_equipment(db)


@router.get(
    "/site/{site_id}",
    response_model=list[EquipmentResponse],
)
def list_site_equipment(
    site_id: int,
    db: Session = Depends(get_db),
):
    return get_equipment_by_site(
        db,
        site_id,
    )


@router.get(
    "/{equipment_id}",
    response_model=EquipmentResponse,
)
def retrieve_equipment(
    equipment_id: int,
    db: Session = Depends(get_db),
):
    equipment = get_equipment_by_id(
        db,
        equipment_id,
    )

    if equipment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Equipment not found",
        )

    return equipment
