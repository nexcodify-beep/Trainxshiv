# TrainXShiv Fullstack Ecosystem 🚀

Yeh project 3 parts me divided hai:
1. **`frontend/`** - Main Customer Website (React + Vite, Port 5173)
2. **`admin/`** - Premium Light-Themed Admin Control Panel (React + Vite, Port 5174)
3. **`backend/`** - Express.js REST API with **MySQL Database** (Node.js, Port 5000)

---

## 🗄️ MySQL Database Setup

Backend me **MySQL Database** connect kar diya gaya hai:

### Configuration (`backend/.env`):
```env
PORT=5000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=trainxshiv_db
```

### Auto Initialization:
- Jab aap `npm run dev:backend` chalayenge, server automatically `trainxshiv_db` database create karega, saare required relational tables create karega, aur default initial data seed kar dega.
- Agar aap chahein toh `backend/schema.sql` file ko **phpMyAdmin** ya **MySQL Workbench** me directly import bhi kar sakte hain.

*(Note: Agar MySQL service temporarily band ho, toh backend bina crash hue standalone fallback mode me chalta rahega, aur MySQL on hote hi auto-connect ho jayega).*

---

## ⚡ Quick Start (Kaise Run Karein)

Root directory se individual projects ko easily run kar sakte hain:

### 1. Backend Server Run Karein:
```bash
npm run dev:backend
# API running on http://localhost:5000
```

### 2. Admin Panel Run Karein:
```bash
npm run dev:admin
# Admin Panel: http://localhost:5174
```

### 3. Customer Frontend Website Run Karein:
```bash
npm run dev:frontend
# Live Website: http://localhost:5173
```

---

## 💎 Admin Panel Features

Admin panel ek modern **Light Theme** (Apple/Linear clean aesthetic) me design kiya gaya hai:

- 📊 **Dashboard Overview**: Total inquiries, active coaching programs, trainers, transformations, and quick website banner switch.
- 🏢 **Brand & Socials**: Brand name, phone, WhatsApp number, email, city, Instagram & YouTube links.
- ⚡ **Hero & Home**: Main title, subtitles, CTA buttons, trust stats (500+ transformed, 98% success, 5+ yrs exp), and 4 "How It Works" steps.
- 🏋️ **Programs Manager**: Add, edit, delete training programs (Online Coaching, Muscle Building, Fat Loss, etc.), pricing, duration, and bullet inclusions.
- 💰 **Pricing Plans**: Membership tiers (Online, Personal Training, Diet, Complete Transformation), popular badge toggles, and feature checklists.
- 🥗 **Diet Plans**: Starter, Pro, and Elite packages with pricing and customizable inclusions.
- 👥 **Trainers & Team**: Head trainer profile (Shivam) + Team specialists (Strength, Female trainer, Nutritionist).
- 🔄 **Transformations**: Before & after stories with photo URLs, weight change metrics (-12 KG, +8 KG), and category filters.
- 🎥 **Video Reviews**: Video clips & reels with thumbnails and student feedback.
- ⭐ **Testimonials**: 5-star ratings, quotes, and client avatars.
- 📝 **Blog Articles**: Article publishing with category filters and paragraph management.
- ❓ **FAQ Manager**: Reorder, add, and edit FAQs.
- 📩 **Leads & Inquiries CRM**: Form submissions with 1-click WhatsApp messaging button and status tracking (New, Contacted, Enrolled, Closed).
- 💾 **Data Backup & Sync**: Download JSON backups, restore data, reset to factory defaults, and real-time MySQL database status.
