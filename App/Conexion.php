<?php

class Conexion {
    private $host = "localhost";
    private $puerto = 3307;
    private $user = "root";
    private $pass = ""; 
    private $db = "eps_salud_universal";

    public function conectar() {
        $conn = new mysqli($this->host, $this->user, $this->pass, $this->db, $this->puerto);
        
        if ($conn->connect_error) {
            throw new Exception("Conexión fallida: " . $conn->connect_error);
        }

        return $conn;
    }
}

