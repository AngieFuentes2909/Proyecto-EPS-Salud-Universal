<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// ... tu código aquí ...


header('Content-Type: application/json');

include '../App/Conexion.php';

try {
    $method = $_SERVER['REQUEST_METHOD'];
    $conexionObj = new Conexion();
    $conexion = $conexionObj->conectar();

    if ($method !== 'POST') {
        echo json_encode(['exito' => false, 'mensaje' => 'Método no permitido']);
        exit;
    }

    $datos = json_decode(file_get_contents("php://input"), true);
    
    if ($datos === null) {
        echo json_encode(['exito' => false, 'mensaje' => 'JSON inválido o vacío']);
        exit;
    }

    if (!isset($datos['nombre'], $datos['sitio'], $datos['planta'], $datos['doctor'])) {
        echo json_encode(['exito' => false, 'mensaje' => 'Faltan datos']);
        exit;
    }

    $nombre = trim($datos['nombre']);
    $sitio = trim($datos['sitio']);
    $planta = trim($datos['planta']);
    $doctor = trim($datos['doctor']);

    $prefijo = strtoupper(substr(preg_replace('/\s+/', '', $nombre), 0, 2));
    $identificador = $prefijo . str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);

    $stmt = $conexion->prepare("INSERT INTO unidades (nombre, ubicacion, planta, identificador) VALUES (?, ?, ?, ?)");
    if (!$stmt) {
        echo json_encode(['exito' => false, 'mensaje' => 'Error en prepare: ' . $conexion->error]);
        exit;
    }
    $stmt->bind_param("ssss", $nombre, $sitio, $planta, $identificador);

    if (!$stmt->execute()) {
        echo json_encode(['exito' => false, 'mensaje' => 'Error al registrar unidad: ' . $stmt->error]);
        exit;
    }

    $idUnidad = $stmt->insert_id;
    $stmt->close();

    $stmt2 = $conexion->prepare("UPDATE doctores SET UnidadID = ? WHERE doctorid = ?");
    if (!$stmt2) {
        echo json_encode(['exito' => false, 'mensaje' => 'Error en prepare update doctor: ' . $conexion->error]);
        exit;
    }
    $stmt2->bind_param("ii", $idUnidad, $doctor);

    if ($stmt2->execute()) {
        echo json_encode(['exito' => true, 'mensaje' => 'Unidad creada y doctor asignado correctamente']);
    } else {
        echo json_encode(['exito' => false, 'mensaje' => 'Error al asignar unidad al doctor: ' . $stmt2->error]);
    }
    $stmt2->close();
    $conexion->close();
    exit;
} catch (Exception $e) {
    echo json_encode(['exito' => false, 'mensaje' => 'Error en servidor: ' . $e->getMessage()]);
    exit;
}
