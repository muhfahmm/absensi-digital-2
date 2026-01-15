<?php
// app/auth/api/api-logout.php
session_start();
session_unset();
session_destroy();
header("Location: ../login.php");
exit;
?>
