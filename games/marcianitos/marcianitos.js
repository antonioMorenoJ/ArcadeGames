// Variables del juego
var canvas, ctx, tanque, balas = [];
var marcianitos = [];
var t_x = 375; // Posición inicial de la nave
var sentido = 10;
var g_puntos = 0;
var velocidadMarcianitos = 20;
var juegoTerminado = false; // Para evitar bucles infinitos
let tiempoEntreDisparos = 250; //  Ahora dispara cada 100ms
let ultimoDisparo = 0;

// Cargar imágenes
var naveImg = new Image();
naveImg.src = "../../assets/nave.png";

var marcianoImg = new Image();
marcianoImg.src = "../../assets/si-px.gif";

// Inicializar el juego cuando la página cargue
window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    tanque = { x: t_x, y: 460, width: 50, height: 50 };

    generarMarcianitos();

    setInterval(actualizarJuego, 50); // Ejecutar el juego en bucle
};

// Generar los marcianitos en filas
function generarMarcianitos() {
    marcianitos = [];
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 10; col++) {
            marcianitos.push({
                x: 50 + col * 60,
                y: 50 + row * 50,
                width: 40,
                height: 30,
                activo: true
            });
        }
    }
}

// Dibujar el juego
function actualizarJuego() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Verificar si todos los marcianitos han sido eliminados
    if (!juegoTerminado && marcianitos.every(m => !m.activo)) {
        juegoTerminado = true;
        setTimeout(juegoCompletado, 500);
        return; // Detener la actualización
    }

    // Dibujar marcianitos
    marcianitos.forEach((m) => {
        if (m.activo) {
            ctx.drawImage(marcianoImg, m.x, m.y, m.width, m.height);
        }
    });

    // Dibujar la nave con la imagen
    ctx.drawImage(naveImg, tanque.x, tanque.y, tanque.width, tanque.height);

    // Dibujar y mover todas las balas activas
    balas.forEach((bala, index) => {
        bala.y -= 10; //  Ajusta la velocidad del disparo aquí

        // Dibujar la bala
        ctx.fillStyle = "red";
        ctx.fillRect(bala.x, bala.y, 5, 15);

        // Comprobación de colisión con marcianitos
        marcianitos.forEach((m) => {
            if (
                m.activo &&
                bala.x >= m.x &&
                bala.x <= m.x + m.width &&
                bala.y >= m.y &&
                bala.y <= m.y + m.height
            ) {
                m.activo = false; //  Eliminar el marcianito
                balas.splice(index, 1); // 🔹Eliminar la bala del array
                g_puntos += 10;
                document.getElementById("marcador").innerText = g_puntos;
            }
        });

        // Si la bala sale de la pantalla, eliminarla
        if (bala.y < 0) {
            balas.splice(index, 1);
        }
    });

    // Movimiento de los marcianitos
    moverMarcianitos();
}

// Mostrar mensaje de victoria y reiniciar el juego
function juegoCompletado() {
    let confirmacion = confirm("🎉 ¡Has derrotado a todos los marcianitos! ¿Quieres jugar de nuevo?");
    if (confirmacion) {
        juegoTerminado = false;
        document.location.reload(); // Reinicia el juego
    }
}

// Mover la nave con las flechas y disparar con espacio
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft" && tanque.x > 10) {
        tanque.x -= 30; // Mueve la nave más rápido a la izquierda
    } else if (event.key === "ArrowRight" && tanque.x < canvas.width - tanque.width - 10) {
        tanque.x += 30; // Mueve la nave más rápido a la derecha
    } else if (event.key === " " && Date.now() - ultimoDisparo > tiempoEntreDisparos) {
        disparar(); // Llama a la función de disparo
    }
});

// Función de disparo rápido
function disparar() {
    balas.push({ x: tanque.x + 22, y: tanque.y });
    ultimoDisparo = Date.now(); // Guarda el tiempo del último disparo
}

// Mover los marcianitos de lado a lado
function moverMarcianitos() {
    let moverAbajo = false;

    marcianitos.forEach((m) => {
        if (m.activo) {
            m.x += sentido;
            if (m.x < 10 || m.x > canvas.width - m.width - 10) {
                moverAbajo = true;
            }
        }
    });

    if (moverAbajo) {
        sentido *= -1;
        marcianitos.forEach((m) => {
            m.y += velocidadMarcianitos;
        });
    }
}
