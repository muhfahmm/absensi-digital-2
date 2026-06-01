# 🚀 Setup Guide - Absensi Digital

Panduan lengkap untuk setup dan menjalankan Absensi Digital.

## 📋 Prerequisites

Pastikan Anda sudah menginstall:
- **Node.js** (v18 atau lebih tinggi) - [Download](https://nodejs.org/)
- **npm** (v9 atau lebih tinggi) - Biasanya sudah terinstall dengan Node.js
- **Git** - [Download](https://git-scm.com/)

Verifikasi instalasi:
```bash
node --version
npm --version
git --version
```

## 🔧 Installation Steps

### 1. Clone Repository
```bash
git clone <repository-url>
cd absensi-digital
```

### 2. Install Root Dependencies
```bash
npm install
```

### 3. Install Workspace Dependencies

#### Admin Panel
```bash
npm install --workspace=admin
```

#### Mobile App
```bash
npm install --workspace=mobile
```

Atau install semua sekaligus:
```bash
npm install --workspaces
```

### 4. Setup Environment Variables

#### Admin Panel
```bash
cd admin
cp .env.example .env.local
```

Edit `.env.local` sesuai kebutuhan:
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

#### Mobile App
```bash
cd ../mobile
cp .env.example .env
```

Edit `.env` sesuai kebutuhan:
```
EXPO_PUBLIC_API_URL=http://localhost:3001/api
```

## 🎯 Running the Project

### Option 1: Run Admin Panel Only

```bash
npm run dev:admin
```

Admin panel akan berjalan di: **http://localhost:3000**

### Option 2: Run Mobile App Only

```bash
npm run dev:mobile
```

Pilih platform:
- **a** untuk Android
- **i** untuk iOS
- **w** untuk Web

### Option 3: Run Both (Separate Terminals)

Terminal 1 - Admin Panel:
```bash
npm run dev:admin
```

Terminal 2 - Mobile App:
```bash
npm run dev:mobile
```

## 📁 Project Structure

```
absensi-digital/
├── admin/                    # Next.js Admin Dashboard
│   ├── src/
│   │   ├── app/             # Pages & layouts
│   │   ├── components/      # Reusable components
│   │   ├── lib/             # Utilities & API setup
│   │   └── styles/          # Global styles
│   ├── package.json
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── mobile/                   # Expo React Native App
│   ├── src/
│   │   ├── app/             # Screens & navigation
│   │   ├── components/      # Native components
│   │   ├── hooks/           # Custom hooks
│   │   └── services/        # API calls
│   ├── package.json
│   ├── app.json
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── config/                   # Shared configurations
│   ├── tailwind/            # Theme colors & spacing
│   ├── typescript/          # Base TypeScript config
│   └── eslint/              # ESLint rules
│
├── index.html               # Root entry point
├── package.json             # Root workspace config
└── README.md                # Project documentation
```

## 🛠️ Available Commands

### Root Level
```bash
npm run dev              # Run admin panel (default)
npm run dev:admin       # Run admin panel
npm run dev:mobile      # Run mobile app
npm run build           # Build both projects
npm run build:admin     # Build admin only
npm run build:mobile    # Build mobile only
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
npm run android         # Run on Android emulator
npm run ios             # Run on iOS simulator
npm run web             # Run on web browser
npm run build           # Build for production
```

## 🎨 Customization

### Change Theme Colors

Edit `config/tailwind/theme.js`:
```javascript
colors: {
  primary: '#3B82F6',      // Change primary color
  secondary: '#10B981',    // Change secondary color
  // ... more colors
}
```

### Add New Pages (Admin)

1. Create new folder in `admin/src/app/`
2. Create `page.tsx` file
3. Add route to sidebar in `admin/src/components/Sidebar.tsx`

Example:
```bash
mkdir admin/src/app/settings
touch admin/src/app/settings/page.tsx
```

### Add New Screens (Mobile)

1. Create new file in `mobile/src/app/`
2. Use Expo Router for navigation

Example:
```bash
touch mobile/src/app/settings.tsx
```

## 🔌 API Integration

### Admin Panel (Axios)

```typescript
import axiosInstance from '@/lib/axios';

// GET request
const response = await axiosInstance.get('/employees');

// POST request
const response = await axiosInstance.post('/attendance', data);
```

### Mobile App (Axios)

```typescript
import apiClient from '@/services/api';

// GET request
const response = await apiClient.get('/employees');

// POST request
const response = await apiClient.post('/attendance', data);
```

## 🐛 Troubleshooting

### Port Already in Use

Jika port 3000 sudah digunakan:
```bash
# Admin panel akan otomatis menggunakan port berikutnya
npm run dev:admin
```

### Dependencies Not Installing

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -r node_modules

# Reinstall
npm install
```

### Tailwind CSS Not Working

```bash
# Rebuild Tailwind
npm run build:admin
```

### Expo Issues

```bash
# Clear Expo cache
expo start --clear

# Or
npm run dev:mobile -- --clear
```

## 📚 Documentation Links

- [Next.js Docs](https://nextjs.org/docs)
- [Expo Docs](https://docs.expo.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

## 🚢 Deployment

### Deploy Admin Panel to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd admin
vercel
```

### Deploy Mobile App with EAS

```bash
# Install EAS CLI
npm i -g eas-cli

# Login to Expo
eas login

# Build for Android
cd mobile
eas build --platform android

# Build for iOS
eas build --platform ios
```

## 📝 Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/your-feature-name

# Create pull request on GitHub
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License - See LICENSE file for details

---

**Need Help?** Check the README.md or create an issue on GitHub.

Happy Coding! 🎉
