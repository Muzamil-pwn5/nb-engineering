from pydantic import BaseModel, ConfigDict


class BrandBase(BaseModel):
    name: str
    slug: str
    description: str | None = None
    logo_url: str | None = None
    is_active: bool = True


class BrandResponse(BrandBase):
    id: int

    model_config = ConfigDict(from_attributes=True)