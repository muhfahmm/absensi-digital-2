# 📋 Developer Checklist

Checklist untuk memastikan setup dan development berjalan dengan baik.

## ✅ Pre-Development Checklist

### Environment Setup
- [ ] Node.js v18+ terinstall (`node --version`)
- [ ] npm v9+ terinstall (`npm --version`)
- [ ] Git terinstall (`git --version`)
- [ ] Code editor (VS Code, WebStorm, dll) terinstall

### Project Setup
- [ ] Repository sudah di-clone
- [ ] Berada di folder `absensi-digital`
- [ ] `npm install --workspaces` sudah dijalankan
- [ ] Tidak ada error saat install

### Environment Variables
- [ ] `admin/.env.local` sudah dibuat dari `.env.example`
- [ ] `mobile/.env` sudah dibuat dari `.env.example`
- [ ] API URL sudah dikonfigurasi dengan benar

### Verification
- [ ] `npm run dev:admin` berjalan tanpa error
- [ ] Admin panel bisa diakses di `http://localhost:3000`
- [ ] `npm run dev:mobile` berjalan tanpa error
- [ ] Mobile app bisa dijalankan

---

## 🚀 Development Checklist

### Admin Panel Development
- [ ] Memahami struktur Next.js App Router
- [ ] Memahami Tailwind CSS utility classes
- [ ] Memahami TypeScript basics
- [ ] Sudah membaca `admin/src/components/` untuk reusable components
- [ ] Sudah membaca `admin/src/lib/axios.ts` untuk API setup

### Mobile App Development
- [ ] Memahami Expo Router navigation
- [ ] Memahami React Native components
- [ ] Memahami NativeWind (Tailwind untuk React Native)
- [ ] Memahami TypeScript basics
- [ ] Sudah membaca `mobile/src/services/api.ts` untuk API setup

### Code Quality
- [ ] Menggunakan TypeScript untuk type safety
- [ ] Menggunakan Tailwind classes (bukan custom CSS)
- [ ] Membuat reusable components
- [ ] Menambahkan comments untuk kode kompleks
- [ ] Mengikuti naming conventions (PascalCase untuk components, camelCase untuk functions)

---

## 📝 Feature Development Checklist

### Sebelum Mulai Feature Baru
- [ ] Feature sudah didiskusikan dan disetujui
- [ ] Sudah membuat branch baru (`git checkout -b feature/feature-name`)
- [ ] Sudah membaca dokumentasi yang relevan

### Saat Mengembangkan Feature
- [ ] Membuat components yang reusable
- [ ] Menggunakan TypeScript untuk type safety
- [ ] Menambahkan error handling
- [ ] Menambahkan loading states
- [ ] Menggunakan Tailwind untuk styling
- [ ] Testing di browser/emulator secara berkala

### Sebelum Commit
- [ ] Kode sudah di-test
- [ ] Tidak ada console errors
- [ ] Tidak ada TypeScript errors
- [ ] Sudah menjalankan linter (`npm run lint` di admin)
- [ ] Commit message jelas dan deskriptif

### Sebelum Push
- [ ] Sudah pull latest changes dari main
- [ ] Tidak ada merge conflicts
- [ ] Semua tests masih passing
- [ ] Sudah review kode sendiri

---

## 🔌 API Integration Checklist

### Setup API Client
- [ ] Axios sudah dikonfigurasi di `admin/src/lib/axios.ts`
- [ ] Axios sudah dikonfigurasi di `mobile/src/services/api.ts`
- [ ] Token handling sudah disetup
- [ ] Error handling sudah disetup
- [ ] Interceptors sudah dikonfigurasi

### API Calls
- [ ] Menggunakan axios instance yang sudah dikonfigurasi
- [ ] Menambahkan error handling
- [ ] Menambahkan loading states
- [ ] Menambahkan success/error messages
- [ ] Testing API calls dengan Postman/Insomnia

---

## 🎨 UI/UX Checklist

### Design Consistency
- [ ] Menggunakan Tailwind colors yang sudah didefinisikan
- [ ] Menggunakan spacing yang konsisten
- [ ] Menggunakan font sizes yang konsisten
- [ ] Responsive design untuk mobile dan desktop

### Components
- [ ] Components sudah reusable
- [ ] Props sudah di-type dengan TypeScript
- [ ] Components sudah tested di berbagai ukuran layar
- [ ] Accessibility sudah dipertimbangkan

