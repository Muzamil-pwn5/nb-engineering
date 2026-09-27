from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class SparePartBase(BaseModel):
    brand_id: int | None = None
    name: str
    slug: str
    part_number: str | None = None
    category: str | None = None
    description: str | None = None
    price: Decimal | None = None
    quantity: int = 0
    image_url: str | None = None
    is_available: bool = True
    is_featured: bool = False
    is_active: bool = True


class SparePartResponse(SparePartBase):
    id: int

    model_config = ConfigDict(from_attributes=True)