# 🎯 Absensi Digital - Sistem Manajemen Kehadiran

Sistem manajemen kehadiran digital yang komprehensif dengan admin panel dan aplikasi mobile.

## 🚀 Quick Start (3 Langkah)

### 1. Install Dependencies
```bash
npm install --workspaces
```

### 2. Run Admin Panel
```bash
npm run dev
```

### 3. Buka Browser
```
http://localhost:3000
```

**Catatan**: Folder `node_modules` akan dibuat otomatis saat `npm install`

---

## 📋 Struktur Proyek

```
absensi-digital/
├── admin/              # Next.js Admin Dashboard
├── mobile/             # Expo React Native App
├── config/             # Shared configurations
├── index.html          # Root entry point
├── package.json        # Root workspace config
└── [documentation]     # README, SETUP, QUICK_START, dll
```

## 🛠️ Tech Stack

### Admin Panel
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **HTTP Client**: Axios

### Mobile App
- **Framework**: Expo
- **UI**: React Native + NativeWind
- **Language**: TypeScript
- **HTTP Client**: Axios

### Shared
- **Package Manager**: npm (workspaces)
- **Linting**: ESLint
- **Type Checking**: TypeScript

---

## 📦 Available Scripts

### Root Level
```bash
npm run dev              # Run admin panel (default)
npm run dev:admin       # Run admin panel
npm run dev:mobile      # Run mobile app
npm run build           # Build both admin and mobile
npm run build:admin     # Build admin only
npm run build:mobile    # Build mobile only
npm run install:all     # Install all dependencies
```

### Admin Panel
```bash
cd admin
npm run dev             # Development server
npm run build           # Production build
npm run start           # Start production server
npm run lint            # Run ESLint
```

### Mobile App
```bash
cd mobile
npm run dev             # Start Expo dev server
npm run android         # Run on Android
npm run ios             # Run on iOS
npm run web             # Run on web
npm run build           # Build for production
```

---

## 🎨 Tailwind Theme

Warna yang tersedia:
- **Primary**: `#3B82F6` (Blue)
- **Secondary**: `#10B981` (Green)
- **Danger**: `#EF4444` (Red)
- **Warning**: `#F59E0B` (Amber)
- **Dark**: `#1F2937`
- **Light**: `#F3F4F6`

---

## 🔐 Environment Variables

### Admin Panel (`.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Mobile App (`.env`)
```
EXPO_PUBLIC_API_URL=http://localhost:3001/api
```

**Catatan**: File `.env.local` dan `.env` sudah dibuat dan siap digunakan.

---

## 📚 Documentation

- **QUICK_START.md** - 3 langkah mudah untuk mulai
- **SETUP.md** - Panduan setup detail
- **INSTALLATION_SUMMARY.md** - Ringkasan setup
- **START_HERE.md** - Panduan awal
- **DEVELOPER_CHECKLIST.md** - Checklist untuk development

---

## 🚀 Deployment

### Admin Panel (Vercel)
```bash
npm run build:admin
# Deploy to Vercel
```

### Mobile App (EAS)
```bash
cd mobile
eas build --platform android
eas build --platform ios
```

---

## 📝 Development Guidelines

### Naming Conventions
- Components: PascalCase (e.g., `UserCard.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Styles: kebab-case (e.g., `card-container`)

### File Organization
- Keep components small and focused
- Use TypeScript for type safety
- Follow ESLint rules
- Use Tailwind utilities instead of custom CSS

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

## 📄 License

MIT License - feel free to use this project for your needs.

---

**Happy Coding! 🎉**
