from datetime import date

from app.core.database import SessionLocal
from app.models.equipment import Equipment
from app.models.service_history import ServiceHistory
from app.services.service_history_service import (
    get_all_service_history,
    get_service_history_by_equipment,
    get_service_history_by_id,
)


def test_service_history_records_exist():
    records = get_all_service_history()

    assert len(records) == 9


def test_service_history_records_have_required_fields():
    records = get_all_service_history()

    assert records

    for record in records:
        assert record.id is not None
        assert record.equipment_id is not None
        assert record.service_type
        assert record.status


def test_service_history_equipment_relationship():
    records = get_all_service_history()

    assert records

    db = SessionLocal()

    try:
        for record in records:
            equipment = db.get(Equipment, record.equipment_id)

            assert equipment is not None
            assert equipment.id == record.equipment_id
            assert equipment.service_history is not None

    finally:
        db.close()


def test_get_service_history_by_equipment():
    records = get_all_service_history()

    assert records

    equipment_id = records[0].equipment_id

    equipment_records = get_service_history_by_equipment(equipment_id)

    assert equipment_records
    assert all(
        record.equipment_id == equipment_id
        for record in equipment_records
    )


def test_get_service_history_by_id():
    records = get_all_service_history()

    assert records

    record = get_service_history_by_id(records[0].id)

    assert record is not None
    assert record.id == records[0].id


def test_service_history_dates_are_valid_when_present():
    records = get_all_service_history()

    for record in records:
        if record.service_date is not None:
            assert isinstance(record.service_date, date)
