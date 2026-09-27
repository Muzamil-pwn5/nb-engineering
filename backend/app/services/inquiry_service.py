from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.inquiry import Inquiry
from app.schemas.inquiry import InquiryCreate


def create_inquiry(
    db: Session,
    inquiry_data: InquiryCreate,
) -> Inquiry:
    inquiry = Inquiry(
        **inquiry_data.model_dump(),
    )

    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)

    return inquiry


def get_all_inquiries(
    db: Session,
) -> list[Inquiry]:
    statement = (
        select(Inquiry)
        .order_by(Inquiry.created_at.desc())
    )

    return list(db.scalars(statement).all())