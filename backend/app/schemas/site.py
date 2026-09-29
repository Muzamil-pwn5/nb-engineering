from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class SiteCreate(BaseModel):
    customer_id: int

    name: str = Field(
        min_length=1,
        max_length=150,
    )

    site_type: str | None = Field(
        default=None,
        max_length=50,
    )

    city: str | None = Field(
        default=None,
        max_length=100,
    )

    area: str | None = Field(
        default=None,
        max_length=150,
    )

    address: str | None = None

    notes: str | None = None


class SiteResponse(SiteCreate):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )
