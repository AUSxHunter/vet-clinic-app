# Password Authentication - Quick Start

## 🚀 3-Step Setup

### Step 1: Install Backend Dependency ✅ (Already Done!)
```bash
cd vet-clinic/backend
pip install passlib[bcrypt]
```
**Status:** ✅ Already installed!

---

### Step 2: Reset Database ⚠️ **REQUIRED**
```bash
# From project root
Remove-Item vet-clinic\vet.db
```

**Why?**
- Owner model now requires `password_hash` field
- Email must be unique
- Old data incompatible

---

### Step 3: Restart Backend
```bash
cd vet-clinic/backend
python -m uvicorn main:app --reload --port 8000
```

**Expected:** Backend starts without errors, creates new tables with password support

---

## ✅ Testing the Password Feature

### 1. Start User Frontend
```bash
cd vet-clinic/vet-user
npm run dev
```

Visit: http://localhost:3001

---

### 2. Create New Account

**Sign Up Form:**
```
┌────────────────────────────┐
│ [Login] [SIGN UP] ← Click  │
│                            │
│ Name: Test User            │
│ Email: test@test.com       │
│ Phone: +971501234567       │
│ Password: test123          │
│                            │
│ [Create Profile]           │
└────────────────────────────┘
```

**Result:**
- ✅ Account created with hashed password
- ✅ Automatically logged in
- ✅ Redirected to /pets page
- ✅ Toast: "Profile created successfully!"

---

### 3. Logout & Login Again

**Logout:**
```
Click red "Logout" button in navbar
```

**Login:**
```
┌────────────────────────────┐
│ [LOGIN] [Sign Up] ← Default│
│                            │
│ Email: test@test.com       │
│ Password: test123          │
│                            │
│ [Login to Account]         │
└────────────────────────────┘
```

**Result:**
- ✅ Password verified
- ✅ Logged in successfully
- ✅ Toast: "Welcome back, Test User!"
- ✅ Redirected to /pets

---

### 4. Test Wrong Password

```
Email: test@test.com
Password: wrongpassword
```

**Result:**
- ❌ Login failed
- ❌ Toast: "Invalid email or password"
- Stays on home page

---

### 5. Test Duplicate Email

Try to sign up with same email again:

**Result:**
- ❌ Error: "Email already registered"
- ✅ Auto-switches to Login mode
- Toast suggestion to login instead

---

## 🎯 Quick Reference

### Login Mode (Default)
**Fields Required:**
- Email
- Password

**Endpoint:** `POST /api/owners/login`

---

### Sign Up Mode
**Fields Required:**
- Name
- Email
- Phone
- Password (min 6 chars)

**Endpoint:** `POST /api/owners`

---

## 📋 Troubleshooting

### Error: "Column password_hash not found"
**Fix:** Delete database and restart backend
```bash
Remove-Item vet-clinic\vet.db
python -m uvicorn main:app --reload
```

---

### Error: "Module 'passlib' not found"
**Fix:** Install the dependency
```bash
pip install passlib[bcrypt]
```

---

### Error: "Email already registered"
**Expected:** This means signup is working correctly!
**Action:** Use Login mode instead

---

### Frontend shows old form (no password field)
**Fix:** Hard refresh browser
```
Ctrl + Shift + R  (Windows/Linux)
Cmd + Shift + R   (Mac)
```

---

## 🎨 What You Should See

### Home Page (Not Logged In)
```
┌─────────────────────────────────────┐
│  Vet Care Logo                      │
│                                     │
│  ┌──────────────────────────────┐  │
│  │ [LOGIN] [SIGN UP] ← Toggle   │  │
│  │                              │  │
│  │ Email: [_________________]   │  │
│  │ Password: [_____________]    │  │
│  │                              │  │
│  │ [Submit Button]              │  │
│  └──────────────────────────────┘  │
│                                     │
│  ★ Featured Services                │
│  📋 All Services                    │
└─────────────────────────────────────┘
```

### Login Tab
- Shows: Email, Password
- Button: "🔓 Login to Account"
- Hint: "Don't have an account? Click Sign Up"

### Sign Up Tab
- Shows: Name, Email, Phone, Password
- Button: "➕ Create Profile"
- Hint: "Password must be at least 6 characters"

---

## 🔐 Security Check

### Verify Passwords Are Hashed

**Check database:**
```bash
# Install sqlite browser or use command line
sqlite3 vet-clinic/vet.db

SELECT email, password_hash FROM owners;
```

**You should see:**
```
test@test.com | $2b$12$KIXe6V... (long hash)
```

**NOT:**
```
test@test.com | test123  ❌ NEVER THIS!
```

---

## ✅ Success Checklist

- [ ] Deleted old `vet.db` file
- [ ] Installed `passlib[bcrypt]`
- [ ] Backend starts without errors
- [ ] Frontend shows password field
- [ ] Can create account with password
- [ ] Can login with correct password
- [ ] Wrong password shows error
- [ ] Duplicate email shows error
- [ ] Password appears as dots (••••••)
- [ ] Passwords are hashed in database

---

## 🎉 You're Done!

Your Vet Care app now has secure password authentication!

**Test Flow:**
1. ✅ Sign up with password
2. ✅ Logout
3. ✅ Login with password
4. ✅ Access protected pages

**Next Steps:**
- Add pets to your account
- Book appointments
- Explore services
- Enjoy the luxury experience! 🐾✨

