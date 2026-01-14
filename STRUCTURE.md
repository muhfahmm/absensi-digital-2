# Struktur Folder Proyek Absensi Digital V2

Berikut adalah detail rencana struktur folder untuk memisahkan logika Website Admin (PHP), API Backend, dan Aplikasi Mobile (React Native).

```
absensi-digital-2/
│
├── app/                   # Folder Utama Aplikasi
│   ├── admin/             # [WEBSITE] Halaman Admin Panel (PHP Native)
│   │   ├── index.php      # Dashboard Utama (Protected)
│   │   ├── login.php      # Halaman Login Admin
│   │   ├── logout.php     # Script Logout
│   │   ├── config/        # Koneksi Database & Konfigurasi
│   │   │   ├── database.php
│   │   │   └── constants.php
│   │   ├── includes/      # Komponen UI berulang
│   │   │   ├── header.php
│   │   │   ├── sidebar.php
│   │   │   └── footer.php
│   │   ├── modules/       # Halaman Fitur CRUD
│   │   │   ├── siswa/
│   │   │   │   ├── data_siswa.php
│   │   │   │   ├── create.php
│   │   │   │   └── edit.php
│   │   │   ├── guru/
│   │   │   │   └── data_guru.php
│   │   │   ├── karyawan/
│   │   │   │   └── data_karyawan.php
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
│       ├── assets/        # Icon & Splash Screen
│       └── ...
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
