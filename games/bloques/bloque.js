var canvas;
var canvasContext;
var ballX = 400, ballY = 300;
var ballSpeedX = 5, ballSpeedY = -5;
var paddleWidth = 150, paddleHeight = 10;
var paddleX = 325;
var rightPressed = false, leftPressed = false;
var blocks = [];
var score = 0;
var velocidadPaddle = 8; // Velocidad de la barra
var gameOverTriggered = false; 
window.onload = function() {
    console.log("Juego iniciado");
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    startGame();
};

document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowRight") rightPressed = true;
    if (e.key === "ArrowLeft") leftPressed = true;
});
document.addEventListener("keyup", function(e) {
    if (e.key === "ArrowRight") rightPressed = false;
    if (e.key === "ArrowLeft") leftPressed = false;
});


function moverPaddle() {
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += velocidadPaddle;
    }
    if (leftPressed && paddleX > 0) {
        paddleX -= velocidadPaddle;
    }
}


function updateGame() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    moverPaddle(); // Mueve la barra de forma fluida
    moveBall(); // Mueve la pelota
    drawPaddle(); // Dibuja la barra
    drawBall(); // Dibuja la pelota
    drawBlocks(); // Dibuja los bloques
    removeBlock(); // Detecta y elimina bloques al chocar
    drawScore(); // Muestra la puntuación
}


function drawPaddle() {
    canvasContext.fillStyle = "red";
    canvasContext.fillRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
}


function drawBall() {
    canvasContext.beginPath();
    canvasContext.arc(ballX, ballY, 10, 0, Math.PI * 2);
    canvasContext.fillStyle = "#0095DD";
    canvasContext.fill();
    canvasContext.closePath();
}


function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Colisión con las paredes laterales
    if (ballX + ballSpeedX > canvas.width || ballX + ballSpeedX < 0) {
        ballSpeedX = -ballSpeedX;
    }

    // Colisión con el techo
    if (ballY + ballSpeedY < 10) {
        ballSpeedY = -ballSpeedY;
    }
    // Colisión con la barra
    else if (ballY + ballSpeedY > canvas.height - paddleHeight) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
            ballSpeedY = -ballSpeedY;
        } else {
            if (!gameOverTriggered) { // Solo ejecuta Game Over una vez
                gameOverTriggered = true; 
                setTimeout(gameOver, 100);
            }
        }
        
        }
    }   
    function gameOver() {
        alert("¡GAME OVER!");
        document.location.reload();
    }
    
    

//  Creación automática de bloques
function createBlocks() {
    let rows = 5;
    let cols = 10;
    let blockWidth = 70;
    let blockHeight = 20;
    let padding = 10;
    let startX = 50;
    let startY = 50;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let blockX = startX + col * (blockWidth + padding);
            let blockY = startY + row * (blockHeight + padding);
            blocks.push(new Block(blockX, blockY, blockWidth, blockHeight));
        }
    }
}

//  Clase para representar cada bloque
function Block(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
    this.state = true;
    this.color = "blue";

    this.draw = function() {
        if (this.state) {
            canvasContext.fillStyle = this.color;
            canvasContext.fillRect(this.x, this.y, this.w, this.h);
        }
    };

    this.crashWith = function() {
        return (
            this.state &&
            ballX + 10 > this.x &&
            ballX - 10 < this.x + this.w &&
            ballY + 10 > this.y &&
            ballY - 10 < this.y + this.h
        );
    };
}

// Dibujar todos los bloques 
function drawBlocks() {
    blocks.forEach((block) => block.draw());
}

// eliminar bloques al ser golpeados por la pelota
function removeBlock() {
    blocks.forEach((block) => {
        if (block.crashWith()) {
            ballSpeedY = -ballSpeedY;
            block.state = false; // Elimina visualmente el bloque
            score += 10; // Aumenta el puntaje
        }
    });
    // Filtrar bloques eliminados
    blocks = blocks.filter((block) => block.state);
    if (blocks.length === 0) {
        setTimeout(() => {
            alert("¡JUEGO COMPLETADO! 🎉");
            document.location.reload();
        }, 500);
    }
}

// Mostrar la puntuación
function drawScore() {
    canvasContext.font = "20px Arial";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Score: " + score, 20, 30);
}

// Iniciar el juego
function startGame() {
    createBlocks(); // Crear bloques dinámicamente
    var framesPerSecond = 60;
    setInterval(updateGame, 1000 / framesPerSecond);
}
