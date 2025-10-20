# Vet Clinic App - Setup Instructions

## Prerequisites
1. **Python 3.9+** - Download from https://www.python.org/downloads/
2. **Node.js 18+** - Download from https://nodejs.org/
3. **pip** - Python package installer (comes with Python)

## Quick Start (Easiest Way)

### Option 1: Use the Launcher Script (Windows)
1. Open File Explorer and navigate to the `vet-clinic` folder
2. Double-click `START_APP.bat`
3. Two command windows will open (backend and frontend)
4. Wait 5-10 seconds for both servers to start
5. Open your browser and go to: **http://localhost:3000**

### Option 2: Manual Setup

#### Step 1: Install Backend Dependencies
```bash
cd vet-clinic\backend
pip install -r requirements.txt
```

#### Step 2: Install Frontend Dependencies
```bash
cd vet-clinic\frontend\vet-frontend
npm install
```

#### Step 3: Start Backend Server
Open a terminal in the `vet-clinic` folder (NOT the backend folder):
```bash
cd vet-clinic
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Or use the batch file:
```bash
cd vet-clinic\backend
run_backend.bat
```

**Backend will run at:** http://localhost:8000

#### Step 4: Start Frontend Server (in a NEW terminal)
```bash
cd vet-clinic\frontend\vet-frontend
npm run dev
```

Or use the batch file:
```bash
cd vet-clinic\frontend\vet-frontend
run_frontend.bat
```

**Frontend will run at:** http://localhost:3000

## Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'backend'"
**Solution:** Make sure you run the backend from the `vet-clinic` folder (parent of backend), not from inside the backend folder.

### Issue: "uvicorn: command not found"
**Solution:** Install uvicorn:
```bash
pip install uvicorn[standard]
```

### Issue: "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org/

### Issue: Frontend can't connect to backend
**Solution:** 
1. Make sure backend is running first at http://localhost:8000
2. Check if you can access http://localhost:8000 in your browser (should show {"status":"ok"})
3. Make sure port 8000 is not being used by another application

### Issue: Port 3000 or 8000 already in use
**Solution:** 
- For backend, edit the START_APP.bat or run_backend.bat and change `--port 8000` to another port like `--port 8001`
- For frontend, edit package.json and change `"dev": "next dev -p 3000"` to `"dev": "next dev -p 3001"`

### Issue: Database errors
**Solution:** The database (vet.db) will be created automatically. If you have issues, delete the `vet.db` file in the backend folder and restart the backend.

## Testing the Application

1. **Check Backend:** Open http://localhost:8000 - should show `{"status":"ok"}`
2. **Check API Docs:** Open http://localhost:8000/docs - FastAPI interactive documentation
3. **Check Frontend:** Open http://localhost:3000 - should show the dashboard

## Default Data

The application will automatically create 3 default services:
- General Checkup - $120.00
- Rabies Vaccine - $180.00
- Grooming - $100.00

## Stopping the Application

- Press `Ctrl+C` in each terminal window to stop the servers
- Or simply close the terminal windows

