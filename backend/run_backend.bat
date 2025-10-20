@echo off
echo Starting Vet Clinic Backend...
cd ..
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000

