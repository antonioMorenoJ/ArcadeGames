<?php
/*class BaseDatos {
    private $conexion;

    public function __construct() {
        $this->conexion = new mysqli("localhost", "root", "", "proyecto");
        if ($this->conexion->connect_error) {
            die("Error de conexión: " . $this->conexion->connect_error);
        }
    }

    public function query($sql) {
        return $this->conexion->query($sql);
    }*/

    
class BaseDatos {
    public $conexion;

    public function __construct() {
        // 1️⃣ Conectamos al servidor MySQL (sin base de datos)
        $servidor = "localhost";
        $usuario = "root";
        $contrasena = "";
        $nombreBD = "proyecto";

        $this->conexion = new mysqli($servidor, $usuario, $contrasena);

        if ($this->conexion->connect_error) {
            die("Error de conexión: " . $this->conexion->connect_error);
        }

        // 2️⃣ Crear base de datos si no existe
        $sql = "CREATE DATABASE IF NOT EXISTS $nombreBD";
        if (!$this->conexion->query($sql)) {
            die("Error al crear la base de datos: " . $this->conexion->error);
        }

        // 3️⃣ Seleccionar la base de datos
        $this->conexion->select_db($nombreBD);

        // 4️⃣ Crear tabla 'users' si no existe
        $sqlTabla = "CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        )";

        if (!$this->conexion->query($sqlTabla)) {
            die("Error al crear la tabla: " . $this->conexion->error);
        }
    }
}
?>

