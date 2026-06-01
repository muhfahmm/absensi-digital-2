/absensi-digital
├── /admin (Next.js + Tailwind)
│   ├── /src
│   │   ├── /app
│   │   │   ├── layout.tsx           # Root layout
│   │   │   ├── page.tsx             # Home page
│   │   │   ├── /dashboard
│   │   │   │   └── page.tsx         # Dashboard page
│   │   │   ├── /employees
│   │   │   │   └── page.tsx         # Employees management
│   │   │   └── /attendance
│   │   │       └── page.tsx         # Attendance data
│   │   ├── /components
│   │   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   │   ├── Card.tsx             # Reusable card component
│   │   │   └── Table.tsx            # Reusable table component
│   │   ├── /lib
│   │   │   └── axios.ts             # Axios instance & interceptors
│   │   └── /styles
│   │       └── globals.css          # Global styles & Tailwind
│   ├── .eslintrc.json
│   ├── .env.example
│   ├── next.config.ts
│   ├── postcss.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── package.json
├── /mobile (Expo + React Native + NativeWind)
│   ├── /src
│   │   ├── /app
│   │   │   ├── index.tsx            # Home screen
│   │   │   ├── attendance.tsx       # Check in/out screen
│   │   │   ├── history.tsx          # Attendance history
│   │   │   └── profile.tsx          # User profile
│   │   ├── /components              # Native UI Components (placeholder)
│   │   ├── /hooks                   # Custom Hooks (placeholder)
│   │   └── /services
│   │       └── api.ts               # Axios instance for mobile
│   ├── .env.example
│   ├── app.json
│   ├── babel.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── package.json
├── /config (Shared Configurations)
│   ├── /tailwind
│   │   └── theme.js                 # Shared colors & spacing
│   ├── /typescript
│   │   └── base.json                # Base TypeScript config
│   └── /eslint
│       └── base.js                  # Base ESLint rules
├── .git                             # Git repository
├── .gitignore
├── index.html                       # Root entry point (redirect to admin)
├── package.json                     # Root workspace config
├── README.md                        # Project documentation
├── SETUP.md                         # Setup guide
└── struktur_folder.md               # This file