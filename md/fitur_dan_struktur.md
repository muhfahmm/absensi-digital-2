================================================================
  FITUR LENGKAP — ABSENSI DIGITAL SEKOLAH
  Stack: Next.js + Tailwind CSS + Expo + MySQL
  Versi: 1.0.0
================================================================

================================================================
  A. STRUKTUR PROYEK
================================================================

  absensi-digital/
  ├── apps/
  │   ├── web/                     ← Next.js (Admin Panel + Website Publik)
  │   │   ├── src/
  │   │   │   ├── app/
  │   │   │   │   ├── (public)/    ← Website publik sekolah
  │   │   │   │   │   ├── page.tsx             (Beranda)
  │   │   │   │   │   ├── profil/page.tsx
  │   │   │   │   │   ├── pengumuman/page.tsx
  │   │   │   │   │   └── galeri/page.tsx
  │   │   │   │   ├── (admin)/     ← Admin panel (protected)
  │   │   │   │   │   ├── dashboard/page.tsx
  │   │   │   │   │   ├── siswa/
  │   │   │   │   │   ├── guru/
  │   │   │   │   │   ├── kelas/
  │   │   │   │   │   ├── jadwal/
  │   │   │   │   │   ├── absensi/
  │   │   │   │   │   ├── izin/
  │   │   │   │   │   ├── laporan/
  │   │   │   │   │   ├── pengumuman/
  │   │   │   │   │   ├── galeri/
  │   │   │   │   │   ├── slider/
  │   │   │   │   │   └── pengaturan/
  │   │   │   │   └── api/         ← REST API routes
  │   │   │   ├── components/
  │   │   │   └── lib/
  │   └── mobile/                  ← Expo (Siswa + Guru)
  │       ├── app/
  │       │   ├── (auth)/
  │       │   ├── (siswa)/
  │       │   └── (guru)/
  │       └── components/
  └── packages/
      └── shared/                  ← Types, utils bersama

================================================================
  B. FITUR WEBSITE PUBLIK (Next.js — dikontrol penuh admin)
================================================================

  1. BERANDA
     - Hero slider/banner (gambar + judul + tombol CTA)
       → data dari tb_slider, dikelola admin
     - Statistik sekolah (siswa, guru, kelas, akreditasi)
     - Pengumuman terbaru (3 kartu terbaru)
     - Galeri foto terbaru
     - Peta lokasi sekolah (Google Maps embed)

  2. PROFIL SEKOLAH
     - Sejarah, visi & misi
     - Data kepala sekolah
     - Struktur organisasi (gambar)
     - Akreditasi & prestasi
     → semua konten dari tb_profil_sekolah

  3. PENGUMUMAN
     - Daftar pengumuman dengan filter & pencarian
     - Detail pengumuman (gambar, teks panjang)
     - Target audience (Semua / Siswa / Guru)

  4. GALERI FOTO
     - Grid foto dengan lightbox viewer
     - Filter per kategori
     → dari tb_galeri

  5. KONTAK
     - Form hubungi kami (dikirim ke email sekolah)
     - Info telepon, email, alamat

================================================================
  C. FITUR ADMIN PANEL (Next.js — full CRUD)
================================================================

  1. DASHBOARD
     - Statistik harian: hadir, izin, sakit, alpha (siswa & guru)
     - Grafik kehadiran 7 hari terakhir (bar chart)
     - Grafik per kelas (pie/donut chart)
     - Tabel siswa/guru yang belum absen hari ini
     - Widget cuaca (opsional)
     - Notifikasi izin pending

  2. MANAJEMEN DATA MASTER
     a. Tahun Ajaran — CRUD, set aktif
     b. Kelas        — CRUD, assign wali kelas
     c. Mata Pelajaran — CRUD, assign guru
     d. Jadwal       — CRUD jadwal per kelas/hari/jam

  3. MANAJEMEN SISWA
     - CRUD data siswa lengkap
     - Import massal via file Excel (.xlsx)
     - Export data ke Excel / PDF
     - Reset password siswa
     - Foto profil siswa
     - Riwayat absensi per siswa

  4. MANAJEMEN GURU / STAFF
     - CRUD data guru
     - Import / export
     - Assign mata pelajaran & kelas
     - Riwayat absensi guru

  5. ABSENSI
     a. Input absensi manual per kelas
     b. Rekap absensi harian
     c. Edit / koreksi data absensi
     d. Filter: kelas, tanggal, status, mata pelajaran

  6. MANAJEMEN IZIN
     - Daftar pengajuan izin (siswa & guru)
     - Approve / tolak izin dengan catatan
     - Filter status: pending, disetujui, ditolak

  7. LAPORAN & REKAP
     - Rekap kehadiran per kelas (harian / mingguan / bulanan)
     - Rekap per siswa (persentase kehadiran)
     - Rekap per guru
     - Laporan siswa dengan absensi rendah (< threshold)
     - Export laporan ke PDF & Excel
     - Cetak kartu absensi

  8. KONTEN WEBSITE (CMS)
     - Kelola slider/banner beranda
     - Kelola pengumuman (tambah, edit, hapus, target)
     - Kelola galeri foto (upload, kategori)
     - Edit profil & info sekolah
     - Kelola pengaturan aplikasi

  9. NOTIFIKASI
     - Kirim notifikasi push ke siswa/guru tertentu
     - Broadcast ke semua user
     - Riwayat notifikasi yang dikirim

  10. PENGATURAN SISTEM
      - Ganti password admin
      - Atur jam masuk & toleransi keterlambatan
      - Atur radius GPS absensi
      - Toggle fitur (absensi GPS, foto wajib, dll)
      - Backup database (opsional)
      - Log aktivitas admin

