-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 10, 2026 at 09:59 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_absensi_digital`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_absensi`
--

CREATE TABLE `tb_absensi` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role` enum('siswa','guru','karyawan') NOT NULL,
  `tanggal` date NOT NULL,
  `jam_masuk` time DEFAULT NULL,
  `jam_keluar` time DEFAULT NULL,
  `status` enum('hadir','sakit','izin','alpa','terlambat') DEFAULT 'alpa',
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_absensi`
-- (Data removed - only structure preserved)
-- --------------------------------------------------------

--
-- Table structure for table `tb_admin`
--

CREATE TABLE `tb_admin` (
  `id` int(11) NOT NULL,
  `nuptk` varchar(30) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nama_lengkap` varchar(100) DEFAULT NULL,
  `foto_profil` varchar(255) DEFAULT NULL,
  `kode_qr` varchar(255) DEFAULT NULL,
  `id_kelas` int(11) DEFAULT NULL,
  `guru_mapel_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `account_locked_until` datetime DEFAULT NULL,
  `failed_login_count` int(11) DEFAULT 0,
  `last_login_at` datetime DEFAULT NULL,
  `last_login_ip` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_admin`
-- (Data removed - only structure preserved)
-- Triggers `tb_admin`
--
DELIMITER $$
CREATE TRIGGER `after_admin_delete` AFTER DELETE ON `tb_admin` FOR EACH ROW BEGIN
    DELETE FROM tb_komentar_elearning 
    WHERE user_id = OLD.id AND role = 'admin';
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tb_failed_login_attempts`
--

CREATE TABLE `tb_failed_login_attempts` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `attempt_time` datetime NOT NULL,
  `user_agent` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_guru`
--

CREATE TABLE `tb_guru` (
  `id` int(11) NOT NULL,
  `nuptk` varchar(20) DEFAULT NULL,
  `guru_mapel_id` int(11) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `nama_lengkap` varchar(100) NOT NULL,
  `kode_guru` varchar(10) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `kode_qr` varchar(100) DEFAULT NULL,
  `foto_profil` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_kelas_wali` int(11) DEFAULT NULL,
  `account_locked_until` datetime DEFAULT NULL,
  `failed_login_count` int(11) DEFAULT 0,
  `last_login_at` datetime DEFAULT NULL,
  `last_login_ip` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_guru`
-- (Data removed - only structure preserved)
-- Triggers `tb_guru`
--
DELIMITER $$
CREATE TRIGGER `after_guru_delete` AFTER DELETE ON `tb_guru` FOR EACH ROW BEGIN
    DELETE FROM tb_komentar_elearning 
    WHERE user_id = OLD.id AND role = 'guru';
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tb_jadwal_pelajaran`
--

CREATE TABLE `tb_jadwal_pelajaran` (
  `id` int(11) NOT NULL,
  `id_kelas` int(11) NOT NULL,
  `id_mapel` int(11) NOT NULL,
  `id_guru` int(11) NOT NULL,
  `hari` enum('Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu') NOT NULL,
  `id_jam` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_jadwal_pelajaran`
-- (Data removed - only structure preserved)
-- --------------------------------------------------------

--
-- Table structure for table `tb_jam_pelajaran`
--

CREATE TABLE `tb_jam_pelajaran` (
  `id` int(11) NOT NULL,
  `jam_ke` int(11) NOT NULL,
  `jam_mulai` time NOT NULL,
  `jam_selesai` time NOT NULL,
  `is_istirahat` tinyint(1) DEFAULT 0,
  `keterangan` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_jam_pelajaran`
-- (Data removed - only structure preserved)
-- --------------------------------------------------------

--
-- Table structure for table `tb_karyawan`
--

CREATE TABLE `tb_karyawan` (
  `id` int(11) NOT NULL,
  `nuptk` varchar(20) DEFAULT NULL,
  `nama_lengkap` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `jabatan` varchar(50) DEFAULT NULL,
  `kode_qr` varchar(100) DEFAULT NULL,
  `foto_profil` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_kelas`
--

CREATE TABLE `tb_kelas` (
  `id` int(11) NOT NULL,
  `nama_kelas` varchar(50) NOT NULL,
  `jumlah_siswa` int(11) DEFAULT 0,
  `token_kelas` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_guru_wali` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_kelas`
-- (Data removed - only structure preserved)
-- --------------------------------------------------------

--
-- Table structure for table `tb_komentar_elearning`
--

CREATE TABLE `tb_komentar_elearning` (
  `id` int(11) NOT NULL,
  `materi_id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `role` enum('siswa','guru','admin') NOT NULL,
  `komentar` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_log_wali`
--

CREATE TABLE `tb_log_wali` (
  `id` int(11) NOT NULL,
  `id_kelas` int(11) DEFAULT NULL,
  `id_guru` int(11) DEFAULT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_mata_pelajaran`
--

CREATE TABLE `tb_mata_pelajaran` (
  `id` int(11) NOT NULL,
  `nama_mapel` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_mata_pelajaran`
-- (Data removed - only structure preserved)
-- --------------------------------------------------------

--
-- Table structure for table `tb_materi`
--

CREATE TABLE `tb_materi` (
  `id` int(11) NOT NULL,
  `id_guru` int(11) NOT NULL,
  `id_mapel` int(11) DEFAULT NULL,
  `id_kelas` int(11) DEFAULT NULL,
  `judul` varchar(255) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `file_path` varchar(255) NOT NULL,
  `tipe_file` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_comment_enabled` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_materi`
-- (Data removed - only structure preserved)
-- --------------------------------------------------------

--
-- Table structure for table `tb_nilai`
--

CREATE TABLE `tb_nilai` (
  `id` int(11) NOT NULL,
  `id_siswa` int(11) NOT NULL,
  `id_guru` int(11) NOT NULL,
  `id_mapel` int(11) NOT NULL,
  `id_kelas` int(11) NOT NULL,
  `tipe_nilai` enum('TUGAS','UH','UTS','UAS') NOT NULL DEFAULT 'TUGAS',
  `nilai` decimal(5,2) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_notification_logs`
--

CREATE TABLE `tb_notification_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role` enum('siswa','guru','admin') NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `notification_type` enum('reminder','confirmation','warning','info') NOT NULL,
  `sent_at` datetime DEFAULT current_timestamp(),
  `status` enum('success','failed') DEFAULT 'success',
  `error_message` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_pengaturan_pembayaran`
--

CREATE TABLE `tb_pengaturan_pembayaran` (
  `id` int(11) NOT NULL,
  `provider` varchar(50) NOT NULL DEFAULT 'midtrans',
  `is_active` tinyint(1) DEFAULT 0,
  `is_production` tinyint(1) DEFAULT 0,
  `server_key` varchar(255) DEFAULT NULL,
  `client_key` varchar(255) DEFAULT NULL,
  `merchant_id` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_pengaturan_pembayaran`
-- (Data removed - only structure preserved)
-- --------------------------------------------------------

--
-- Table structure for table `tb_pengumuman`
--

CREATE TABLE `tb_pengumuman` (
  `id` int(11) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `isi` text NOT NULL,
  `target_role` enum('semua','guru','siswa') NOT NULL DEFAULT 'semua',
  `tanggal_publish` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_pengumuman`
-- (Data removed - only structure preserved)
-- --------------------------------------------------------

--
-- Table structure for table `tb_push_tokens`
--

CREATE TABLE `tb_push_tokens` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role` enum('siswa','guru','admin') NOT NULL,
  `push_token` varchar(255) NOT NULL,
  `device_name` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_refresh_tokens`
--

CREATE TABLE `tb_refresh_tokens` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_role` enum('admin','siswa','guru') NOT NULL,
  `token_hash` varchar(255) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `revoked` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_riwayat_saldo`
--

CREATE TABLE `tb_riwayat_saldo` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `tipe` enum('masuk','keluar') NOT NULL,
  `jumlah` decimal(15,2) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_riwayat_saldo`
-- (Data removed - only structure preserved)
-- --------------------------------------------------------

--
-- Table structure for table `tb_saldo`
--

CREATE TABLE `tb_saldo` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role` enum('siswa','guru') DEFAULT 'siswa',
  `saldo_saat_ini` decimal(15,2) DEFAULT 0.00,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_saldo`
-- (Data removed - only structure preserved)
-- --------------------------------------------------------

--
-- Table structure for table `tb_security_logs`
--

CREATE TABLE `tb_security_logs` (
  `id` int(11) NOT NULL,
  `event_type` varchar(50) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `details` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_security_logs`
-- (Data removed - only structure preserved)
-- --------------------------------------------------------

--
-- Table structure for table `tb_siswa`
--

CREATE TABLE `tb_siswa` (
  `id` int(11) NOT NULL,
  `nis` varchar(20) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `nama_lengkap` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_kelas` int(11) DEFAULT NULL,
  `kode_qr` varchar(100) DEFAULT NULL,
  `foto_profil` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `account_locked_until` datetime DEFAULT NULL,
  `failed_login_count` int(11) DEFAULT 0,
  `last_login_at` datetime DEFAULT NULL,
  `last_login_ip` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_siswa`
-- (Data removed - only structure preserved)
-- Triggers `tb_siswa`
--
DELIMITER $$
CREATE TRIGGER `after_siswa_delete` AFTER DELETE ON `tb_siswa` FOR EACH ROW BEGIN
    DELETE FROM tb_komentar_elearning 
    WHERE user_id = OLD.id AND role = 'siswa';
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tb_spp_setting`
--

CREATE TABLE `tb_spp_setting` (
  `id` int(11) NOT NULL,
  `id_kelas` int(11) DEFAULT NULL,
  `tahun_ajaran` varchar(20) NOT NULL,
  `nominal` decimal(15,2) NOT NULL,
  `keterangan` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_tagihan_spp`
--

CREATE TABLE `tb_tagihan_spp` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `bulan` int(2) NOT NULL,
  `tahun` int(4) NOT NULL,
  `nominal_tagihan` decimal(15,2) NOT NULL,
  `status_bayar` enum('belum','lunas') DEFAULT 'belum',
  `tanggal_bayar` datetime DEFAULT NULL,
  `id_transaksi_midtrans` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_tagihan_spp`
-- (Data removed - only structure preserved)
-- --------------------------------------------------------

--
-- Table structure for table `tb_transaksi_midtrans`
--

CREATE TABLE `tb_transaksi_midtrans` (
  `order_id` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role` enum('siswa','guru') DEFAULT 'siswa',
  `gross_amount` decimal(15,2) NOT NULL,
  `tipe_transaksi` enum('spp','topup','kantin') NOT NULL,
  `target_id` int(11) DEFAULT NULL,
  `payment_type` varchar(50) DEFAULT NULL,
  `transaction_status` varchar(20) DEFAULT 'pending',
  `snap_token` varchar(255) DEFAULT NULL,
  `pdf_url` varchar(255) DEFAULT NULL,
  `transaction_time` datetime DEFAULT NULL,
  `settlement_time` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_transaksi_midtrans`
-- (Data removed - only structure preserved)