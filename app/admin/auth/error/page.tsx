import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
      <div className="w-full max-w-lg rounded-[32px] bg-white p-10 shadow-sm border border-slate-200 text-center">
        <h1 className="text-4xl font-semibold text-[#1f2937] mb-4">Terjadi Kesalahan</h1>
        <p className="text-slate-600 mb-6">
          Ada masalah saat memproses autentikasi. Silakan kembali ke halaman login dan coba lagi.
        </p>
        <Link
          href="/admin/auth/login"
          className="inline-flex rounded-full bg-[#1e3a5f] px-6 py-3 text-white font-semibold hover:bg-slate-800 transition"
        >
          Kembali ke Login
        </Link>
      </div>
    </div>
  );
}
