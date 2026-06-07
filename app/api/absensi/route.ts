import { NextResponse } from "next/server";
import { query } from "@/app/config/db";

export async function GET() {
  try {
    const data = await query(`
      SELECT 
        a.*, 
        s.nama_lengkap as siswa_nama,
        s.nis,
        k.nama_kelas
      FROM tb_absensi_siswa a
      LEFT JOIN tb_siswa s ON a.siswa_id = s.id
      LEFT JOIN tb_kelas k ON s.kelas_id = k.id
      ORDER BY a.tanggal DESC, a.waktu_masuk DESC
      LIMIT 100
    `);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch absensi:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
