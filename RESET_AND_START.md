# Quick Reset & Start Script

## Copy-Paste Commands to Fix Everything

### Windows PowerShell (Run from project root)

```powershell
# Stop any running servers first (Ctrl+C in their terminals)

# Step 1: Delete old database
Write-Host "Deleting old database..." -ForegroundColor Yellow
Remove-Item .\vet-clinic\vet.db -Force -ErrorAction SilentlyContinue
Write-Host "Database deleted!" -ForegroundColor Green

# Step 2: Verify passlib is installed
Write-Host "Checking passlib installation..." -ForegroundColor Yellow
cd vet-clinic\backend
pip show passlib
cd ..\..

# Step 3: Done!
Write-Host "`nSetup complete! Now start your servers:" -ForegroundColor Green
Write-Host "Terminal 1: cd vet-clinic\backend; python -m uvicorn main:app --reload --port 8000" -ForegroundColor Cyan
Write-Host "Terminal 2: cd vet-clinic\vet-user; npm run dev" -ForegroundColor Cyan
```

---

## Manual Steps (If Script Doesn't Work)

### 1. Delete Database
```powershell
Remove-Item vet-clinic\vet.db -Force
```

### 2. Start Backend (Terminal 1)
```powershell
cd vet-clinic\backend
python -m uvicorn main:app --reload --port 8000
```

**Wait for:**
```
INFO:     Application startup complete.
```

### 3. Start Frontend (Terminal 2)
```powershell
cd vet-clinic\vet-user
npm run dev
```

**Wait for:**
```
ready - started server on 0.0.0.0:3001
```

### 4. Test
- Open: http://localhost:3001
- Hard refresh: **Ctrl + Shift + R**
- Click "Sign Up" tab
- Fill form and test!

---

## Quick Test After Reset

```
Email: demo@vetcare.com
Password: demo123
Name: Demo User
Phone: +971501234567
```

1. Click "Sign Up"
2. Fill above info
3. Click "Create Profile"
4. ✅ Should redirect to /pets
5. Click "Logout"
6. Click "Login"
7. Enter email + password
8. ✅ Should login successfully!

---

## If Backend Won't Start

### Error: "Module 'passlib' not found"
```bash
cd vet-clinic\backend
pip install passlib[bcrypt]
```

### Error: "Address already in use"
```bash
# Kill Python processes
taskkill /F /IM python.exe
# Then restart backend
```

### Error: "Column password_hash not found"
```bash
# Database still exists!
Remove-Item vet-clinic\vet.db -Force
# Restart backend
```

---

## Verification Checklist

After restart, verify:

- [ ] Old `vet.db` deleted
- [ ] Backend running on port 8000
- [ ] Frontend running on port 3001
- [ ] http://localhost:8000 returns `{"status":"ok"}`
- [ ] http://localhost:3001 shows home page
- [ ] Login/Sign Up toggle visible
- [ ] Password field visible
- [ ] Buttons are clickable (not disabled)

---

## Expected Terminal Output

### Backend Terminal
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Started reloader process
INFO:     Started server process
INFO:     Application startup complete.
```

### Frontend Terminal
```
  ▲ Next.js 14.2.0
  - Local:        http://localhost:3001
  
 ✓ Ready in 2.5s
```

---

## Success!

When everything works:
- ✅ Home page loads
- ✅ Can click Sign Up
- ✅ Can create account
- ✅ Redirects to /pets
- ✅ Can logout
- ✅ Can login again

🎉 Your Vet Care app is ready!

