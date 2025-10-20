import enum
import uuid
from typing import Optional
from datetime import datetime, date
from sqlalchemy import (
    Column,
    String,
    Date,
    DateTime,
    Enum,
    Integer,
    Boolean,
    ForeignKey,
    Table,
    Float,
)
from sqlalchemy.orm import relationship, Mapped, mapped_column

from .database import Base


class AppointmentStatus(str, enum.Enum):
    SCHEDULED = "SCHEDULED"
    DONE = "DONE"
    CANCELLED = "CANCELLED"


# Association table for many-to-many between Appointment and Service
appointment_service_table = Table(
    "appointment_service",
    Base.metadata,
    Column("appointment_id", ForeignKey("appointments.id"), primary_key=True),
    Column("service_id", ForeignKey("services.id"), primary_key=True),
)


class Owner(Base):
    __tablename__ = "owners"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name: Mapped[str] = mapped_column(String, nullable=False)
    phone: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, nullable=False)

    pets = relationship("Pet", back_populates="owner", cascade="all, delete-orphan")


class Pet(Base):
    __tablename__ = "pets"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    species: Mapped[str] = mapped_column(String, nullable=False)
    breed: Mapped[str] = mapped_column(String, nullable=True)
    dob: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    owner_id: Mapped[str] = mapped_column(String, ForeignKey("owners.id"), nullable=False)

    owner = relationship("Owner", back_populates="pets")
    appointments = relationship("Appointment", back_populates="pet", cascade="all, delete-orphan")


class Service(Base):
    __tablename__ = "services"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    price: Mapped[float] = mapped_column(Float, nullable=False)

    appointments = relationship(
        "Appointment",
        secondary=appointment_service_table,
        back_populates="services",
    )


class Appointment(Base):
    __tablename__ = "appointments"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    pet_id: Mapped[int] = mapped_column(Integer, ForeignKey("pets.id"), nullable=False)
    vet_name: Mapped[str] = mapped_column(String, nullable=False)
    datetime: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    status: Mapped[AppointmentStatus] = mapped_column(
        Enum(AppointmentStatus), default=AppointmentStatus.SCHEDULED, nullable=False
    )

    pet = relationship("Pet", back_populates="appointments")
    services = relationship(
        "Service",
        secondary=appointment_service_table,
        back_populates="appointments",
    )
    invoice = relationship("Invoice", back_populates="appointment", uselist=False)


class Invoice(Base):
    __tablename__ = "invoices"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    appointment_id: Mapped[int] = mapped_column(Integer, ForeignKey("appointments.id"), unique=True, nullable=False)
    total: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    paid: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    appointment = relationship("Appointment", back_populates="invoice")
