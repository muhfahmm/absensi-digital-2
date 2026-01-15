<?php
// app/admin/index.php
session_start();
require_once 'config/database.php';
require_once 'config/constants.php';

// Include Header (Checks session)
include 'includes/header.php';
include 'includes/sidebar.php';

// Stats
$siswaCount = $pdo->query("SELECT COUNT(*) FROM tb_siswa")->fetchColumn();
$guruCount = $pdo->query("SELECT COUNT(*) FROM tb_guru")->fetchColumn();
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
</div>

<div class="card glass-panel">
    <h2>Selamat Datang, <?= htmlspecialchars($_SESSION['nama'] ?? 'Admin') ?> 👋</h2>
    <p style="color: var(--text-muted); margin-top: 10px;">
        Ini adalah panel administrator Absensi Digital V2. <br>
        Gunakan menu sidebar untuk mengelola data.
    </p>
</div>

<?php include 'includes/footer.php'; ?>
