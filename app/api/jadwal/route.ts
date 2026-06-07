import { NextResponse } from "next/server";
import { query } from "@/app/config/db";

export async function GET() {
  try {
    const data = await query(`
      SELECT 
        j.*, 
        k.nama_kelas,
        m.nama as mata_pelajaran_nama,
        g.nama_lengkap as guru_nama
      FROM tb_jadwal j
      LEFT JOIN tb_kelas k ON j.kelas_id = k.id
      LEFT JOIN tb_mata_pelajaran m ON j.mata_pelajaran_id = m.id
      LEFT JOIN tb_guru g ON j.guru_id = g.id
      ORDER BY FIELD(j.hari, 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'), j.jam_mulai ASC
    `);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch jadwal:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
