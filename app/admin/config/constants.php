<?php
// app/admin/config/constants.php

// 1. Detect Protocol
$protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
$host = $_SERVER['HTTP_HOST'];

// 2. Detect Path
// Normalize slashes for Windows (Change \ to /)
$scriptName = str_replace('\\', '/', $_SERVER['SCRIPT_NAME']);
$appPos = strpos($scriptName, '/app/');

if ($appPos !== false) {
    // Found '/app/'
    $urlPath = substr($scriptName, 0, $appPos) . '/app/';
} else {
    // Fallback: Try to guess based on folder name if accessing root directly
    // This is a failsafe.
    $urlPath = '/absensi%20digital%202/app/';
}

// 3. Define BASE_URL
define('BASE_URL', $protocol . "://" . $host . $urlPath);
define('APP_NAME', 'Absensi Digital V2');
define('ROOT_PATH', dirname(dirname(__DIR__))); 
?>
