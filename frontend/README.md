# VETCARE - Pet Owner Portal 🐾

A luxurious, futuristic patient portal for pet owners to manage their profiles, pets, appointments, and invoices. Built with modern web technologies for an exceptional user experience.

## ✨ Features

### 🎯 Onboarding
- **Find or Create Owner Profile**: Search existing profiles by email or create a new account
- **No Authentication Needed**: Simple localStorage-based session for MVP
- **Seamless Entry**: Quick setup to start managing your pets

### 🐕 My Pets
- **Pet Management**: Add and view all your pets with species, breed, and age information
- **Pet Cards**: Beautiful cards displaying pet details with emoji indicators
- **Age Calculation**: Automatic age calculation from date of birth
- **Quick Actions**: Book appointments directly from pet cards

### 📅 Appointments
- **Book Appointments**: Schedule visits with your vet
  - Select your pet
  - Choose veterinarian name
  - Pick date and time (1+ days in advance)
  - Select multiple services in one visit
  - View total cost before booking
- **Manage Appointments**: View all scheduled and completed appointments
  - Filter by status (All, Scheduled, Done)
  - Mark appointments as complete
  - Cancel appointments (soft delete)
- **Status Tracking**: Visual status badges (SCHEDULED / DONE)

### 💳 Invoices
- **View Invoices**: See all invoices for your completed appointments
- **Invoice Details**: Complete breakdown of services and pricing
- **Payment Status**: Track paid vs. pending invoices
- **Download PDFs**: Export invoices (ready for implementation)
- **Statistics**: Dashboard showing total invoices, amounts, and payment status

### 🎨 User Experience
- **Luxury Design**: Dark obsidian background with gold accents
- **Glass Morphism**: Frosted glass UI components with blur effects
- **Smooth Animations**: Framer Motion for elegant transitions
- **Responsive Layout**: Mobile-first design with full desktop support
- **Intuitive Navigation**: Sidebar navigation with active state indicators
- **Real-time Feedback**: Toast notifications for all actions

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **JavaScript** - Core language
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Advanced animations
- **Lucide React** - Beautiful icon library
- **SWR** - Data fetching (optional, ready for implementation)

