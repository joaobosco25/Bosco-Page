// Diplomas Data
const diplomas = [
    {
        title: "Curso de HTML, CSS, JavaScript e Git",
        category: "frontend",
        institution: "Rocketseat",
        image: "imagens/certificado-rocketseat.jpg"
    },
    {
        title: "Diploma Gerenciamento de T.I",
        category: "gestao",
        institution: "Unopar",
        image: "imagens/diploma.jpg"
    },
    {
        title: "Introdução Análise de Dados em Python",
        category: "backend",
        institution: "Unopar",
        image: "imagens/introduçao-analise-de-dados-python.jpg"
    },
    {
        title: "Estrutura de Dados em Python",
        category: "backend",
        institution: "Unopar",
        image: "imagens/estruturas-de-dados-python.jpg"
    }
];

// Render Diplomas
const diplomasGrid = document.getElementById("diplomas-grid");

// Função para renderizar diplomas com comportamento inicial no mobile
function renderDiplomas(filter = "all", showAllOnMobile = false) {
    diplomasGrid.innerHTML = ""; // Limpa o grid

    const filteredDiplomas = diplomas.filter(diploma => 
        filter === "all" || diploma.category === filter
    );

    filteredDiplomas.forEach((diploma, index) => {
        // Exibe apenas o primeiro diploma no mobile, a menos que "showAllOnMobile" esteja ativo
        const isHiddenOnMobile = !showAllOnMobile && window.innerWidth <= 768 && index > 0 ? "hidden-mobile" : "";

        const diplomaCard = `
            <div class="diploma-card ${isHiddenOnMobile}" data-aos="fade-up">
                <img src="${diploma.image}" alt="${diploma.title}">
                <h3>${diploma.title}</h3>
                <p>${diploma.institution}</p>
            </div>
        `;
        diplomasGrid.innerHTML += diplomaCard;
    });
}

// Função para configurar os botões de filtro
function setupFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove a classe 'active' do botão anterior
            document.querySelector(".filter-btn.active").classList.remove("active");
            
            // Adiciona a classe 'active' ao botão clicado
            button.classList.add("active");

            // Determina se todos os diplomas devem ser exibidos no mobile
            const showAllOnMobile = button.getAttribute("data-category") === "all";

            // Renderiza os diplomas filtrados com base na categoria do botão clicado
            const category = button.getAttribute("data-category");
            renderDiplomas(category, showAllOnMobile);
        });
    });
}

// Inicialização da página
function init() {
    renderDiplomas(); // Renderiza os diplomas com comportamento inicial no mobile
    setupFilters(); // Configura os eventos dos botões de filtro
}

// Chamar a inicialização
init();
