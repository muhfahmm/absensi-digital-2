import {
  Bell,
  CalendarDays,
  CheckSquare,
  ClipboardList,
  ShieldCheck,
  SlidersHorizontal,
  User,
  Users2,
} from "lucide-react";

const menuItems = [
  {
    title: "Absensi",
    description: "Masuk, pulang, dan lihat daftar absensi siswa.",
    href: "/admin/absensi",
    icon: CheckSquare,
    accent: "bg-amber-100 text-amber-600",
  },
  {
    title: "Rekap Absensi",
    description: "Ringkasan kehadiran harian dan bulanan.",
    href: "/admin/rekap-absensi",
    icon: ClipboardList,
    accent: "bg-sky-100 text-sky-600",
  },
  {
    title: "Jadwal",
    description: "Lihat jadwal pelajaran dan kelas hari ini.",
    href: "/admin/jadwal",
    icon: CalendarDays,
    accent: "bg-violet-100 text-violet-600",
  },
  {
    title: "Siswa",
    description: "Kelola data siswa dan profil kelas.",
    href: "/admin/siswa",
    icon: Users2,
    accent: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Guru",
    description: "Data guru, wali kelas, dan jadwal pengajar.",
    href: "/admin/guru",
    icon: User,
    accent: "bg-rose-100 text-rose-600",
  },
  {
    title: "Pengumuman",
    description: "Lihat dan kirim pemberitahuan sekolah.",
    href: "/admin/pengumuman",
    icon: Bell,
    accent: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Perizinan",
    description: "Kelola permohonan ijin siswa dan laporan.",
    href: "/admin/perizinan",
    icon: ShieldCheck,
    accent: "bg-lime-100 text-lime-600",
  },
  {
    title: "Pengaturan",
    description: "Sesuaikan preferensi dan profil aplikasi.",
    href: "/admin/pengaturan",
    icon: SlidersHorizontal,
    accent: "bg-slate-100 text-slate-700",
  },
];

export default function MobileHomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900">
      <div className="mx-auto w-full max-w-md rounded-[2rem] border border-slate-200 bg-white/95 p-5 shadow-[0_35px_90px_rgba(15,23,42,0.08)] backdrop-blur-md">
        <div className="mb-5 rounded-3xl bg-slate-100 p-3 text-[11px] text-slate-600 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-semibold">09:41</span>
            <span className="rounded-full bg-slate-200 px-2 py-1 text-[10px] uppercase tracking-[0.2em]">
              Mobile Preview
            </span>
          </div>
        </div>

        <section className="mb-6">
          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-lg shadow-slate-200/50">
              <span className="text-2xl font-semibold">A</span>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Absensi Digital</p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-950">
                Selamat datang di aplikasi mobile.
              </h1>
            </div>
          </div>
          <p className="text-sm leading-6 text-slate-600">
            Gunakan menu utama untuk mengakses absensi, rekap, jadwal, siswa, guru, dan pengaturan.
            Halaman ini dibangun sebagai antarmuka mobile yang responsif untuk preview di browser.
          </p>
        </section>

        <section className="grid gap-3 sm:grid-cols-2">
          {menuItems.map((item) => {
            const Icon = item.icon as any;
            return (
              <a
                key={item.title}
                href={item.href}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 text-left transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.accent}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-500">
                    Buka
                  </span>
                </div>
                <h2 className="mt-4 text-base font-semibold text-slate-950">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </a>
            );
          })}
        </section>

        <footer className="mt-6 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600 shadow-inner">
          <p className="font-medium text-slate-800">Tips pengembangan</p>
          <ul className="mt-3 space-y-2 text-slate-600">
            <li>• Verifikasi navigasi terhadap halaman admin yang ada.</li>
            <li>• Gunakan browser untuk mendeteksi layout dan responsivitas mobile.</li>
            <li>• Nanti bisa port ke Expo/React Native dengan desain yang sama.</li>
          </ul>
        </footer>
      </div>
    </main>
  );
}
