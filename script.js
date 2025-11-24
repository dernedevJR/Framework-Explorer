let darkMode = localStorage.getItem('darkMode');
let cardContainer = document.getElementById("card-container");
let dados = [];
const trocarTema = document.getElementById("trocar-tema");
const input = document.getElementById("busca");
const filtroCategoria = document.getElementById("filtro-categoria");
const formBusca = document.getElementById("form-busca");


async function carregarDados(){
    let resposta = await fetch("data.json");
    dados = await resposta.json();
}

function aplicarFiltros(){
    const termoBusca = input.value.toLowerCase().trim();
    const categoriaSelecionada = filtroCategoria.value;

    if (!termoBusca && !categoriaSelecionada) {
        renderizarCards([]); 
        return;
    }

    let resultados = dados;

    if (categoriaSelecionada) {
        resultados = resultados.filter(dado => 
            dado.categoria.toLowerCase() === categoriaSelecionada.toLowerCase()
        );
    }

    // 2. Filtra pelo termo de busca (se houver)
    if (termoBusca) {
        resultados = resultados.filter(dado =>
            dado.nome.toLowerCase().includes(termoBusca) || 
            dado.descricao.toLowerCase().includes(termoBusca)
        );
    }

    renderizarCards(resultados);
}

function renderizarCards(cardsParaRenderizar) {
    cardContainer.innerHTML = "";

    for(let dado of cardsParaRenderizar){
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
         <h2>${dado.nome}</h2>
         <p>${dado.descricao}</p>
         <p>${dado.ano}</p>
         <p>${dado.criador}</p>
         <p>${dado.linguagem}</p>
         <p>${dado.categoria}</p>
         <a href="${dado.link}" target="_blank" class="card-link">Documentação</a>`;
                    cardContainer.appendChild(article);
    }
}

document.addEventListener("DOMContentLoaded", carregarDados);

formBusca.addEventListener("submit", (evento) => {
    evento.preventDefault(); 
    aplicarFiltros();
});

const darkModeativo = () => {
    document.body.classList.add("darkMode")
    localStorage.setItem('darkMode', 'ativo')
}
const darkModeDesativado = () => {
    document.body.classList.remove("darkMode")
    localStorage.setItem('darkMode', null)
}

if (darkMode === 'ativo') darkModeativo();

trocarTema.addEventListener('click', () => {
   darkMode = localStorage.getItem('darkMode');
   darkMode !== "ativo" ? darkModeativo() : darkModeDesativado();
})