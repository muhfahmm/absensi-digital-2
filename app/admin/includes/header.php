<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Security: Block access if not logged in as Admin
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    // Redirect to login page
    // Using BASE_URL defined in constants.php
    if (defined('BASE_URL')) {
        header("Location: " . BASE_URL . "admin/login.php");
    } else {
        // Emergency Fallback
        header("Location: /absensi%20digital%202/app/admin/login.php");
    }
    exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= APP_NAME ?> - Admin</title>
    <!-- Basic Reset & Styles (Use Vanilla CSS) -->
    <link rel="stylesheet" href="<?= BASE_URL ?>admin/assets/css/style.css">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <script src="<?= BASE_URL ?>admin/assets/js/script.js" defer></script>
</head>
<body>
    <div class="app-container">

