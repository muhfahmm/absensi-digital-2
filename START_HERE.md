# 🎯 START HERE - Absensi Digital

Selamat datang! Panduan ini akan membantu Anda memulai dengan cepat.

## 📖 Pilih Panduan Anda

### ⚡ Ingin Mulai Cepat? (3 menit)
👉 Baca: **[QUICK_START.md](./QUICK_START.md)**

Panduan singkat dengan 3 langkah mudah untuk menjalankan admin panel.

### 📚 Ingin Tahu Detail Setup?
👉 Baca: **[SETUP.md](./SETUP.md)**

Panduan lengkap dengan penjelasan detail tentang setiap langkah setup.

### ✅ Ingin Tahu Apa yang Sudah Disetup?
👉 Baca: **[INSTALLATION_SUMMARY.md](./INSTALLATION_SUMMARY.md)**

Ringkasan lengkap tentang apa yang sudah dikonfigurasi dan siap digunakan.

### 📋 Ingin Tahu Struktur Proyek?
👉 Baca: **[README.md](./README.md)**

Overview proyek, tech stack, dan informasi umum.

---

## 🚀 Quick Commands

```bash
# 1. Install semua dependencies
npm install --workspaces

# 2. Run admin panel (langsung buka admin panel)
npm run dev

# 3. Buka browser
http://localhost:3000
```

---

## 📁 Struktur Proyek

```
absensi-digital/
├── admin/          # Next.js Admin Dashboard
├── mobile/         # Expo React Native App
├── config/         # Shared Configuration
└── [docs]          # Documentation files
```

---

## ✨ Apa yang Sudah Siap

### Admin Panel ✅
- Next.js 14 dengan App Router
- Tailwind CSS styling
- Sample pages (Dashboard, Employees, Attendance)
- Reusable components (Sidebar, Card, Table)
- Axios API setup

### Mobile App ✅
- Expo React Native
- Expo Router navigation
- NativeWind (Tailwind untuk React Native)
- Sample screens (Home, Attendance, History, Profile)
- Axios API setup

### Shared Config ✅
- Tailwind theme colors
- TypeScript configuration
- ESLint rules

---

## 🎯 Langkah Pertama

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

---

## 📚 Dokumentasi Lengkap

| File | Deskripsi |
|------|-----------|
| **QUICK_START.md** | 5 langkah mudah untuk mulai |
| **SETUP.md** | Panduan setup detail |
| **INSTALLATION_SUMMARY.md** | Apa yang sudah disetup |
| **README.md** | Project overview |
| **struktur_folder.md** | Struktur folder lengkap |

---

## 🎨 Tech Stack

### Admin Panel
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **HTTP**: Axios

### Mobile App
- **Framework**: Expo + React Native
- **Styling**: NativeWind (Tailwind)
- **Language**: TypeScript
- **HTTP**: Axios

### Shared
- **Package Manager**: npm (workspaces)
- **Linting**: ESLint
- **Type Checking**: TypeScript

---

## 💡 Tips

1. **Baca QUICK_START.md dulu** - Paling cepat untuk mulai
2. **Gunakan Tailwind classes** - Jangan custom CSS
3. **Buat reusable components** - Di folder components
4. **TypeScript everywhere** - Semua file sudah typed
5. **Hot reload** - Perubahan file otomatis reload

---

## ❓ FAQ

**Q: Berapa lama setup?**
A: 5 menit dengan QUICK_START.md

**Q: Apa yang sudah siap?**
A: Lihat INSTALLATION_SUMMARY.md

**Q: Bagaimana cara menambah halaman?**
A: Lihat SETUP.md bagian "Add New Pages"

**Q: Bagaimana cara connect ke API?**
A: Lihat SETUP.md bagian "API Integration"

---

## 🆘 Butuh Bantuan?

1. Baca dokumentasi yang sesuai
2. Check SETUP.md bagian "Troubleshooting"
3. Lihat komentar di dalam kode

---

## ✅ Checklist

- [ ] Baca START_HERE.md (file ini)
- [ ] Baca QUICK_START.md
- [ ] npm install --workspaces
- [ ] npm run dev:admin
- [ ] Buka http://localhost:3000
- [ ] Explore admin panel
- [ ] Customize sesuai kebutuhan

---

## 🎉 Siap Mulai?

👉 **Buka [QUICK_START.md](./QUICK_START.md) sekarang!**

---

**Happy Coding! 🚀**
