-- Migration: Remove deprecated columns from CRUD tables
-- Removes: jurusan, ruangan, status from kelas
--          is_aktif from mata_pelajaran
--          nisn, is_aktif from siswa
--          mata_pelajaran, jabatan, status from guru (kept mata_pelajaran as string, removed jabatan & status)

-- Remove from tb_kelas
ALTER TABLE tb_kelas DROP COLUMN IF EXISTS jurusan;
ALTER TABLE tb_kelas DROP COLUMN IF EXISTS ruangan;
ALTER TABLE tb_kelas DROP COLUMN IF EXISTS is_aktif;

-- Remove from tb_mata_pelajaran
ALTER TABLE tb_mata_pelajaran DROP COLUMN IF EXISTS is_aktif;

-- Remove from tb_siswa
ALTER TABLE tb_siswa DROP COLUMN IF EXISTS nisn;
ALTER TABLE tb_siswa DROP COLUMN IF EXISTS is_aktif;

-- Remove from tb_guru
ALTER TABLE tb_guru DROP COLUMN IF EXISTS jabatan;
ALTER TABLE tb_guru DROP COLUMN IF EXISTS status;
-- Keep mata_pelajaran as it's now used to store the mapel name

-- Ensure is_aktif is still present in tb_guru (for active/inactive status)
-- If somehow it was removed, add it back:
ALTER TABLE tb_guru ADD COLUMN IF NOT EXISTS is_aktif TINYINT(1) NOT NULL DEFAULT 1 AFTER username;

