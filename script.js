let darkMode = localStorage.getItem('darkMode');
const trocarTema = document.getElementById("trocar-tema")

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