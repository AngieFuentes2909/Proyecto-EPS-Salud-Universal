<?php
include 'Conexion.php';

try {
    $conexionObj = new Conexion();
    $conexion = $conexionObj->conectar();
    echo "Conexión exitosa";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
