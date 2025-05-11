<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

require_once "../modelo/bd.php"; 
require_once "../modelo/proyectoModelo.php";

// Crear la conexión a la base de datos
$baseDatos = new BaseDatos();
$modelo = new ProyectoModelo($baseDatos);

if (isset($_GET["accion"])) {
    $accion = $_GET["accion"];

    if ($accion == "registrar" && $_SERVER["REQUEST_METHOD"] == "POST") {
        $usuario = $_POST["usuario"];
        $email = $_POST["email"];
        $password = $_POST["password"]; 

        $resultado = $modelo->registrarUsuario($usuario, $email, $password);

        if ($resultado == "registro_ok") { 
            header("Location: ../index.php?registro=exitoso");
           
        } else {
            header("Location: ../vista/registerUser.php?error=$resultado");
            

            
        }
        exit();
    }
    

    if ($accion == "login" && $_SERVER["REQUEST_METHOD"] == "POST") {
        $usuario = $_POST["usuario"];
        $password = $_POST["password"];

         
       
        if ($modelo->verificarUsuario($usuario, $password)) {
            $_SESSION["usuario"] = $usuario;
            header("Location: ../games/juegos.php");
            exit();
        } else {
         
            header("Location: ../index.php?error=login");
            exit();
        }
    }
}

?>