### Styling
- [ ] Menggunakan Tailwind utility classes
- [ ] Tidak ada custom CSS (kecuali global styles)
- [ ] Dark mode sudah dipertimbangkan (jika diperlukan)
- [ ] Animations smooth dan tidak mengganggu

---

## 🧪 Testing Checklist

### Manual Testing
- [ ] Feature sudah di-test di browser
- [ ] Feature sudah di-test di mobile emulator
- [ ] Feature sudah di-test di berbagai ukuran layar
- [ ] Feature sudah di-test dengan berbagai data

### Edge Cases
- [ ] Tested dengan data kosong
- [ ] Tested dengan data banyak
- [ ] Tested dengan error responses
- [ ] Tested dengan slow network

### Browser Compatibility
- [ ] Tested di Chrome
- [ ] Tested di Firefox
- [ ] Tested di Safari (jika possible)
- [ ] Tested di mobile browsers

---

## 📚 Documentation Checklist

### Code Documentation
- [ ] Sudah menambahkan comments untuk kode kompleks
- [ ] Sudah menambahkan JSDoc untuk functions
- [ ] Sudah menambahkan type annotations

### Feature Documentation
- [ ] Sudah menambahkan README untuk feature baru
- [ ] Sudah menambahkan usage examples
- [ ] Sudah menambahkan API documentation (jika ada)

---

## 🚢 Deployment Checklist

### Pre-Deployment
- [ ] Semua features sudah di-test
- [ ] Semua bugs sudah di-fix
- [ ] Environment variables sudah dikonfigurasi
- [ ] Build sudah di-test (`npm run build`)

### Admin Panel Deployment (Vercel)
- [ ] Build berhasil tanpa error
- [ ] Environment variables sudah di-set di Vercel
- [ ] Preview deployment sudah di-test
- [ ] Production deployment sudah di-test

### Mobile App Deployment (EAS)
- [ ] Build berhasil tanpa error
- [ ] Sudah di-test di device/emulator
- [ ] Version number sudah di-update
- [ ] Release notes sudah disiapkan

---

## 🐛 Debugging Checklist

### Saat Ada Bug
- [ ] Sudah reproduce bug
- [ ] Sudah check console untuk errors
- [ ] Sudah check network tab untuk API errors
- [ ] Sudah check TypeScript errors
- [ ] Sudah check Tailwind classes

### Debugging Tools
- [ ] Browser DevTools sudah dibuka
- [ ] React DevTools sudah diinstall (untuk admin)
- [ ] React Native Debugger sudah diinstall (untuk mobile)
- [ ] Network tab sudah di-check

---

## 📊 Performance Checklist

### Admin Panel
- [ ] Page load time < 3 detik
- [ ] Tidak ada unnecessary re-renders
- [ ] Images sudah dioptimasi
- [ ] Code splitting sudah diimplementasikan

### Mobile App
- [ ] App startup time < 2 detik
- [ ] Tidak ada memory leaks
- [ ] Tidak ada unnecessary re-renders
- [ ] Bundle size sudah dioptimasi

---

## 🔒 Security Checklist

### Code Security
- [ ] Tidak ada hardcoded secrets
- [ ] Input validation sudah diimplementasikan
- [ ] XSS protection sudah diimplementasikan
- [ ] CSRF protection sudah diimplementasikan

### API Security
- [ ] Token handling sudah aman
- [ ] Sensitive data tidak di-log
- [ ] API errors tidak expose sensitive info
- [ ] Rate limiting sudah dipertimbangkan

---

## 📱 Mobile-Specific Checklist

### Responsive Design
- [ ] Layout responsive di berbagai ukuran layar
- [ ] Touch targets minimal 44x44 pixels
- [ ] Tidak ada horizontal scroll (kecuali intentional)
- [ ] Safe area sudah dipertimbangkan

### Performance
- [ ] App tidak crash saat memory low
- [ ] App tidak crash saat network slow
- [ ] Battery usage sudah dioptimasi
- [ ] Data usage sudah dioptimasi

---

## 🎯 Final Checklist

Sebelum menganggap feature selesai:
- [ ] Semua checklist di atas sudah di-check
- [ ] Code sudah di-review
- [ ] Tests sudah passing
- [ ] Documentation sudah lengkap
- [ ] Ready untuk production

---

## 📞 Support

Jika ada pertanyaan atau masalah:
1. Check dokumentasi (README.md, SETUP.md, dll)
2. Check troubleshooting section di SETUP.md
3. Check console errors
4. Ask team members

---

**Happy Development! 🚀**
