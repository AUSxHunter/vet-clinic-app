from __future__ import annotations
from sqlalchemy.orm import Session
from sqlalchemy import select
from datetime import datetime
from typing import List, Optional

from . import models, schemas


# Owners
def create_owner(db: Session, owner: schemas.OwnerCreate) -> models.Owner:
    db_owner = models.Owner(name=owner.name, phone=owner.phone, email=str(owner.email))
    db.add(db_owner)
    db.commit()
    db.refresh(db_owner)
    return db_owner


def list_owners(db: Session) -> List[models.Owner]:
    return db.scalars(select(models.Owner)).all()


# Pets
def create_pet(db: Session, pet: schemas.PetCreate) -> models.Pet:
    db_pet = models.Pet(
        name=pet.name,
        species=pet.species,
        breed=pet.breed,
        dob=pet.dob,
        owner_id=pet.owner_id,
    )
    db.add(db_pet)
    db.commit()
    db.refresh(db_pet)
    return db_pet


def list_pets(db: Session) -> List[models.Pet]:
    return db.scalars(select(models.Pet)).all()


# Services
def list_services(db: Session) -> List[models.Service]:
    return db.scalars(select(models.Service)).all()


def get_services_by_ids(db: Session, service_ids: List[int]) -> List[models.Service]:
    if not service_ids:
        return []
    stmt = select(models.Service).where(models.Service.id.in_(service_ids))
    return db.scalars(stmt).all()


# Appointments
def create_appointment(db: Session, payload: schemas.AppointmentCreate) -> models.Appointment:
    db_appt = models.Appointment(
        pet_id=payload.pet_id,
        vet_name=payload.vet_name,
        datetime=payload.datetime,
        status=models.AppointmentStatus.SCHEDULED,
    )

    db.add(db_appt)
    services = get_services_by_ids(db, payload.service_ids)
    db_appt.services = services
    db.commit()
    db.refresh(db_appt)
    return db_appt


def list_appointments(db: Session) -> List[models.Appointment]:
    return db.scalars(select(models.Appointment)).all()


def complete_appointment(db: Session, appt_id: int) -> Optional[models.Appointment]:
    appt = db.get(models.Appointment, appt_id)
    if not appt:
        return None
    appt.status = models.AppointmentStatus.DONE
    db.commit()
    db.refresh(appt)
    return appt


# Invoices
def list_invoices(db: Session) -> List[models.Invoice]:
    return db.scalars(select(models.Invoice)).all()


def create_invoice_for_appointment(db: Session, appointment_id: int, paid: bool = False) -> Optional[models.Invoice]:
    appt = db.get(models.Appointment, appointment_id)
    if not appt:
        return None
    # Sum the service prices
    total = sum(service.price for service in (appt.services or []))
    inv = models.Invoice(appointment_id=appointment_id, total=float(total), paid=paid)
    db.add(inv)
    db.commit()
    db.refresh(inv)
    return inv
