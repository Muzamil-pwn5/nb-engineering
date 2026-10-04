from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.inquiry import (
    InquiryCreate,
    InquiryResponse,
    PublicInquiryCreate,
    PublicInquiryResponse,
)
from app.services.inquiry_service import (
    create_inquiry,
    create_public_inquiry,
    get_all_inquiries,
)

router = APIRouter(prefix="/inquiries", tags=["Inquiries"])


@router.post(
    "",
    response_model=PublicInquiryResponse,
    status_code=status.HTTP_201_CREATED,
)
def submit_public_inquiry(
    inquiry_data: PublicInquiryCreate,
    db: Session = Depends(get_db),
):
    return create_public_inquiry(db, inquiry_data)


@router.get(
    "",
    response_model=list[InquiryResponse],
)
def list_inquiries(
    db: Session = Depends(get_db),
):
    return get_all_inquiries(db)
