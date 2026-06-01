# ⚡ Quick Start Guide

Panduan cepat untuk memulai Absensi Digital dalam 5 menit.

## 🎯 3 Langkah Mudah

### 1️⃣ Install Dependencies (2 menit)
```bash
npm install --workspaces
```

### 2️⃣ Run Admin Panel (30 detik)
```bash
npm run dev
```

Tunggu sampai muncul:
```
> ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

### 3️⃣ Buka Browser
Akses: **http://localhost:3000**

Anda akan melihat:
- 🏠 Home page dengan menu utama
- 📊 Dashboard dengan stats
- 👥 Employees management
- ✓ Attendance tracking

---

## 📱 Apa yang Sudah Siap

### Admin Panel
✅ Next.js 14 dengan App Router
✅ Tailwind CSS styling
✅ Responsive design
✅ Sample pages & components
✅ Axios API setup

### Mobile App
✅ Expo React Native
✅ Expo Router navigation
✅ NativeWind (Tailwind)
✅ Sample screens
✅ Axios API setup

### Shared
✅ Tailwind theme colors
✅ TypeScript config
✅ ESLint rules

---

## 🎨 Fitur yang Sudah Ada

### Admin Panel Pages
- **Home** (`/`) - Menu utama dengan 4 pilihan
- **Dashboard** (`/dashboard`) - Stats cards & attendance table
- **Employees** (`/employees`) - Daftar karyawan dengan aksi
- **Attendance** (`/attendance`) - Data absensi dengan filter

### Mobile App Screens
- **Home** - Menu utama
- **Attendance** - Check in/out
- **History** - Riwayat absensi
- **Profile** - Data profil user

### Components
- **Sidebar** - Navigation menu
- **Card** - Stats card component
- **Table** - Data table component

---

## 🔧 Troubleshooting

### ❌ Port 3000 sudah digunakan
Next.js akan otomatis menggunakan port berikutnya (3001, 3002, dll)

### ❌ npm install error
```bash
npm cache clean --force
rm -r node_modules
npm install --workspaces
```

### ❌ Tailwind CSS tidak bekerja
```bash
npm run build:admin
```

### ❌ Expo tidak bisa start
```bash
npm run dev:mobile -- --clear
```

---

## 📚 Dokumentasi Lengkap

- **README.md** - Project overview
- **SETUP.md** - Detailed setup guide
- **INSTALLATION_SUMMARY.md** - What's been setup
- **struktur_folder.md** - Folder structure

---

## 🚀 Langkah Selanjutnya

### Customize Admin Panel
1. Edit warna di `admin/tailwind.config.ts`
2. Tambah halaman baru di `admin/src/app/`
3. Buat komponen di `admin/src/components/`

### Customize Mobile App
1. Edit warna di `mobile/tailwind.config.js`
2. Tambah screen di `mobile/src/app/`
3. Buat komponen di `mobile/src/components/`

### Connect to Backend API
1. Update `NEXT_PUBLIC_API_URL` di `admin/.env.local`
2. Update `EXPO_PUBLIC_API_URL` di `mobile/.env`
3. Gunakan axios untuk API calls

---

## 💡 Tips

- **Hot Reload**: Perubahan file otomatis reload
- **TypeScript**: Semua file sudah typed
- **Tailwind**: Gunakan class utility, jangan custom CSS
- **Components**: Buat reusable components di folder components

---

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Expo Docs](https://docs.expo.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Native](https://reactnative.dev/docs/getting-started)

---

## ✅ Checklist

- [ ] npm install --workspaces
- [ ] npm run dev
- [ ] Buka http://localhost:3000
- [ ] Explore admin panel
- [ ] (Optional) npm run dev:mobile
- [ ] Customize sesuai kebutuhan

---

**Selamat! Anda siap untuk development! 🎉**

Pertanyaan? Lihat dokumentasi lengkap di README.md atau SETUP.md
