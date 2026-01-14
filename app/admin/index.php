<?php
session_start();
require_once 'config/constants.php';

// Check if logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.php');
    exit;
}

include 'includes/header.php';
include 'includes/sidebar.php';
?>

<div class="card">
    <h1>Dashboard</h1>
    <p>Selamat datang di Panel Admin Absensi Digital.</p>
</div>

<?php include 'includes/footer.php'; ?>
