import { AuthenticationService, emailRegex } from "../services/AuthenticationService.js";

const authentication = new AuthenticationService();

if (authentication.isAuthenticated()) {
    window.location.href = "favoritos.html";
}

const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const inputPasswordConfirmation = document.getElementById("passwordConfirmation");
const errorMessage = document.getElementById("errorMessage");
const form = document.querySelector('form');

errorMessage.style.display = 'none';

form.addEventListener("submit", (e) => authentication.register(form, inputEmail, inputPassword, inputPasswordConfirmation, e));
inputEmail.addEventListener('input', isValidEmail);

function isValidEmail() {
    if (!emailRegex.test(inputEmail.value)) {
        errorMessage.style.display = 'block';
        inputEmail.setCustomValidity('Por favor, digite um email válido.');
    } else {
        errorMessage.style.display = 'none';
        inputEmail.setCustomValidity('');
    }
}
