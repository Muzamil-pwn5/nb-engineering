from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field


class ContractCreate(BaseModel):
    customer_id: int
    site_id: int | None = None
    contract_type: str = Field(min_length=1, max_length=80)
    title: str = Field(min_length=1, max_length=200)
    start_date: date | None = None
    end_date: date | None = None
    status: str = Field(default="unknown", max_length=30)
    scope: str | None = None
    notes: str | None = None


class ContractResponse(ContractCreate):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