================================================================
  D. FITUR APLIKASI MOBILE SISWA (Expo)
================================================================

  1. LOGIN
     - Login dengan NIS + password
     - Lupa password (kirim ke email ortu)
     - Biometric login (sidik jari / Face ID)

  2. BERANDA SISWA
     - Ucapan selamat datang + tanggal
     - Status absensi hari ini (sudah/belum)
     - Ringkasan kehadiran bulan ini (donut chart)
     - Jadwal pelajaran hari ini
     - Pengumuman terbaru

  3. ABSENSI MANDIRI
     - Tombol "Absen Sekarang"
     - Validasi GPS (radius dari sekolah)
     - Ambil foto selfie sebagai bukti
     - Scan QR Code yang ditampilkan guru
     - Konfirmasi & kirim absensi
     - Notifikasi berhasil/gagal absen

  4. RIWAYAT ABSENSI
     - Kalender interaktif (warna per status)
     - Daftar kehadiran per bulan
     - Filter per mata pelajaran
     - Statistik: hadir, izin, sakit, alpha (%)

  5. JADWAL PELAJARAN
     - Jadwal mingguan per hari
     - Info: mata pelajaran, guru, jam, ruangan

  6. PENGAJUAN IZIN
     - Form izin (jenis, alasan, tanggal, lampiran foto)
     - Status pengajuan izin (pending / disetujui / ditolak)
     - Riwayat izin yang pernah diajukan

  7. PENGUMUMAN
     - Daftar pengumuman dari sekolah
     - Detail pengumuman dengan gambar

  8. PROFIL
     - Foto profil
     - Data diri (NIS, nama, kelas)
     - Ganti password
     - Pengaturan notifikasi

  9. NOTIFIKASI PUSH
     - Reminder absen pagi (jam 06:45)
     - Notifikasi status izin diproses
     - Pengumuman baru dari sekolah
     - Info keterlambatan

================================================================
  E. FITUR APLIKASI MOBILE GURU (Expo)
================================================================

  1. LOGIN — NIP + password + biometric

  2. BERANDA GURU
     - Jadwal mengajar hari ini
     - Ringkasan absensi kelas yang sudah dicatat
     - Status absensi guru (sudah check-in?)
     - Notifikasi izin siswa pending

  3. CHECK-IN GURU
     - GPS + foto selfie untuk absen datang & pulang
     - Scan QR sekolah sebagai alternatif

  4. INPUT ABSENSI KELAS
     - Pilih kelas & mata pelajaran
     - Daftar siswa otomatis tampil
     - Tap nama → pilih status (Hadir/Izin/Sakit/Alpha)
     - Tambah keterangan per siswa
     - Tampilkan QR Code di layar agar siswa scan sendiri
     - Submit & rekap langsung tampil

  5. RIWAYAT ABSENSI KELAS
     - Filter kelas, mata pelajaran, tanggal
     - Edit absensi yang sudah dicatat (dalam batas waktu)

  6. MANAJEMEN IZIN SISWA
     - Lihat & respond pengajuan izin siswa di kelasnya
     - Approve / tolak dengan catatan

  7. LAPORAN KELAS
     - Rekap kehadiran per kelas (export PDF)
     - Grafik tren kehadiran
     - Daftar siswa dengan alpha tinggi

  8. PROFIL GURU
     - Data diri, foto, mata pelajaran
     - Ganti password

================================================================
  F. FITUR MODERN TAMBAHAN (Roadmap)
