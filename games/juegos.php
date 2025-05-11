<?php
session_start();
if (!isset($_SESSION["usuario"])) {
    header("Location: ../index.php");
    exit();
}
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["logout"])) {
    session_destroy();
    header("Location: ../index.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Juegos Arcade</title>
    <link rel="stylesheet" href="../assets/estilos.css">
</head>
<body>
    <div class="container">
        <h1 class="title">Bienvenido, <?php echo $_SESSION["usuario"]; ?></h1>
        <p>Selecciona un juego para jugar:</p>

        <!-- Nuevo contenedor para los juegos -->
        <div class="game-container">
            <div class="game">
                <a href="snake/snake.html" target="_blank">
                    <img src="../assets/snakePortada.webp" alt="Snake Game" width="250">
                </a>
                <p>Snake</p>
            </div>

            <div class="game">
                <a href="bloques/bloque.html" target="_blank">
                <img src="../assets/rompebloques.webp" alt="Brick Breaker Game" width="500">

                </a>
                <p>Rompe-bloques</p>
            </div>
            
            <div class="game">
                <a href="marcianitos/marcianitos.html" target="_blank">
                <img src="../assets/marcianitosPortada.webp" alt="marcianitos" width="500">

                </a>
                <p>Invasión marciana</p>
            </div>
        </div>
          <!-- Botón para cerrar sesión -->
        <form method="POST">
            <button type="submit" name="logout">Cerrar sesión</button>
        </form>
    </div>
</body>
</html>
