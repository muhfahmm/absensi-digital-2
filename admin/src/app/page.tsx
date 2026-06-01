import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-dark mb-4">
          Selamat Datang di Admin Panel
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Sistem Absensi Digital - Dashboard Administrasi
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Dashboard */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-primary mb-2">
              📊 Dashboard
            </h2>
            <p className="text-gray-600 mb-4">
              Lihat ringkasan data kehadiran dan statistik
            </p>
            <Link
              href="/dashboard"
              className="inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Buka Dashboard
            </Link>
          </div>

          {/* Card Karyawan */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-secondary mb-2">
              👥 Karyawan
            </h2>
            <p className="text-gray-600 mb-4">
              Kelola data karyawan dan departemen
            </p>
            <Link
              href="/employees"
              className="inline-block bg-secondary text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Kelola Karyawan
            </Link>
          </div>

          {/* Card Absensi */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-warning mb-2">
              ✓ Absensi
            </h2>
            <p className="text-gray-600 mb-4">
              Lihat dan kelola data absensi
            </p>
            <Link
              href="/attendance"
              className="inline-block bg-warning text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition"
            >
              Lihat Absensi
            </Link>
          </div>

          {/* Card Laporan */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-danger mb-2">
              📄 Laporan
            </h2>
            <p className="text-gray-600 mb-4">
              Generate dan download laporan
            </p>
            <Link
              href="/reports"
              className="inline-block bg-danger text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Buat Laporan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
