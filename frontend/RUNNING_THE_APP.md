# Quick Start Guide - VETCARE Patient Portal

## Prerequisites

✅ Make sure you have:
- Node.js 18+ installed
- Backend running at `http://localhost:8000`
- `.env.local` file with `NEXT_PUBLIC_API_BASE=http://localhost:8000`

## Starting the Application

### Option 1: Using npm (Recommended)

```bash
# Navigate to frontend directory
cd vet-clinic/frontend/vet-frontend

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

✅ Open browser → `http://localhost:3000`

### Option 2: Using the Batch Script (Windows)

```bash
# From project root or anywhere
run_frontend.bat
```

This will automatically navigate to the directory and start the dev server.

## Typical User Flow

### 1. **First Time Visit**
```
http://localhost:3000
    ↓
Welcome Page (Onboarding)
    ↓
Choose: "Create New Profile" or "Find My Profile"
    ↓
Create Account with Name, Email, Phone
    ↓
Redirected to Dashboard
```

### 2. **Add a Pet**
```
Dashboard
    ↓
Click "Add Pet" or go to "My Pets"
    ↓
Fill Pet Form (Name, Species, Breed, DOB)
    ↓
Pet appears on dashboard
```

### 3. **Book an Appointment**
```
Dashboard or "My Pets" → "Book Appointment"
    ↓
Select Pet → Enter Vet Name → Choose DateTime
    ↓
Select Services (Multi-select)
    ↓
View Total Cost → Book
    ↓
Appointment appears in "My Appointments"
```

### 4. **View Appointments**
```
"My Appointments" page
    ↓
Filter by Status (All, Scheduled, Done)
    ↓
Mark as Done (generates invoice)
    ↓
View in "Invoices"
```

### 5. **Check Invoices**
```
"Invoices" page
    ↓
View invoice breakdown
    ↓
Download PDF (ready to implement)
    ↓
Track payment status
```

## Testing with Mock Data

### Create Test Owner
1. Go to http://localhost:3000
2. Click "Create New Profile"
3. Fill in:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Phone: `+1 (555) 123-4567`

### Add Test Pet
1. Go to "My Pets"
2. Click "Add Pet"
3. Fill in:
   - Name: `Max`
   - Species: `Dog`
   - Breed: `Golden Retriever`
   - DOB: Pick a date 3 years ago

### Book Test Appointment
1. Click "Book Appointment"
2. Select your pet (Max)
3. Vet Name: `Dr. Sarah Johnson`
4. Date/Time: Tomorrow at 10:00 AM
5. Services: Select 2-3 services
6. Review total cost and book

## Sidebar Navigation

### Desktop
- Sidebar visible on left
- Click logo to navigate sections

### Mobile
- Hamburger menu in top-left
- Tap to open sidebar
- Close by clicking item or backdrop

## Switching Owners

To log in as a different owner:
1. Click "Switch Owner" in sidebar (bottom)
2. Confirm
3. Back to onboarding page
4. Select different profile or create new one

## Development Features

### Hot Reload
Changes to files automatically refresh the browser (HMR enabled)

### Debug Console
Open browser DevTools (F12) to see:
- API calls and responses
- localStorage data
- Console logs
- React component tree

### Network Tab
Monitor API requests to backend:
- GET /api/owners
- GET /api/pets
- POST /api/appointments
- GET /api/invoices

## Common Issues & Fixes

### ❌ Can't connect to backend
**Solution:**
1. Check backend is running: `http://localhost:8000`
2. Verify `.env.local` file exists with correct URL
3. Refresh page (Ctrl+Shift+R for hard refresh)

### ❌ CSS/styling not loading
**Solution:**
```bash
npm run build
rm -rf .next
npm run dev
```

### ❌ Can't find pet in appointments
**Solution:**
- Make sure you're logged in with correct owner
- Go to "My Pets" and verify pet exists
- Reload page

### ❌ Appointment not showing invoice
**Solution:**
- Click "Mark Done" on appointment first
- Then go to "Invoices" page
- Invoice should appear

### ❌ localStorage not persisting
**Solution:**
- Check browser privacy mode is off
- Enable localStorage in browser settings
- Clear cookies and try again

## Performance Tips

### For Faster Development
```bash
# Skip build optimization
npm run dev
```

### For Production Build
```bash
npm run build    # Creates optimized build
npm run start    # Runs production server
```

## Browser Compatibility

✅ **Tested on:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

❌ **Not supported:**
- Internet Explorer (ancient!)
- Mobile browsers with localStorage disabled

## Troubleshooting Checklist

Before debugging, verify:

- [ ] Backend is running (`http://localhost:8000`)
- [ ] Node.js version is 18+
- [ ] Dependencies installed (`npm install` ran successfully)
- [ ] `.env.local` file exists and is correct
- [ ] Port 3000 is not in use
- [ ] Browser cache is cleared
- [ ] localStorage is enabled
- [ ] No CORS errors in DevTools

## Getting Help

1. Check browser console (F12) for errors
2. Review `.env.local` configuration
3. Verify backend API is responding
4. Check project README for detailed info
5. Review API documentation in backend README

## Next Steps

After running successfully:

1. ✅ Test all pages (Dashboard, Pets, Appointments, Invoices)
2. ✅ Try creating multiple owners
3. ✅ Add multiple pets and appointments
4. ✅ Test mobile responsiveness (F12 → Device Emulation)
5. ✅ Check performance (DevTools → Lighthouse)

---

**Happy testing! 🎉**

If you encounter issues, check the browser console for detailed error messages.
