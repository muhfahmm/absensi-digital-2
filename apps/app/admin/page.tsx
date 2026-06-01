export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-2xl w-full text-center">
        <h1 className="text-5xl font-extrabold text-indigo-800 mb-6">
          Admin Panel – Absensi Digital
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Selamat datang di dashboard admin. Kelola data kehadiran, lihat laporan, dan konfigurasi aplikasi di sini.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/reports"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Laporan Kehadiran
          </a>
          <a
            href="/settings"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Pengaturan
          </a>
        </div>
      </div>
    </main>
  );
}
