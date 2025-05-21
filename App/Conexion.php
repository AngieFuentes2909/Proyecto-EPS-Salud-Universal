<?php

$host = "localhost:3307";
$user = "root";
$pass = ""; 
$db = "eps_salud_universal";


$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
echo "Conexión exitosa";


