-- ============================================================
--  DATABASE : db_sekolah_absensi
--  Aplikasi  : Absensi Digital Sekolah
--  Versi     : 1.0.0
-- ============================================================

CREATE DATABASE IF NOT EXISTS db_sekolah_absensi
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE db_sekolah_absensi;

-- ============================================================
--  1. ADMIN
-- ============================================================
CREATE TABLE IF NOT EXISTS tb_admin (
  id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  username    VARCHAR(50)     NOT NULL UNIQUE,
  password    VARCHAR(255)    NOT NULL,  -- bcrypt hash
  nama_lengkap VARCHAR(100)   NOT NULL DEFAULT '',
  email       VARCHAR(100)    NOT NULL DEFAULT '',
  foto        VARCHAR(255)    NOT NULL DEFAULT '',
  is_aktif    TINYINT(1)      NOT NULL DEFAULT 1,
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Default admin  (password: admin123  — ganti setelah deploy!)
INSERT INTO tb_admin (username, password, nama_lengkap, email)
VALUES ('admin', '$2b$12$placeholder_bcrypt_hash_here', 'Super Admin', 'admin@sekolah.sch.id');

-- ============================================================
--  2. PROFIL SEKOLAH  (konten dikendalikan admin)
-- ============================================================
CREATE TABLE IF NOT EXISTS tb_profil_sekolah (
  id            INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  nama_sekolah  VARCHAR(150)  NOT NULL,
  npsn          VARCHAR(20)   NOT NULL DEFAULT '',
  alamat        TEXT          NOT NULL,
  telepon       VARCHAR(20)   NOT NULL DEFAULT '',
  email         VARCHAR(100)  NOT NULL DEFAULT '',
  website       VARCHAR(150)  NOT NULL DEFAULT '',
  logo          VARCHAR(255)  NOT NULL DEFAULT '',
  kepala_sekolah VARCHAR(100) NOT NULL DEFAULT '',
  tahun_berdiri YEAR          NULL,
  akreditasi    VARCHAR(5)    NOT NULL DEFAULT '',
  visi          TEXT,
  misi          TEXT,
  updated_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO tb_profil_sekolah (nama_sekolah, alamat)
VALUES ('Nama Sekolah', 'Alamat Sekolah');

-- ============================================================
--  3. TAHUN AJARAN
-- ============================================================
CREATE TABLE IF NOT EXISTS tb_tahun_ajaran (
  id          INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  nama        VARCHAR(20)   NOT NULL,  -- contoh: 2024/2025
  semester    ENUM('Ganjil','Genap') NOT NULL,
  tanggal_mulai DATE        NOT NULL,
  tanggal_selesai DATE      NOT NULL,
  is_aktif    TINYINT(1)    NOT NULL DEFAULT 0,
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
--  4. KELAS
-- ============================================================
CREATE TABLE IF NOT EXISTS tb_kelas (
  id              INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  nama_kelas      VARCHAR(20)   NOT NULL,   -- contoh: X, XI, XII
  jurusan         VARCHAR(100)  NOT NULL DEFAULT '',
  ruangan         VARCHAR(50)   NOT NULL DEFAULT '',
  kapasitas       SMALLINT      NOT NULL DEFAULT 30,
  wali_kelas_id   INT UNSIGNED  NULL,
  tahun_ajaran_id INT UNSIGNED  NOT NULL,
  is_aktif        TINYINT(1)    NOT NULL DEFAULT 1,
  created_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (tahun_ajaran_id) REFERENCES tb_tahun_ajaran(id) ON DELETE RESTRICT
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
  mata_pelajaran  VARCHAR(100)  NOT NULL DEFAULT '',
  jabatan         VARCHAR(100)  NOT NULL DEFAULT '',
  status          ENUM('PNS','Honorer','GTT') NOT NULL DEFAULT 'Honorer',
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
  nisn            VARCHAR(20)   NOT NULL DEFAULT '',
  nama_lengkap    VARCHAR(100)  NOT NULL,
  jenis_kelamin   ENUM('L','P') NOT NULL,
  tanggal_lahir   DATE          NULL,
  tempat_lahir    VARCHAR(50)   NOT NULL DEFAULT '',
  alamat          TEXT,
  telepon_ortu    VARCHAR(20)   NOT NULL DEFAULT '',
  email           VARCHAR(100)  NOT NULL DEFAULT '',
  foto            VARCHAR(255)  NOT NULL DEFAULT '',
  kelas_id        INT UNSIGNED  NULL,
  tahun_ajaran_id INT UNSIGNED  NOT NULL,
  username        VARCHAR(50)   NOT NULL UNIQUE,
  password        VARCHAR(255)  NOT NULL,
  is_aktif        TINYINT(1)    NOT NULL DEFAULT 1,
  created_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (kelas_id)        REFERENCES tb_kelas(id)        ON DELETE SET NULL,
  FOREIGN KEY (tahun_ajaran_id) REFERENCES tb_tahun_ajaran(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
--  7. MATA PELAJARAN
-- ============================================================
CREATE TABLE IF NOT EXISTS tb_mata_pelajaran (
  id          INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  kode        VARCHAR(20)   NOT NULL UNIQUE,
  nama        VARCHAR(100)  NOT NULL,
  deskripsi   TEXT,
  guru_id     INT UNSIGNED  NULL,
  is_aktif    TINYINT(1)    NOT NULL DEFAULT 1,
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (guru_id) REFERENCES tb_guru(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  tahun_ajaran_id     INT UNSIGNED  NOT NULL,
  created_at          DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (kelas_id)          REFERENCES tb_kelas(id)          ON DELETE CASCADE,
  FOREIGN KEY (mata_pelajaran_id) REFERENCES tb_mata_pelajaran(id) ON DELETE CASCADE,
  FOREIGN KEY (guru_id)           REFERENCES tb_guru(id)           ON DELETE CASCADE,
  FOREIGN KEY (tahun_ajaran_id)   REFERENCES tb_tahun_ajaran(id)   ON DELETE RESTRICT
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
--  10. ABSENSI GURU
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
--  11. IZIN / SURAT KETERANGAN
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
--  12. NOTIFIKASI
-- ============================================================
CREATE TABLE IF NOT EXISTS tb_notifikasi (
  id          INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  judul       VARCHAR(150)  NOT NULL,
  pesan       TEXT          NOT NULL,
  jenis_user  ENUM('Semua','Siswa','Guru','Admin') NOT NULL DEFAULT 'Semua',
  user_id     INT UNSIGNED  NULL,   -- NULL = broadcast
  is_baca     TINYINT(1)    NOT NULL DEFAULT 0,
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
--  13. PENGUMUMAN (konten dikontrol admin)
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
--  14. SLIDER / BANNER WEBSITE (konten dikontrol admin)
-- ============================================================
CREATE TABLE IF NOT EXISTS tb_slider (
  id          INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  judul       VARCHAR(150)  NOT NULL DEFAULT '',
  gambar      VARCHAR(255)  NOT NULL,
  link        VARCHAR(255)  NOT NULL DEFAULT '',
  urutan      TINYINT       NOT NULL DEFAULT 0,
  is_aktif    TINYINT(1)    NOT NULL DEFAULT 1,
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
--  15. GALERI (konten dikontrol admin)
-- ============================================================
CREATE TABLE IF NOT EXISTS tb_galeri (
  id          INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  judul       VARCHAR(150)  NOT NULL,
  deskripsi   TEXT,
  gambar      VARCHAR(255)  NOT NULL,
  kategori    VARCHAR(50)   NOT NULL DEFAULT 'Umum',
  is_aktif    TINYINT(1)    NOT NULL DEFAULT 1,
  dibuat_oleh INT UNSIGNED  NOT NULL,
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (dibuat_oleh) REFERENCES tb_admin(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
--  16. LAPORAN REKAP (cache / snapshot harian)
-- ============================================================
CREATE TABLE IF NOT EXISTS tb_rekap_absensi (
  id                INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  kelas_id          INT UNSIGNED  NOT NULL,
  tahun_ajaran_id   INT UNSIGNED  NOT NULL,
  tanggal           DATE          NOT NULL,
  total_siswa       SMALLINT      NOT NULL DEFAULT 0,
  jumlah_hadir      SMALLINT      NOT NULL DEFAULT 0,
  jumlah_izin       SMALLINT      NOT NULL DEFAULT 0,
  jumlah_sakit      SMALLINT      NOT NULL DEFAULT 0,
  jumlah_alpha      SMALLINT      NOT NULL DEFAULT 0,
  persentase_hadir  DECIMAL(5,2)  NOT NULL DEFAULT 0.00,
  created_at        DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_rekap (kelas_id, tanggal),
  FOREIGN KEY (kelas_id)        REFERENCES tb_kelas(id)        ON DELETE CASCADE,
  FOREIGN KEY (tahun_ajaran_id) REFERENCES tb_tahun_ajaran(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
--  17. LOG AKTIVITAS ADMIN
-- ============================================================
CREATE TABLE IF NOT EXISTS tb_log_aktivitas (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  admin_id    INT UNSIGNED    NOT NULL,
  aksi        VARCHAR(100)    NOT NULL,
  tabel       VARCHAR(50)     NOT NULL DEFAULT '',
  data_id     INT UNSIGNED    NULL,
  detail      TEXT,
  ip_address  VARCHAR(45)     NOT NULL DEFAULT '',
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (admin_id) REFERENCES tb_admin(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
--  18. PENGATURAN APLIKASI (konten dikontrol admin)
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
