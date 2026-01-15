<?php
// app/api/api-login.php
session_start();
require_once '../../config/database.php';
require_once '../../functions/helpers.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = trim($_POST['username']); // Bisa username (admin), NIS (siswa), NIP (guru)
    $password = $_POST['password'];

    // Modifikasi: Karena toggle role dihapus, kita cek satu per satu urut dari Admin -> Siswa -> Guru
    
    try {
        // 1. Cek Login Admin
        $stmt = $pdo->prepare("SELECT * FROM tb_admin WHERE username = :user");
        $stmt->execute([':user' => $username]);
        $admin = $stmt->fetch();

        if ($admin && password_verify($password, $admin['password'])) {
            $_SESSION['user_id'] = $admin['id'];
            $_SESSION['role'] = 'admin';
            $_SESSION['nama'] = $admin['nama_lengkap'];
            $_SESSION['logged_in'] = true;
            redirect('app/admin/index.php');
        }

        // 2. Cek Login Siswa
        $stmt = $pdo->prepare("SELECT * FROM tb_siswa WHERE nis = :user");
        $stmt->execute([':user' => $username]);
        $siswa = $stmt->fetch();

        if ($siswa && password_verify($password, $siswa['password'])) {
            // ... (Session set)
             $_SESSION['user_id'] = $siswa['id'];
            $_SESSION['role'] = 'siswa';
            $_SESSION['nama'] = $siswa['nama_lengkap'];
            $_SESSION['logged_in'] = true;
            // Mobile app handles this mostly, but if web access allowed in future:
            // redirect('app/pages/siswa/dashboard.php'); 
            // For now, redirect to mobile info or generic dashboard
            echo "Login Siswa Berhasil. Silakan gunakan Aplikasi Mobile."; exit;
        }

         // 3. Cek Login Guru
        $stmt = $pdo->prepare("SELECT * FROM tb_guru WHERE nip = :user");
        $stmt->execute([':user' => $username]);
        $guru = $stmt->fetch();

        if ($guru && password_verify($password, $guru['password'])) {
             $_SESSION['user_id'] = $guru['id'];
            $_SESSION['role'] = 'guru';
            $_SESSION['nama'] = $guru['nama_lengkap'];
            $_SESSION['logged_in'] = true;
            echo "Login Guru Berhasil. Silakan gunakan Aplikasi Mobile."; exit;
        }

        // Jika gagal
        $_SESSION['error'] = "Username/ID atau Password salah!";
        redirect('app/auth/login.php');

    } catch (PDOException $e) {
        $_SESSION['error'] = "Database Error: " . $e->getMessage();
        redirect('app/auth/login.php');
    }
} else {
    redirect('app/auth/login.php');
}
