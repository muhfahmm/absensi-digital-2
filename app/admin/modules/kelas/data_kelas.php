<?php
require_once '../../config/database.php';
require_once '../../config/constants.php';
include '../../includes/header.php';
include '../../includes/sidebar.php';
?>

<div class="card glass-panel">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h2>Data Kelas</h2>
        <a href="create.php" class="btn-primary">+ Tambah Kelas</a>
    </div>
    
    <table class="table">
        <thead>
            <tr>
                <th>No</th>
                <th>Nama Kelas</th>
                <th>Jumlah Siswa</th>
                <th>Token Kelas</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
             <?php
                $stmt = $pdo->query("SELECT * FROM tb_kelas ORDER BY nama_kelas ASC");
                $no = 1;
                while ($row = $stmt->fetch()):
            ?>
            <tr>
                <td><?= $no++ ?></td>
                <td><?= htmlspecialchars($row['nama_kelas']) ?></td>
                <td><?= htmlspecialchars($row['jumlah_siswa']) ?></td>
                <td><code><?= htmlspecialchars($row['token_kelas']) ?></code></td>
                <td>
                    <a href="#" style="color: var(--primary);">Edit</a>
                </td>
            </tr>
            <?php endwhile; ?>
            
            <?php if ($no == 1): ?>
                <tr><td colspan="5" style="text-align:center;">Belum ada data kelas.</td></tr>
            <?php endif; ?>
        </tbody>
    </table>
</div>

<?php include '../../includes/footer.php'; ?>
