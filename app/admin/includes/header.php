<?php
if (session_status() === PHP_SESSION_NONE) { session_start(); }

// Security: Block access if not logged in
// We check for 'logged_in' (set by api-login) AND 'role' == 'admin'
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true || (isset($_SESSION['role']) && $_SESSION['role'] !== 'admin')) {
    // Determine Redirect URL
    $redirectUrl = (defined('BASE_URL') ? BASE_URL : '/absensi%20digital%202/app/') . 'auth/login.php';
    header("Location: " . $redirectUrl);
    exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= defined('APP_NAME') ? APP_NAME : 'Admin Panel' ?></title>
    <!-- CSS -->
    <link rel="stylesheet" href="<?= defined('BASE_URL') ? BASE_URL : '../' ?>admin/assets/css/style.css">
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <!-- JS -->
    <script src="<?= defined('BASE_URL') ? BASE_URL : '../' ?>admin/assets/js/script.js" defer></script>
</head>
<body>
    <div class="app-container">
