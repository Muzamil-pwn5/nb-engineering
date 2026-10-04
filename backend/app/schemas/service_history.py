from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field


class ServiceHistoryCreate(BaseModel):
    equipment_id: int
    service_type: str = Field(min_length=1, max_length=80)
    service_date: date | None = None
    issue: str | None = None
    work_performed: str | None = None
    findings: str | None = None
    parts_used: str | None = None
    status: str = Field(default="unknown", max_length=30)
    notes: str | None = None


class ServiceHistoryResponse(ServiceHistoryCreate):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
