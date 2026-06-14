-- ============================================================
--  DATABASE : db_absensi_sekolahan
--  Aplikasi  : Absensi Digital Sekolah
--  Versi     : 1.0.0
-- ============================================================

CREATE DATABASE IF NOT EXISTS db_absensi_sekolahan
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE db_absensi_sekolahan;

-- ============================================================
--  1. ADMIN
-- ============================================================
CREATE TABLE IF NOT EXISTS tb_admin (
  id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  username    VARCHAR(50)     NOT NULL UNIQUE,
  password    VARCHAR(255)    NOT NULL,  -- bcrypt hash
  nama_lengkap VARCHAR(100)   NOT NULL DEFAULT '',
  foto        VARCHAR(255)    NOT NULL DEFAULT '',
  is_aktif    TINYINT(1)      NOT NULL DEFAULT 1,
  role        ENUM('superadmin', 'admin') NOT NULL DEFAULT 'superadmin',
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Default admin  (password: admin123  — ganti setelah deploy!)
INSERT INTO tb_admin (username, password, nama_lengkap)
VALUES ('admin', '$2b$12$placeholder_bcrypt_hash_here', 'Super Admin');

-- ============================================================
--  4. KELAS
-- ============================================================
CREATE TABLE IF NOT EXISTS tb_kelas (
  id              INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  nama_kelas      VARCHAR(20)   NOT NULL,   -- contoh: X, XI, XII
  kapasitas       SMALLINT      NOT NULL DEFAULT 30,
  wali_kelas_id   INT UNSIGNED  NULL,
  created_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
--  5. GURU / STAFF
-- ============================================================
CREATE TABLE IF NOT EXISTS tb_guru (
  id              INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  nip             VARCHAR(30)   NOT NULL UNIQUE,
  nama_lengkap    VARCHAR(100)  NOT NULL,
  jenis_kelamin   ENUM('L','P') NOT NULL,
  tanggal_lahir   DATE          NULL,
  alamat          TEXT,
  telepon         VARCHAR(20)   NOT NULL DEFAULT '',
  email           VARCHAR(100)  NOT NULL DEFAULT '',
  foto            VARCHAR(255)  NOT NULL DEFAULT '',
  qrcode          VARCHAR(255)  NULL DEFAULT NULL UNIQUE,
  mapel_id        INT UNSIGNED  NULL,
  is_admin        TINYINT(1)    NOT NULL DEFAULT 0,
  username        VARCHAR(50)   NOT NULL UNIQUE,
  password        VARCHAR(255)  NOT NULL,
  is_aktif        TINYINT(1)    NOT NULL DEFAULT 1,
  created_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tambahkan FK wali kelas setelah tb_guru dibuat
ALTER TABLE tb_kelas
  ADD CONSTRAINT fk_kelas_wali FOREIGN KEY (wali_kelas_id) REFERENCES tb_guru(id) ON DELETE SET NULL;

-- ============================================================
--  6. SISWA
-- ============================================================
CREATE TABLE IF NOT EXISTS tb_siswa (
  id              INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  nis             VARCHAR(20)   NOT NULL UNIQUE,
  nama_lengkap    VARCHAR(100)  NOT NULL,
  jenis_kelamin   ENUM('L','P') NOT NULL,
  tanggal_lahir   DATE          NULL,
  tempat_lahir    VARCHAR(50)   NOT NULL DEFAULT '',
  alamat          TEXT,
  telepon_ortu    VARCHAR(20)   NOT NULL DEFAULT '',
  email           VARCHAR(100)  NOT NULL DEFAULT '',
  foto            VARCHAR(255)  NOT NULL DEFAULT '',
  qrcode          VARCHAR(255)  NULL DEFAULT NULL UNIQUE,
  kelas_id        INT UNSIGNED  NULL,
  username        VARCHAR(50)   NOT NULL UNIQUE,
  password        VARCHAR(255)  NOT NULL,
  created_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (kelas_id)        REFERENCES tb_kelas(id)        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
--  7. MATA PELAJARAN
-- ============================================================
CREATE TABLE IF NOT EXISTS tb_mata_pelajaran (
  id          INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  nama        VARCHAR(100)  NOT NULL,
  guru_id     INT UNSIGNED  NULL,
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Add Foreign Key for tb_guru.mapel_id after tb_mata_pelajaran is created
ALTER TABLE tb_guru
  ADD CONSTRAINT fk_guru_mapel FOREIGN KEY (mapel_id) REFERENCES tb_mata_pelajaran(id) ON DELETE SET NULL;

-- ============================================================
--  8. JADWAL PELAJARAN
-- ============================================================
CREATE TABLE IF NOT EXISTS tb_jadwal (
  id                  INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  kelas_id            INT UNSIGNED  NOT NULL,
  mata_pelajaran_id   INT UNSIGNED  NOT NULL,
  guru_id             INT UNSIGNED  NOT NULL,
  hari                ENUM('Senin','Selasa','Rabu','Kamis','Jumat','Sabtu') NOT NULL,
  jam_mulai           TIME          NOT NULL,
  jam_selesai         TIME          NOT NULL,
  ruangan             VARCHAR(50)   NOT NULL DEFAULT '',
  -- tahun_ajaran_id column removed as per user request
  created_at          DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (kelas_id)          REFERENCES tb_kelas(id)          ON DELETE CASCADE,
  FOREIGN KEY (mata_pelajaran_id) REFERENCES tb_mata_pelajaran(id) ON DELETE CASCADE,
  FOREIGN KEY (guru_id)           REFERENCES tb_guru(id)           ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
--  9. ABSENSI SISWA
-- ============================================================
CREATE TABLE IF NOT EXISTS tb_absensi_siswa (
  id                INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  siswa_id          INT UNSIGNED  NOT NULL,
  jadwal_id         INT UNSIGNED  NOT NULL,
  tanggal           DATE          NOT NULL,
  status            ENUM('Hadir','Izin','Sakit','Alpha') NOT NULL DEFAULT 'Alpha',
  keterangan        TEXT,
  waktu_masuk       TIME          NULL,
  metode            ENUM('Manual','QRCode','FaceRecognition','GPS') NOT NULL DEFAULT 'Manual',
  latitude          DECIMAL(10,8) NULL,
  longitude         DECIMAL(11,8) NULL,
  foto_bukti        VARCHAR(255)  NOT NULL DEFAULT '',
  dicatat_oleh      INT UNSIGNED  NULL,  -- guru_id
  created_at        DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_absensi_siswa (siswa_id, jadwal_id, tanggal),
  FOREIGN KEY (siswa_id)   REFERENCES tb_siswa(id)  ON DELETE CASCADE,
  FOREIGN KEY (jadwal_id)  REFERENCES tb_jadwal(id) ON DELETE CASCADE,
  FOREIGN KEY (dicatat_oleh) REFERENCES tb_guru(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- 10. ABSENSI GURU
-- ============================================================
CREATE TABLE IF NOT EXISTS tb_absensi_guru (
  id            INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  guru_id       INT UNSIGNED  NOT NULL,
  tanggal       DATE          NOT NULL,
  jam_masuk     TIME          NULL,
  jam_keluar    TIME          NULL,
  status        ENUM('Hadir','Izin','Sakit','Alpha') NOT NULL DEFAULT 'Hadir',
  keterangan    TEXT,
  metode        ENUM('Manual','QRCode','FaceRecognition','GPS') NOT NULL DEFAULT 'Manual',
  latitude      DECIMAL(10,8) NULL,
  longitude     DECIMAL(11,8) NULL,
  foto_bukti    VARCHAR(255)  NOT NULL DEFAULT '',
  created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_absensi_guru (guru_id, tanggal),
  FOREIGN KEY (guru_id) REFERENCES tb_guru(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- 11. IZIN / SURAT KETERANGAN
-- ============================================================
CREATE TABLE IF NOT EXISTS tb_izin (
  id              INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  jenis_user      ENUM('Siswa','Guru') NOT NULL,
  user_id         INT UNSIGNED  NOT NULL,
  tanggal_mulai   DATE          NOT NULL,
  tanggal_selesai DATE          NOT NULL,
  jenis_izin      ENUM('Izin','Sakit','Dinas','Lainnya') NOT NULL,
  alasan          TEXT          NOT NULL,
  lampiran        VARCHAR(255)  NOT NULL DEFAULT '',
  status          ENUM('Pending','Disetujui','Ditolak') NOT NULL DEFAULT 'Pending',
  catatan_admin   TEXT,
  diproses_oleh   INT UNSIGNED  NULL,
  created_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (diproses_oleh) REFERENCES tb_admin(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- 12. PENGUMUMAN (konten dikontrol admin)
-- ============================================================
CREATE TABLE IF NOT EXISTS tb_pengumuman (
  id          INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  judul       VARCHAR(200)  NOT NULL,
  isi         TEXT          NOT NULL,
  gambar      VARCHAR(255)  NOT NULL DEFAULT '',
  target      ENUM('Semua','Siswa','Guru') NOT NULL DEFAULT 'Semua',
  is_aktif    TINYINT(1)    NOT NULL DEFAULT 1,
  dibuat_oleh INT UNSIGNED  NOT NULL,
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (dibuat_oleh) REFERENCES tb_admin(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- 13. PENGATURAN APLIKASI (konten dikontrol admin)
-- ============================================================
CREATE TABLE IF NOT EXISTS tb_pengaturan (
  id          INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  kunci       VARCHAR(100)  NOT NULL UNIQUE,
  nilai       TEXT,
  deskripsi   VARCHAR(200)  NOT NULL DEFAULT '',
  updated_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO tb_pengaturan (kunci, nilai, deskripsi) VALUES
  ('jam_masuk_pagi',     '07:00:00', 'Batas jam masuk pagi'),
  ('jam_toleransi',      '15',       'Toleransi keterlambatan (menit)'),
  ('radius_absensi',     '100',      'Radius GPS absensi (meter)'),
  ('absensi_gps',        '1',        'Wajibkan GPS saat absensi'),
  ('absensi_foto',       '1',        'Wajibkan foto saat absensi'),
  ('notif_alpha',        '1',        'Kirim notifikasi jika alpha'),
  ('warna_utama',        '#1e3a5f',  'Warna utama tema website'),
  ('warna_aksen',        '#c9a84c',  'Warna aksen tema website'),
  ('maintenance_mode',   '0',        'Mode maintenance');

-- ============================================================
-- 14. QR CODE TABLE FOR STUDENT ATTENDANCE
-- ============================================================
CREATE TABLE IF NOT EXISTS tb_qrcode (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  siswa_id    INT UNSIGNED NOT NULL,
  kode_unik   VARCHAR(255) NOT NULL,
  is_aktif   TINYINT(1)   NOT NULL DEFAULT 1,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (siswa_id) REFERENCES tb_siswa(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
