<?php
session_start();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Inicio de Sesión - Arcade Retro</title>
    <link rel="stylesheet" href="assets/estilos.css">
</head>
<body>
    <div class="container">
      
        <h1 class="title">¡Bienvenido a Arcade Retro!</h1>
        <p class="description">
            ¿Hechas de menos los arcade de los 90? ¿Eres un millenial que quiere recordar los juegos de su infancia?
            Disfruta de una colección de juegos clásicos arcade  de los de toda la vida.
            ¡Revive la emoción de los videojuegos retro en tu navegador!
        </p>

      
        <div class="game-preview">
            <img src="assets/snakePortada.webp" alt="Snake" class="game-img" width="150">
          
            <img src="assets/rompebloques.webp" alt="Brick Breaker" class="game-img" width="150">
            <img src="assets/marcianitosPortada.webp" alt="Marcianitos" class="game-img" width="150">
        </div>

        <!-- Formulario de inicio de sesión -->
        <h2 class="title-inicio">Iniciar Sesión</h2>
        <?php
if (isset($_GET["error"]) && $_GET["error"] === "login") {
    echo "<p style='color: red; font-weight: bold;'>❌ Usuario o contraseña incorrectos.</p>";
}
?>

        <form action="controlador/proyectoControlador.php?accion=login" method="POST">
            <input type="text" name="usuario" placeholder="Usuario" required>
            <input type="password" name="password" placeholder="Contraseña" required>
            <button type="submit" class="login-btn">Entrar</button>
        </form>

        <!-- Botón de registro -->
        <a href="vista/registerUser.php">
            <button type="button" class="register-btn">Registrarse</button>
        </a>
    </div>
</body>
</html>
