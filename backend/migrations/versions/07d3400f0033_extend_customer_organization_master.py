"""extend customer organization master

Revision ID: 07d3400f0033
Revises: 417654f05c13
Create Date: 2026-09-29

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "07d3400f0033"
down_revision: Union[str, Sequence[str], None] = "417654f05c13"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "customers",
        sa.Column(
            "customer_type",
            sa.String(length=30),
            nullable=False,
            server_default="individual",
        ),
    )

    op.add_column(
        "customers",
        sa.Column(
            "organization_type",
            sa.String(length=50),
            nullable=True,
        ),
    )

    op.add_column(
        "customers",
        sa.Column(
            "relationship_status",
            sa.String(length=30),
            nullable=False,
            server_default="unknown",
        ),
    )

    op.alter_column(
        "customers",
        "phone",
        existing_type=sa.String(length=50),
        nullable=True,
    )

    op.create_index(
        op.f("ix_customers_customer_type"),
        "customers",
        ["customer_type"],
        unique=False,
    )

    op.create_index(
        op.f("ix_customers_organization_type"),
        "customers",
        ["organization_type"],
        unique=False,
    )

    op.create_index(
        op.f("ix_customers_relationship_status"),
        "customers",
        ["relationship_status"],
        unique=False,
    )

    op.create_index(
        op.f("ix_customers_city"),
        "customers",
        ["city"],
        unique=False,
    )

    op.alter_column(
        "customers",
        "customer_type",
        server_default=None,
    )

    op.alter_column(
        "customers",
        "relationship_status",
        server_default=None,
    )


def downgrade() -> None:
    op.drop_index(
        op.f("ix_customers_city"),
        table_name="customers",
    )

    op.drop_index(
        op.f("ix_customers_relationship_status"),
        table_name="customers",
    )

    op.drop_index(
        op.f("ix_customers_organization_type"),
        table_name="customers",
    )

    op.drop_index(
        op.f("ix_customers_customer_type"),
        table_name="customers",
    )

    op.alter_column(
        "customers",
        "phone",
        existing_type=sa.String(length=50),
        nullable=False,
    )

    op.drop_column(
        "customers",
        "relationship_status",
    )

    op.drop_column(
        "customers",
        "organization_type",
    )

    op.drop_column(
        "customers",
        "customer_type",
    )
