import Link from "next/link";

export default function AdminAuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-xl rounded-[32px] bg-white p-8 shadow-sm border border-slate-200">
        <h1 className="text-4xl font-semibold mb-4">Autentikasi Admin</h1>
        <p className="text-slate-600 mb-6">Pilih aksi yang ingin Anda lakukan untuk memasuki panel admin.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/admin/auth/login" className="rounded-3xl bg-[#1e3a5f] px-6 py-4 text-center font-semibold text-white hover:bg-slate-800 transition">
            Login Admin
          </Link>
          <Link href="/admin/auth/register" className="rounded-3xl bg-[#F472B6] px-6 py-4 text-center font-semibold text-white hover:bg-pink-600 transition">
            Daftar Admin
          </Link>
        </div>
      </div>
    </div>
  );
}
