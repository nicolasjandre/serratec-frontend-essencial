import { generateToken } from "../utils/generateToken.js";

export const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

export class AuthenticationService {
    constructor() {
        this.users = JSON.parse(localStorage.getItem("GithubFavorites.users")) || [];
    }

    isAuthenticated() {
        let userEmail;
        const localKeys = Object.keys(localStorage);

        localKeys.forEach(key => {
            if (key.includes("GithubFavorites.token.")) {

                userEmail = key.slice(22, key.length);
            }
        });

        const token = localStorage.getItem("GithubFavorites.token." + userEmail);

        return token !== null;
    }

    login(inputEmail, inputPassword, form, e) {
        e.preventDefault();

        if (!form.checkValidity()) {
            return;
        }

        const email = inputEmail.value;
        const password = inputPassword.value;

        const user = this.users.find(localUser => localUser.email === email);

        if (user === undefined || user.password !== password) {
            alert("Usuário ou senha inválidos.")
            return;
        }

        const token = generateToken();

        localStorage.setItem("GithubFavorites.token." + user.email, token);

        window.location.href = "favoritos.html";
    }

    logout(email) {
        localStorage.removeItem("GithubFavorites.token." + email);

        window.location.href = "login.html";
    }

    register(form, inputEmail, inputPassword, inputPasswordConfirmation, e) {
        e.preventDefault();

        if (!form.checkValidity()) {
            return;
        }

        const user = {
            email: inputEmail.value,
            password: inputPassword.value,
            favorites: []
        }

        const passwordConfirmation = inputPasswordConfirmation.value;

        const emailAlreadyExists = this.users.find(localUser => localUser.email === user.email);

        if (user.password !== passwordConfirmation) {
            alert("As senhas precisam ser iguais.");
            return;
        } else if (user.password.length < 6) {
            alert("A senha precisa ter ao menos 6 caracteres.");
            return;
        } else if (!emailRegex.test(inputEmail.value)) {
            alert("Digite um e-mail válido.");
            return;
        } else if (user.password.toLowerCase() === user.password) {
            alert("A senha precisa ter ao menos uma letra maiúscula.");
            return;
        } else if (emailAlreadyExists) {
            alert("Este e-mail já está em uso.");
            return;
        }

        localStorage.setItem("GithubFavorites.users", JSON.stringify( [...this.users, user] ));

        alert("Usuário cadastrado com sucesso!");

        window.location.href = "login.html";
    }
}