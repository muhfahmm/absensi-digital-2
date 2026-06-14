import { NextResponse } from "next/server";
import { query } from "@/app/config/db";

export async function GET() {
  try {
    const totalSiswa = await query("SELECT COUNT(*) as count FROM tb_siswa");
    const totalGuru = await query("SELECT COUNT(*) as count FROM tb_guru");
    const today = new Date().toISOString().split('T')[0];

    const hadirSiswa = await query("SELECT COUNT(*) as count FROM tb_absensi_siswa WHERE tanggal = ? AND status = 'Hadir'", [today]);
    const izinSakitSiswa = await query("SELECT COUNT(*) as count FROM tb_absensi_siswa WHERE tanggal = ? AND status IN ('Izin', 'Sakit')", [today]);
    const alphaSiswa = await query("SELECT COUNT(*) as count FROM tb_absensi_siswa WHERE tanggal = ? AND status = 'Alpha'", [today]);
    
    const hadirGuru = await query("SELECT COUNT(*) as count FROM tb_absensi_guru WHERE tanggal = ? AND status = 'Hadir'", [today]);

    const pendingApprovals = await query(`
      SELECT 
        i.*,
        CASE 
          WHEN i.jenis_user = 'Siswa' THEN s.nama_lengkap
          WHEN i.jenis_user = 'Guru' THEN g.nama_lengkap
        END as nama,
        CASE 
          WHEN i.jenis_user = 'Siswa' THEN CONCAT('Siswa - ', k.nama_kelas)
          ELSE 'Guru'
        END as role_detail
      FROM tb_izin i
      LEFT JOIN tb_siswa s ON i.jenis_user = 'Siswa' AND i.user_id = s.id
      LEFT JOIN tb_kelas k ON s.kelas_id = k.id
      LEFT JOIN tb_guru g ON i.jenis_user = 'Guru' AND i.user_id = g.id
      WHERE i.status = 'Pending'
      ORDER BY i.created_at DESC
      LIMIT 5
    `);

    // Find students who haven't clocked in today (simple simulation: total minus total absensi today)
    const unexcusedAbsences = await query(`
      SELECT s.nis, s.nama_lengkap as nama, k.nama_kelas as kelas, s.telepon_ortu as telp
      FROM tb_siswa s
      LEFT JOIN tb_kelas k ON s.kelas_id = k.id
      WHERE s.id NOT IN (
        SELECT siswa_id FROM tb_absensi_siswa WHERE tanggal = ?
      )
      LIMIT 5
    `, [today]);

    return NextResponse.json({
      stats: {
        siswa: { total: totalSiswa[0].count, hadir: hadirSiswa[0].count, izinSakit: izinSakitSiswa[0].count, alpha: alphaSiswa[0].count },
        guru: { total: totalGuru[0].count, hadir: hadirGuru[0].count }
      },
      pendingApprovals,
      unexcusedAbsences
    });
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
