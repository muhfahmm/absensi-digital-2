        <nav class="sidebar">
            <div class="sidebar-header">
                Absensi V2
            </div>
            <ul class="sidebar-menu">
                <li><a href="<?= BASE_URL ?>admin/index.php">Dashboard</a></li>
                <li class="menu-header">Data Master</li>
                <li><a href="<?= BASE_URL ?>admin/modules/siswa/data_siswa.php">Data Siswa</a></li>
                <li><a href="<?= BASE_URL ?>admin/modules/guru/data_guru.php">Data Guru & Karyawan</a></li>
                <li><a href="<?= BASE_URL ?>admin/modules/kelas/data_kelas.php">Data Kelas</a></li>
                <li class="menu-header">Laporan</li>
                <li><a href="<?= BASE_URL ?>admin/modules/absensi/rekap_absensi.php">Rekap Absensi</a></li>
            </ul>
        </nav>
        <main class="main-content">
            <header class="topbar glass-panel" style="margin: 20px; border-radius: 16px;">
                <div class="page-title">Admin Panel</div>
                <div class="user-actions">
                    <div class="theme-switch-wrapper">
                        <label class="theme-switch" for="checkbox">
                            <input type="checkbox" id="checkbox" />
                            <div class="slider round"></div>
                        </label>
                    </div>
                    
                    <span style="font-weight: 600;"><?= $_SESSION['nama'] ?? 'Admin' ?></span>
                    <a href="<?= BASE_URL ?>auth/api/api-logout.php" class="btn-primary" style="background: #be123c; padding: 8px 15px; font-size: 0.9rem;">Logout</a>
                </div>
            </header>
            <div class="content-wrapper">
