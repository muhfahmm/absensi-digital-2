<?php
require_once '../../config/database.php';
require_once '../../config/constants.php';
include '../../includes/header.php';
include '../../includes/sidebar.php';
?>

<div class="card">
    <div style="display: flex; justify-content: space-between; align-items: center;">
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
            <tr>
                <td colspan="5" style="text-align:center;">Data kelas belum tersedia.</td>
            </tr>
        </tbody>
    </table>
</div>

<?php include '../../includes/footer.php'; ?>
