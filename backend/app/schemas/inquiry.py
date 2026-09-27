from datetime import datetime

from pydantic import BaseModel, ConfigDict


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