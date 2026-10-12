import os

os.environ.setdefault("DATABASE_URL", "sqlite+pysqlite:///:memory:")
os.environ.setdefault("ADMIN_USERNAME", "test-admin")
os.environ.setdefault("ADMIN_PASSWORD", "test-password")
os.environ.setdefault("JWT_SECRET", "test-secret-that-is-long-enough")

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.database import Base
from app.models import Customer, Equipment, ServiceHistory, Site
from app.services import service_history_service


@pytest.fixture()
def db_session(monkeypatch):
    engine = create_engine(
        "sqlite+pysqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(engine)
    TestingSessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
    monkeypatch.setattr(service_history_service, "SessionLocal", TestingSessionLocal)

    db = TestingSessionLocal()
    try:
        customer = Customer(
            name="Test Customer",
            customer_type="individual",
            relationship_status="active",
            phone="+923000000000",
            is_active=True,
        )
        site = Site(customer=customer, name="Test Site", is_active=True)
        equipment = Equipment(
            site=site,
            equipment_type="generator",
            brand="Test Brand",
            status="active",
            is_active=True,
        )
        db.add(equipment)
        db.commit()
        db.refresh(equipment)
        yield db, equipment
    finally:
        db.close()
        Base.metadata.drop_all(engine)
        engine.dispose()
