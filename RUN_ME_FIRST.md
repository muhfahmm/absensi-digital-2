# 🚀 RUN ME FIRST - Panduan Memulai

Ikuti langkah-langkah di bawah untuk menjalankan Absensi Digital.

## ⚡ 3 Langkah Mudah

### Langkah 1: Install Dependencies
Buka PowerShell/CMD di folder `absensi-digital` dan jalankan:

```bash
npm install --workspaces
```

**Apa yang terjadi:**
- npm akan menginstall semua dependencies
- Folder `node_modules` akan dibuat di:
  - Root folder (`absensi-digital/node_modules/`)
  - Admin folder (`absensi-digital/admin/node_modules/`)
  - Mobile folder (`absensi-digital/mobile/node_modules/`)
- Proses ini memakan waktu 2-5 menit

### Langkah 2: Jalankan Admin Panel
Setelah install selesai, jalankan:

```bash
npm run dev
```

**Apa yang terjadi:**
- Next.js akan compile project
- Server akan berjalan di `http://localhost:3000`
- Tunggu sampai muncul pesan: `> ready - started server on 0.0.0.0:3000`

### Langkah 3: Buka Browser
Buka browser dan akses:

```
http://localhost:3000
```

**Anda akan melihat:**
- 🏠 Home page dengan menu utama
- 📊 Dashboard dengan stats
- 👥 Employees management
- ✓ Attendance tracking

---

## ✅ Verifikasi Setup

Jika Anda melihat halaman admin panel dengan menu di atas, berarti setup berhasil! ✨

---

## 🔧 Troubleshooting

### ❌ Error: "npm: command not found"
**Solusi**: Install Node.js dari https://nodejs.org/

### ❌ Error: "Port 3000 already in use"
**Solusi**: Next.js akan otomatis menggunakan port berikutnya (3001, 3002, dll)

### ❌ Error saat npm install
**Solusi**:
```bash
npm cache clean --force
rm -r node_modules
npm install --workspaces
```

### ❌ Tailwind CSS tidak bekerja
**Solusi**:
```bash
npm run build:admin
```

---

## 📱 Menjalankan Mobile App (Optional)

Jika ingin menjalankan mobile app, buka terminal baru dan jalankan:

```bash
npm run dev:mobile
```

Pilih platform:
- `a` untuk Android
- `i` untuk iOS
- `w` untuk Web

---

## 📚 Dokumentasi Lengkap

Setelah setup berhasil, baca dokumentasi berikut:

- **README.md** - Project overview
- **QUICK_START.md** - Quick start guide
- **SETUP.md** - Detailed setup guide
- **DEVELOPER_CHECKLIST.md** - Development checklist

---

## 🎯 Langkah Berikutnya

1. ✅ Jalankan `npm install --workspaces`
2. ✅ Jalankan `npm run dev`
3. ✅ Buka `http://localhost:3000`
4. 📖 Baca dokumentasi
5. 🎨 Customize sesuai kebutuhan

---

## 💡 Tips

- **Hot Reload**: Perubahan file otomatis reload di browser
- **TypeScript**: Semua file sudah typed untuk type safety
- **Tailwind**: Gunakan class utility, jangan custom CSS
- **Components**: Buat reusable components di folder components

---

## 🆘 Butuh Bantuan?

1. Check dokumentasi di README.md atau SETUP.md
2. Check troubleshooting section di atas
3. Check console untuk error messages

---

**Selamat! Anda siap untuk development! 🎉**

Jalankan: `npm install --workspaces` kemudian `npm run dev`
