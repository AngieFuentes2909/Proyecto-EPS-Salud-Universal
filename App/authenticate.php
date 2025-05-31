<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
require_once("Conexion.php");

$input = json_decode(file_get_contents("php://input"), true);
$usuario = $input["usuario"] ?? "";
$contrasena = $input["contrasena"] ?? "";

if (!$usuario || !$contrasena) {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    exit;
}

try {
    $conexion = new Conexion();
    $conn = $conexion->conectar();

    $sql = "SELECT UsuarioID, NombreUsuario, Contrasena, Rol 
            FROM usuarios 
            WHERE NombreUsuario = ? AND Contrasena = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $usuario, $contrasena);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        echo json_encode([
            "success" => true,
            "rol" => $user["Rol"],
            "username" => $user["NombreUsuario"]
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Credenciales incorrectas."]);
    }

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Error del servidor: " . $e->getMessage()]);
}
