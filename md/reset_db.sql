-- ============================================================
--  RESET SQL : db_absensi_sekolahan
--  PERINGATAN : File ini akan MENGHAPUS semua tabel!
--  Jalankan hanya saat development / reinstall.
-- ============================================================

USE db_absensi_sekolahan;

-- Nonaktifkan foreign key check sementara agar urutan DROP tidak masalah
SET FOREIGN_KEY_CHECKS = 0;

-- Drop tables dalam urutan yang benar (dari yang paling dependent ke least dependent)
-- Tabel yang bergantung pada tabel lain harus dihapus terlebih dahulu

-- 1. Drop log dan rekap pertama (leaf tables)
DROP TABLE IF EXISTS tb_log_aktivitas;
DROP TABLE IF EXISTS tb_rekap_absensi;

-- 2. Drop QR code table (mereferensi tb_siswa)
DROP TABLE IF EXISTS tb_qrcode;

-- 3. Drop absensi records (bergantung pada siswa, guru, jadwal)
DROP TABLE IF EXISTS tb_absensi_siswa;
DROP TABLE IF EXISTS tb_absensi_guru;

-- 4. Drop izin dan notifikasi
DROP TABLE IF EXISTS tb_izin;
DROP TABLE IF EXISTS tb_notifikasi;

-- 5. Drop konten pages (pengumuman bergantung pada admin)
DROP TABLE IF EXISTS tb_pengumuman;
DROP TABLE IF EXISTS tb_slider;
DROP TABLE IF EXISTS tb_galeri;

-- 6. Drop jadwal PERTAMA (bergantung pada kelas, mapel, guru)
DROP TABLE IF EXISTS tb_jadwal;

-- 7. Drop siswa (bergantung pada kelas)
DROP TABLE IF EXISTS tb_siswa;

-- 8. Drop kelas (bergantung pada guru)
DROP TABLE IF EXISTS tb_kelas;

-- 9. Drop guru (bergantung pada mapel)
DROP TABLE IF EXISTS tb_guru;

-- 10. Drop mata pelajaran
DROP TABLE IF EXISTS tb_mata_pelajaran;

-- 11. Drop base tables
DROP TABLE IF EXISTS tb_tahun_ajaran;
DROP TABLE IF EXISTS tb_profil_sekolah;
DROP TABLE IF EXISTS tb_pengaturan;
DROP TABLE IF EXISTS tb_admin;

SET FOREIGN_KEY_CHECKS = 1;

-- Opsional: hapus database sepenuhnya
-- DROP DATABASE IF EXISTS db_absensi_sekolahan;

SELECT 'RESET SELESAI — Semua tabel berhasil dihapus.' AS status;
