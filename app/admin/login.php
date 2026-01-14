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
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    if (empty($username) || empty($password)) {
        $error = "Username dan Password wajib diisi!";
    } else {
        try {
            $stmt = $pdo->prepare("SELECT * FROM tb_admin WHERE username = :username");
            $stmt->execute(['username' => $username]);
            $admin = $stmt->fetch();

            // Verify Password (In production use password_verify)
            // For now, based on dummy data: 'admin123' -> hash
            if ($admin && password_verify($password, $admin['password'])) {
                $_SESSION['admin_logged_in'] = true;
                $_SESSION['admin_id'] = $admin['id'];
                $_SESSION['admin_name'] = $admin['nama_lengkap'];
                header('Location: index.php');
                exit;
            } else {
                $error = "Username atau Password salah!";
            }
        } catch (PDOException $e) {
            $error = "Database Error: " . $e->getMessage();
        }
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Admin - <?= APP_NAME ?></title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .login-card {
            background: rgba(255, 255, 255, 0.9);
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            width: 100%;
            max-width: 400px;
            text-align: center;
        }
        .login-card h2 {
            margin-bottom: 20px;
            color: #1F2937;
        }
        .form-group {
            margin-bottom: 20px;
            text-align: left;
        }
        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #4B5563;
            font-size: 0.9rem;
        }
        .form-group input {
            width: 100%;
            padding: 12px;
            border: 1px solid #D1D5DB;
            border-radius: 8px;
            font-size: 1rem;
            box-sizing: border-box; /* Fix padding issue */
        }
        .form-group input:focus {
            outline: none;
            border-color: #4F46E5;
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
        }
        .btn-login {
            background: #4F46E5;
            color: white;
            padding: 12px;
            border-radius: 8px;
            border: none;
            width: 100%;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
        }
        .btn-login:hover {
            background: #4338CA;
        }
        .error-msg {
            background: #FEE2E2;
            color: #B91C1C;
            padding: 10px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 0.9rem;
        }
        .footer-link {
            margin-top: 20px;
            font-size: 0.85rem;
            color: #6B7280;
        }
    </style>
</head>
<body>

<div class="login-card">
    <h2>Admin Login</h2>
    <?php if ($error): ?>
        <div class="error-msg"><?= htmlspecialchars($error) ?></div>
    <?php endif; ?>
    
    <form method="POST">
        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" required placeholder="admin" autocomplete="username">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required placeholder="••••••••" autocomplete="current-password">
        </div>
        <button type="submit" class="btn-login">Masuk</button>
    </form>
    
    <div class="footer-link">
        Absensi Digital V2 &copy; 2026
    </div>
</div>

</body>
</html>
