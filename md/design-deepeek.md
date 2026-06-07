# Design System - Aplikasi Absensi Digital Sekolah
## Tema: Dekorasi Pernikahan (Wedding Elegance)

Warna Utama
- Latar belakang: `#FFF9F9` (soft pinkish white)
- Aksen utama: `#F9A8D4` (pink blush), `#FDE68A` (golden yellow)
- Teks utama: `#4A4A4A` (gray elegan)
- Tombol: `#F472B6` (pink) dengan hover `#EC4899`
- Border & garis: `#FBCFE8`
- Kartu/Shadow: `0 10px 25px -5px rgba(249, 168, 212, 0.2)`

Tipografi
- Heading: "Playfair Display" (serif elegan)
- Body: "Poppins" atau "Inter" (sans modern)
- Dekorasi: bunga kecil, pita, ornamen wedding (dapat diatur via CSS background)

Komponen UI (Tailwind CSS)
- Tombol: `bg-pink-400 hover:bg-pink-500 text-white rounded-full px-6 py-2 shadow-md`
- Kartu absensi: `bg-white rounded-2xl border border-pink-100 shadow-lg p-4`
- Form input: `border-pink-200 focus:border-pink-400 rounded-xl`
- Header: gradien dari `pink-100` ke `white`, tambahan ilusi bunga.

Layout (Mobile First)
- Expo + Next.js:
  - Halaman login: ilustrasi pengantin? (sesuai tema sekolah namun diberi sentuhan floral)
  - Dashboard siswa: daftar jadwal hadir dengan kartu bunga.
  - Admin panel: sidebar dengan ikon-ikon pernikahan (cincin, bunga, kue).
- Responsif: menggunakan Tailwind grid & flex.

Contoh CSS custom (elemen bunga):
```css
.bg-floral {
  background-image: url('/flowers-pattern.png');
  background-repeat: repeat;
  opacity: 0.05;
}