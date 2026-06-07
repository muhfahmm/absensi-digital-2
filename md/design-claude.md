================================================================
  DESIGN SYSTEM — ABSENSI DIGITAL SEKOLAH
  Tema     : Institusi Pendidikan — Profesional & Terpercaya
  Versi    : 1.0.0
================================================================

CATATAN TEMA
------------
Tema aplikasi ini menggunakan palet "Akademik Elegan":
Biru tua berwibawa sebagai warna utama, aksen emas hangat,
dan putih bersih sebagai latar. Memberikan kesan resmi,
terpercaya, namun tetap modern dan mudah dibaca.

================================================================
  1. PALET WARNA
================================================================

  -- WARNA UTAMA (Primary) --
  Navy Deep     : #1e3a5f   (header, sidebar, tombol utama)
  Navy Medium   : #2c5282   (hover state, card header)
  Navy Light    : #3b6cb7   (link, badge)

  -- AKSEN (Accent) --
  Gold          : #c9a84c   (highlight, ikon aktif, border fokus)
  Gold Light    : #f0d080   (badge warning, label penting)
  Gold Dark     : #a07c2e   (hover aksen)

  -- NETRAL --
  White         : #ffffff   (background utama)
  Gray 50       : #f8fafc   (background halaman)
  Gray 100      : #f1f5f9   (card, input background)
  Gray 200      : #e2e8f0   (border, divider)
  Gray 400      : #94a3b8   (placeholder, teks sekunder)
  Gray 600      : #475569   (teks body)
  Gray 900      : #0f172a   (teks heading)

  -- STATUS --
  Success       : #16a34a   (Hadir)
  Warning       : #d97706   (Izin / Terlambat)
  Danger        : #dc2626   (Alpha / Error)
  Info          : #0284c7   (Sakit / Info)

================================================================
  2. TIPOGRAFI
================================================================

  Font Heading  : 'Playfair Display', serif
                  → Elegan, berkarakter, untuk judul & nama sekolah

  Font Body     : 'DM Sans', sans-serif
                  → Bersih, mudah dibaca untuk konten & data tabel

  Font Monospace: 'JetBrains Mono', monospace
                  → Untuk kode NIS, NIP, timestamp

  Import Google Fonts:
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">

  SKALA UKURAN:
  ┌───────────┬────────┬────────────────────────────────────────┐
  │ Token     │  Size  │ Kegunaan                               │
  ├───────────┼────────┼────────────────────────────────────────┤
  │ text-xs   │ 12px   │ Label tabel, badge status              │
  │ text-sm   │ 14px   │ Body text, form label                  │
  │ text-base │ 16px   │ Paragraf utama                         │
  │ text-lg   │ 18px   │ Subjudul card                          │
  │ text-xl   │ 20px   │ Judul section                          │
  │ text-2xl  │ 24px   │ Judul halaman                          │
  │ text-3xl  │ 30px   │ Judul hero / landing                   │
  │ text-4xl  │ 36px   │ Nama sekolah                           │
  └───────────┴────────┴────────────────────────────────────────┘

================================================================
  3. KOMPONEN UI