================================================================

  FASE 2 — KEAMANAN & VERIFIKASI
  --------------------------------
  [ ] Face Recognition — verifikasi wajah saat absensi
      (library: face-api.js / TensorFlow.js)
  [ ] Anti-titip absen GPS strict (deteksi mock GPS)
  [ ] Two-Factor Authentication (2FA) untuk admin
  [ ] Enkripsi end-to-end data sensitif

  FASE 2 — FITUR CERDAS
  ----------------------
  [ ] AI Deteksi pola absensi (siswa sering alpha hari tertentu)
  [ ] Prediksi kehadiran otomatis (machine learning sederhana)
  [ ] Analitik lanjutan dashboard admin (trend, perbandingan)
  [ ] Rekomendasi tindak lanjut untuk siswa bermasalah

  FASE 2 — KOMUNIKASI
  --------------------
  [ ] Chat internal guru ↔ admin
  [ ] Kirim notif ke WhatsApp orang tua (via WhatsApp API)
  [ ] Email otomatis ke orang tua jika siswa alpha > N hari
  [ ] Sistem surat izin digital (e-surat dengan tanda tangan digital)

  FASE 3 — INTEGRASI
  ------------------
  [ ] Integrasi Dapodik (data siswa nasional)
  [ ] Integrasi dengan mesin fingerprint/absensi fisik
  [ ] Export laporan ke format Dapodik
  [ ] Integrasi kalender akademik nasional (libur nasional)
  [ ] Single Sign-On (SSO) dengan akun Google Workspace

  FASE 3 — FITUR LANJUTAN
  -----------------------
  [ ] Modul SKS / Poin kehadiran
  [ ] Cetak sertifikat kehadiran terbaik
  [ ] Papan peringkat kehadiran per kelas (gamifikasi)
  [ ] Orang tua bisa pantau kehadiran anak (parent portal / app)
  [ ] Mode offline — sinkronisasi saat online kembali
  [ ] Dark mode (web & mobile)
  [ ] Multi-bahasa (Indonesia & Inggris)
  [ ] PWA (Progressive Web App) untuk web admin

================================================================
  G. STRUKTUR API ENDPOINT (REST)
================================================================

  Base URL: /api/v1

  AUTH
    POST   /auth/login          ← login semua user
    POST   /auth/logout
    POST   /auth/refresh-token
    POST   /auth/forgot-password

  SISWA
    GET    /siswa               ← list + filter + pagination
    POST   /siswa               ← tambah
    GET    /siswa/:id
    PUT    /siswa/:id
    DELETE /siswa/:id
    POST   /siswa/import        ← import Excel
    GET    /siswa/export        ← export Excel/PDF

  GURU    (sama polanya dengan siswa)

  KELAS / JADWAL / MAPEL  (CRUD standar)

  ABSENSI
    GET    /absensi             ← list + filter
    POST   /absensi             ← input manual (admin/guru)
    PUT    /absensi/:id
    POST   /absensi/mobile      ← dari mobile (GPS + foto)
    GET    /absensi/hari-ini/:kelasId
    GET    /absensi/rekap       ← rekap per kelas/tanggal

  IZIN
    GET    /izin
    POST   /izin
    PUT    /izin/:id/approve
    PUT    /izin/:id/tolak

  LAPORAN
    GET    /laporan/harian
    GET    /laporan/bulanan
    GET    /laporan/siswa/:id
    GET    /laporan/kelas/:id

  KONTEN (CMS)
    GET/POST/PUT/DELETE  /slider
    GET/POST/PUT/DELETE  /pengumuman
    GET/POST/PUT/DELETE  /galeri
    GET/PUT              /profil-sekolah
    GET/PUT              /pengaturan

  NOTIFIKASI
    GET    /notifikasi
    POST   /notifikasi/kirim
    PUT    /notifikasi/:id/baca

  DASHBOARD
    GET    /dashboard/stats
    GET    /dashboard/grafik

================================================================
  H. TEKNOLOGI & LIBRARY
================================================================

  BACKEND (Next.js API Routes)
  ----------------------------
  - mysql2          ← koneksi MySQL
  - jsonwebtoken    ← JWT auth
  - bcryptjs        ← hash password
  - multer          ← upload file/foto
  - xlsx            ← import/export Excel
  - jspdf           ← generate PDF laporan
  - nodemailer      ← kirim email
  - zod             ← validasi request body

  FRONTEND WEB (Next.js + Tailwind)
  ----------------------------------
  - @tanstack/react-query   ← data fetching & caching
  - react-hook-form         ← form management
  - recharts                ← grafik dashboard
  - @radix-ui/react-*       ← komponen UI accessible
  - lucide-react            ← ikon
  - react-hot-toast         ← notifikasi toast
  - date-fns                ← utilitas tanggal
  - react-qrcode-logo       ← generate QR Code
  - next-auth               ← auth session

  MOBILE (Expo)
  -------------
  - expo-camera             ← foto selfie
  - expo-location           ← GPS koordinat
  - expo-barcode-scanner    ← scan QR Code
  - expo-local-authentication ← biometric
  - expo-notifications      ← push notification
  - @react-navigation/native ← navigasi
  - react-native-chart-kit  ← grafik mobile
  - axios                   ← HTTP client

================================================================
  SELESAI — fitur.md v1.0.0
================================================================
