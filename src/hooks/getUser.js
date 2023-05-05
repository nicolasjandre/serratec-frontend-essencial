export function getUser() {
    let userEmail;

    const localKeys = Object.keys(localStorage);

    localKeys.forEach(key => {
        if (key.includes("GithubFavorites.token.")) {

            userEmail = key.slice(22, key.length);
        }
    });
    
    const users = JSON.parse(localStorage.getItem("GithubFavorites.users"));

    const user = users.find(localUser => localUser.email === userEmail);

    return user;
}