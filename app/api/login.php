<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(405, 'Method Not Allowed');
}

// Get raw POST data (JSON)
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['username']) || !isset($input['password'])) {
    sendResponse(400, 'Parameter tidak lengkap');
}

$username = $input['username'];
$password = $input['password'];

// Dummy Logic (Replace with Real DB Check)
if ($username == 'siswa' && $password == 'siswa123') {
    sendResponse(200, 'Login Berhasil', [
        'user_id' => 1,
        'role' => 'siswa',
        'nama' => 'Budi Santoso',
        'token' => 'dummy-jwt-token-xyz'
    ]);
} else {
    sendResponse(401, 'Username atau Password salah');
}
?>
