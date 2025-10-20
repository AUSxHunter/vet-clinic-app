# Fix Login/Signup Button Not Working

## The Fix Applied ✅

I've removed the `useOwners` hook that was causing the issue. The page no longer needs to fetch all owners since we now use password-based authentication.

---

## 🔧 Steps to Get It Working

### Step 1: Delete Old Database ⚠️ **CRITICAL**

The old database doesn't have the `password_hash` column. You MUST delete it:

```bash
# Windows PowerShell (from project root)
Remove-Item vet-clinic\vet.db -Force
```

**Or manually:**
- Navigate to `vet-clinic` folder
- Delete `vet.db` file

---

### Step 2: Restart Backend

```bash
cd vet-clinic/backend
python -m uvicorn main:app --reload --port 8000
```

**Watch for:**
- ✅ "Application startup complete"
- ✅ No errors about missing columns
- ✅ Running on http://127.0.0.1:8000

**Test backend:**
Open browser: http://localhost:8000
Should see: `{"status":"ok"}`

---

### Step 3: Hard Refresh Frontend

The browser might be caching old JavaScript.

**Windows/Linux:**
```
Ctrl + Shift + R
```

**Mac:**
```
Cmd + Shift + R
```

**Or clear cache:**
1. Open DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"

---

### Step 4: Restart Frontend

```bash
cd vet-clinic/vet-user
npm run dev
```

Visit: http://localhost:3001

---

## 🧪 Test the Buttons

### Test Sign Up

1. Click **"Sign Up"** tab
2. Fill form:
   ```
   Name: Test User
   Email: test@example.com
   Phone: +971501234567
   Password: test123
   ```
3. Click **"Create Profile"** button
4. Open DevTools (F12) → Console tab
5. Watch for:
   - ✅ No errors
   - ✅ API call to `/api/owners`
   - ✅ Success response with owner data

**Expected Result:**
- ✅ Toast: "Profile created successfully!"
- ✅ Redirected to `/pets` page

---

### Test Login

1. Click **"Logout"** button (red, top navbar)
2. Back on home page
3. Click **"Login"** tab (should be default)
4. Fill form:
   ```
   Email: test@example.com
   Password: test123
   ```
5. Click **"Login to Account"** button

**Expected Result:**
- ✅ Toast: "Welcome back, Test User!"
- ✅ Redirected to `/pets` page

---

## 🐛 If Still Not Working - Debug Checklist

### Check 1: Backend is Running

```bash
# Should return JSON
curl http://localhost:8000
```

**Expected:**
```json
{"status":"ok"}
```

---

### Check 2: Database Has New Schema

```bash
# Windows PowerShell
cd vet-clinic
sqlite3 vet.db ".schema owners"
```

**Should include:**
```sql
CREATE TABLE owners (
    ...
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    ...
);
```

**If missing `password_hash`:**
- ❌ Old database still exists
- Delete it and restart backend

---

### Check 3: Browser Console Errors

1. Open home page: http://localhost:3001
2. Press **F12** to open DevTools
3. Go to **Console** tab
4. Look for errors:

**Common Errors:**

#### Error: "Failed to fetch"
- Backend not running
- Start: `python -m uvicorn main:app --reload --port 8000`

#### Error: "CORS policy"
- Backend CORS not configured
- Check `main.py` lines 14-21 has `http://localhost:3001`

#### Error: "useOwners is not defined"
- Old cached code
- Hard refresh: Ctrl + Shift + R

#### Error: "Column password_hash does not exist"
- Old database
- Delete `vet.db` and restart backend

---

### Check 4: Network Tab

1. Open DevTools (F12)
2. Go to **Network** tab
3. Click "Sign Up"
4. Fill form and submit
5. Watch for:

**Expected:**
```
POST http://localhost:8000/api/owners
Status: 200 OK
Response: { "id": "...", "name": "Test User", ... }
```

**If 400 Error:**
- Email already exists
- Try different email or use Login mode

**If 500 Error:**
- Backend error
- Check backend terminal for error details

**If Request Failed:**
- Backend not running
- CORS issue

---

## 🔍 Quick Diagnostics

### Test 1: Can you click the button?
- ✅ Yes → Go to Test 2
- ❌ No → Button disabled? Check `submitting` state

### Test 2: Does form submit?
- Open Console (F12)
- Click button
- See any errors?

### Test 3: Does API call happen?
- Open Network tab (F12)
- Click button
- See POST request?
  - ✅ Yes → Check response
  - ❌ No → JavaScript error, check Console

---

## 💡 Manual Test (Bypass Frontend)

Test backend directly:

### Create Owner
```bash
curl -X POST http://localhost:8000/api/owners \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test\",\"email\":\"test@test.com\",\"phone\":\"+971501234567\",\"password\":\"test123\"}"
```

**Expected:**
```json
{
  "id": "uuid-here",
  "name": "Test",
  "email": "test@test.com",
  "phone": "+971501234567"
}
```

### Login
```bash
curl -X POST http://localhost:8000/api/owners/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@test.com\",\"password\":\"test123\"}"
```

**If this works but frontend doesn't:**
- Frontend issue
- Check browser console for errors

---

## 📋 Complete Reset Steps

If nothing works, do a complete reset:

```bash
# 1. Stop all servers (Ctrl+C)

# 2. Delete database
Remove-Item vet-clinic\vet.db -Force

# 3. Clear browser cache
# Browser: Ctrl + Shift + Delete → Clear Everything

# 4. Restart backend
cd vet-clinic/backend
python -m uvicorn main:app --reload --port 8000

# 5. Restart frontend
cd vet-clinic/vet-user
npm run dev

# 6. Hard refresh browser
# Visit http://localhost:3001
# Press Ctrl + Shift + R
```

---

## ✅ Success Signs

When working correctly:

1. **Home Page Loads:**
   - See login/signup toggle
   - See password field
   - Buttons are enabled (not grayed out)

2. **Click Sign Up:**
   - Form submits
   - Console: No errors
   - Network: POST request succeeds
   - Toast: "Profile created successfully!"
   - Redirects to /pets

3. **Click Login:**
   - Form submits
   - Console: No errors
   - Network: POST to /login succeeds
   - Toast: "Welcome back, [Name]!"
   - Redirects to /pets

---

## 🆘 Still Not Working?

Share these details:

1. **Browser Console errors** (F12 → Console tab)
2. **Network tab** (F12 → Network → show failed requests)
3. **Backend terminal** (any error messages?)
4. **Database check** (does `password_hash` column exist?)

The issue is most likely:
- ❌ Old database still exists (most common!)
- ❌ Backend not running
- ❌ Browser cached old code

**Delete database, restart both servers, hard refresh browser!** 🔄

