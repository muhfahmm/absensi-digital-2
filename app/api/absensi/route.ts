import { NextResponse } from "next/server";
import { query } from "@/app/config/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const selectedDate = searchParams.get("date");
    const kelasId = searchParams.get("kelas_id");
    const mapelId = searchParams.get("mata_pelajaran_id");
    const searchQuery = searchParams.get("query");

    let sql = `
      SELECT 
        a.*, 
        s.nama_lengkap as siswa_nama,
        s.nis,
        k.nama_kelas,
        m.nama as mata_pelajaran_nama
      FROM tb_absensi_siswa a
      LEFT JOIN tb_siswa s ON a.siswa_id = s.id
      LEFT JOIN tb_kelas k ON s.kelas_id = k.id
      LEFT JOIN tb_mata_pelajaran m ON a.mata_pelajaran_id = m.id
      WHERE 1 = 1
    `;
    const params: any[] = [];

    if (selectedDate) {
      sql += ` AND DATE(a.tanggal) = ?`;
      params.push(selectedDate);
    }

    if (kelasId) {
      sql += ` AND k.id = ?`;
      params.push(kelasId);
    }

    if (mapelId) {
      sql += ` AND m.id = ?`;
      params.push(mapelId);
    }

    if (searchQuery) {
      sql += ` AND (
        s.nama_lengkap LIKE ? OR
        s.nis LIKE ? OR
        k.nama_kelas LIKE ? OR
        m.nama LIKE ?
      )`;
      const like = `%${searchQuery}%`;
      params.push(like, like, like, like);
    }

    sql += ` ORDER BY a.tanggal DESC, a.waktu_masuk DESC LIMIT 200`;

    const data = await query(sql, params);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch absensi:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
