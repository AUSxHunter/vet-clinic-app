from __future__ import annotations
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import select
from typing import List, Optional


from .database import engine, Base, get_db, SessionLocal
from . import models, schemas, crud

app = FastAPI(title="Vet Clinic API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    # Create tables
    Base.metadata.create_all(bind=engine)
    # Seed default services if not present
    db = SessionLocal()
    try:
        existing = db.scalars(select(models.Service)).all()
        if not existing:
            services = [
                models.Service(name="General Checkup", price=120.0),
                models.Service(name="Rabies Vaccine", price=180.0),
                models.Service(name="Grooming", price=100.0),
            ]
            db.add_all(services)
            db.commit()
    finally:
        db.close()


# Owners
@app.get("/api/owners", response_model=List[schemas.OwnerRead])
def list_owners(db: Session = Depends(get_db)):
    return crud.list_owners(db)


@app.post("/api/owners", response_model=schemas.OwnerRead)
def create_owner(owner: schemas.OwnerCreate, db: Session = Depends(get_db)):
    return crud.create_owner(db, owner)


# Pets
@app.get("/api/pets", response_model=List[schemas.PetRead])
def list_pets(db: Session = Depends(get_db)):
    return crud.list_pets(db)


@app.post("/api/pets", response_model=schemas.PetRead)
def create_pet(pet: schemas.PetCreate, db: Session = Depends(get_db)):
    # Validate owner exists
    owner = db.get(models.Owner, pet.owner_id)
    if not owner:
        raise HTTPException(status_code=400, detail="Owner not found")
    return crud.create_pet(db, pet)


# Services
@app.get("/api/services", response_model=List[schemas.ServiceRead])
def list_services(db: Session = Depends(get_db)):
    return crud.list_services(db)


# Appointments
@app.get("/api/appointments", response_model=List[schemas.AppointmentRead])
def list_appointments(db: Session = Depends(get_db)):
    return crud.list_appointments(db)


@app.post("/api/appointments", response_model=schemas.AppointmentRead)
def create_appointment(payload: schemas.AppointmentCreate, db: Session = Depends(get_db)):
    # Validate pet exists
    pet = db.get(models.Pet, payload.pet_id)
    if not pet:
        raise HTTPException(status_code=400, detail="Pet not found")
    # Validate services exist
    services = crud.get_services_by_ids(db, payload.service_ids)
    if len(services) != len(payload.service_ids):
        raise HTTPException(status_code=400, detail="One or more services not found")
    return crud.create_appointment(db, payload)


@app.post("/api/appointments/{appointment_id}/complete", response_model=schemas.AppointmentRead)
def complete_appointment(appointment_id: int, db: Session = Depends(get_db)):
    appt = crud.complete_appointment(db, appointment_id)
    if not appt:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appt


# Invoices
@app.get("/api/invoices", response_model=List[schemas.InvoiceRead])
def list_invoices(db: Session = Depends(get_db)):
    return crud.list_invoices(db)


@app.post("/api/invoices", response_model=schemas.InvoiceRead)
def create_invoice(appt_id: int, paid: bool = False, db: Session = Depends(get_db)):
    inv = crud.create_invoice_for_appointment(db, appt_id, paid)
    if not inv:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return inv


# Root health
@app.get("/")
def health():
    return {"status": "ok"}
