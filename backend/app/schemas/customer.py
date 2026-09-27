from datetime import datetime

from pydantic import BaseModel, ConfigDict


class CustomerCreate(BaseModel):
    name: str
    phone: str
    email: str | None = None
    company: str | None = None
    address: str | None = None
    city: str | None = None
    notes: str | None = None


class CustomerResponse(CustomerCreate):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)