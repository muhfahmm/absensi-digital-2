import Card from '@/components/Card';
import Table from '@/components/Table';

export default function DashboardPage() {
  const attendanceData = [
    ['John Doe', 'Hadir', '08:00', '17:00'],
    ['Jane Smith', 'Hadir', '08:15', '17:30'],
    ['Bob Johnson', 'Terlambat', '08:45', '17:00'],
    ['Alice Brown', 'Izin', '-', '-'],
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-dark mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card
          title="Total Karyawan"
          value="125"
          icon="👥"
          color="primary"
        />
        <Card
          title="Hadir Hari Ini"
          value="118"
          icon="✓"
          color="secondary"
        />
        <Card
          title="Terlambat"
          value="5"
          icon="⏰"
          color="warning"
        />
        <Card
          title="Izin/Cuti"
          value="2"
          icon="📋"
          color="danger"
        />
      </div>

      {/* Recent Attendance */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-dark mb-4">Absensi Terbaru</h2>
        <Table
          headers={['Nama', 'Status', 'Jam Masuk', 'Jam Keluar']}
          rows={attendanceData}
          actions={(index) => (
            <button className="text-primary hover:text-blue-700 font-semibold">
              Detail
            </button>
          )}
        />
      </div>
    </div>
  );
}
