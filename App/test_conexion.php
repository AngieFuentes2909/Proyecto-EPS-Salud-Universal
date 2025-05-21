<?php
require_once 'Conexion.php'; // están en el mismo nivel

if (isset($conn) && $conn->ping()) {
    echo "✅ Conexión exitosa a la base de datos.";
} else {
    echo "❌ Error al conectar.";
}

