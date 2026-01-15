<?php
session_start();
require_once '../../config/database.php';
require_once '../../config/constants.php';

if (!isset($_SESSION['logged_in']) || $_SESSION['role'] !== 'admin') { header("Location: " . BASE_URL . "auth/login.php"); exit; }

include '../../includes/header.php';
include '../../includes/sidebar.php';
?>

<div class="card glass-panel">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
            <h2 style="font-weight: 800; color: var(--primary);">Data Kelas</h2>
            <p style="color: var(--text-muted); font-size: 0.9rem;">Kelola daftar kelas dan token absensi kelas.</p>
        </div>
        <a href="create.php" class="btn-primary" style="display: flex; align-items: center; gap: 8px;">
            <span>+</span> Tambah Kelas
        </a>
    </div>
    
    <div style="overflow-x: auto; border-radius: 12px; border: 1px solid var(--border-glass);">
        <table class="table">
            <thead>
                <tr>
                    <th style="width: 50px;">No</th>
                    <th>Nama Kelas</th>
                    <th>Jumlah Siswa</th>
                    <th>Token Kelas (QR Code)</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
             <?php
                // Count students for each class dynamically
                $sql = "SELECT k.*, (SELECT COUNT(*) FROM tb_siswa s WHERE s.id_kelas = k.id) as real_jumlah_siswa 
                        FROM tb_kelas k 
                        ORDER BY k.nama_kelas ASC";
                $stmt = $pdo->query($sql);
                $no = 1;
                while ($row = $stmt->fetch()):
            ?>
            <tr>
                <td><?= $no++ ?></td>
                <td style="font-weight: 700; color: var(--primary);"><?= htmlspecialchars($row['nama_kelas']) ?></td>
                <td>
                    <span style="background: rgba(0,0,0,0.05); padding: 5px 10px; border-radius: 6px; font-weight: 600;">
                        <?= $row['real_jumlah_siswa'] ?> Siswa
                    </span>
                </td>
                <td style="text-align: center;">
                    <?php if(!empty($row['token_kelas'])): ?>
                         <div style="font-family: monospace; background: #eee; color: #333; display: inline-block; padding: 4px 8px; border-radius: 4px; border: 1px solid #ccc; font-size: 0.8rem; margin-bottom: 5px;">
                            <?= htmlspecialchars($row['token_kelas']) ?>
                        </div>
                        <br>
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=<?= urlencode($row['token_kelas']) ?>" alt="QR" style="border-radius: 8px; border: 1px solid #ddd; padding: 4px; background: white;">
                    <?php else: ?>
                        -
                    <?php endif; ?>
                </td>
                <td>
                    <div style="display: flex; gap: 8px;">
                        <a href="#" style="background: #fbbf24; color: white; padding: 6px 12px; border-radius: 6px; text-decoration: none; font-size: 0.85rem;">Edit</a>
                        <a href="delete.php?id=<?= $row['id'] ?>" onclick="return confirm('Hapus kelas ini? Siswa yang ada di kelas ini akan kehilangan status kelasnya.')" style="background: #ef4444; color: white; padding: 6px 12px; border-radius: 6px; text-decoration: none; font-size: 0.85rem;">Hapus</a>
                    </div>
                </td>
            </tr>
            <?php endwhile; ?>
            
            <?php if ($no == 1): ?>
                <tr><td colspan="5" style="text-align:center; padding: 30px; color: var(--text-muted);">Belum ada data kelas.</td></tr>
            <?php endif; ?>
        </tbody>
    </table>
    </div>
</div>

<?php include '../../includes/footer.php'; ?>
