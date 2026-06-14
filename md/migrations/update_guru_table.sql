-- ============================================================
--  MIGRATION: Add mapel_id dan is_admin to tb_guru
--  Script untuk update struktur tabel guru
-- ============================================================

USE db_absensi_sekolahan;

-- Tambah kolom mapel_id dan is_admin jika belum ada
ALTER TABLE tb_guru 
ADD COLUMN IF NOT EXISTS mapel_id INT UNSIGNED NULL AFTER foto,
ADD COLUMN IF NOT EXISTS is_admin TINYINT(1) NOT NULL DEFAULT 0 AFTER mapel_id,
DROP COLUMN IF EXISTS mata_pelajaran;

-- Tambah foreign key untuk mapel_id jika belum ada
ALTER TABLE tb_guru
ADD CONSTRAINT fk_guru_mapel FOREIGN KEY (mapel_id) REFERENCES tb_mata_pelajaran(id) ON DELETE SET NULL;

SELECT 'MIGRATION SELESAI — Kolom mapel_id dan is_admin berhasil ditambahkan.' AS status;
