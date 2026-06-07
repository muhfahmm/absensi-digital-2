'use client';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFFF0] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-[#FBCFE8] p-8">
        <h1 className="text-3xl font-bold text-[#36454F] font-serif text-center mb-6">Daftar Admin</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#4A4A4A]">Username</label>
            <input className="w-full px-4 py-3 mt-1 rounded-xl border border-[#FBCFE8] focus:border-[#D4AF37] outline-none" type="text" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#4A4A4A]">Password</label>
            <input className="w-full px-4 py-3 mt-1 rounded-xl border border-[#FBCFE8] focus:border-[#D4AF37] outline-none" type="password" />
          </div>
          <button className="w-full bg-[#F472B6] hover:bg-[#EC4899] text-white py-3 rounded-full font-semibold transition">
            Buat Akun
          </button>
        </form>
      </div>
    </div>
  );
}