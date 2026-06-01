import Table from '@/components/Table';

export default function AttendancePage() {
  const attendanceData = [
    ['2024-06-01', 'John Doe', 'Hadir', '08:00', '17:00'],
    ['2024-06-01', 'Jane Smith', 'Hadir', '08:15', '17:30'],
    ['2024-06-01', 'Bob Johnson', 'Terlambat', '08:45', '17:00'],
    ['2024-06-01', 'Alice Brown', 'Izin', '-', '-'],
    ['2024-06-01', 'Charlie Wilson', 'Hadir', '08:05', '17:15'],
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-dark">Data Absensi</h1>
        <div className="flex gap-4">
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <Table
          headers={['Tanggal', 'Nama', 'Status', 'Jam Masuk', 'Jam Keluar']}
          rows={attendanceData}
          actions={(index) => (
            <button className="text-primary hover:text-blue-700 text-sm font-semibold">
              Lihat Detail
            </button>
          )}
        />
      </div>
    </div>
  );
}
