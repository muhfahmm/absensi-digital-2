import Link from "next/link";

const overviewItems = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/guru", label: "Data Guru" },
  { href: "/admin/siswa", label: "Data Siswa" },
  { href: "/admin/kelas", label: "Data Kelas" },
  { href: "/admin/perizinan", label: "Perizinan" },
  { href: "/admin/rekap-absensi", label: "Rekap Absensi" },
];

export default function AdminIndexPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-[0_24px_80px_rgba(30,58,95,0.08)]">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Dashboard Admin</p>
          <h1 className="text-4xl font-semibold text-slate-950">Selamat datang di Absensi Digital</h1>
          <p className="max-w-2xl text-slate-600">
            Akses cepat ke semua modul utama: data guru, data siswa, kelas, perizinan, dan rekap absensi.
            Tampilan ini dirancang modern, ringan, dan mudah digunakan.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {overviewItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-[28px] border border-slate-200 bg-slate-50 p-6 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
            >
              <span className="block text-lg">{item.label}</span>
              <span className="mt-3 inline-flex rounded-full bg-[#f0d080] px-3 py-1 text-xs font-medium text-slate-950">
                buka
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
