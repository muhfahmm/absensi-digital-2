import { NextResponse } from "next/server";
import { query } from "@/app/config/db";

export async function GET() {
  try {
    const data = await query(`
      SELECT 
        i.*,
        CASE 
          WHEN i.jenis_user = 'Siswa' THEN s.nama_lengkap
          WHEN i.jenis_user = 'Guru' THEN g.nama_lengkap
        END as nama_user,
        CASE 
          WHEN i.jenis_user = 'Siswa' THEN k.nama_kelas
          ELSE 'Guru/Staff'
        END as role_detail
      FROM tb_izin i
      LEFT JOIN tb_siswa s ON i.jenis_user = 'Siswa' AND i.user_id = s.id
      LEFT JOIN tb_kelas k ON s.kelas_id = k.id
      LEFT JOIN tb_guru g ON i.jenis_user = 'Guru' AND i.user_id = g.id
      ORDER BY i.created_at DESC
    `);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch perizinan:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