### Styling & UI
- **Glass Morphism**: Backdrop blur effects and transparency
- **Gold Accents**: #E6C773 for premium feel
- **Dark Theme**: Obsidian (#0B0B0F) background
- **Smooth Transitions**: 300ms default animation timing
- **Custom Components**: Button, Modal, Toast, Card, Badge, MultiSelect

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Backend running at `http://localhost:8000`
- npm or yarn

### Installation

1. **Navigate to frontend directory**
```bash
cd vet-clinic/frontend/vet-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create `.env.local` file:
```
NEXT_PUBLIC_API_BASE=http://localhost:8000
```

### Running the Application

**Development Mode**
```bash
npm run dev
```
The app will be available at `http://localhost:3000`

**Production Build**
```bash
npm run build
npm run start
```

## 📁 Project Structure

```
vet-frontend/
├── app/
│   ├── layout.js              # Root layout
│   ├── globals.css            # Global styles
│   ├── page.js                # Onboarding/Welcome page
│   ├── dashboard/
│   │   ├── layout.js          # Authenticated layout with sidebar
│   │   └── page.js            # Dashboard home
│   ├── pets/
│   │   └── page.js            # My Pets page
│   ├── appointments/
│   │   ├── page.js            # My Appointments
│   │   └── book/
│   │       └── page.js        # Book Appointment
│   └── invoices/
│       └── page.js            # Invoices page
├── components/
│   ├── Button.js              # Reusable button component
│   ├── Modal.js               # Modal dialog
│   ├── Toast.js               # Toast notifications
│   ├── Card.js                # Glass card component
│   ├── Badge.js               # Status badges
│   ├── Skeleton.js            # Loading skeleton
│   ├── EmptyState.js          # Empty state component
│   ├── MultiSelect.js         # Multi-select dropdown
│   └── Sidebar.js             # Navigation sidebar
├── lib/
│   └── api.js                 # API utility functions
├── public/                    # Static assets
├── styles/                    # Additional styles
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🔌 API Integration

The app integrates with the backend at `http://localhost:8000` with these endpoints:

### Owners
- `GET /api/owners` - List all owners
- `POST /api/owners` - Create new owner

### Pets
- `GET /api/pets` - List all pets
- `POST /api/pets` - Create new pet

### Services
- `GET /api/services` - List available services

### Appointments
- `GET /api/appointments` - List all appointments
- `POST /api/appointments` - Create appointment
- `POST /api/appointments/{id}/complete` - Mark as done

### Invoices
- `GET /api/invoices` - List all invoices
- `POST /api/invoices?appt_id=<id>` - Create invoice

## 💾 Data Flow

1. **Onboarding**: User finds/creates owner → localStorage stores `ownerId` and `ownerName`
2. **My Pets**: Client filters pets by `owner_id`
3. **Book Appointment**: Form submits to backend → Services calculated locally
4. **My Appointments**: List filtered by user's pet IDs
5. **Invoices**: Filtered by appointments belonging to user's pets

## 🎨 Design System

### Colors
- **Primary**: Gold (#E6C773)
- **Dark Background**: Obsidian (#0B0B0F)
- **Text**: Platinum (#E8E8E8)
- **Glass**: rgba(255, 255, 255, 0.05)

### Typography
- **Display Font**: Manrope
- **Body Font**: Inter
- **Headings**: Uppercase, tight tracking

### Components
- **Buttons**: 3 variants (primary, secondary, ghost, danger)
- **Cards**: Glass effect with hover animations
- **Badges**: Status indicators with color coding
- **Modals**: Animated overlays with glass styling

## 🔐 Security & localStorage

The MVP uses localStorage for session management:
```javascript
// Store
localStorage.setItem('ownerId', owner.id)
localStorage.setItem('ownerName', owner.name)

// Retrieve
const ownerId = localStorage.getItem('ownerId')

// Clear (on logout)
localStorage.removeItem('ownerId')
localStorage.removeItem('ownerName')
```

**Note**: For production, implement proper authentication with secure tokens.

## 🎯 User Flows

### First Time User
1. Land on welcome page → Choose "Create New Profile"
2. Fill in name, email, phone → Account created
3. Redirected to dashboard → Add first pet
4. Go to "Book Appointment" → Schedule visit
5. View appointment and invoice

### Returning User
1. Land on welcome page → Choose "Find My Profile"
2. Search by email → Select profile
3. Redirected to dashboard with their data

## 📝 Future Enhancements

- [ ] Real authentication system
- [ ] Payment processing integration
- [ ] Email notifications
- [ ] Appointment reminders
- [ ] Medical records upload
- [ ] Prescription tracking
- [ ] Vet chat/messaging
- [ ] Mobile app
- [ ] Multi-pet discounts
- [ ] Recurring appointment packages

## 🐛 Troubleshooting

### Frontend won't connect to backend
- Check backend is running: `http://localhost:8000`
- Verify `.env.local` has correct `NEXT_PUBLIC_API_BASE`
- Check browser console for CORS errors

### localStorage not persisting
- Check browser's localStorage is enabled
- Verify not in private/incognito mode
- Clear browser cache and try again

### Styles not loading
- Rebuild Tailwind: `npm run build`
- Clear `.next` folder: `rm -rf .next`
- Reinstall: `npm install`

## 📦 Dependencies

```json
{
  "next": "14.2.10",
  "react": "18.3.1",
  "react-dom": "18.3.1",
  "swr": "^2.2.5",
  "framer-motion": "^10.16.19",
  "lucide-react": "^0.344.0"
}
```

## 🎬 Quick Start Script

Use `run_frontend.bat` (Windows) to automatically start the dev server:
```bash
run_frontend.bat
```

## 📄 License

This project is part of the Vet Clinic application system.

## 🤝 Support

For issues or questions, refer to the main project README or contact the development team.

---

**Made with ❤️ for pet lovers and vets**
