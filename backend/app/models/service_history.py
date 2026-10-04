from datetime import datetime

from sqlalchemy import Date, DateTime, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class ServiceHistory(Base):
    __tablename__ = "service_history"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    equipment_id: Mapped[int] = mapped_column(
        ForeignKey("equipment.id"),
        nullable=False,
        index=True,
    )

    service_type: Mapped[str] = mapped_column(
        String(80),
        nullable=False,
        index=True,
    )

    service_date: Mapped[datetime | None] = mapped_column(
        Date,
        nullable=True,
        index=True,
    )

    issue: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    work_performed: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    findings: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    parts_used: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    status: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="unknown",
        index=True,
    )

    notes: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    equipment = relationship(
        "Equipment",
        back_populates="service_history",
    )
