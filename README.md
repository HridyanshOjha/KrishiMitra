# 🌿 KrishiMitra — Farmer & Land Records Management System

A modern, responsive, production-ready frontend for digitizing farmer registrations,
land records, and government scheme enrollments for district agricultural departments.

---

## ✅ GitHub Safety Checklist

| Check | Status |
|-------|--------|
| No API keys / secrets in source code | ✅ Clean |
| `.env` in `.gitignore` | ✅ Ignored |
| `.env.example` committed (safe template) | ✅ Present |
| `"private": true` in `package.json` | ✅ Set |
| No `dangerouslySetInnerHTML` / XSS vectors | ✅ Clean |
| No `console.log` / `console.error` leaks | ✅ Removed |
| No hardcoded credentials in production paths | ✅ Demo-only |
| Auth uses `sessionStorage` (cleared on tab close) | ✅ Secure |
| All routes behind `RequireAuth` guard | ✅ Protected |
| Zero unused imports | ✅ Verified |

> **Note on demo credentials:** `LoginPage.jsx` contains demo usernames/passwords
> clearly marked for development. Before any real deployment, replace the `DEMO_USERS`
> array with a real API call and remove the credential hints from the UI.

---

## 📁 Project Structure

```
krishimitra/
├── .gitignore
├── .env.example                      # Safe to commit — template only
├── index.html
├── package.json                      # "private": true
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx                       # Routes + DarkMode + Auth providers
    ├── index.css                     # Tailwind + global component classes
    │
    ├── data/                         # Mock data (swap for API calls)
    │   ├── farmers.js
    │   ├── land.js
    │   └── schemes.js
    │
    ├── hooks/
    │   ├── useAuth.jsx               # Login / logout / session context
    │   ├── useDarkMode.js            # Dark mode context
    │   ├── useDebounce.js
    │   └── useLocalStorage.js        # Safe localStorage with error handling
    │
    ├── utils/
    │   ├── helpers.js                # cn(), formatCurrency, getInitials…
    │   └── export.js                 # exportCSV(), generateId()
    │
    ├── components/
    │   ├── ui/                       # Reusable design-system primitives
    │   │   ├── Badge.jsx
    │   │   ├── Button.jsx
    │   │   ├── ConfirmDialog.jsx
    │   │   ├── EmptyState.jsx
    │   │   ├── FormField.jsx         # Input, Select, Textarea
    │   │   ├── Modal.jsx
    │   │   ├── Pagination.jsx
    │   │   └── SearchInput.jsx
    │   │
    │   ├── layout/
    │   │   ├── DashboardLayout.jsx   # Sidebar + TopBar shell
    │   │   ├── RequireAuth.jsx       # Route guard → redirects to /login
    │   │   ├── Sidebar.jsx           # Collapsible nav, mobile drawer
    │   │   └── TopBar.jsx            # Dark mode, notifications, profile, sign out
    │   │
    │   ├── dashboard/
    │   │   ├── StatCard.jsx
    │   │   └── DashboardCharts.jsx   # Recharts: area, pie, bar
    │   │
    │   ├── farmers/
    │   │   ├── FarmerTable.jsx       # Search + filter + paginate
    │   │   └── FarmerForm.jsx        # Add / Edit modal
    │   │
    │   ├── land/
    │   │   ├── LandTable.jsx
    │   │   └── LandForm.jsx
    │   │
    │   └── schemes/
    │       └── SchemeCard.jsx
    │
    └── pages/
        ├── LandingPage.jsx           # Public landing page
        ├── LoginPage.jsx             # Login with form validation + demo creds
        ├── DashboardPage.jsx         # Overview: stats, charts, activity
        ├── FarmersPage.jsx           # CRUD + CSV export
        ├── LandPage.jsx              # CRUD + CSV export
        ├── SchemesPage.jsx           # Browse + search + filter schemes
        └── ReportsPage.jsx           # 6 chart types + village table
```

---

