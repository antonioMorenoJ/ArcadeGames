<?php
/*session_start();
include("bd.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = $_POST['usuario'];
    $password = $_POST['password'];

    $query = "SELECT * FROM usuarios WHERE usuario = '$usuario' AND password = '$password'";
    $result = mysqli_query($conexion, $query);

    if (mysqli_num_rows($result) == 1) {
        $_SESSION['usuario'] = $usuario;
        header("Location: index.php");
        exit();
    } else {
        $error = "Usuario o contraseña incorrectos.";
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Arcade 90s</title>
    <link rel="stylesheet" href="../assets/estilos.css">
</head>
<body>
    <div class="container">
        <h2 class="title">Iniciar Sesión</h2>
        <?php if (isset($error)) { echo "<p style='color:red;'>$error</p>"; } ?>
        <form method="POST">
            <input type="text" name="usuario" placeholder="Usuario" required>
            <input type="password" name="password" placeholder="Contraseña" required>
            <button type="submit" class="login-btn">Ingresar</button>
        </form>
        <a href="registerUser.php"><button class="register-btn">Registrarse</button></a>
    </div>
</body>
</html>
*/

session_start();
include("bd.php");

$error = ""; // Inicializar la variable de error

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = $_POST['usuario'];
    $password = $_POST['password'];

    // Consulta para verificar el usuario
    $query = "SELECT * FROM usuarios WHERE usuario = ?";
    $stmt = $conexion->prepare($query);
    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $fila = $result->fetch_assoc();

        // Verificar la contraseña usando password_verify
        if (password_verify($password, $fila['password'])) {
            $_SESSION['usuario'] = $usuario;
            header("Location: index.php");
            exit();
        } else {
            $error = "Contraseña incorrecta.";
        }
    } else {
        $error = "Usuario no encontrado.";
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Arcade 90s</title>
    <link rel="stylesheet" href="../assets/estilos.css">
</head>
<body>
    <div class="container">
        <h2 class="title">Iniciar Sesión</h2>
        <!-- Mostrar mensaje de error si existe -->
     

        <?php if (!empty($error)) { echo "<p style='color:red;'>$error</p>"; } ?>
        <form method="POST">
            <input type="text" name="usuario" placeholder="Usuario" required>
            <input type="password" name="password" placeholder="Contraseña" required>
            <button type="submit" class="login-btn">Ingresar</button>
        </form>
        <a href="registerUser.php"><button class="register-btn">Registrarse</button></a>
    </div>
</body>
</html>