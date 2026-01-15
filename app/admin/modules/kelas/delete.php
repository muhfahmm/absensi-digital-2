<?php
session_start();
require_once '../../config/database.php';
require_once '../../config/constants.php';

if (!isset($_SESSION['logged_in']) || $_SESSION['role'] !== 'admin') { exit('Akses Ditolak'); }

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    try {
        // Set id_kelas NULL in tb_siswa first logic is handled by ON DELETE SET NULL in Foreign Key usually, but let's be safe inside DB structure
        // database.sql says: FOREIGN KEY (id_kelas) REFERENCES tb_kelas(id) ON DELETE SET NULL
        // So we can just delete.
        
        $stmt = $pdo->prepare("DELETE FROM tb_kelas WHERE id = ?");
        $stmt->execute([$id]);
        header("Location: data_kelas.php?msg=deleted");
    } catch (PDOException $e) {
        die("Error deleting: " . $e->getMessage());
    }
}
?>
