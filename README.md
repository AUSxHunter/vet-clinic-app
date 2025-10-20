# 🏥 Vet Clinic Management System

A full-stack veterinary clinic management application built with **FastAPI** (Python) backend and **Next.js** (React) frontend.

## ✨ Features

- **Owner Management**: Add and manage pet owners with contact information
- **Pet Records**: Track pets with species, breed, and date of birth
- **Appointments**: Schedule and manage veterinary appointments with multiple services
- **Services**: Pre-defined services (General Checkup, Vaccines, Grooming, etc.)
- **Invoicing**: Generate invoices based on appointment services
- **Dashboard**: Overview of all owners, pets, appointments, and invoices

## 🚀 Quick Start

### Prerequisites
- Python 3.9 or higher
- Node.js 18 or higher
- npm (comes with Node.js)

### Easy Setup (Windows)

1. **Install Dependencies:**
   - Open PowerShell or Command Prompt
   - Navigate to the `vet-clinic\backend` folder and run:
     ```bash
     pip install -r requirements.txt
     ```
   - Navigate to `vet-clinic\frontend\vet-frontend` and run:
     ```bash
     npm install
     ```

2. **Launch the App:**
   - Double-click `START_APP.bat` in the `vet-clinic` folder
   - Or run it from command line:
     ```bash
     START_APP.bat
     ```

3. **Access the Application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## 📖 Detailed Setup Instructions

See [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md) for detailed setup, troubleshooting, and manual installation steps.

## 🛠️ Technology Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **SQLAlchemy**: SQL toolkit and ORM
- **Pydantic**: Data validation using Python type annotations
- **SQLite**: Lightweight database
- **Uvicorn**: ASGI server

### Frontend
- **Next.js 14**: React framework with App Router
- **React 18**: UI library
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript**: Programming language

## 📁 Project Structure

```
vet-clinic/
├── backend/
│   ├── main.py          # FastAPI app & endpoints
│   ├── models.py        # SQLAlchemy models
│   ├── schemas.py       # Pydantic schemas
│   ├── crud.py          # Database operations
│   ├── database.py      # Database configuration
│   └── requirements.txt # Python dependencies
├── frontend/
│   └── vet-frontend/
│       ├── app/         # Next.js pages
│       ├── components/  # React components
│       ├── lib/         # API utilities
│       └── package.json # Node dependencies
└── START_APP.bat        # Launch script
```

## 🔧 API Endpoints

- `GET /api/owners` - List all owners
- `POST /api/owners` - Create new owner
- `GET /api/pets` - List all pets
- `POST /api/pets` - Create new pet
- `GET /api/services` - List all services
- `GET /api/appointments` - List all appointments
- `POST /api/appointments` - Create new appointment
- `POST /api/appointments/{id}/complete` - Mark appointment as complete
- `GET /api/invoices` - List all invoices
- `POST /api/invoices` - Create invoice for appointment

Full API documentation available at http://localhost:8000/docs (when backend is running)

## 🐛 Troubleshooting

### Backend won't start
- Ensure Python 3.9+ is installed: `python --version`
- Install dependencies: `pip install -r requirements.txt`
- Run from the correct directory (see SETUP_INSTRUCTIONS.md)

### Frontend won't start
- Ensure Node.js 18+ is installed: `node --version`
- Install dependencies: `npm install`
- Check that backend is running first

### Port already in use
- Backend: Change port in START_APP.bat (default: 8000)
- Frontend: Change port in package.json (default: 3000)

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

This is a demonstration project. Feel free to fork and modify for your own needs.

---

**Happy Coding! 🎉**
