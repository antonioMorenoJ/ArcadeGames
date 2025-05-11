

window.onload = function () {
    let canvas = document.getElementById("juego");
    let ctx = canvas.getContext('2d');

    let time = Date.now();
    let ultimoMov = 0;
    let cuadrado = 10;
    let posicionActual = { x: 50, y: 50 };
    let direccion = { x: 1, y: 0 };
    let comida = { x: 0, y: 0 };
    let cola = [];
    let gameOver = false;
    
   
    
    function dibujo() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';

        // Dibujar la serpiente
        ctx.fillRect(posicionActual.x, posicionActual.y, cuadrado, cuadrado);
        cola.forEach(element => {
            ctx.fillRect(element.x, element.y, cuadrado, cuadrado);
        });

        // Dibujar la comida
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(comida.x, comida.y, cuadrado, cuadrado);
    }

        


    function gameLoop() {
        let tiempoActual = Date.now();
        ultimoMov += tiempoActual - time;
        time = tiempoActual;
    
        if (ultimoMov > Math.max(50, 150 - cola.length * 5)) { // Velocidad ajustable, cada vez que come va mas rapido
            ultimoMov = 0;
            updateCola();
    
           
            let nuevaCabeza = {
                x: posicionActual.x + cuadrado * direccion.x,
                y: posicionActual.y + cuadrado * direccion.y
            };
    
           
            if (choquePared() || choqueCuerpo(nuevaCabeza)) {
                alert("¡Game Over!");
                location.reload();
                return; // Detener el juego
            }
    
            //  Mover la serpiente
            posicionActual = nuevaCabeza;
    
        
            comprobarComida();
        }
    
        dibujo();
        window.requestAnimationFrame(gameLoop);
    }
    
        

    function cambioDireccion(event) {
        let key = event.key;
        switch (key) {
            case "ArrowLeft"://flecha izq 
                if (direccion.x === 0) {
                    resetDireccion();
                    direccion.x = -1;
                }
                break;
            case "ArrowUp"://flecha arriba
                if (direccion.y === 0) {
                    resetDireccion();
                    direccion.y = -1;
                }
                break;
            case "ArrowRight"://derecha
                if (direccion.x === 0) {
                    resetDireccion();
                    direccion.x = 1;
                }
                break;
            case "ArrowDown"://abajo
                if (direccion.y === 0) {
                    resetDireccion();
                    direccion.y = 1;
                }
                break;
        }
    }

    function resetDireccion() {
        direccion.x = 0;
        direccion.y = 0;
    }

    function choquePared() {
        return posicionActual.x < 0 || posicionActual.x >= canvas.width ||
               posicionActual.y < 0 || posicionActual.y >= canvas.height;
    }

        // Verifica si la nueva cabeza de la serpiente colisiona con su propio cuerpo
        function choqueCuerpo(nuevaCabeza) {
            return cola.some(segment => segment.x === nuevaCabeza.x && segment.y === nuevaCabeza.y);
        }
        
    
    function updateCola() {
        for (let i = cola.length - 1; i >= 0; i--) {
            if (i == 0) {
                cola[i].x = posicionActual.x;
                cola[i].y = posicionActual.y;
            } else {
                cola[i].x = cola[i - 1].x;
                cola[i].y = cola[i - 1].y;
            }
        }
    }


    // Añadir comida en una posición aleatoria que no esté ocupada por la serpiente
        function aniadirComida() {
            let valido = false;
            let randX, randY;
        
            while (!valido) {
                randX = Math.floor(Math.random() * (canvas.width / cuadrado)) * cuadrado;
                randY = Math.floor(Math.random() * (canvas.height / cuadrado)) * cuadrado;
        
                // Verifica que la comida no aparezca en la serpiente
                valido = !cola.some(segment => segment.x === randX && segment.y === randY) &&
                         !(posicionActual.x === randX && posicionActual.y === randY);
            }
        
            comida = { x: randX, y: randY };
        }
        

    function comprobarComida() {
        if (posicionActual.x == comida.x && posicionActual.y == comida.y) {
            cola.push({ x: posicionActual.x, y: posicionActual.y });
            aniadirComida();
        }
    }

    aniadirComida();
    gameLoop();
    window.addEventListener('keydown', function(event) {
        // Evita el desplazamiento de la página cuando se presionan las teclas de flecha
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
            event.preventDefault();
        }
        cambioDireccion(event);
    });
    
};
