@echo off
echo ====================================
echo    VET CLINIC APP LAUNCHER
echo ====================================
echo.
echo Starting Backend Server...
start "Vet Clinic Backend" cmd /k "cd backend && cd .. && uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000"
timeout /t 5 /nobreak > nul
echo.
echo Starting Frontend Server...
start "Vet Clinic Frontend" cmd /k "cd frontend\vet-frontend && npm run dev"
echo.
echo ====================================
echo Both servers are starting!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo ====================================
echo.
pause

