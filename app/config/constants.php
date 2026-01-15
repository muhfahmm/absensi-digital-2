<?php
// app/config/constants.php - NEW FILE

// Detect Base URL automatically
$protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
$host = $_SERVER['HTTP_HOST'];

// Detect folder naming issues
// Script Name: /absensi digital 2/app/pages/admin/dashboard.php
$scriptName = str_replace('\\', '/', $_SERVER['SCRIPT_NAME']);
$appPos = strpos($scriptName, '/app/');

if ($appPos !== false) {
    // Found '/app/', take everything before it -> "/absensi digital 2/"
    $baseUrlPath = substr($scriptName, 0, $appPos + 1); // include trailing slash
} else {
    // Fallback Manual
    $baseUrlPath = '/absensi%20digital%202/'; 
}

define('BASE_URL', $protocol . "://" . $host . $baseUrlPath);
?>
