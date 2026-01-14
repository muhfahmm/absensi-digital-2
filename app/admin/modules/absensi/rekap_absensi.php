<?php
require_once '../../config/database.php';
require_once '../../config/constants.php';
include '../../includes/header.php';
include '../../includes/sidebar.php';
?>

<div class="card glass-panel">
    <h2>Rekap Absensi</h2>
    <p>Filter data absensi berdasarkan tanggal dan role.</p>
    
    <div style="margin-top: 20px; padding: 20px; background: rgba(0,0,0,0.05); border-radius: 10px;">
        <form style="display: flex; gap: 10px; align-items: end;">
            <div>
                <label style="display: block; font-size: 0.8rem; margin-bottom: 5px;">Dari Tanggal</label>
                <input type="date" style="padding: 8px; border-radius: 6px; border: 1px solid #ccc;">
            </div>
            <div>
                <label style="display: block; font-size: 0.8rem; margin-bottom: 5px;">Sampai Tanggal</label>
                <input type="date" style="padding: 8px; border-radius: 6px; border: 1px solid #ccc;">
            </div>
            <button class="btn-primary">Filter</button>
        </form>
    </div>
    
    <table class="table">
        <thead>
            <tr>
                <th>Waktu</th>
                <th>Nama</th>
                <th>Role</th>
                <th>Status</th>
                <th>Ket</th>
            </tr>
        </thead>
        <tbody>
             <tr><td colspan="5" style="text-align:center;">Silakan pilih filter tanggal.</td></tr>
        </tbody>
    </table>
</div>

<?php include '../../includes/footer.php'; ?>
