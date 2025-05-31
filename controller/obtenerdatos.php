<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
require_once '../App/Conexion.php'; // Ajusta la ruta si es necesario

$conexion = new Conexion();
$conn = $conexion->conectar(); // Nos aseguramos de tener un objeto $conn

$tipo = $_GET['tipo'] ?? null;

if (!$tipo) {
    echo json_encode(['error' => 'Tipo no especificado']);
    exit;
}

switch ($tipo) {
    case 'doctores':
        $sql = "SELECT DoctorID, nombre, apellido FROM doctores";
        $result = $conn->query($sql);

        if (!$result) {
            echo json_encode(['error' => 'Error en la consulta: ' . $conn->error]);
            exit;
        }

        $datos = [];
        while ($row = $result->fetch_assoc()) {
            $datos[] = [
                'id' => $row['DoctorID'],
                'nombre' => $row['nombre'],
                'apellido' => $row['apellido']
            ];
        }
        echo json_encode($datos);
        break;

    default:
        echo json_encode(['error' => 'Tipo no válido']);
        break;
}

$conn->close();
