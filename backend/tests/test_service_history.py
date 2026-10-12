from datetime import date
from types import SimpleNamespace

import pytest

from app.models.service_history import ServiceHistory
from app.services.service_history_service import (
    create_service_history,
    get_all_service_history,
    get_service_history_by_equipment,
    get_service_history_by_id,
)


def test_create_and_read_service_history(db_session):
    db, equipment = db_session
    record = create_service_history(
        SimpleNamespace(
            equipment_id=equipment.id,
            service_type="preventive maintenance",
            service_date=date(2026, 1, 15),
            status="completed",
            issue=None,
            work_performed="Inspection and oil change",
            findings=None,
            parts_used=None,
            notes=None,
            model_dump=lambda: {
                "equipment_id": equipment.id,
                "service_type": "preventive maintenance",
                "service_date": date(2026, 1, 15),
                "status": "completed",
                "issue": None,
                "work_performed": "Inspection and oil change",
                "findings": None,
                "parts_used": None,
                "notes": None,
            },
        )
    )

    assert record.id is not None
    assert record.equipment_id == equipment.id
    assert record.service_type == "preventive maintenance"
    assert record.status == "completed"
    assert record.service_date == date(2026, 1, 15)
    assert len(get_all_service_history()) == 1
    assert get_service_history_by_id(record.id).id == record.id
    assert get_service_history_by_equipment(equipment.id)[0].id == record.id


def test_create_service_history_rejects_inactive_or_missing_equipment(db_session):
    _, equipment = db_session
    data = SimpleNamespace(
        equipment_id=equipment.id + 999,
        service_type="repair",
        service_date=None,
        status="open",
        issue="Fault",
        work_performed=None,
        findings=None,
        parts_used=None,
        notes=None,
        model_dump=lambda: {},
    )

    with pytest.raises(ValueError, match="Equipment not found"):
        create_service_history(data)


def test_service_history_relationship_is_loaded(db_session):
    db, equipment = db_session
    record = ServiceHistory(
        equipment_id=equipment.id,
        service_type="inspection",
        status="completed",
        service_date=date.today(),
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    assert record.equipment.id == equipment.id
    assert equipment.service_history[0].id == record.id
