<?php
session_start();
require_once '../../config/database.php';
require_once '../../config/constants.php';

if (!isset($_SESSION['logged_in']) || $_SESSION['role'] !== 'admin') {
    exit('Akses Ditolak');
}

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    try {
        $stmt = $pdo->prepare("DELETE FROM tb_siswa WHERE id = ?");
        $stmt->execute([$id]);
        header("Location: data_siswa.php?msg=deleted");
    } catch (PDOException $e) {
        die("Error deleting: " . $e->getMessage());
    }
}
?>
