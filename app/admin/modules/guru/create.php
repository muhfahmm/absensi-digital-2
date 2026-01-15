<?php
session_start();
require_once '../../config/database.php';
require_once '../../config/constants.php';

if (!isset($_SESSION['logged_in']) || $_SESSION['role'] !== 'admin') { header("Location: " . BASE_URL . "auth/login.php"); exit; }

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nip = trim($_POST['nip']);
    $nama = trim($_POST['nama']);
    $jk = $_POST['jenis_kelamin'];
    $alamat = $_POST['alamat'];
    $no_hp = trim($_POST['no_hp']);
    $password_input = trim($_POST['password']);
    
    $foto_name = 'default.png'; 

    if (empty($nip) || empty($nama)) {
        $error = "NIP dan Nama wajib diisi.";
    } else {
        try {
             // Check Duplicate
             $stmt = $pdo->prepare("SELECT id FROM tb_guru WHERE nip = ?");
             $stmt->execute([$nip]);
             if ($stmt->rowCount() > 0) {
                 $error = "NIP $nip sudah terdaftar!";
             } else {
                 // Handle File Upload
                 if (isset($_FILES['foto']) && $_FILES['foto']['error'] === 0) {
                     $allowed = ['jpg', 'jpeg', 'png'];
                     $filename = $_FILES['foto']['name'];
                     $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
                     if (in_array($ext, $allowed)) {
                         $new_name = "guru_" . $nip . "_" . time() . "." . $ext;
                         $destination = '../../assets/uploads/guru/' . $new_name;
                         if (!is_dir('../../assets/uploads/guru/')) mkdir('../../assets/uploads/guru/', 0777, true);
                         
                         if (move_uploaded_file($_FILES['foto']['tmp_name'], $destination)) {
                             $foto_name = $new_name;
                         }
                     }
                 }
 
                 // Handle Password
                 $final_pass = empty($password_input) ? $nip : $password_input;
                 $hashed_pass = password_hash($final_pass, PASSWORD_DEFAULT);
 
                 // Generate QR Data (Format: NIP - Nama - Guru)
                 $kode_qr = "NIP: " . $nip . "\nNama: " . $nama . "\nRole: Guru";
 
                 // Insert
                 $sql = "INSERT INTO tb_guru (nip, nama_lengkap, jenis_kelamin, alamat, no_hp, password, foto_profil, kode_qr) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                 $stmt = $pdo->prepare($sql);
                 $stmt->execute([$nip, $nama, $jk, $alamat, $no_hp, $hashed_pass, $foto_name, $kode_qr]);
                 
                 $success = "Guru berhasil ditambahkan!";
                 header("refresh:1;url=data_guru.php");
             }
        } catch (PDOException $e) {
             $error = "DB Error: " . $e->getMessage();
        }
    }
}

include '../../includes/header.php';
include '../../includes/sidebar.php';
?>

<div class="card glass-panel" style="max-width: 800px; margin: 0 auto;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h2>Tambah Guru Baru</h2>
        <a href="data_guru.php" style="color: var(--text-muted); text-decoration: none;">&larr; Kembali</a>
    </div>

    <?php if($error): ?><div style="background: #fee2e2; color: #b91c1c; padding: 15px; border-radius: 8px; margin-bottom: 20px;"><?= $error ?></div><?php endif; ?>
    <?php if($success): ?><div style="background: #d1fae5; color: #065f46; padding: 15px; border-radius: 8px; margin-bottom: 20px;"><?= $success ?></div><?php endif; ?>

    <form method="POST" enctype="multipart/form-data">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="form-group">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">NIP</label>
                <input type="number" name="nip" required placeholder="Contoh: 198001..." style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-glass); background: var(--bg-glass); color: var(--text-main);">
            </div>
            <div class="form-group">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">Nama Lengkap</label>
                <input type="text" name="nama" required placeholder="Nama Guru + Gelar" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-glass); background: var(--bg-glass); color: var(--text-main);">
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px;">
            <div class="form-group">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">Password Login (Opsional)</label>
                <input type="text" name="password" placeholder="Def: Gunakan NIP" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-glass); background: var(--bg-glass); color: var(--text-main);">
            </div>
            <div class="form-group">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">Foto Profil</label>
                <input type="file" name="foto" accept="image/*" style="width: 100%; padding: 10px; border: 1px solid var(--border-glass); border-radius: 8px; background: var(--bg-glass);">
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px;">
             <div class="form-group">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">Jenis Kelamin</label>
                <select name="jenis_kelamin" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-glass); background: var(--bg-glass); color: var(--text-main);">
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                </select>
            </div>
            <div class="form-group">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">No. HP / WA</label>
                <input type="text" name="no_hp" placeholder="08..." style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-glass); background: var(--bg-glass); color: var(--text-main);">
            </div>
        </div>

        <div class="form-group" style="margin-top: 15px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Alamat</label>
            <textarea name="alamat" rows="2" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-glass); background: var(--bg-glass); color: var(--text-main);"></textarea>
        </div>

        <div style="margin-top: 30px; text-align: right;">
            <button type="submit" class="btn-primary" style="width: 100%;">Simpan Data Guru</button>
        </div>
    </form>
</div>

<?php include '../../includes/footer.php'; ?>
