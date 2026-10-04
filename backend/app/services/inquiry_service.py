from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.models.inquiry import Inquiry
from app.schemas.inquiry import InquiryCreate, PublicInquiryCreate
from app.services.email_service import send_inquiry_notification


def create_public_inquiry(
    db: Session,
    inquiry_data: PublicInquiryCreate,
) -> Inquiry:
    name = inquiry_data.name.strip()
    phone = inquiry_data.phone.strip()
    email = (
        str(inquiry_data.email).strip().lower()
        if inquiry_data.email
        else None
    )
    service = inquiry_data.service.strip()
    message = inquiry_data.message.strip()

    lookup_conditions = [Customer.phone == phone]

    if email:
        lookup_conditions.insert(0, Customer.email == email)

    statement = (
        select(Customer)
        .where(
            Customer.is_active.is_(True),
            or_(*lookup_conditions),
        )
        .order_by(Customer.id.asc())
    )

    customer = db.scalar(statement)

    if customer is None:
        customer = Customer(
            name=name,
            customer_type="individual",
            relationship_status="unknown",
            phone=phone,
            email=email,
        )

        db.add(customer)
        db.flush()
    else:
        customer.name = name

        if email and not customer.email:
            customer.email = email

        if phone and not customer.phone:
            customer.phone = phone

    inquiry = Inquiry(
        customer_id=customer.id,
        inquiry_type=service,
        subject=f"Website Inquiry - {service}",
        message=message,
        status="new",
    )

    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)

    try:
        send_inquiry_notification(
            name=name,
            phone=phone,
            email=email,
            service=service,
            message=message,
        )
    except Exception:
        pass

    return inquiry


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