================================================================

  ---- BUTTON ----

  Primary Button:
    background   : #1e3a5f
    color        : #ffffff
    border-radius: 8px
    padding      : 10px 20px
    font-weight  : 600
    hover bg     : #2c5282
    active shadow: 0 0 0 3px rgba(201,168,76,0.4)

  Accent Button:
    background   : #c9a84c
    color        : #ffffff
    hover bg     : #a07c2e

  Outline Button:
    border       : 2px solid #1e3a5f
    color        : #1e3a5f
    background   : transparent
    hover bg     : #f1f5f9

  Danger Button:
    background   : #dc2626
    color        : #ffffff

  ---- CARD ----

  background   : #ffffff
  border       : 1px solid #e2e8f0
  border-radius: 12px
  box-shadow   : 0 2px 8px rgba(0,0,0,0.06)
  padding      : 20px 24px
  hover shadow : 0 4px 16px rgba(30,58,95,0.12)

  Card Header:
    background   : #1e3a5f
    color        : #ffffff
    border-radius: 12px 12px 0 0
    padding      : 14px 20px

  ---- SIDEBAR (Admin Panel & App) ----

  background         : #1e3a5f
  width              : 260px (desktop), drawer on mobile
  item color         : rgba(255,255,255,0.75)
  item active color  : #ffffff
  item active bg     : rgba(201,168,76,0.20)
  item active border : 3px solid #c9a84c (left)
  item hover bg      : rgba(255,255,255,0.08)
  icon color active  : #c9a84c

  ---- NAVBAR (Website Publik) ----

  background   : #1e3a5f
  height       : 64px
  logo font    : 'Playfair Display', size 20px, color #ffffff
  link color   : rgba(255,255,255,0.85)
  link active  : #c9a84c
  link hover   : #ffffff
  mobile menu  : hamburger icon, drawer slide-in dari kanan

  ---- TABEL DATA ----

  header bg    : #1e3a5f
  header color : #ffffff
  header font  : DM Sans 13px weight 600 uppercase
  row bg alt   : #f8fafc
  row hover    : #f1f5f9
  border       : 1px solid #e2e8f0
  border-radius: 10px (wrapper)
  cell padding : 12px 16px

  ---- INPUT / FORM ----

  border       : 1px solid #e2e8f0
  border-radius: 8px
  padding      : 10px 14px
  font         : DM Sans 14px
  focus border : #c9a84c
  focus shadow : 0 0 0 3px rgba(201,168,76,0.15)
  placeholder  : #94a3b8
  label color  : #475569, font-weight 500

  ---- BADGE STATUS ABSENSI ----

  Hadir  → bg #dcfce7  color #16a34a  border #16a34a
  Izin   → bg #fef9c3  color #d97706  border #d97706
  Sakit  → bg #dbeafe  color #0284c7  border #0284c7
  Alpha  → bg #fee2e2  color #dc2626  border #dc2626

  Padding  : 3px 10px
  Font     : 12px weight 600
  Radius   : 999px (pill shape)

  ---- MODAL ----

  backdrop     : rgba(0,0,0,0.5)
  background   : #ffffff
  border-radius: 16px
  max-width    : 520px
  padding      : 28px 32px
  animation    : scale 0.2s ease + fade in

  ---- TOAST / ALERT ----

  border-radius: 10px
  position     : top-right, z-index 9999
  animation    : slide-in from right
  width        : 320px

================================================================
  4. LAYOUT GRID
================================================================

  Breakpoints:
  ┌──────────┬─────────┬──────────────────────────────────────┐
  │ Nama     │   px    │ Keterangan                           │
  ├──────────┼─────────┼──────────────────────────────────────┤
  │ mobile   │ < 640   │ Expo mobile app                      │
  │ sm       │ 640+    │ Tablet kecil                         │
  │ md       │ 768+    │ Tablet                               │
  │ lg       │ 1024+   │ Desktop (sidebar tampil)             │
  │ xl       │ 1280+   │ Widescreen                           │
  └──────────┴─────────┴──────────────────────────────────────┘

  Admin Panel Layout:
  ┌─────────────┬──────────────────────────────────────────────┐
  │  SIDEBAR    │  TOPBAR                                       │
  │  260px      ├──────────────────────────────────────────────┤
  │  fixed      │  CONTENT AREA (flex-1, overflow-y-auto)      │
  │             │  padding: 24px                               │
  │             │                                              │
  └─────────────┴──────────────────────────────────────────────┘

  Website Publik Layout:
  ┌──────────────────────────────────────────────────────────────┐
  │  NAVBAR (sticky top)                                         │
  ├──────────────────────────────────────────────────────────────┤
  │  HERO SLIDER (full width)                                    │
  ├──────────────────────────────────────────────────────────────┤
  │  KONTEN SECTION (max-width 1200px, centered, px 24px)        │
  ├──────────────────────────────────────────────────────────────┤
  │  FOOTER                                                      │
  └──────────────────────────────────────────────────────────────┘

  Mobile App (Expo) Layout:
  ┌──────────────────────────────────────────────────────────────┐
  │  STATUS BAR                                                  │
  ├──────────────────────────────────────────────────────────────┤
  │  HEADER (nama sekolah + notif icon)                          │
  ├──────────────────────────────────────────────────────────────┤
  │  SCROLL VIEW (konten utama)                                  │
  ├──────────────────────────────────────────────────────────────┤
  │  BOTTOM TAB NAVIGATION (5 tab)                               │
  └──────────────────────────────────────────────────────────────┘

