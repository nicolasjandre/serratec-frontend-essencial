import { AuthenticationService } from "../services/AuthenticationService.js";
import { getUser } from "../hooks/getUser.js";
import { GithubFavoritesService } from "../services/GithubFavoritesService.js";
import { HandleMediaQueries } from "../utils/HandleMediaQueries.js"

const authentication = new AuthenticationService();

// Verificamos se o usuário está autenticado, caso não esteja, retornamos ele pra tela de login
if (!authentication.isAuthenticated()) {
    window.location.href = "login.html";
}


// Criamos cada uma de nossas constantes referenciando elementos html
const welcomeParagraph = document.getElementById("welcome");
const logoutButton = document.getElementById("logout");
const addButton = document.getElementById("add-button");
const nameInput = document.getElementById("input");
const tbody = document.getElementById("tbody");

new HandleMediaQueries();

const githubFavoritesService = new GithubFavoritesService(tbody);

const user = getUser();

welcomeParagraph.innerText = `Bem vindo! Logado como: ${user.email}`;

logoutButton.addEventListener("click", () => authentication.logout(user.email));

addButton.addEventListener("click", () => githubFavoritesService.addFavoriteGithubUser(nameInput));

nameInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        githubFavoritesService.addFavoriteGithubUser(nameInput);
    }
});