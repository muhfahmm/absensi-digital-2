import Link from "next/link";

const adminNav = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/guru", label: "Data Guru" },
  { href: "/admin/siswa", label: "Data Siswa" },
  { href: "/admin/kelas", label: "Data Kelas" },
  { href: "/admin/perizinan", label: "Perizinan" },
  { href: "/admin/rekap-absensi", label: "Rekap Absensi" },
  { href: "/admin/auth/login", label: "Login Admin" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - Sesuai panduan design.md */}
      <aside className="w-[260px] bg-[#1e3a5f] text-white p-6">
        <h2 className="text-xl font-bold mb-6">Panel Admin</h2>
        <nav>
          <ul>
            <li className="mb-4"><a href="/admin/dashboard">Dashboard</a></li>
            <li className="mb-4"><a href="/admin/guru">Data Guru</a></li>
            <li className="mb-4"><a href="/admin/siswa">Data Siswa</a></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 bg-slate-50 p-8">{children}</main>
    </div>
  );
}