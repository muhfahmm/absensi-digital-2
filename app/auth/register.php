<?php
session_start();
// Optional: Prevent if logged in
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register Admin - Absensi Digital V2</title>
    <style>
        /* Reuse same Glassmorphism styles for consistency */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        :root { --primary: #4F46E5; --primary-hover: #4338CA; }
        body {
            margin: 0; padding: 0; font-family: 'Inter', sans-serif;
            background: radial-gradient(circle at 10% 20%, rgb(90, 92, 106) 0%, rgb(32, 45, 58) 81.3%);
            height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden;
            color: #fff;
        }
        .login-card {
            background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.2); padding: 48px; border-radius: 24px;
            width: 100%; max-width: 400px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); text-align: center;
        }
        h2 { font-weight: 800; font-size: 1.8rem; margin: 0 0 8px 0; }
        p.subtitle { margin: 0 0 24px 0; color: rgba(255, 255, 255, 0.6); }
        .form-group { margin-bottom: 20px; text-align: left; }
        .form-group label { display: block; margin-bottom: 8px; font-size: 0.9rem; font-weight: 500; color: rgba(255, 255, 255, 0.9); }
        .form-group input {
            width: 100%; padding: 12px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.15);
            background: rgba(255, 255, 255, 0.05); color: white; font-size: 1rem; box-sizing: border-box;
        }
        .form-group input:focus { outline: none; border-color: var(--primary); background: rgba(255, 255, 255, 0.1); }
        .btn-login {
            background: var(--primary); color: white; padding: 16px; border-radius: 12px; border: none; width: 100%;
            font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.2s; margin-top: 12px;
        }
        .btn-login:hover { background: var(--primary-hover); }
        .footer-link { margin-top: 32px; color: rgba(255, 255, 255, 0.5); font-size: 0.9rem; }
        .footer-link a { color: #A5B4FC; text-decoration: none; font-weight: 500; }
        .msg { padding: 10px; border-radius: 10px; margin-bottom: 20px; font-size: 0.9rem; }
        .error { background: rgba(220,38,38,0.3); color: #fecaca; }
        .success { background: rgba(22,163,74,0.3); color: #bbf7d0; }
    </style>
</head>
<body>

<div class="login-card">
    <h2>Registrasi Admin</h2>
    <p class="subtitle">Buat akun untuk mengelola sistem</p>

    <?php
    if (isset($_SESSION['error'])) {
        echo '<div class="msg error">'.$_SESSION['error'].'</div>';
        unset($_SESSION['error']);
    }
    ?>

    <form action="api/api-register.php" method="POST">
        <div class="form-group">
            <label>Nama Lengkap</label>
            <input type="text" name="nama_lengkap" required placeholder="Nama Lengkap">
        </div>
        <div class="form-group">
            <label>Username</label>
            <input type="text" name="username" required placeholder="Username untuk Login">
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" required placeholder="Password Admin">
        </div>
        <button type="submit" class="btn-login">Daftar</button>
    </form>

    <div class="footer-link">
        Sudah punya akun? <a href="login.php">Login disini</a>
    </div>
</div>

</body>
</html>
