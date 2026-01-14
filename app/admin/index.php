<?php
session_start();
require_once 'config/database.php';
require_once 'config/constants.php';

// Check if logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.php');
    exit;
}

include 'includes/header.php';
include 'includes/sidebar.php';

// Dummy Stats
$siswaCount = $pdo->query("SELECT COUNT(*) FROM tb_siswa")->fetchColumn();
$guruCount = $pdo->query("SELECT COUNT(*) FROM tb_guru")->fetchColumn();
$today = date('Y-m-d');
// $absenToday = ...
?>

<div class="stats-grid">
    <div class="stat-card">
        <div class="stat-title">Total Siswa</div>
        <div class="stat-value"><?= $siswaCount ?></div>
    </div>
    <div class="stat-card">
        <div class="stat-title">Total Guru</div>
        <div class="stat-value"><?= $guruCount ?></div>
    </div>
    <div class="stat-card">
        <div class="stat-title">Hadir Hari Ini</div>
        <div class="stat-value">0</div>
        <small style="color: green;">+0% dari kemarin</small>
    </div>
    <div class="stat-card">
        <div class="stat-title">Izin / Sakit</div>
        <div class="stat-value">0</div>
    </div>
</div>

<div class="card">
    <h2 style="margin-bottom: 20px;">Selamat Datang di Panel Admin</h2>
    <p style="color: var(--text-muted); line-height: 1.6;">
        Sistem Absensi Digital V2. Gunakan menu di sebelah kiri untuk mengelola data master Siswa, Guru, Karyawan, dan Kelas.
        Anda juga dapat memantau kehadiran secara real-time melalui halaman Rekap Absensi.
    </p>
    <div style="margin-top: 20px;">
        <a href="modules/siswa/data_siswa.php" class="btn-primary">Kelola Siswa &rarr;</a>
    </div>
</div>

<?php include 'includes/footer.php'; ?>
