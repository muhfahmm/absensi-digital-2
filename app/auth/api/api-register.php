<?php
// app/auth/api/api-register.php
session_start();
require_once '../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nama = trim($_POST['nama_lengkap']);
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    // Validasi sederhana
    if (empty($nama) || empty($username) || empty($password)) {
        $_SESSION['error'] = "Semua field harus diisi!";
        header("Location: ../register.php");
        exit;
    }

    try {
        // Cek username
        $stmt = $pdo->prepare("SELECT id FROM tb_admin WHERE username = ?");
        $stmt->execute([$username]);
        if ($stmt->rowCount() > 0) {
            $_SESSION['error'] = "Username sudah terdaftar!";
            header("Location: ../register.php");
            exit;
        }

        // Insert
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $sql = "INSERT INTO tb_admin (nama_lengkap, username, password) VALUES (?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$nama, $username, $hash]);

        $_SESSION['success'] = "Registrasi berhasil! Silakan login.";
        header("Location: ../login.php");
        exit;

    } catch (PDOException $e) {
        $_SESSION['error'] = "Terjadi kesalahan sistem.";
        header("Location: ../register.php");
        exit;
    }
}
?>
