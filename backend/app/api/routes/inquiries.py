import logging

from fastapi import APIRouter, BackgroundTasks, Depends, status
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
from app.services.email_service import send_inquiry_notification

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/inquiries", tags=["Inquiries"])


@router.post(
    "",
    response_model=PublicInquiryResponse,
    status_code=status.HTTP_201_CREATED,
)
def submit_public_inquiry(
    inquiry_data: PublicInquiryCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    inquiry = create_public_inquiry(db, inquiry_data)
    background_tasks.add_task(_send_notification_safely, inquiry.id)
    return inquiry


def _send_notification_safely(inquiry_id: int) -> None:
    from app.core.database import SessionLocal
    from app.models.inquiry import Inquiry

    db = SessionLocal()
    try:
        inquiry = db.get(Inquiry, inquiry_id)
        if inquiry is not None:
            send_inquiry_notification(inquiry)
    except Exception:
        logger.exception("Unable to deliver notification for inquiry %s", inquiry_id)
    finally:
        db.close()


@router.get(
    "",
    response_model=list[InquiryResponse],
)
def list_inquiries(
    db: Session = Depends(get_db),
    _admin: str = Depends(require_admin),
):
    return get_all_inquiries(db)
