# Services Feature - Quick Start Guide

## ⚠️ Important First Step

**Delete your existing database** (it has the old schema):

```bash
# From project root
rm vet-clinic/vet.db
```

Or on Windows PowerShell:
```powershell
Remove-Item vet-clinic\vet.db
```

The new schema uses:
- UUID strings for service IDs (instead of integers)
- `price_aed` field (instead of `price`)
- Many new fields (slug, category, tags, featured, etc.)

---

## 🚀 Start the Stack

### Terminal 1: Backend
```bash
cd vet-clinic/backend
python -m uvicorn main:app --reload --port 8000
```

**Expected:** 15 services auto-seeded on startup

### Terminal 2: Admin Frontend
```bash
cd vet-clinic/frontend/vet-frontend
npm run dev
```

**Access:** http://localhost:3000

### Terminal 3: User Frontend
```bash
cd vet-clinic/vet-user
npm run dev
```

**Access:** http://localhost:3001

---

## 🎯 Quick Tour

### 1. User Experience (Port 3001)

**Home Page (`/`)**
- See featured services spotlight
- Browse complete catalog by category
- Click "Book Now" on any service
- If not logged in → create profile
- Automatic redirect to booking

**Portfolio Page (`/portfolio`)**
- Click "Services" in navbar
- Use search bar to find services
- Filter by category
- Sort by price, duration, or name

**Booking (`/book?service=general-checkup`)**
- Service is preselected
- Choose your pet
- Select vet and time
- Complete booking

### 2. Admin Experience (Port 3000)

**Services Management**
- Navigate to `/services`
- See all 15 seeded services
- Click "+ New Service" to create
- Edit any service (pencil icon)
- Toggle featured (star icon)
- Reorder (up/down arrows)
- Delete services (trash icon)

### 3. Backend API (Port 8000)

**Test endpoints:**
```bash
# Get all services
curl http://localhost:8000/api/services

# Get featured only
curl http://localhost:8000/api/services?featured=true

# Get by category
curl http://localhost:8000/api/services?category=Preventive
```

---

## 🎨 Key Visual Elements

### User App
- **Branding:** "Vet Care" (gold gradient)
- **Hero:** Large with luxury glass panel
- **Featured Services:** Top 6 in 3-column grid
- **Category Tabs:** Filter entire catalog
- **Service Cards:** 
  - Category emoji icon
  - Featured badge (if applicable)
  - Description
  - Tags as chips
  - Price in AED
  - Duration
  - Fasting warning (if required)
  - "Book Now" button

### Admin App
- **Services Table:** All metadata visible
- **Inline Controls:** Edit, delete, star, reorder
- **Search & Filter:** Real-time filtering
- **Modal Forms:** Clean create/edit experience

---

## 💡 Pro Tips

1. **Slug Generation:** When creating services in admin, slug auto-generates from name when you blur the name field

2. **Featured Services:** Toggle the star icon to show/hide services on home page spotlight

3. **Display Order:** Use up/down arrows to control sort order (lower numbers appear first)

4. **Tags:** Enter comma-separated tags in admin form (e.g., "exam, wellness, checkup")

5. **Fasting Flag:** Shows warning badge on service cards for procedures requiring fasting

6. **Bookable Flag:** Unchecked = "Not Bookable" button appears (useful for consultation-only services)

---

## 🐛 Troubleshooting

**Services not showing?**
- Check backend is running on port 8000
- Check browser console for CORS errors
- Verify services were seeded: `curl http://localhost:8000/api/services`

**"Service not found" when booking?**
- Ensure you deleted the old database
- Service IDs are now UUIDs, not integers
- Check the URL slug matches a real service

**Search not working in portfolio?**
- Clear your browser cache
- Check that services have tags populated
- Search looks at name, description, category, and tags

**Preselection not working?**
- Use the slug, not the ID: `/book?service=general-checkup`
- Check the slug exists in the database
- Look for toast notification confirming preselection

---

## 📱 Mobile Testing

All pages are fully responsive:
- Navbar collapses to hamburger menu
- Service grids stack on mobile
- Forms are touch-friendly
- Modals are mobile-optimized

---

## 🎉 You're Ready!

Everything is set up. Start the three applications, delete the old database, and enjoy your new services system!

**First Test Flow:**
1. Open http://localhost:3001 (user app)
2. Scroll to featured services
3. Click "Book Now" on "General Checkup"
4. Create a quick profile
5. Add a pet
6. Complete the booking
7. Check http://localhost:3000/services (admin) to see the service

Happy coding! 🐾✨

