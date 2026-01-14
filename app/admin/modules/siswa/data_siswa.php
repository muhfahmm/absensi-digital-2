<?php
require_once '../../config/database.php';
require_once '../../config/constants.php';
include '../../includes/header.php';
include '../../includes/sidebar.php';
?>

<div class="card">
    <div style="display: flex; justify-content: space-between; align-items: center;">
        <h2>Data Siswa</h2>
        <a href="create.php" class="btn-primary">+ Tambah Siswa</a>
    </div>
    
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
            <tr>
                <td colspan="5" style="text-align:center;">Data belum tersedia (Ini hanya contoh tampilan)</td>
            </tr>
        </tbody>
    </table>
</div>

<?php include '../../includes/footer.php'; ?>
