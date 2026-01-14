-- Database Schema for Absensi Digital V2
-- Created by Antigravity
-- Database Name: db_absensi2

CREATE DATABASE IF NOT EXISTS db_absensi2;
USE db_absensi2;

-- ==========================================
-- 1. Tabel Admin
-- Untuk login halaman admin panel
-- ==========================================
CREATE TABLE IF NOT EXISTS tb_admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nama_lengkap VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- 2. Tabel Kelas
-- Menyimpan data kelas
-- ==========================================
CREATE TABLE IF NOT EXISTS tb_kelas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama_kelas VARCHAR(50) NOT NULL,
    jumlah_siswa INT DEFAULT 0, -- Field untuk memanajemen jumlah siswa
    token_kelas VARCHAR(100) UNIQUE, -- Text yang akan digenerate menjadi QR Code untuk Absensi Kelas (jika sistem scan kelas)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- 3. Tabel Siswa
-- Data siswa dengan relasi ke kelas
-- ==========================================
CREATE TABLE IF NOT EXISTS tb_siswa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nis VARCHAR(20) UNIQUE NOT NULL,
    nama_lengkap VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL, 
    id_kelas INT,
    kode_qr VARCHAR(100) UNIQUE, -- Token unik individu untuk QR Code (Kartu Pelajar)
    foto_profil VARCHAR(255),
    jenis_kelamin ENUM('L', 'P'),
    alamat TEXT,
    no_hp VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_kelas) REFERENCES tb_kelas(id) ON DELETE SET NULL
);

-- ==========================================
-- 4. Tabel Guru
-- Data guru
-- ==========================================
CREATE TABLE IF NOT EXISTS tb_guru (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nip VARCHAR(20) UNIQUE,
    nama_lengkap VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    kode_qr VARCHAR(100) UNIQUE,
    foto_profil VARCHAR(255),
    jenis_kelamin ENUM('L', 'P'),
    alamat TEXT,
    no_hp VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- 5. Tabel Karyawan
-- Data karyawan (Staff TU, Kebersihan, dll)
-- ==========================================
CREATE TABLE IF NOT EXISTS tb_karyawan (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nip VARCHAR(20) UNIQUE, 
    nama_lengkap VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    jabatan VARCHAR(50),
    kode_qr VARCHAR(100) UNIQUE,
    foto_profil VARCHAR(255),
    jenis_kelamin ENUM('L', 'P'),
    alamat TEXT,
    no_hp VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- 6. Tabel Absensi
-- Mencatat seluruh riwayat absensi
-- ==========================================
CREATE TABLE IF NOT EXISTS tb_absensi (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL, -- ID dari tabel siswa/guru/karyawan
    role ENUM('siswa', 'guru', 'karyawan') NOT NULL, 
    tanggal DATE NOT NULL,
    jam_masuk TIME,
    jam_keluar TIME,
    -- Lokasi atau koordinat saat absen (opsional, jika pakai GPS)
    latitude_masuk VARCHAR(50),
    longitude_masuk VARCHAR(50),
    latitude_keluar VARCHAR(50),
    longitude_keluar VARCHAR(50), 
    status ENUM('hadir', 'sakit', 'izin', 'alpa', 'terlambat') DEFAULT 'alpa',
    keterangan TEXT, -- Catatan tambahan (misal: terlambat karena ban bocor)
    bukti_foto_masuk VARCHAR(255), -- Foto selfie saat absen (opsional)
    bukti_foto_keluar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX (user_id, role, tanggal)
);

-- ==========================================
-- 7. Tabel Pengajuan Izin (New)
-- Untuk menampung request izin/sakit dari Mobile App
-- ==========================================
CREATE TABLE IF NOT EXISTS tb_pengajuan_izin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    role ENUM('siswa', 'guru', 'karyawan') NOT NULL,
    jenis_izin ENUM('sakit', 'izin', 'cuti') NOT NULL,
    tanggal_mulai DATE NOT NULL,
    tanggal_selesai DATE NOT NULL,
    alasan TEXT NOT NULL,
    bukti_lampiran VARCHAR(255), -- Foto surat dokter dll
    status_persetujuan ENUM('pending', 'disetujui', 'ditolak') DEFAULT 'pending',
    keterangan_admin TEXT, -- Alasan jika ditolak
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- 8. Tabel Pengumuman (New)
-- Untuk broadcast info ke aplikasi user
-- ==========================================
CREATE TABLE IF NOT EXISTS tb_pengumuman (
    id INT PRIMARY KEY AUTO_INCREMENT,
    judul VARCHAR(255) NOT NULL,
    konten TEXT NOT NULL,
    target_role ENUM('all', 'siswa', 'guru', 'karyawan') DEFAULT 'all',
    path_gambar VARCHAR(255),
    created_by INT, -- ID Admin
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 9. Tabel Settings / Konfigurasi (New)
-- Pengaturan global aplikasi
-- ==========================================
CREATE TABLE IF NOT EXISTS tb_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(50) UNIQUE NOT NULL,
    setting_value TEXT,
    description VARCHAR(255)
);

-- Insert Default Settings
INSERT INTO tb_settings (setting_key, setting_value, description) VALUES 
('jam_masuk_siswa', '07:00:00', 'Batas jam masuk siswa'),
('jam_pulang_siswa', '14:00:00', 'Jam mulai boleh pulang siswa'),
('jam_masuk_guru', '07:00:00', 'Batas jam masuk guru'),
('jam_pulang_guru', '15:00:00', 'Jam mulai boleh pulang guru'),
('radius_absensi_meter', '100', 'Jarak maksimal radius absensi (jika pakai GPS)');

-- Insert Default Admin
-- Password default: admin123 -> $2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
INSERT INTO tb_admin (username, password, nama_lengkap) VALUES 
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Super Administrator');

-- Add Dummy Data for Testing (Optional)
INSERT INTO tb_kelas (nama_kelas, jumlah_siswa, token_kelas) VALUES 
('X RPL 1', 30, 'TOKEN-XRPL1'),
('XI TKJ 2', 32, 'TOKEN-XITKJ2');
