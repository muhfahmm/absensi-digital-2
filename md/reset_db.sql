-- ============================================================
--  RESET SQL : db_absensi_sekolahan
--  PERINGATAN : File ini akan MENGHAPUS semua tabel!
--  Jalankan hanya saat development / reinstall.
-- ============================================================

USE db_absensi_sekolahan;

-- Nonaktifkan foreign key check sementara agar urutan DROP tidak masalah
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS tb_log_aktivitas;
DROP TABLE IF EXISTS tb_rekap_absensi;
DROP TABLE IF EXISTS tb_absensi_siswa;
DROP TABLE IF EXISTS tb_absensi_guru;
DROP TABLE IF EXISTS tb_izin;
DROP TABLE IF EXISTS tb_notifikasi;
DROP TABLE IF EXISTS tb_pengumuman;
DROP TABLE IF EXISTS tb_slider;
DROP TABLE IF EXISTS tb_galeri;
DROP TABLE IF EXISTS tb_jadwal;
DROP TABLE IF EXISTS tb_mata_pelajaran;
DROP TABLE IF EXISTS tb_siswa;
DROP TABLE IF EXISTS tb_kelas;
DROP TABLE IF EXISTS tb_guru;
DROP TABLE IF EXISTS tb_tahun_ajaran;
DROP TABLE IF EXISTS tb_profil_sekolah;
DROP TABLE IF EXISTS tb_pengaturan;
DROP TABLE IF EXISTS tb_admin;

SET FOREIGN_KEY_CHECKS = 1;

-- Opsional: hapus database sepenuhnya
-- DROP DATABASE IF EXISTS db_absensi_sekolahan;

SELECT 'RESET SELESAI — Semua tabel berhasil dihapus.' AS status;
