from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class CustomerCreate(BaseModel):
    name: str = Field(min_length=1, max_length=150)

    customer_type: str = Field(
        default="individual",
        pattern="^(individual|organization)$",
    )

    organization_type: str | None = Field(
        default=None,
        max_length=50,
    )

    relationship_status: str = Field(
        default="unknown",
        pattern="^(unknown|active|former)$",
    )

    phone: str | None = Field(
        default=None,
        max_length=50,
    )

    email: str | None = Field(
        default=None,
        max_length=255,
    )

    company: str | None = Field(
        default=None,
        max_length=200,
    )

    address: str | None = None

    city: str | None = Field(
        default=None,
        max_length=100,
    )

    notes: str | None = None


class CustomerResponse(CustomerCreate):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
