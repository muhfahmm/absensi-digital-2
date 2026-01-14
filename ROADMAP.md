# Roadmap Pengembangan Absensi Digital V2

Dokumen ini berisi tahapan pengembangan aplikasi Absensi Digital dari awal hingga siap digunakan.

## Phase 1: Preparation & Database (Current Step)
- [x] Desain Schema Database (`database.sql`).
- [ ] Setup Server Lokal (XAMPP).
- [ ] Create Database `db_absensi2` di MySQL.

## Phase 2: Backend API & Admin Panel Foundation
- [ ] **Security & Access Control (Priority)**
    - [ ] Buat middleware/logic di PHP untuk blokir login non-admin di folder `app/admin/`.
    - [ ] Pastikan Web Admin otomatis redirect ke logout jika user bukan role 'admin'.
- [ ] **API Development (PHP):**
    - [ ] Koneksi Database.
    - [ ] Endpoint `login.php`: Return data user + role + token.
    - [ ] Endpoint `dashboard_mobile.php` (Khusus Admin di HP).
    - [ ] Endpoint `absen.php` & `history.php`.
- [ ] **Admin Panel (Web):**
    - [ ] Halaman Login Admin (Tolak jika siswa/guru mencoba login).
    - [ ] Dashboard Utama (Statistik).
    - [ ] CRUD Data Siswa, Guru, Karyawan.

## Phase 3: Mobile App Development (React Native)
- [ ] Init Project React Native.
- [ ] **Authentication Flow:**
    - [ ] Login Screen (Support semua role: Admin, Guru, Siswa).
    - [ ] Logic: Jika role == 'admin', navigasi ke Dashboard Admin Mobile.
    - [ ] Logic: Jika role == 'siswa', navigasi ke Home Siswa.
- [ ] **Fitur Admin (Mobile):**
    - [ ] Monitoring siapa yang sudah absen hari ini.
    - [ ] Scan QR Manual (opsional, untuk bantu siswa yang gagal scan).
- [ ] **Fitur User (Mobile):**
    - [ ] Tab Home (Status Kehadiran Hari Ini).
    - [ ] Tab Scan/QR (Kamera/Kode).
    - [ ] Tab Izin (Form Upload).
    - [ ] Tab Profil.

## Phase 4: Core Logic Implementation
- [ ] Logika Validasi Absensi (Cek jam masuk/pulang, cek duplikasi absen).
- [ ] Logika Hitung Keterlambatan.
- [ ] Upload Foto Bukti Izin (Handling File Upload di API).
- [ ] Notifikasi / Pengumuman sederhana.

## Phase 5: Testing & Polishing
- [ ] Uji coba flow absen Siswa, Guru, Karyawan.
- [ ] Uji coba Admin Panel (Export Laporan PDF/Excel).
- [ ] Bug fixing & Performance tuning.
- [ ] Finalisasi UI (Tampilan dipercantik).

## Phase 6: Deployment
- [ ] Setup Hosting / Server Online (VPS/Shared Hosting).
- [ ] Build APK untuk Android.
- [ ] Distribusi Aplikasi.
