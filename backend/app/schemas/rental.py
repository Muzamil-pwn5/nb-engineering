from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field


class RentalRequestCreate(BaseModel):
    customer_id: int
    generator_id: int | None = None
    required_kva: int | None = Field(default=None, gt=0)
    start_date: date
    end_date: date | None = None
    location: str
    notes: str | None = None


class RentalRequestResponse(RentalRequestCreate):
    id: int
    status: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)