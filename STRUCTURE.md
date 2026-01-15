# Struktur Folder Proyek Absensi Digital V2

Berikut adalah detail rencana struktur folder untuk memisahkan logika Website Admin (PHP), API Backend, dan Aplikasi Mobile (React Native).

```
absensi-digital-2/
│
├── app/                   # Folder Utama Aplikasi
│   ├── admin/             # [WEBSITE] Halaman Admin Panel (PHP Native)
│   │   ├── index.php      # Dashboard Utama (Protected)
│   │   ├── login.php      # Halaman Login Admin
│   │   ├── register.php   # Halaman Registrasi Admin Baru
│   │   ├── admin/             # [WEBSITE] Halaman Admin Panel
│   │   ├── config/        # Konfigurasi Database & Konstanta
│   │   ├── includes/      # Header, Sidebar, Footer (Glassmorphism)
│   │   ├── pages/         # (Moved) Old Pages Structure
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── guru/
│   │   │   └── siswa/
│   │   ├── modules/       # (Active) Modular Admin Pages (Siswa, Guru, dll)
│   │   │   ├── siswa/
│   │   │   ├── guru/
│   │   │   ├── karyawan/
│   │   │   ├── kelas/
│   │   │   │   └── data_kelas.php
│   │   │   ├── absensi/
│   │   │   │   └── rekap_absensi.php
│   │   │   └── ...
│   │   └── assets/        # CSS, JS, Image khusus Admin
│   │
│   ├── api/               # [BACKEND] Endpoint JSON untuk Mobile App
│   │   ├── config.php
│   │   ├── login.php
│   │   └── ...
│   │
│   └── mobile/            # [MOBILE] React Native Project (Expo)
│       ├── App.js         # Entry Point
│       ├── app.json       # Expo Config
│       ├── package.json   # Dependencies
│       ├── src/
│       │   ├── components/# Reusable UI
│       │   │   └── GlassView.js   # Glassmorphism Container
│       │   ├── constants/ # Colors & Theme
│       │   │   └── theme.js       # Glass Theme Definition
│       │   ├── navigation/# App Navigation
│       │   │   └── AppNavigator.js
│       │   ├── screens/   # Application Screens
│       │   │   ├── LoginScreen.js
│       │   │   ├── HomeScreen.js
│       │   │   └── ...
│       │   └── services/  # API Calls
│       └── assets/        # Icon & Splash Screen
│
├── database.sql           # File Database SQL
├── README.md             # Dokumentasi Utama
├── ROADMAP.md            # Rencana Pengembangan
└── STRUCTURE.md          # Dokumentasi Struktur Folder (File ini)
```

## Penjelasan

1.  **`app/`**: Folder induk yang menampung seluruh *source code* aplikasi (Admin, API, dan Mobile).
2.  **`app/admin/`**: Pusat kontrol untuk Administrator via browser.
3.  **`app/api/`**: Jembatan data JSON untuk aplikasi mobile.
4.  **`app/mobile/`**: Source code aplikasi React Native.
