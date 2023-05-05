export class HandleMediaQueries {
    constructor() {
        this.mq = window.matchMedia(`(max-width: 585px)`);
        
        this.mq.addEventListener("change", this.handleMediaQuery);
        this.handleMediaQuery(this.mq);
    }

    handleMediaQuery(mq) {
        const followers = document.getElementById("followers");
        const repo = document.getElementById("repos");

        if (mq.matches) {
            followers.innerText = "Seg"
            repo.innerText = "Rep"
        } else {
            followers.innerText = "Seguidores"
            repo.innerText = "Repositórios"
        }
    }
}