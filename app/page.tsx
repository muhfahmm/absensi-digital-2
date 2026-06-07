import { redirect } from "next/navigation";

// Samakan interface dengan kolom di tb_admin
interface Admin {
  id: number;
  username: string;
  nama_lengkap: string;
}

export default async function AdminDashboard() {
  let admins: Admin[] = [];

  try {
    // Query disesuaikan ke tb_admin
    const [rows] = await pool.query('SELECT id, username, nama_lengkap FROM tb_admin');
    admins = Array.isArray(rows) ? (rows as Admin[]) : [];
  } catch (error) {
    console.error("=== DETAIL ERROR DATABASE TRACED ===");
    console.error(error);
    console.error("====================================");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Daftar Admin Sekolah</h1>
      <ul className="list-disc pl-5">
        {admins.map((admin) => (
          <li key={admin.id} className="py-1">
            {admin.nama_lengkap} ({admin.username})
          </li>
        ))}
      </ul>
    </div>
  );
}