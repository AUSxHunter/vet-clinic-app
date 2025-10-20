from __future__ import annotations
from datetime import datetime, date
from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field, ConfigDict

from .models import AppointmentStatus


# Owner Schemas
class OwnerBase(BaseModel):
    name: str
    phone: str
    email: EmailStr


class OwnerCreate(OwnerBase):
    pass


class OwnerRead(OwnerBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: str


# Pet Schemas
class PetBase(BaseModel):
    name: str
    species: str
    breed: Optional[str] = None
    dob: Optional[date] = None
    owner_id: str


class PetCreate(PetBase):
    pass


class PetRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    name: str
    species: str
    breed: Optional[str] = None
    dob: Optional[date] = None
    owner_id: str


# Service Schemas
class ServiceRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    name: str
    price: float


# Appointment Schemas
class AppointmentBase(BaseModel):
    pet_id: int
    vet_name: str
    datetime: datetime
    service_ids: List[int] = Field(default_factory=list)


class AppointmentCreate(AppointmentBase):
    pass


class AppointmentRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    pet_id: int
    vet_name: str
    datetime: datetime
    status: AppointmentStatus
    services: List[ServiceRead] = Field(default_factory=list)


# Invoice Schemas
class InvoiceBase(BaseModel):
    appointment_id: int
    total: float
    paid: bool = False


class InvoiceCreate(BaseModel):
    appointment_id: int
    paid: bool = False


class InvoiceRead(InvoiceBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
