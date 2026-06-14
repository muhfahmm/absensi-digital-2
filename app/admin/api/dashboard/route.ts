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

    // Get last 7 days attendance data
    const last7Days = await query(`
      SELECT 
        DATE_FORMAT(tanggal, '%Y-%m-%d') as tanggal,
        DAYNAME(tanggal) as hari,
        COUNT(*) as total_absensi,
        SUM(CASE WHEN status = 'Hadir' THEN 1 ELSE 0 END) as hadir
      FROM tb_absensi_siswa
      WHERE tanggal >= DATE_SUB(?, INTERVAL 6 DAY)
      GROUP BY tanggal
      ORDER BY tanggal ASC
    `, [today]);

    // Get attendance by class for today
    const attendanceByClass = await query(`
      SELECT 
        k.id,
        k.nama_kelas,
        COUNT(DISTINCT s.id) as total_siswa,
        COUNT(DISTINCT CASE WHEN tas.status = 'Hadir' THEN tas.siswa_id END) as siswa_hadir
      FROM tb_kelas k
      LEFT JOIN tb_siswa s ON k.id = s.kelas_id
      LEFT JOIN tb_absensi_siswa tas ON s.id = tas.siswa_id AND tas.tanggal = ?
      GROUP BY k.id, k.nama_kelas
      ORDER BY k.nama_kelas ASC
    `, [today]);

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

    // Calculate average and chart data
    const chartData = last7Days.map(day => {
      const percentage = day.total_absensi > 0 ? Math.round((day.hadir / day.total_absensi) * 100) : 0;
      return {
        day: day.hari.substring(0, 3).toUpperCase(),
        val: percentage,
        label: `${percentage}%`,
        fullDay: day.hari
      };
    });

    const averageAttendance = chartData.length > 0 
      ? Math.round(chartData.reduce((sum, item) => sum + item.val, 0) / chartData.length)
      : 0;

    // Calculate class attendance for donut chart
    const classAttendance = attendanceByClass.map(cls => ({
      ...cls,
      percentage: cls.total_siswa > 0 ? Math.round((cls.siswa_hadir / cls.total_siswa) * 100) : 0
    }));

    const totalClassAttendance = classAttendance.length > 0
      ? Math.round(classAttendance.reduce((sum, cls) => sum + cls.percentage, 0) / classAttendance.length)
      : 0;

    return NextResponse.json({
      stats: {
        siswa: { total: totalSiswa[0].count, hadir: hadirSiswa[0].count, izinSakit: izinSakitSiswa[0].count, alpha: alphaSiswa[0].count },
        guru: { total: totalGuru[0].count, hadir: hadirGuru[0].count }
      },
      chartData,
      averageAttendance,
      classAttendance,
      totalClassAttendance,
      pendingApprovals,
      unexcusedAbsences
    });
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
