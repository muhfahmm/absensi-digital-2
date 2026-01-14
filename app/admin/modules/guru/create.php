<?php
session_start();
require_once '../../config/database.php';
require_once '../../config/constants.php';

// Cek Login Admin
if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: ../../login.php');
    exit;
}

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nip = trim($_POST['nip']);
    $nama = trim($_POST['nama_lengkap']);
    $password = $_POST['password'];
    $jenis_kelamin = $_POST['jenis_kelamin'];
    $no_hp = $_POST['no_hp'];
    $alamat = $_POST['alamat'];

    if (empty($nip) || empty($nama) || empty($password)) {
        $error = "NIP, Nama, dan Password wajib diisi.";
    } else {
        try {
            // Cek NIP duplikat
            $stmt = $pdo->prepare("SELECT id FROM tb_guru WHERE nip = ?");
            $stmt->execute([$nip]);
            if ($stmt->rowCount() > 0) {
                $error = "NIP sudah terdaftar!";
            } else {
                // Insert Data
                $hashed_password = password_hash($password, PASSWORD_DEFAULT);
                $sql = "INSERT INTO tb_guru (nip, nama_lengkap, password, jenis_kelamin, no_hp, alamat) VALUES (?, ?, ?, ?, ?, ?)";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([$nip, $nama, $hashed_password, $jenis_kelamin, $no_hp, $alamat]);
                
                $success = "Data Guru berhasil ditambahkan!";
                // Redirect agar tidak submit ulang saat refresh
                echo "<script>alert('Berhasil menambah guru!'); window.location='data_guru.php';</script>";
                exit;
            }
        } catch (PDOException $e) {
            $error = "Error: " . $e->getMessage();
        }
    }
}

include '../../includes/header.php';
include '../../includes/sidebar.php';
?>

<div class="card">
    <div style="margin-bottom: 20px;">
        <h2>Tambah Guru Baru</h2>
        <a href="data_guru.php" style="text-decoration: none; color: #6B7280;">&larr; Kembali</a>
    </div>

    <?php if ($error): ?>
        <div style="background: #FEE2E2; color: #B91C1C; padding: 10px; border-radius: 8px; margin-bottom: 15px;">
            <?= $error ?>
        </div>
    <?php endif; ?>

    <form method="POST">
        <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">NIP</label>
            <input type="text" name="nip" required style="width: 100%; padding: 10px; border: 1px solid #D1D5DB; border-radius: 5px;">
        </div>

        <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">Nama Lengkap</label>
            <input type="text" name="nama_lengkap" required style="width: 100%; padding: 10px; border: 1px solid #D1D5DB; border-radius: 5px;">
        </div>

        <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">Password Login</label>
            <input type="text" name="password" required value="guru123" style="width: 100%; padding: 10px; border: 1px solid #D1D5DB; border-radius: 5px;">
            <small style="color: grey;">Default: guru123</small>
        </div>

        <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">Jenis Kelamin</label>
            <select name="jenis_kelamin" style="width: 100%; padding: 10px; border: 1px solid #D1D5DB; border-radius: 5px;">
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
            </select>
        </div>

        <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">No. HP</label>
            <input type="text" name="no_hp" style="width: 100%; padding: 10px; border: 1px solid #D1D5DB; border-radius: 5px;">
        </div>

        <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">Alamat</label>
            <textarea name="alamat" rows="3" style="width: 100%; padding: 10px; border: 1px solid #D1D5DB; border-radius: 5px;"></textarea>
        </div>

        <button type="submit" class="btn-primary" style="width: 100%;">Simpan Data Guru</button>
    </form>
</div>

<?php include '../../includes/footer.php'; ?>
