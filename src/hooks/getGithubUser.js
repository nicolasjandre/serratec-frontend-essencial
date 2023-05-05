export async function getGithubUser(username) {
    try {
        let response = await fetch(`https://api.github.com/users/${username}`);
        response = await response.json();

        if (response.message === "Not Found") {
            return;
        }

        return {
            avatarUrl: response.avatar_url,
            name: response.name,
            location: response.location,
            followers: response.followers,
            publicRepos: response.public_repos,
            login: response.login
        }

    } catch (e) {
        console.error(e.message);
    }
}