# Absensi Digital V2

Aplikasi Absensi Digital Modern yang mengintegrasikan panel administrasi berbasis Website dan aplikasi Mobile untuk pengguna.

## 🔐 Hak Akses Platform

| Role | Website (Admin Panel) | Mobile App |
| :--- | :---: | :---: |
| **Admin** | ✅ BISA | ✅ BISA (Monitoring) |
| **Guru** | ❌ TIDAK | ✅ BISA |
| **Siswa** | ❌ TIDAK | ✅ BISA |
| **Karyawan** | ❌ TIDAK | ✅ BISA |

> **Catatan Penting**: Website `admin/` diproteksi khusus hanya untuk role **Administrator**. User lain (Guru/Siswa/Karyawan) **hanya** dapat login melalui Aplikasi Mobile.

## 🛠 Teknologi

*   **Backend / Admin Panel**: PHP Native (HTML, CSS Vanilla, JS).
*   **Mobile App**: React Native (Expo).
*   **Database**: MySQL (`db_absensi2`).
*   **API**: REST API (PHP JSON).

## 📂 Struktur Project

*   `app/admin/` - Web Dashboard (Khusus Admin).
*   `app/api/` - Backend API (Jembatan komunikasi data).
*   `app/mobile/` - Source code Aplikasi Android/iOS.
*   `database.sql` - Skema Database.

## 🚀 Cara Instalasi Database

1.  Pastikan XAMPP berjalan.
2.  Import `database.sql` ke `phpMyAdmin`.
3.  Konfigurasi koneksi di `app/admin/config/database.php`.

## 👤 Akun Default

*   **Username**: `admin`
*   **Password**: `admin123`

## 📱 Fitur Utama

### 1. Website Admin (Web Browser)
*   **Hanya untuk Admin.**
*   Dashboard Statistik (Total hadir, sakit, alpa hari ini).
*   Manajemen Master Data (Siswa, Guru, Karyawan, Kelas, Mapel).
*   Cetak & Generate QR Code User.
*   Laporan Rekapitulasi Absensi (Export Excel/PDF).
*   Approval/Persetujuan Izin & Sakit.

### 2. Mobile App (Android/iOS)
*   **Untuk Semua Role (Admin, Guru, Siswa, Karyawan).**
*   **Fitur Admin di Mobile**: Menu khusus untuk scan QR manual (jika alat scan error) & monitoring ringkas.
*   **Fitur User**:
    *   Scan QR Code (untuk Absen Masuk/Pulang).
    *   Lihat QR Code Pribadi (Identitas Digital).
    *   Riwayat Absensi & Keterlambatan.
    *   Form Pengajuan Izin (Upload Foto).
    *   Lihat Jadwal & Pengumuman.