## 🚀 Setup & Running

### Prerequisites
- **Node.js** >= 18.x
- **npm** >= 9.x

### Install & Run

```bash
# 1. Clone / extract the project
cd krishimitra

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# → http://localhost:5173

# 4. Build for production
npm run build

# 5. Preview production build locally
npm run preview
```

---

## 🔐 Authentication

The app uses a session-based auth context (`useAuth`) backed by `sessionStorage`
(automatically cleared when the browser tab closes — no persistent tokens).

### Demo Credentials (development only)

| Username | Password     | Role          | Access |
|----------|-------------|---------------|--------|
| `admin`  | `Admin@1234` | Admin          | Full   |
| `officer`| `Officer@123`| Field Officer  | Add/Edit |
| `viewer` | `Viewer@123` | Viewer         | Read-only |

**All dashboard routes are protected by `RequireAuth`.** Unauthenticated users are
redirected to `/login` and returned to their intended page after sign-in.

### Replacing with a Real Backend

In `src/hooks/useAuth.jsx`, replace the `DEMO_USERS` lookup with an API call:

```js
const login = async (username, password) => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
    credentials: 'include', // for httpOnly cookies
  })
  if (!res.ok) return { ok: false, error: 'Invalid credentials.' }
  const user = await res.json()
  setUser(user)
  return { ok: true }
}
```

---

## 📊 Features

### Landing Page (`/`)
- Hero with animated headline, stats strip, features grid (6 cards)
- "How It Works" 4-step section, CTA banner, footer

### Login Page (`/login`)
- Form validation, show/hide password toggle, loading spinner
- Click-to-fill demo credential panel
- Redirects back to originally requested URL after sign-in

### Dashboard (`/dashboard`) — Protected
- 4 KPI stat cards with trend indicators
- Registration trend area chart (8 months), crop distribution pie chart
- Scheme enrollment bar chart, recent farmers list, activity feed

### Farmer Management (`/dashboard/farmers`) — Protected
- Full CRUD: Add, Edit, Delete with collision-safe ID generation
- Data persisted to `localStorage` (survives page refresh)
- Search by name / ID / village / crops, filter by status
- Paginated table (8 per page), CSV export

### Land Records (`/dashboard/land`) — Protected
- Full CRUD with khasra number, soil type, irrigation details
- Ownership breakdown progress bars, CSV export
- Collision-safe ID generation

### Beneficiary Schemes (`/dashboard/schemes`) — Protected
- 8 real schemes: PM-KISAN, PMFBY, KCC, PMKSY, e-NAM, SHC, PKVY, SMAM
- Filter by type + status, active filter chips, closing-soon alert

### Reports (`/dashboard/reports`) — Protected
- Line chart, bar chart, horizontal bar, pie chart, radar chart, grouped bar
- Village-wise farmer count table with coverage progress bars

---

## 🛠 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18 | UI framework |
| React Router DOM | 6 | Client-side routing + auth guard |
| Vite | 5 | Build tool + dev server |
| Tailwind CSS | 3 | Utility-first styling |
| Recharts | 2 | Charts & data visualization |
| Lucide React | 0.383 | Icon library |
| clsx | 2 | Conditional classnames |

---

## 🔄 Replacing Mock Data with a Real API

All mock data lives in `src/data/`. Example migration for Farmers:

```js
// src/pages/FarmersPage.jsx — BEFORE (mock)
import { FARMERS } from '@/data/farmers'
const [farmers, setFarmers] = useLocalStorage('km-farmers', FARMERS)

// AFTER (real API)
const [farmers, setFarmers] = useState([])
const [loading, setLoading] = useState(true)

useEffect(() => {
  fetch('/api/farmers', { credentials: 'include' })
    .then(r => r.json())
    .then(data => { setFarmers(data); setLoading(false) })
}, [])
```

---

## 📄 License

Built for academic / government demonstration purposes.
All data is mock/sample only. Not for production use without a secure backend.
