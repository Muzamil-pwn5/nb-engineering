from fastapi import APIRouter, HTTPException

from app.schemas.service_history import (
    ServiceHistoryCreate,
    ServiceHistoryResponse,
)
from app.services.service_history_service import (
    create_service_history,
    get_all_service_history,
    get_service_history_by_equipment,
    get_service_history_by_id,
)

router = APIRouter(prefix="/service-history", tags=["Service History"])


@router.post("", response_model=ServiceHistoryResponse)
def create(data: ServiceHistoryCreate):
    try:
        return create_service_history(data)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc))


@router.get("", response_model=list[ServiceHistoryResponse])
def get_all():
    return get_all_service_history()


@router.get(
    "/equipment/{equipment_id}",
    response_model=list[ServiceHistoryResponse],
)
def get_by_equipment(equipment_id: int):
    return get_service_history_by_equipment(equipment_id)


@router.get(
    "/{service_history_id}",
    response_model=ServiceHistoryResponse,
)
def get_one(service_history_id: int):
    record = get_service_history_by_id(service_history_id)

    if not record:
        raise HTTPException(
            status_code=404,
            detail="Service history record not found",
        )

    return record