================================================================
  5. ICONOGRAFI
================================================================

  Library  : lucide-react (web) / lucide-react-native (Expo)
  Ukuran   : 18px (sidebar), 20px (header), 16px (inline)
  Warna    : ikuti warna teks kontekstual

  Icon Penting:
  - Beranda       : Home
  - Absensi       : ClipboardCheck
  - Siswa         : Users
  - Guru          : UserCog
  - Jadwal        : Calendar
  - Laporan       : BarChart2
  - Pengumuman    : Bell
  - Pengaturan    : Settings
  - Profil        : UserCircle
  - QR Scan       : QrCode
  - Lokasi GPS    : MapPin
  - Izin          : FileText

================================================================
  6. ANIMASI & TRANSISI
================================================================

  Transisi global  : all 0.2s ease
  Hover card       : transform translateY(-2px) + shadow
  Sidebar item     : background 0.15s ease
  Modal open       : scale(0.95)→scale(1) + opacity 0→1, 0.2s
  Toast            : translateX(120%)→translateX(0), 0.3s
  Page transition  : opacity 0→1, 0.25s ease
  Loading skeleton : shimmer animation (gradient slide)

================================================================
  7. CSS VARIABLES (GLOBAL)
================================================================

  Tambahkan di globals.css atau tailwind.config.js:

  :root {
    --color-primary      : #1e3a5f;
    --color-primary-mid  : #2c5282;
    --color-primary-light: #3b6cb7;
    --color-accent       : #c9a84c;
    --color-accent-light : #f0d080;
    --color-accent-dark  : #a07c2e;
    --color-success      : #16a34a;
    --color-warning      : #d97706;
    --color-danger       : #dc2626;
    --color-info         : #0284c7;
    --color-bg           : #f8fafc;
    --color-card         : #ffffff;
    --color-border       : #e2e8f0;
    --color-text-main    : #0f172a;
    --color-text-body    : #475569;
    --color-text-muted   : #94a3b8;
    --font-heading       : 'Playfair Display', serif;
    --font-body          : 'DM Sans', sans-serif;
    --font-mono          : 'JetBrains Mono', monospace;
    --radius-sm          : 6px;
    --radius-md          : 10px;
    --radius-lg          : 16px;
    --shadow-sm          : 0 1px 4px rgba(0,0,0,0.06);
    --shadow-md          : 0 4px 16px rgba(30,58,95,0.10);
    --shadow-lg          : 0 8px 32px rgba(30,58,95,0.15);
  }

================================================================
  8. EXPO MOBILE — STYLE CONSTANTS
================================================================

  File: src/constants/colors.ts

  export const Colors = {
    primary      : '#1e3a5f',
    primaryMid   : '#2c5282',
    accent       : '#c9a84c',
    accentLight  : '#f0d080',
    success      : '#16a34a',
    warning      : '#d97706',
    danger       : '#dc2626',
    info         : '#0284c7',
    white        : '#ffffff',
    bgPage       : '#f8fafc',
    bgCard       : '#ffffff',
    border       : '#e2e8f0',
    textMain     : '#0f172a',
    textBody     : '#475569',
    textMuted    : '#94a3b8',
  };

  Bottom Tab Navigator:
    activeTintColor   : #c9a84c
    inactiveTintColor : rgba(255,255,255,0.55)
    tabBarStyle bg    : #1e3a5f
    tab height        : 62px
    icon size         : 24px

================================================================
  9. FOOTER (Website Publik)
================================================================

  background   : #0f172a
  color        : rgba(255,255,255,0.75)
  padding      : 48px 24px
  grid         : 3 kolom (Profil | Navigasi | Kontak)
  border-top   : 3px solid #c9a84c
  copyright bg : rgba(0,0,0,0.3), padding 16px

================================================================
  SELESAI — design.md v1.0.0
================================================================
