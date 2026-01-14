<?php
require_once '../../config/database.php';
require_once '../../config/constants.php';
include '../../includes/header.php';
include '../../includes/sidebar.php';
?>

<div class="card glass-panel">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h2>Data Siswa</h2>
        <a href="create.php" class="btn-primary">+ Tambah Siswa</a>
    </div>
    
    <div style="overflow-x: auto;">
        <table class="table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>NIS</th>
                    <th>Nama Lengkap</th>
                    <th>Kelas</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <?php
                // Join with Kelas table to get Class Name
                $sql = "SELECT s.*, k.nama_kelas FROM tb_siswa s LEFT JOIN tb_kelas k ON s.id_kelas = k.id ORDER BY s.nama_lengkap ASC";
                $stmt = $pdo->query($sql);
                $no = 1;
                while ($row = $stmt->fetch()):
                ?>
                <tr>
                    <td><?= $no++ ?></td>
                    <td><?= htmlspecialchars($row['nis']) ?></td>
                    <td><?= htmlspecialchars($row['nama_lengkap']) ?></td>
                    <td><?= htmlspecialchars($row['nama_kelas'] ?? 'Belum ada kelas') ?></td>
                    <td>
                        <a href="edit.php?id=<?= $row['id'] ?>" style="color: var(--primary); font-weight:600; text-decoration:none;">Edit</a>
                        <span style="color:var(--text-muted);">|</span>
                        <a href="delete.php?id=<?= $row['id'] ?>" style="color: #ef4444; font-weight:600; text-decoration:none;" onclick="return confirm('Hapus siswa ini?')">Hapus</a>
                    </td>
                </tr>
                <?php endwhile; ?>
                
                <?php if ($no == 1): ?>
                <tr><td colspan="5" style="text-align:center; padding: 30px;">Belum ada data siswa.</td></tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>

<?php include '../../includes/footer.php'; ?>
