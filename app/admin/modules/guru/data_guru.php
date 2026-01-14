<?php
require_once '../../config/database.php';
require_once '../../config/constants.php';
include '../../includes/header.php';
include '../../includes/sidebar.php';
?>

<div class="card">
    <div style="display: flex; justify-content: space-between; align-items: center;">
        <h2>Data Guru</h2>
        <a href="create.php" class="btn-primary">+ Tambah Guru</a>
    </div>
    
    <table class="table">
        <thead>
            <tr>
                <th>No</th>
                <th>NIP</th>
                <th>Nama Lengkap</th>
                <th>No HP</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $stmt = $pdo->query("SELECT * FROM tb_guru ORDER BY created_at DESC");
            $no = 1;
            while ($row = $stmt->fetch()):
            ?>
            <tr>
                <td><?= $no++ ?></td>
                <td><?= htmlspecialchars($row['nip']) ?></td>
                <td><?= htmlspecialchars($row['nama_lengkap']) ?></td>
                <td><?= htmlspecialchars($row['no_hp']) ?></td>
                <td>
                    <a href="#" style="color: blue;">Edit</a> | 
                    <a href="#" style="color: red;">Hapus</a>
                </td>
            </tr>
            <?php endwhile; ?>
            
            <?php if ($no == 1): ?>
            <tr>
                <td colspan="5" style="text-align:center;">Data guru belum tersedia.</td>
            </tr>
            <?php endif; ?>
        </tbody>
    </table>
</div>

<?php include '../../includes/footer.php'; ?>
