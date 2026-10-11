from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import require_admin
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
from app.services.email_service import (
    InquiryNotificationError,
    send_inquiry_notification,
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
    inquiry = create_public_inquiry(db, inquiry_data)
    try:
        send_inquiry_notification(inquiry)
    except InquiryNotificationError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Your inquiry was saved, but email delivery is temporarily unavailable. Please call or email us directly.",
        ) from exc
    return inquiry


@router.get(
    "",
    response_model=list[InquiryResponse],
)
def list_inquiries(
    db: Session = Depends(get_db),
    _admin: str = Depends(require_admin),
):
    return get_all_inquiries(db)
