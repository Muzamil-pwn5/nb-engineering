from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class PublicInquiryCreate(BaseModel):
    name: str = Field(min_length=1, max_length=150)
    phone: str = Field(min_length=1, max_length=50)
    email: str | None = Field(default=None, max_length=255)
    service: str = Field(min_length=1, max_length=50)
    message: str = Field(min_length=1, max_length=5000)


class InquiryCreate(BaseModel):
    customer_id: int
    inquiry_type: str
    subject: str | None = None
    message: str


class InquiryResponse(InquiryCreate):
    id: int
    status: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class PublicInquiryResponse(BaseModel):
    id: int
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
