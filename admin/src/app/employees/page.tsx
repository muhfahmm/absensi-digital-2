import Table from '@/components/Table';

export default function EmployeesPage() {
  const employeeData = [
    ['E001', 'John Doe', 'IT', 'john@example.com'],
    ['E002', 'Jane Smith', 'HR', 'jane@example.com'],
    ['E003', 'Bob Johnson', 'Finance', 'bob@example.com'],
    ['E004', 'Alice Brown', 'Marketing', 'alice@example.com'],
    ['E005', 'Charlie Wilson', 'IT', 'charlie@example.com'],
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-dark">Manajemen Karyawan</h1>
        <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
          + Tambah Karyawan
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <Table
          headers={['ID', 'Nama', 'Departemen', 'Email']}
          rows={employeeData}
          actions={() => (
            <div className="flex gap-2">
              <button className="text-primary hover:text-blue-700 text-sm font-semibold">
                Edit
              </button>
              <button className="text-danger hover:text-red-700 text-sm font-semibold">
                Hapus
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
}
