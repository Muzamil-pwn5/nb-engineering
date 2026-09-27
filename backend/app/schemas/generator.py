from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class GeneratorBase(BaseModel):
    brand_id: int
    name: str
    slug: str
    model: str | None = None
    description: str | None = None
    kva: Decimal | None = None
    kw: Decimal | None = None
    fuel_type: str | None = None
    condition: str | None = None
    year: int | None = None
    engine_model: str | None = None
    alternator_model: str | None = None
    image_url: str | None = None
    is_available: bool = True
    is_featured: bool = False
    is_active: bool = True


class GeneratorResponse(GeneratorBase):
    id: int

    model_config = ConfigDict(from_attributes=True)