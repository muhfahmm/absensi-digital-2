<?php
session_start();
require_once 'config/database.php';
require_once 'config/constants.php';

if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header('Location: index.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // ... (Login Logic same as before)
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    if (empty($username) || empty($password)) {
        $error = "Username dan Password wajib! 😡";
    } else {
        try {
            $stmt = $pdo->prepare("SELECT * FROM tb_admin WHERE username = :username");
            $stmt->execute(['username' => $username]);
            $admin = $stmt->fetch();

            if ($admin && password_verify($password, $admin['password'])) {
                $_SESSION['admin_logged_in'] = true;
                $_SESSION['admin_id'] = $admin['id'];
                $_SESSION['admin_name'] = $admin['nama_lengkap'];
                header('Location: index.php');
                exit;
            } else {
                $error = "Akun tidak ditemukan atau Password salah.";
            }
        } catch (PDOException $e) {
            $error = "DB Error.";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - <?= APP_NAME ?></title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
        body {
            margin: 0; padding: 0; font-family: 'Inter', sans-serif;
            background: radial-gradient(circle at 10% 20%, rgb(90, 92, 106) 0%, rgb(32, 45, 58) 81.3%);
            height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden;
        }
        /* Glassmorphism Card */
        .login-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 50px 40px;
            border-radius: 20px;
            width: 100%; max-width: 380px;
            text-align: center;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            color: white;
        }
        .login-card h2 { margin-bottom: 10px; font-weight: 800; font-size: 2rem; letter-spacing: -1px; }
        .subtitle { font-size: 0.9rem; margin-bottom: 30px; opacity: 0.8; }
        
        .form-group { margin-bottom: 20px; text-align: left; }
        .form-group label { display: block; margin-bottom: 8px; font-size: 0.85rem; font-weight: 600; opacity: 0.9; }
        .form-group input {
            width: 100%; padding: 14px; border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            background: rgba(255, 255, 255, 0.05);
            color: white; font-size: 1rem; box-sizing: border-box;
            transition: all 0.3s;
        }
        .form-group input:focus {
            outline: none; border-color: #818CF8; background: rgba(255, 255, 255, 0.15);
        }
        .btn-login {
            background: #6366F1; color: white; padding: 14px; border-radius: 12px;
            border: none; width: 100%; font-size: 1rem; font-weight: 700; cursor: pointer;
            transition: all 0.3s; margin-top: 10px;
            box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.4);
        }
        .btn-login:hover { background: #4F46E5; transform: translateY(-2px); }
        .error-msg { background: rgba(239, 68, 68, 0.2); border: 1px solid rgba(239, 68, 68, 0.5); padding: 12px; border-radius: 10px; margin-bottom: 20px; font-size: 0.9rem; }
        .footer-link { margin-top: 25px; font-size: 0.9rem; opacity: 0.8; }
        .footer-link a { color: #A5B4FC; text-decoration: none; font-weight: 600; }
        .footer-link a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="login-card">
        <h2>Admin Panel</h2>
        <div class="subtitle">Absensi Digital V2</div>
        
        <?php if ($error): ?>
            <div class="error-msg"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>

        <form method="POST">
            <div class="form-group">
                <label>Username</label>
                <input type="text" name="username" placeholder="Masukkan username" required>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" placeholder="••••••••" required>
            </div>
            <button type="submit" class="btn-login">Masuk Dashboard</button>
        </form>

        <div class="footer-link">
            Belum punya akun? <a href="register.php">Daftar Admin</a>
        </div>
    </div>
</body>
</html>
