<?php
session_start();

?>



<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Registro</title>
    <link rel="stylesheet" href="../assets/estilos.css">
    <script defer src="../js/validaciones.js"></script>
</head>
<body>
    <div class="container">
        <h2 class="title">Registro</h2>
        <?php
if (isset($_GET["error"])) {
    switch ($_GET["error"]) {
        case "email_duplicado":
            echo "<p style='color: red;'>❌ Este email ya está registrado.</p>";
            break;
        case "usuario_duplicado":
            echo "<p style='color: red;'>❌ Este nombre de usuario ya existe.</p>";
            break;
        case "error_sql":
            echo "<p style='color: red;'>❌ Error al registrar el usuario. Inténtalo más tarde.</p>";
            break;
    }
}
?>
        <form id="registerForm" action="../controlador/proyectoControlador.php?accion=registrar" method="POST">
            <input type="text" name="usuario" placeholder="Usuario" required>
            <input type="email" name="email" placeholder="Correo Electrónico" required>
            <input type="password" id="password" name="password" placeholder="Contraseña" required>
            <span id="passwordError"></span>
            <button type="submit" class="login-btn">Registrar</button>
        </form>
        <a href="../index.php">
            <button type="button" class="register-btn">Volver</button>
        </a>
    </div>
</body>
</html>
