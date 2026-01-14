<?php
session_start();
require_once 'config/database.php';
require_once 'config/constants.php';

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // ... (Register Logic)
    $nama_lengkap = trim($_POST['nama_lengkap']);
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);
    $confirm_password = trim($_POST['confirm_password']);

    if ($password !== $confirm_password) {
        $error = "Password tidak sama.";
    } else {
        // ... (Insert logic)
        try {
             $hashed = password_hash($password, PASSWORD_DEFAULT);
             $stmt = $pdo->prepare("INSERT INTO tb_admin (username, password, nama_lengkap) VALUES (?, ?, ?)");
             if ($stmt->execute([$username, $hashed, $nama_lengkap])) {
                 $success = "Registrasi Berhasil!";
                 header("refresh:2;url=login.php");
             }
        } catch (Exception $e) { $error = "Username sudah ada."; }
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - <?= APP_NAME ?></title>
    <style>
        /* Reuse Glassmorphism Styles from Login */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
        body {
            margin: 0; padding: 0; font-family: 'Inter', sans-serif;
            background: radial-gradient(circle at 10% 20%, rgb(90, 92, 106) 0%, rgb(32, 45, 58) 81.3%);
            min-height: 100vh; display: flex; align-items: center; justify-content: center;
        }
        .login-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 40px; border-radius: 20px;
            width: 100%; max-width: 400px; text-align: center; color: white;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        h2 { margin-top:0; font-weight:800; }
        .form-group { margin-bottom: 15px; text-align: left; }
        .form-group label { display: block; margin-bottom: 8px; font-size: 0.85rem; font-weight: 600; opacity: 0.9; }
        input {
            width: 100%; padding: 12px; border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.3); background: rgba(255, 255, 255, 0.05);
            color: white; font-size: 1rem; box-sizing: border-box;
        }
        input:focus { outline: none; border-color: #818CF8; background: rgba(255, 255, 255, 0.15); }
        .btn-login {
            background: #6366F1; color: white; padding: 14px; border-radius: 12px;
            border: none; width: 100%; font-size: 1rem; font-weight: 700; cursor: pointer;
            margin-top: 10px;
        }
        .btn-login:hover { background: #4F46E5; }
        .msg { padding: 10px; border-radius: 8px; margin-bottom: 20px; }
        .err { background: rgba(239, 68, 68, 0.2); }
        .suc { background: rgba(16, 185, 129, 0.2); }
    </style>
</head>
<body>
    <div class="login-card">
        <h2>Daftar Admin Baru</h2>
        
        <?php if ($error): ?><div class="msg err"><?= $error ?></div><?php endif; ?>
        <?php if ($success): ?><div class="msg suc"><?= $success ?></div><?php endif; ?>

        <form method="POST">
            <div class="form-group">
                <label>Nama Lengkap</label>
                <input type="text" name="nama_lengkap" required>
            </div>
            <div class="form-group">
                <label>Username</label>
                <input type="text" name="username" required>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" required>
            </div>
            <div class="form-group">
                <label>Konfirmasi Password</label>
                <input type="password" name="confirm_password" required>
            </div>
            <button type="submit" class="btn-login">Register</button>
        </form>
        <div style="margin-top:20px; opacity:0.8;">
            <a href="login.php" style="color: #A5B4FC; text-decoration: none;">Kembali ke Login</a>
        </div>
    </div>
</body>
</html>
