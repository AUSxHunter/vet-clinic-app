# Fix Empty Service Cards - Setup Guide

## Problem
Service cards appear empty because the backend hasn't seeded the services yet.

## Solution: 3 Steps

### Step 1: Delete Old Database

The old database has the wrong schema. Delete it:

**Windows PowerShell:**
```powershell
Remove-Item vet-clinic\vet.db -ErrorAction SilentlyContinue
```

**Or manually:**
Navigate to `vet-clinic` folder and delete `vet.db` file.

---

### Step 2: Start Backend (Will Auto-Seed)

```bash
cd vet-clinic/backend
python -m uvicorn main:app --reload --port 8000
```

**You should see this in the terminal:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Application startup complete.
```

The backend will **automatically seed 15 services** on startup!

---

### Step 3: Verify Services Are Loaded

**Option A: Browser**
Visit: http://localhost:8000/api/services

You should see JSON with 15 services like:
```json
[
  {
    "id": "...",
    "name": "General Checkup",
    "slug": "general-checkup",
    "category": "Preventive",
    "price_aed": 120,
    ...
  },
  ...
]
```

**Option B: Command Line (PowerShell)**
```powershell
curl http://localhost:8000/api/services
```

**Option C: Command Line (Git Bash/WSL)**
```bash
curl http://localhost:8000/api/services
```

---

### Step 4: Start User Frontend

```bash
cd vet-clinic/vet-user
npm run dev
```

Visit: http://localhost:3001

**You should now see:**
- ✅ 6 Featured service cards in the spotlight section
- ✅ All 15 services in the complete catalog
- ✅ Services organized by category
- ✅ "View All 15 Services" button

---

## The 15 Seeded Services

Your backend will automatically create these services:

### Preventive (5 services)
1. **General Checkup** - 120 AED, 20 min ⭐ Featured
2. **Puppy/Kitten Starter Package** - 380 AED, 40 min ⭐ Featured
3. **Core Vaccination** - 180 AED, 15 min ⭐ Featured
4. **Rabies Vaccine** - 180 AED, 10 min
5. **Microchipping & Registration** - 220 AED, 20 min

### Diagnostics (3 services)
6. **Blood Panel (CBC + Chem)** - 260 AED, 20 min ⭐ Featured
7. **X-Ray (2 Views)** - 300 AED, 25 min
8. **Ultrasound (Abdominal)** - 450 AED, 35 min

### Clinical (2 services)
9. **Skin & Allergy Consult** - 220 AED, 25 min ⭐ Featured
10. **Gastro/Diarrhea Visit** - 220 AED, 25 min

### Procedures (2 services)
11. **Dental Scale & Polish** - 650 AED, 75 min ⭐ Featured
12. **Spay/Neuter Consult** - 100 AED, 20 min

### Grooming/Wellness (2 services)
13. **Full Groom (Small Breed)** - 150 AED, 60 min
14. **Nail Trim & Paw Care** - 60 AED, 10 min

### Emergency (1 service)
15. **Emergency Triage** - 300 AED, 30 min ⭐ Featured (display_order: 5, appears first!)

---

## Troubleshooting

### Problem: Still seeing "No Services Available"

**Check 1: Is backend running?**
```bash
# Should return "ok"
curl http://localhost:8000
```

**Check 2: Are services in database?**
```bash
curl http://localhost:8000/api/services
```

If empty `[]`, backend didn't seed properly.

**Fix:**
1. Stop backend (Ctrl+C)
2. Delete database again
3. Check `main.py` has the seed code (lines 24-71)
4. Restart backend

**Check 3: CORS issues?**
Open browser console (F12). If you see CORS errors:
- Backend `main.py` should allow `http://localhost:3001`
- Check lines 14-21 in `main.py`

### Problem: Services load but cards look empty

Check `ServiceCard.js` component. Each card should show:
- Category emoji icon
- Service name
- Description
- Tags
- Price (AED)
- Duration (minutes)
- "Book Now" button

### Problem: Backend won't start

**Error: `Address already in use`**
- Another process is using port 8000
- Kill it: `taskkill /F /IM python.exe` (Windows)
- Or use different port: `uvicorn main:app --port 8001`

**Error: `Module not found`**
```bash
cd vet-clinic/backend
pip install -r requirements.txt
```

---

## Expected Result

After following these steps, your home page should display:

```
┌─────────────────────────────────────────┐
│  [Login/Signup Form]                    │
│  • Toggle: Login ↔ Sign Up              │
│  • Name field (Sign Up only)            │
│  • Email & Phone fields                 │
│  • Submit button                         │
└─────────────────────────────────────────┘

★ FEATURED SERVICES (6 cards)
┌─────────┐ ┌─────────┐ ┌─────────┐
│ Emerg.  │ │ General │ │ Starter │
│ Triage  │ │ Checkup │ │ Package │
│ 300 AED │ │ 120 AED │ │ 380 AED │
└─────────┘ └─────────┘ └─────────┘
┌─────────┐ ┌─────────┐ ┌─────────┐
│ Core    │ │ Blood   │ │ Skin &  │
│ Vaccine │ │ Panel   │ │ Allergy │
│ 180 AED │ │ 260 AED │ │ 220 AED │
└─────────┘ └─────────┘ └─────────┘

[View All 15 Services button]

📋 COMPLETE SERVICE PORTFOLIO
[Category Tabs: All | Preventive | Diagnostics | etc.]

[All 15 services in grid, grouped by category]
```

---

## Quick Checklist

- [ ] Deleted `vet-clinic/vet.db`
- [ ] Started backend on port 8000
- [ ] Visited `http://localhost:8000/api/services` - sees JSON with 15 services
- [ ] Started user frontend on port 3001
- [ ] Visited `http://localhost:3001` - sees service cards
- [ ] Can toggle between Login and Sign Up
- [ ] Service cards show all details (name, price, description, etc.)
- [ ] "Book Now" buttons work (scroll to login if not authenticated)

---

## Success! 🎉

You should now see:
- ✅ Beautiful service cards with all details
- ✅ Login/Sign Up toggle working
- ✅ 15 services displayed correctly
- ✅ Featured spotlight with 6 cards
- ✅ Complete catalog with category filters
- ✅ Booking flow integrated

Your Vet Care platform is now complete and beautiful! 🐾✨

