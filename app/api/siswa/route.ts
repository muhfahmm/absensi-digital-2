import { NextResponse } from "next/server";
import { query } from "@/app/config/db";

export async function GET() {
  try {
    const data = await query(`
      SELECT 
        s.*, 
        k.nama_kelas
      FROM tb_siswa s
      LEFT JOIN tb_kelas k ON s.kelas_id = k.id
      ORDER BY k.nama_kelas ASC, s.nama_lengkap ASC
    `);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch siswa:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
