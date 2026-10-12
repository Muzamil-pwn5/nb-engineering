import logging
import smtplib
import ssl
from email.message import EmailMessage

from app.core.config import settings
from app.models.inquiry import Inquiry

logger = logging.getLogger(__name__)


class InquiryNotificationError(RuntimeError):
    """Raised when an inquiry cannot be forwarded to the notification mailbox."""


def send_inquiry_notification(inquiry: Inquiry) -> None:
    smtp_host = settings.smtp_host.strip()
    smtp_username = settings.smtp_username.strip()
    # Gmail displays app passwords in groups separated by spaces; those spaces
    # are formatting, not part of the credential.
    smtp_password = "".join(settings.smtp_password.split())
    if not smtp_host or not smtp_username or not smtp_password:
        raise InquiryNotificationError(
            "Inquiry notification email is not configured on the API server."
        )

    customer = inquiry.customer
    recipient = settings.inquiry_notification_email
    message = EmailMessage()
    message["Subject"] = inquiry.subject or "New website inquiry"
    message["From"] = settings.smtp_from_email.strip() or smtp_username
    message["To"] = recipient.strip()
    message["Reply-To"] = customer.email or settings.smtp_from_email.strip() or smtp_username
    message.set_content(
        "A new inquiry was submitted through nbengineerings.com.\n\n"
        f"Name: {customer.name}\n"
        f"Phone: {customer.phone}\n"
        f"Email: {customer.email or 'Not provided'}\n"
        f"Service: {inquiry.inquiry_type}\n\n"
        f"Message:\n{inquiry.message}\n\n"
        f"Inquiry ID: {inquiry.id}\n"
    )

    try:
        context = ssl.create_default_context()
        with smtplib.SMTP(smtp_host, settings.smtp_port, timeout=20) as smtp:
            smtp.ehlo()
            if settings.smtp_use_tls:
                smtp.starttls(context=context)
                smtp.ehlo()
            smtp.login(smtp_username, smtp_password)
            smtp.send_message(message)
    except (OSError, smtplib.SMTPException) as exc:
        logger.exception("Failed to deliver inquiry %s notification", inquiry.id)
        raise InquiryNotificationError("Inquiry notification delivery failed.") from exc
