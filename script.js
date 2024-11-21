const reposGrid = document.getElementById("repos-grid");
const repoSearch = document.getElementById("repo-search");

// Lista de repositórios destacados
const featuredRepos = [
    "Singles_Bar",
    "rodrigostudio"
];

// Função para criar os cards
function createRepoCard(repo) {
    return `
        <div class="repo-card">
            <h3>${repo.name}</h3>
            <p>${repo.description || "Sem descrição disponível."}</p>
            <div class="repo-info">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm1 12H7V9h2v3zm0-4H7V4h2v4z"/>
                    </svg>
                    ${repo.language || "Desconhecida"}
                </span>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM5.5 6.5L8 8l2.5-1.5L8 5l-2.5 1.5z"/>
                    </svg>
                    ${repo.stargazers_count} ★
                </span>
            </div>
            <a href="${repo.html_url}" target="_blank">Ver Repositório</a>
        </div>
    `;
}

// Busca os repositórios do GitHub
fetch("https://api.github.com/users/joaobosco25/repos")
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na API do GitHub: ${response.status}`);
        }
        return response.json();
    })
    .then(repos => {
        // Exibe os repositórios destacados
        repos
            .filter(repo => featuredRepos.includes(repo.name))
            .forEach(repo => {
                reposGrid.innerHTML += createRepoCard(repo);
            });

        // Habilita a busca para todos os repositórios
        repoSearch.addEventListener("input", (e) => {
            const searchTerm = e.target.value.toLowerCase();
            reposGrid.innerHTML = ""; // Limpa os repositórios
            const filteredRepos = repos.filter(repo =>
                repo.name.toLowerCase().includes(searchTerm)
            );
            if (filteredRepos.length > 0) {
                filteredRepos.forEach(repo => {
                    reposGrid.innerHTML += createRepoCard(repo);
                });
            } else {
                reposGrid.innerHTML = "<p>Nenhum repositório encontrado.</p>";
            }
        });
    })
    .catch(error => {
        console.error("Erro ao carregar repositórios:", error);
        reposGrid.innerHTML = "<p>Não foi possível carregar os repositórios.</p>";
    });

    const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    if (item.href === window.location.href) {
        item.classList.add('active');
    }
});

const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");

// Alterna a classe "open" na sidebar ao clicar no botão
menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});



