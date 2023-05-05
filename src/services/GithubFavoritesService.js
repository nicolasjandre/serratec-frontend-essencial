import { getUser } from "../hooks/getUser.js";
import { getGithubUser } from "../hooks/getGithubUser.js";

export class GithubFavoritesService {
    constructor(tbody) {
        this.users = JSON.parse(localStorage.getItem("GithubFavorites.users")) || [];

        this.user = getUser();

        this.tbody = tbody;

        this.updateTable();
    }
    
    async addFavoriteGithubUser(nameInput) {

        const githubUser = await getGithubUser(nameInput.value);

        if (!githubUser) {
            alert("Usuário não encontrado.");
            nameInput.value = "";
            return;
        }

        const userAlreadyExists = this.user.favorites.find(localGithubUser => localGithubUser.login === githubUser.login);

        if (userAlreadyExists) {
            alert("Usuário já cadastrado.");
            nameInput.value = "";
            return;
        }

        this.user = {
            ...this.user,
            favorites: [...this.user.favorites, githubUser]
        }

        this.save();

        const createdRow = this.createTableRow(githubUser);

        if (this.user.favorites.length === 1) {
            this.tbody.removeChild(this.tbody.children[0]);
        }

        this.tbody.append(createdRow);

        nameInput.value = "";
    }

    save() {
        this.users = this.users.map(localUser => {
            if (localUser.email === this.user.email) {
                return this.user;
            }

            return localUser;
        });

        localStorage.setItem("GithubFavorites.users", JSON.stringify(this.users));
    }

    updateTable() {
        if (this.user.favorites.length > 0) {
            this.user.favorites.forEach(githubUser => {
                const createdRow = this.createTableRow(githubUser);
                this.tbody.append(createdRow);
            });

        } else {
            this.noUsersFindRow();
        }
    }

    noUsersFindRow() {
        const createdRow = document.createElement("tr");

        createdRow.innerHTML = `<td class="p-4" colspan="5"><h1>Nenhum usuário favoritado</h1></td>`;

        this.tbody.append(createdRow);
    }

    createTableRow(githubUser) {
        const tableRow = document.createElement("tr");

        tableRow.innerHTML = `
            <tr>
                <td class="d-flex p-2 align-items-center" style="height: 130px;" data-label="Usuário">

                    <img class="px-2 rounded-circle" style="height: 100px;"
                        src="${githubUser.avatarUrl}" alt="Foto do usuário">

                    <span class="fw-bold ms-4" style="height: auto;">${githubUser.name ? githubUser.name : "-"}</span>
                </td>

                <td class="p-2" style="height: 130px;" data-label="Localização">
                    <span class="px-2 fw-bold">${githubUser.location ? githubUser.location : "-"}</span>
                </td>

                <td class="p-2" style="height: 130px;" data-label="Seguidores">
                    <span class="px-2 fw-bold">${githubUser.followers}</span>
                </td>

                <td class="p-2" style="height: 130px;" data-label="Repositórios">
                    <span class="px-2 fw-bold">${githubUser.publicRepos}</span>
                </td>
                <td>
                    <img class="remove cursor-pointer scale-hover px-2" src="../../public//remove.png" style="height: 24px;" alt="Excluir">
                </td>
            </tr>
        `
        tableRow.querySelector(".remove").onclick = () => {
            const wantToRemove = confirm("Deseja realmente remover este usuário?");

            if (wantToRemove) {
                tableRow.remove();
                this.removeUser(githubUser);
            }
        }

        return tableRow;
    }

    removeUser(githubUser) {
        
        const favorites = this.user.favorites.filter(favUser => favUser.login !== githubUser.login);
        
        this.user = {
            ...this.user,
            favorites
        }

        if (favorites.length === 0) {
            this.noUsersFindRow();
        }

        this.save();
    }
}