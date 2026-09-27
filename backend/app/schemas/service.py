from pydantic import BaseModel, ConfigDict


class ServiceBase(BaseModel):
    name: str
    slug: str
    description: str | None = None
    image_url: str | None = None
    is_featured: bool = False
    is_active: bool = True


class ServiceResponse(ServiceBase):
    id: int

    model_config = ConfigDict(from_attributes=True)