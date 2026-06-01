Berikut adalah file `design.md` yang telah dioptimalkan. Saya telah menyederhanakan struktur agar lebih relevan dengan aplikasi **Absensi Digital** yang efisien, membuang modul yang terlalu kompleks (seperti e-learning/pembayaran yang terlalu berat), dan memfokuskan pada detail tata letak UI yang modern menggunakan konsep *sidebar-dashboard*.

---

# Design System: Admin Panel Absensi Digital

## 1. Konsep Visual & Palet Warna

Desain mengusung konsep **Clean & Professional**. Penggunaan *whitespace* yang luas dan *rounded corners* untuk memberikan kesan modern dan tidak kaku.

**Palet Warna:**

* **Primary:** `#2C5EAD` (Navigasi & Elemen Utama)
* **Secondary:** `#1591DC` (Aksen & Hover)
* **Surface:** `#F8FAFC` (Latar belakang utama/dashboard)
* **Card Background:** `#FFFFFF` (Panel kartu)
* **Text:** `#1E293B` (Primary), `#64748B` (Secondary)
* **Status Colors:** `#10B981` (Hadir), `#F59E0B` (Sakit), `#3B82F6` (Izin), `#EF4444` (Alpa)

---

## 2. Tata Letak (Layout)

Menggunakan **Sidebar Navigation** yang tetap di kiri (desktop) dan **Content Area** di kanan.

* **Sidebar (Width: 260px):**
* Logo Sekolah (Atas)
* Menu Utama (Dashboard, Absensi, Data Siswa/Guru, Jadwal, Pengumuman)
* Logout (Paling bawah)


* **Header (Height: 70px):**
* Judul Halaman
* Profil Admin (Kanan atas)


* **Main Content:**
* Margin: 24px (Memberikan ruang napas antar elemen)
* Grid: Menggunakan sistem 12 kolom untuk responsivitas.



---

## 3. Struktur Halaman (UI Design)

### A. Dashboard (Ringkasan Cepat)

* **Statistik Cards (Top Row):** 4 Kartu (Total Siswa, Hadir Hari Ini, Terlambat, Izin/Sakit).
* **Chart Section:** Grafik batang "Trend Kehadiran Minggu Ini" (`#1591DC`).
* **Recent Activity:** Tabel ringkas 5 absensi terbaru (Nama, Status, Waktu).

### B. Halaman Absensi (Data Utama)

* **Top Bar:** Filter Tanggal (Date Picker), Dropdown Kelas, Filter Status (Badge).
* **Main Table:**
* Kolom: No, Nama, Kelas, Waktu Masuk, Lokasi (Link Map), Status (Badge).
* Action: Tombol "Edit" (Icon Pensil) dan "Detail" (Icon Mata).


* **Badge Design:** Rounded `px-3 py-1 text-xs font-medium` (contoh: Hadir = latar hijau muda, teks hijau tua).

### C. Komponen UI (Atomic Design)

* **Button:** `rounded-lg px-4 py-2 text-white`. Primary warna `#2C5EAD`.
* **Card:** `bg-white rounded-2xl shadow-sm border border-slate-100 p-6`.
* **Input Field:** `border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#1591DC]`.
* **Sidebar Item:** `flex items-center gap-3 p-3 rounded-xl hover:bg-[#C4E2F5] transition-all`.

---

## 4. Struktur Sidebar Menu

```text
[ Logo Sekolah ]
----------------
DASHBOARD
- Ringkasan Utama

MANAJEMEN ABSENSI
- Log Kehadiran
- Rekapitulasi (Export PDF/Excel)

DATA PENGGUNA
- Data Siswa
- Data Guru
- Data Kelas

JADWAL
- Jadwal Pelajaran
- Jam Pelajaran

KOMUNIKASI
- Pengumuman
- Pengaturan Notifikasi

PENGATURAN
- Profil Admin
- Keamanan Akun

```

---

## 5. Tips Eksekusi UI (Fokus ke Frontend)

1. **Gunakan Tailwind Grid/Flex:** Untuk sidebar, gunakan `flex` agar sisi kiri dan kanan stabil.
2. **State Management:** Gunakan *skeleton loading* saat data absensi sedang dimuat agar aplikasi tidak terlihat "patah-patah" saat berpindah halaman.
3. **Responsivitas:** Gunakan `hidden md:flex` pada sidebar agar di mobile hanya muncul tombol "Hamburger" untuk membuka menu.
4. **Font:** Gunakan font *Inter* atau *Plus Jakarta Sans* untuk kesan modern yang sangat bersih.

---

*Desain ini dioptimalkan untuk memangkas kompleksitas. Anda hanya perlu membangun 5-6 modul utama di atas, karena fitur seperti Pembayaran atau E-Learning seringkali memerlukan aplikasi terpisah agar sistem absensi tetap ringan dan tidak mudah error.*