<?php
session_start();
require_once '../../config/database.php';
require_once '../../config/constants.php';

if (!isset($_SESSION['logged_in']) || $_SESSION['role'] !== 'admin') { header("Location: " . BASE_URL . "auth/login.php"); exit; }

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nama_kelas = trim($_POST['nama_kelas']);

    if (empty($nama_kelas)) {
        $error = "Nama Kelas wajib diisi.";
    } else {
        try {
            // Cek exist
            $stmt = $pdo->prepare("SELECT id FROM tb_kelas WHERE nama_kelas = ?");
            $stmt->execute([$nama_kelas]);
            if ($stmt->rowCount() > 0) {
                $error = "Kelas $nama_kelas sudah ada!";
            } else {
                // Generate Token Kelas Unik
                $token = "CLS." . strtoupper(bin2hex(random_bytes(3))) . "." . date('Y');
                
                $sql = "INSERT INTO tb_kelas (nama_kelas, jumlah_siswa, token_kelas) VALUES (?, 0, ?)";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([$nama_kelas, $token]);
                
                $success = "Kelas berhasil ditambahkan!";
                header("refresh:1;url=data_kelas.php");
            }
        } catch (PDOException $e) {
            $error = "DB Error: " . $e->getMessage();
        }
    }
}

include '../../includes/header.php';
include '../../includes/sidebar.php';
?>

<div class="card glass-panel" style="max-width: 600px; margin: 0 auto;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h2>Tambah Kelas Baru</h2>
        <a href="data_kelas.php" style="color: var(--text-muted); text-decoration: none;">&larr; Kembali</a>
    </div>

    <?php if($error): ?><div style="background: #fee2e2; color: #b91c1c; padding: 15px; border-radius: 8px; margin-bottom: 20px;"><?= $error ?></div><?php endif; ?>
    <?php if($success): ?><div style="background: #d1fae5; color: #065f46; padding: 15px; border-radius: 8px; margin-bottom: 20px;"><?= $success ?></div><?php endif; ?>

    <form method="POST">
        <div class="form-group">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Nama Kelas</label>
            <input type="text" name="nama_kelas" required placeholder="Contoh: XII RPL 1" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-glass); background: var(--bg-glass); color: var(--text-main); font-size: 1.1rem;">
            <small style="color: var(--text-muted);">Token kelas akan digenerate otomatis.</small>
        </div>

        <div style="margin-top: 30px; text-align: right;">
            <button type="submit" class="btn-primary" style="width: 100%;">Simpan Kelas</button>
        </div>
    </form>
</div>

<?php include '../../includes/footer.php'; ?>
