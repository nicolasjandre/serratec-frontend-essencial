import { AuthenticationService } from "../services/AuthenticationService.js";

const authentication = new AuthenticationService();

if (authentication.isAuthenticated()) {
    window.location.href = "favoritos.html";
}

const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const form = document.querySelector('form');

form.addEventListener("submit", (e) => authentication.login(inputEmail, inputPassword, form, e));