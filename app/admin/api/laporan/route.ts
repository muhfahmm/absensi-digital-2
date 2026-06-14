import { NextResponse } from "next/server";
import { query } from "@/app/config/db";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "super-secret-key-for-absensi-digital");

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    let userId = null;
    let userRole = null;

    if (token) {
      try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        userId = payload.id;
        userRole = payload.role;
      } catch (err) {}
    }

    let sql = `
      SELECT 
        k.nama_kelas as kelas,
        COUNT(DISTINCT s.id) as total,
        ROUND((SUM(CASE WHEN a.status = 'Hadir' THEN 1 ELSE 0 END) / COUNT(a.id)) * 100) as hadir_percentage,
        SUM(CASE WHEN a.status = 'Izin' THEN 1 ELSE 0 END) as izin,
        SUM(CASE WHEN a.status = 'Sakit' THEN 1 ELSE 0 END) as sakit,
        SUM(CASE WHEN a.status = 'Alpha' THEN 1 ELSE 0 END) as alpha
      FROM tb_kelas k
      LEFT JOIN tb_siswa s ON k.id = s.kelas_id
      LEFT JOIN tb_absensi_siswa a ON s.id = a.siswa_id AND MONTH(a.tanggal) = MONTH(CURRENT_DATE()) AND YEAR(a.tanggal) = YEAR(CURRENT_DATE())
    `;
    const params: any[] = [];

    if (userRole === "guru") {
      sql += ` WHERE k.wali_kelas_id = ?`;
      params.push(userId);
    }

    sql += `
      GROUP BY k.id, k.nama_kelas
      ORDER BY k.nama_kelas ASC
    `;
    
    const data = await query(sql, params);
    
    // Process results to add percentage sign and handle nulls
    const processedData = data.map((row: any) => ({
      kelas: row.kelas,
      total: row.total || 0,
      hadir: (row.hadir_percentage || 0) + "%",
      izin: row.izin || 0,
      sakit: row.sakit || 0,
      alpha: row.alpha || 0
    }));

    return NextResponse.json(processedData);
  } catch (error) {
    console.error("Failed to fetch laporan:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
