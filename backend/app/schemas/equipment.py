from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field


class EquipmentCreate(BaseModel):
    site_id: int

    equipment_type: str = Field(
        min_length=1,
        max_length=50,
    )

    brand: str | None = Field(
        default=None,
        max_length=100,
    )

    model: str | None = Field(
        default=None,
        max_length=150,
    )

    capacity_kva: Decimal | None = None

    capacity_kw: Decimal | None = None

    fuel_type: str | None = Field(
        default=None,
        max_length=50,
    )

    condition: str | None = Field(
        default=None,
        max_length=50,
    )

    status: str = Field(
        default="unknown",
        max_length=30,
    )

    year: int | None = None

    notes: str | None = None


class EquipmentResponse(EquipmentCreate):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )
