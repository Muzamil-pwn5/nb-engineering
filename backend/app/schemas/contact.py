from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ContactCreate(BaseModel):
    customer_id: int
    site_id: int | None = None
    name: str = Field(min_length=1, max_length=150)
    role: str | None = Field(default=None, max_length=100)
    department: str | None = Field(default=None, max_length=100)
    notes: str | None = None


class ContactResponse(ContactCreate):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
