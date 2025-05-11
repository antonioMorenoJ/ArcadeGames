const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

document.getElementById("registerForm").addEventListener("submit", function(event) {
    const passwordInput = document.getElementById("password").value;
    const errorMessage = document.getElementById("passwordError");

    if (!passwordRegex.test(passwordInput)) {
        event.preventDefault();
        errorMessage.textContent = "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.";
        errorMessage.style.color = "red";
    } else {
        errorMessage.textContent = "";
    }
});
