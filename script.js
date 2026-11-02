
"use strict";

// ===== BANNER PRINCIPAL =====

const filmesDestaque = [
    {
        imagem: "Um Lugar para Recomeçar.jpeg",
        titulo: "Um Lugar para Recomeçar",
        desc: "Um drama emocionante sobre segundas chances."
    },
    {
        imagem: "Jester A morte sorri.jpeg",
        titulo: "Jester: A Morte Sorri",
        desc: "Uma figura mascarada transforma o Halloween em suspense."
    }
];

let indiceBanner = 0;

function mudarBanner() {
    const banner = document.getElementById("meuBanner");
    const titulo = document.getElementById("tituloBanner");
    const descricao = document.getElementById("descBanner");

    if (!banner || !titulo || !descricao) return;

    const filme = filmesDestaque[indiceBanner];

    banner.style.backgroundImage =
        `linear-gradient(to top, black, transparent), url("${filme.imagem}")`;

    titulo.textContent = filme.titulo;
    descricao.textContent = filme.desc;

    indiceBanner = (indiceBanner + 1) % filmesDestaque.length;
}

mudarBanner();
setInterval(mudarBanner, 5000);


// ===== BUSCA DE FILMES E SÉRIES =====

const inputBusca = document.getElementById("inputBusca");

function pesquisarConteudo() {
    if (!inputBusca) return;

    const termo = inputBusca.value
        .trim()
        .toLocaleLowerCase("pt-BR");

    document.querySelectorAll(
        "#conteudo-filmes .container"
    ).forEach(cartao => {
        const titulo = cartao.querySelector("h1, h3");

        const nome = titulo
            ? titulo.textContent.toLocaleLowerCase("pt-BR")
            : "";

        cartao.style.display = nome.includes(termo) ? "" : "none";
    });

    // Esconde os títulos das categorias sem resultados.
    document.querySelectorAll(
        "#conteudo-filmes .titulo-categoria"
    ).forEach(titulo => {
        const proxima = titulo.nextElementSibling;

        if (!proxima) return;

        const cartoes = proxima.querySelectorAll(".container");

        if (!cartoes.length) return;

        const temResultado = [...cartoes].some(
            cartao => cartao.style.display !== "none"
        );

        titulo.style.display = temResultado ? "" : "none";
    });
}

if (inputBusca) {
    inputBusca.addEventListener("input", pesquisarConteudo);
}

const botaoBusca = document.querySelector(".busca-container button");

if (botaoBusca) {
    botaoBusca.addEventListener("click", pesquisarConteudo);
}


// ===== ABRIR MODAIS DE SÉRIES =====

function abrirEpisodios(idModal) {
    const modal = document.getElementById(idModal);

    if (!modal) {
        console.error("Modal de série não encontrado:", idModal);
        return;
    }

    // Fecha outros modais antes de abrir o selecionado.
    document.querySelectorAll(".modal.aberto").forEach(outro => {
        if (outro !== modal) fecharModal(outro);
    });

    modal.classList.add("aberto");
    modal.setAttribute("aria-hidden", "false");
}

// Compatibilidade com chamadas antigas.
document.querySelectorAll("[data-abrir-serie]").forEach(botao => {
    botao.addEventListener("click", () => {
        abrirEpisodios(botao.dataset.abrirSerie);
    });
});


// ===== FECHAR MODAIS E PARAR VÍDEOS =====

function fecharModal(modal) {
    if (!modal) return;

    modal.querySelectorAll("video").forEach(video => {
        video.pause();
        video.removeAttribute("src");
        video.load();
    });

    modal.classList.remove("aberto");
    modal.setAttribute("aria-hidden", "true");

    const mensagem = modal.querySelector(".mensagem-player");

    if (mensagem) mensagem.textContent = "";
}

function fecharEpisodios(idModal) {
    fecharModal(document.getElementById(idModal));
}

document.querySelectorAll("[data-fechar-serie]").forEach(botao => {
    botao.addEventListener("click", () => {
        fecharModal(botao.closest(".modal"));
    });
});

// Fecha quando clicar no fundo escuro.
document.querySelectorAll(".modal").forEach(modal => {
    modal.setAttribute("aria-hidden", "true");

    modal.addEventListener("click", evento => {
        if (evento.target === modal) {
            fecharModal(modal);
        }
    });
});

// Fecha com a tecla Escape.
document.addEventListener("keydown", evento => {
    if (evento.key === "Escape") {
        document.querySelectorAll(".modal.aberto").forEach(fecharModal);
    }
});


// ===== REPRODUZIR EPISÓDIOS =====

document.querySelectorAll("[data-video][data-player]").forEach(botao => {
    botao.addEventListener("click", async () => {
        const idPlayer = botao.dataset.player;
        const arquivoVideo = botao.dataset.video;
        const modal = botao.closest(".modal");

        const player = document.getElementById(idPlayer);
        const mensagem = modal
            ? modal.querySelector(".mensagem-player")
            : null;

        if (!player || !arquivoVideo) {
            if (mensagem) {
                mensagem.textContent = "Não foi possível encontrar o player.";
            }
            return;
        }

        // Não deixa uma série controlar o player de outra.
        if (!modal || !modal.classList.contains("aberto")) return;

        if (mensagem) mensagem.textContent = "Carregando episódio...";

        // Atualiza a origem do vídeo.
        player.pause();
        player.src = arquivoVideo;
        player.load();

        try {
            await player.play();

            if (mensagem) mensagem.textContent = "";
        } catch (erro) {
            console.error("Erro ao reproduzir vídeo:", erro);

            if (mensagem) {
                mensagem.textContent =
                    "Não foi possível iniciar. Verifique se o arquivo existe e tente apertar Play.";
            }
        }
    });
});

// Informa se o navegador não conseguir carregar um episódio.
document.querySelectorAll(".player-serie").forEach(player => {
    player.addEventListener("error", () => {
        const modal = player.closest(".modal");
        const mensagem = modal
            ? modal.querySelector(".mensagem-player")
            : null;

        if (mensagem) {
            mensagem.textContent =
                "Erro ao carregar o vídeo. Confira o caminho e o nome do arquivo.";
        }
    });
});
