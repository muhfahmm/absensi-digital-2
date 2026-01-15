 <?php
session_start();
require_once '../../config/database.php';
require_once '../../config/constants.php';

if (!isset($_SESSION['logged_in']) || $_SESSION['role'] !== 'admin') { header("Location: " . BASE_URL . "auth/login.php"); exit; }

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nis = trim($_POST['nis']);
    $nama = trim($_POST['nama']);
    $id_kelas = $_POST['id_kelas'];
    $jk = $_POST['jenis_kelamin'];
    $alamat = $_POST['alamat'];
    // 1. Password Input (Optional)
    $password_input = trim($_POST['password']);
    
    // 2. Photo Upload
    $foto_name = 'default.png'; 

    if (empty($nis) || empty($nama)) {
        $error = "NIS dan Nama wajib diisi.";
    } else {
        try {
             // Check Duplicate
             $stmt = $pdo->prepare("SELECT id FROM tb_siswa WHERE nis = ?");
             $stmt->execute([$nis]);
             if ($stmt->rowCount() > 0) {
                 $error = "NIS $nis sudah terdaftar!";
             } else {
                 // Handle File Upload
                 if (isset($_FILES['foto']) && $_FILES['foto']['error'] === 0) {
                     $allowed = ['jpg', 'jpeg', 'png'];
                     $filename = $_FILES['foto']['name'];
                     $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
                     if (in_array($ext, $allowed)) {
                         $new_name = "siswa_" . $nis . "_" . time() . "." . $ext;
                         $destination = '../../assets/uploads/siswa/' . $new_name;
                         // Ensure dir exists
                         if (!is_dir('../../assets/uploads/siswa/')) mkdir('../../assets/uploads/siswa/', 0777, true);
                         
                         if (move_uploaded_file($_FILES['foto']['tmp_name'], $destination)) {
                             $foto_name = $new_name;
                         }
                     }
                 }
 
                 // Handle Password
                 $final_pass = empty($password_input) ? $nis : $password_input;
                 $hashed_pass = password_hash($final_pass, PASSWORD_DEFAULT);
 
                 // Get Class Name for QR Data
                 $stmtKelas = $pdo->prepare("SELECT nama_kelas FROM tb_kelas WHERE id = ?");
                 $stmtKelas->execute([$id_kelas]);
                 $kelasRow = $stmtKelas->fetch();
                 $nama_kelas = $kelasRow ? $kelasRow['nama_kelas'] : 'Unknown';

                 // Generate QR Data (Format: NIS - Nama - Kelas)
                 // This string is what will appear when scanned
                 $kode_qr = "NIS: " . $nis . "\nNama: " . $nama . "\nKelas: " . $nama_kelas;
 
                 // Insert
                 $sql = "INSERT INTO tb_siswa (nis, nama_lengkap, id_kelas, jenis_kelamin, alamat, password, foto_profil, kode_qr) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                 
                 $stmt = $pdo->prepare($sql);
                 $stmt->execute([$nis, $nama, $id_kelas, $jk, $alamat, $hashed_pass, $foto_name, $kode_qr]);
                 
                 $success = "Siswa berhasil ditambahkan!";
                 header("refresh:1;url=data_siswa.php");
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
        <h2>Tambah Siswa Baru</h2>
        <a href="data_siswa.php" style="color: var(--text-muted); text-decoration: none;">&larr; Kembali</a>
    </div>

    <?php if($error): ?><div style="background: #fee2e2; color: #b91c1c; padding: 15px; border-radius: 8px; margin-bottom: 20px;"><?= $error ?></div><?php endif; ?>
    <?php if($success): ?><div style="background: #d1fae5; color: #065f46; padding: 15px; border-radius: 8px; margin-bottom: 20px;"><?= $success ?></div><?php endif; ?>

    <form method="POST" enctype="multipart/form-data">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="form-group">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">NIS</label>
                <input type="number" name="nis" required placeholder="Contoh: 1011" value="<?= isset($_POST['nis']) ? htmlspecialchars($_POST['nis']) : '' ?>" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-glass); background: var(--bg-glass); color: var(--text-main);">
            </div>
            <div class="form-group">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">Nama Lengkap</label>
                <input type="text" name="nama" required placeholder="Nama Siswa" value="<?= isset($_POST['nama']) ? htmlspecialchars($_POST['nama']) : '' ?>" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-glass); background: var(--bg-glass); color: var(--text-main);">
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px;">
            <div class="form-group">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">Password Login (Opsional)</label>
                <input type="text" name="password" placeholder="Def: Gunakan NIS" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-glass); background: var(--bg-glass); color: var(--text-main);">
                <small style="color: grey;">Kosongkan jika ingin password sama dengan NIS</small>
            </div>
            <div class="form-group">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">Foto Profil</label>
                <input type="file" name="foto" accept="image/*" style="width: 100%; padding: 10px; border: 1px solid var(--border-glass); border-radius: 8px; background: var(--bg-glass);">
            </div>
        </div>

        <div class="form-group" style="margin-top: 15px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Kelas</label>
            <select name="id_kelas" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-glass); background: var(--bg-glass); color: var(--text-main);">
                <option value="">-- Pilih Kelas --</option>
                <?php
                $kelas = $pdo->query("SELECT * FROM tb_kelas ORDER BY nama_kelas ASC")->fetchAll();
                foreach($kelas as $k) {
                    echo "<option value='{$k['id']}'>{$k['nama_kelas']}</option>";
                }
                ?>
            </select>
        </div>
        
        <div class="form-group" style="margin-top: 15px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Jenis Kelamin</label>
            <select name="jenis_kelamin" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-glass); background: var(--bg-glass); color: var(--text-main);">
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
            </select>
        </div>

        <div class="form-group" style="margin-top: 15px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 600;">Alamat</label>
            <textarea name="alamat" rows="3" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-glass); background: var(--bg-glass); color: var(--text-main);"></textarea>
        </div>

        <div style="margin-top: 30px; text-align: right;">
            <button type="submit" class="btn-primary" style="width: 100%;">Simpan Data Siswa</button>
        </div>
    </form>
</div>

<?php include '../../includes/footer.php'; ?>
