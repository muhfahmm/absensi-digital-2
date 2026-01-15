<?php
session_start();
require_once '../../config/database.php';
require_once '../../config/constants.php';

// Check Session
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true || $_SESSION['role'] !== 'admin') {
    header("Location: " . BASE_URL . "auth/login.php");
    exit;
}

include '../../includes/header.php';
include '../../includes/sidebar.php';
?>

<div class="card glass-panel">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
            <h2 style="font-weight: 800; color: var(--primary);">Data Guru</h2>
            <p style="color: var(--text-muted); font-size: 0.9rem;">Kelola data guru, NIP, dan akses.</p>
        </div>
        <a href="create.php" class="btn-primary" style="display: flex; align-items: center; gap: 8px;">
            <span>+</span> Tambah Guru
        </a>
    </div>

    <!-- Table -->
    <div style="overflow-x: auto; border-radius: 12px; border: 1px solid var(--border-glass);">
        <table class="table">
            <thead>
                <tr>
                    <th style="width: 50px;">No</th>
                    <th>Foto</th>
                    <th>NIP</th>
                    <th>Nama Lengkap</th>
                    <th>Jenis Kelamin</th>
                    <th>Kode QR</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $sql = "SELECT * FROM tb_guru ORDER BY nama_lengkap ASC";
                try {
                    $stmt = $pdo->query($sql);
                    $no = 1;
                    if ($stmt->rowCount() > 0):
                        while ($row = $stmt->fetch()):
                ?>
                <tr>
                    <td><?= $no++ ?></td>
                    <td>
                        <div style="width: 40px; height: 40px; background: #ddd; border-radius: 50%; overflow: hidden;">
                             <?php if (!empty($row['foto_profil']) && file_exists('../../assets/uploads/guru/' . $row['foto_profil'])): ?>
                                <img src="../../assets/uploads/guru/<?= htmlspecialchars($row['foto_profil']) ?>" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover;">
                             <?php else: ?>
                                <img src="https://ui-avatars.com/api/?name=<?= urlencode($row['nama_lengkap']) ?>&background=random" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover;">
                             <?php endif; ?>
                        </div>
                    </td>
                    <td style="font-family: monospace; font-weight: 600;"><?= htmlspecialchars($row['nip']) ?></td>
                    <td>
                        <div style="font-weight: 600;"><?= htmlspecialchars($row['nama_lengkap']) ?></div>
                        <div style="font-size: 0.8rem; color: var(--text-muted);"><?= htmlspecialchars($row['no_hp'] ?? '-') ?></div>
                    </td>
                    <td><?= ($row['jenis_kelamin'] ?? '') == 'L' ? 'Laki-laki' : 'Perempuan' ?></td>
                    <td style="text-align: center;">
                        <?php if(!empty($row['kode_qr'])): ?>
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=<?= urlencode($row['kode_qr']) ?>" alt="QR" style="border-radius: 8px; border: 1px solid #ddd; padding: 4px; background: white;">
                            <div style="font-size: 0.7rem; color: #888; margin-top: 4px;">Start Scan</div>
                        <?php else: ?>
                            -
                        <?php endif; ?>
                   </td>
                    <td>
                        <div style="display: flex; gap: 8px;">
                            <a href="edit.php?id=<?= $row['id'] ?>" style="background: #fbbf24; color: white; padding: 6px 12px; border-radius: 6px; text-decoration: none; font-size: 0.85rem;">Edit</a>
                            <a href="delete.php?id=<?= $row['id'] ?>" onclick="return confirm('Yakin hapus data guru ini?')" style="background: #ef4444; color: white; padding: 6px 12px; border-radius: 6px; text-decoration: none; font-size: 0.85rem;">Hapus</a>
                        </div>
                    </td>
                </tr>
                <?php 
                        endwhile; 
                    else:
                ?>
                <tr>
                    <td colspan="7" style="text-align: center; padding: 40px; color: var(--text-muted);">
                        <div style="font-size: 3rem; margin-bottom: 10px;">👨‍🏫</div>
                        <div>Belum ada data guru.</div>
                    </td>
                </tr>
                <?php endif; 
                } catch (PDOException $e) {
                    echo '<tr><td colspan="7" style="color: red; text-align: center;">Error: ' . $e->getMessage() . '</td></tr>';
                }
                ?>
            </tbody>
        </table>
    </div>
</div>

<?php include '../../includes/footer.php'; ?>
