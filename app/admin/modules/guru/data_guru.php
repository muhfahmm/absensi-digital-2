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
            <tr>
                <td colspan="5" style="text-align:center;">Data guru belum tersedia.</td>
            </tr>
        </tbody>
    </table>
</div>

<?php include '../../includes/footer.php'; ?>
