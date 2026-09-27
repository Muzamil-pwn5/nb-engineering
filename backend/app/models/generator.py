from decimal import Decimal

from sqlalchemy import Boolean, ForeignKey, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Generator(Base):
    __tablename__ = "generators"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    brand_id: Mapped[int] = mapped_column(
        ForeignKey("brands.id"),
        nullable=False,
        index=True,
    )

    name: Mapped[str] = mapped_column(String(200), nullable=False, index=True)
    slug: Mapped[str] = mapped_column(String(220), unique=True, nullable=False, index=True)

    model: Mapped[str | None] = mapped_column(String(150), nullable=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    kva: Mapped[Decimal | None] = mapped_column(Numeric(10, 2), nullable=True)
    kw: Mapped[Decimal | None] = mapped_column(Numeric(10, 2), nullable=True)

    fuel_type: Mapped[str | None] = mapped_column(String(50), nullable=True)
    condition: Mapped[str | None] = mapped_column(String(50), nullable=True)

    year: Mapped[int | None] = mapped_column(nullable=True)

    engine_model: Mapped[str | None] = mapped_column(String(150), nullable=True)
    alternator_model: Mapped[str | None] = mapped_column(String(150), nullable=True)

    image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)

    is_available: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    is_featured: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    brand = relationship("Brand")