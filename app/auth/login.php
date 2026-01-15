<?php
session_start();
// Check if already logged in
if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
    // Role Check
    if (isset($_SESSION['role']) && $_SESSION['role'] === 'admin') {
        header('Location: ../admin/index.php');
    } else {
        // Mobile users (Siswa/Guru)
        // header('Location: ../mobile-info.php'); 
        echo "Silakan akses via Aplikasi Mobile.";
    }
    exit;
}

$error = isset($_SESSION['error']) ? $_SESSION['error'] : '';
unset($_SESSION['error']);
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Absensi Digital V2</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        :root {
            --primary: #4F46E5;
            --primary-hover: #4338CA;
        }

        body {
            margin: 0; padding: 0; font-family: 'Inter', sans-serif;
            background: radial-gradient(circle at 10% 20%, rgb(90, 92, 106) 0%, rgb(32, 45, 58) 81.3%);
            height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden;
            color: #fff;
        }

        .login-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 48px;
            border-radius: 24px;
            width: 100%; max-width: 400px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            text-align: center;
        }

        h2 { font-weight: 800; font-size: 2rem; margin: 0 0 8px 0; letter-spacing: -0.5px; }
        p.subtitle { margin: 0 0 32px 0; color: rgba(255, 255, 255, 0.6); font-size: 0.95rem; }

        .form-group { margin-bottom: 20px; text-align: left; }
        .form-group label { display: block; margin-bottom: 8px; font-size: 0.9rem; font-weight: 500; color: rgba(255, 255, 255, 0.9); }
        .form-group input {
            width: 100%; padding: 14px; border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.15);
            background: rgba(255, 255, 255, 0.05);
            color: white; font-size: 1rem; box-sizing: border-box;
            transition: all 0.2s;
        }
        .form-group input:focus {
            outline: none; border-color: var(--primary);
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-1px);
        }
        .form-group input::placeholder { color: rgba(255, 255, 255, 0.3); }

        .btn-login {
            background: var(--primary); color: white; padding: 16px; border-radius: 12px;
            border: none; width: 100%; font-size: 1rem; font-weight: 600; cursor: pointer;
            transition: all 0.2s; margin-top: 12px;
            box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
        }
        .btn-login:hover { background: var(--primary-hover); transform: translateY(-2px); box-shadow: 0 6px 16px rgba(79, 70, 229, 0.5); }
        .btn-login:active { transform: translateY(0); }

        .alert-error {
            background: rgba(220, 38, 38, 0.2); color: #FECACA;
            border: 1px solid rgba(220, 38, 38, 0.4);
            padding: 12px; border-radius: 12px; margin-bottom: 24px; font-size: 0.9rem;
            display: flex; align-items: center; justify-content: center; gap: 8px;
        }

        .footer-link { margin-top: 32px; color: rgba(255, 255, 255, 0.5); font-size: 0.9rem; }
        .footer-link a { color: #A5B4FC; text-decoration: none; font-weight: 500; margin-left: 4px; }
        .footer-link a:hover { color: #C7D2FE; text-decoration: underline; }
    </style>
</head>
<body>

<div class="login-card">
    <h2>Selamat Datang</h2>
    <p class="subtitle">Silakan login ke akun Anda</p>

    <?php if ($error): ?>
        <div class="alert-error">
            <span>⚠️</span> <?= htmlspecialchars($error) ?>
        </div>
    <?php endif; ?>

    <form action="api/api-login.php" method="POST">
        <div class="form-group">
            <label>Username / NIS / NIP</label>
            <input type="text" name="username" placeholder="Masukkan ID Pengguna" required>
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="••••••••" required>
        </div>
        <button type="submit" class="btn-login">Masuk</button>
    </form>

    <div class="footer-link">
        Belum punya akun? <a href="register.php">Daftar Admin</a>
    </div>
</div>

</body>
</html>
