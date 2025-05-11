<?php
require_once "bd.php";

class ProyectoModelo {
    private $conexion;

    public function __construct($db) {
        $this->conexion = $db->conexion;
    }

   /* public function registrarUsuario($usuario, $email, $password) {
        $sql ="SELECT id FROM users where email ='$email'";
        $resultado = $this->conexion->query($sql);

        if($resultado->num_rows>0){
            echo "El usuario ya existe";
        }

        $passwordHash = password_hash($password, PASSWORD_BCRYPT);
        $sql = "INSERT INTO users (username, email, password) VALUES ('$usuario', '$email', '$passwordHash')";

        return $this->conexion->query($sql);
    }*/

    public function registrarUsuario($usuario, $email, $password) {
        // Comprobar si el email ya existe
        $consultaEmail = "SELECT id FROM users WHERE email = '$email'";
        $resultadoEmail = $this->conexion->query($consultaEmail);
    
        if ($resultadoEmail->num_rows > 0) {
            return "email_duplicado";
        }
    
        // Comprobar si el usuario ya existe
        $consultaUsuario = "SELECT id FROM users WHERE username = '$usuario'";
        $resultadoUsuario = $this->conexion->query($consultaUsuario);
    
        if ($resultadoUsuario->num_rows > 0) {
            return "usuario_duplicado";
        }
    
        // Si todo bien, insertar
        $passwordHash = password_hash($password, PASSWORD_BCRYPT);
        $sql = "INSERT INTO users (username, email, password) VALUES ('$usuario', '$email', '$passwordHash')";
    
        return $this->conexion->query($sql) ? "registro_ok" : "error_sql";
    }
    

    public function verificarUsuario($usuario, $password) {
        $sql = "SELECT * FROM users WHERE username = '$usuario'";
        $resultado = $this->conexion->query($sql);

        if ($resultado->num_rows > 0) {
            $fila = $resultado->fetch_assoc();
            return password_verify($password, $fila["password"]);
        }
        return false;
    }
}
?>
