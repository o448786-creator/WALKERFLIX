const filmesDestaque = [{
        imagem: 'Um Lugar para Recomeçar.jpeg',
        titulo: 'Um Lugar para Recomeçar',
        desc: 'Um drama emocionante sobre segundas chances.'
    },
    {
        imagem: 'Jester A morte sorri.JPEG',
        titulo: 'Jester: A Morte Sorri',
        desc: 'Uma figura mascarada transforma o Halloween em um pesadelo.'
    }
];

let indice = 0;

function mudarBanner() {
    const banner = document.getElementById('meuBanner');
    const titulo = document.getElementById('tituloBanner');
    const desc = document.getElementById('descBanner');

    // Só executa se encontrar os elementos
    if (banner && titulo && desc) {
        const f = filmesDestaque[indice];
        banner.style.backgroundImage = `linear-gradient(to top, black, transparent), url('${f.imagem}')`;
        titulo.innerText = f.titulo;
        desc.innerText = f.desc;
        indice = (indice + 1) % filmesDestaque.length;
    }
}

// Inicia o banner
mudarBanner();
setInterval(mudarBanner, 5000);

// Busca (Filtro)
document.getElementById('inputBusca').addEventListener('keyup', function() {
    let busca = this.value.toLowerCase();
    let filmes = document.querySelectorAll('.container');

    filmes.forEach(filme => {
        let titulo = filme.querySelector('h1').innerText.toLowerCase();
        filme.style.display = titulo.includes(busca) ? "block" : "none";
    });
});



// Função para abrir o Modal com informações
function abrirModal(titulo, descricao) {
    const modal = document.getElementById('janelaModal');
    document.getElementById('modalTitulo').innerText = titulo;
    document.getElementById('modalDescricao').innerText = descricao;
    modal.style.display = "block";
}

// Fechar o modal ao clicar no X
document.querySelector('.botao-fechar').onclick = function() {
    document.getElementById('janelaModal').style.display = "none";
}

// Fechar se clicar fora da caixa
window.onclick = function(event) {
    const modal = document.getElementById('janelaModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


const video = document.getElementById('meuVideo');
const poster = document.getElementById('posterPausa');

// Quando pausar, mostra o pôster
video.addEventListener('pause', () => {
    poster.style.display = 'block';
});

// Quando der play, esconde o pôster
video.addEventListener('play', () => {
    poster.style.display = 'none';
});




function abrirEpisodios() {
    document.getElementById('modal-episodios').style.display = 'block';
}
function fecharEpisodios() {
    document.getElementById('modal-episodios').style.display = 'none';
}



// Funções para Modais de Séries
function abrirEpisodios(idModal) {
    var modal = document.getElementById(idModal);
    if (modal) {
        modal.style.display = "flex";
    }
}

function fecharEpisodios(idModal) {
    var modal = document.getElementById(idModal);
    if (modal) {
        modal.style.display = "none";
    }
}

// Funções para Modais de Filmes
function abrirModalFilme(titulo, descricao) {
    document.getElementById("modalTitulo").innerText = titulo;
    document.getElementById("modalDescricao").innerText = descricao;
    document.getElementById("janelaModal").style.display = "flex";
}

function fecharModalFilme() {
    document.getElementById("janelaModal").style.display = "none";
}

// Fecha qualquer modal se o usuário clicar fora da caixa preta
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}





function trocarVideo(idPlayer, arquivoVideo) {
    event.preventDefault();
    const player = document.getElementById(idPlayer);
    player.src = arquivoVideo;
    player.play();
}
