/**
 * Componente Card - Renderiza um card de filme/série com preview de YouTube
 * Funcionalidades:
 * - Exibe imagem do conteúdo
 * - Reproduz preview do YouTube ao passar o mouse
 * - Controle de volume/mute
 * - Barra de progresso para conteúdo já assistido
 * - Responsivo ao tamanho da tela
 */

import { getYouTubeId } from '../utils.js';

// ===== GERENCIAMENTO DA API DO YOUTUBE =====
let youtubeApiLoaded = false;
let youtubeApiLoading = false;
const youtubeApiReadyCallbacks = [];

/**
 * Carrega a API do YouTube de forma assíncrona
 * Garante que a API seja carregada apenas uma vez
 * @returns {Promise} Resolve quando a API estiver pronta
 */
function loadYouTubeIframeAPI() {
    if (youtubeApiLoaded) {
        return Promise.resolve();
    }

    if (youtubeApiLoading) {
        return new Promise((resolve) => youtubeApiReadyCallbacks.push(resolve));
    }

    youtubeApiLoading = true;
    return new Promise((resolve, reject) => {
        youtubeApiReadyCallbacks.push(resolve);
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        script.onerror = () => reject(new Error('Falha ao carregar YouTube Iframe API'));
        document.body.appendChild(script);

        // Callback global que o YouTube chama automaticamente
        window.onYouTubeIframeAPIReady = () => {
            youtubeApiLoaded = true;
            youtubeApiLoading = false;
            while (youtubeApiReadyCallbacks.length) {
                const cb = youtubeApiReadyCallbacks.shift();
                cb();
            }
        };
    });
}

/**
 * Cria um reprodutor YouTube personalizado
 * @param {string} iframeElement - ID do iframe
 * @param {string} videoId - ID do vídeo no YouTube
 * @param {boolean} isMuted - Iniciar com som mudo
 * @param {function} onReadyCallback - Callback quando o player estiver pronto
 * @returns {object} Player do YouTube
 */
function createYouTubePlayer(iframeElement, videoId, isMuted, onReadyCallback) {
    return new YT.Player(iframeElement, {
        videoId,
        playerVars: {
            enablejsapi: 1,
            autoplay: 1,
            controls: 0,
            modestbranding: 1,
            loop: 1,
            playlist: videoId,
            rel: 0,
            playsinline: 1,
            disablekb: 1,
            iv_load_policy: 3,
            fs: 0,
        },
        events: {
            onReady: (event) => {
                const player = event.target;
                if (isMuted) {
                    player.mute();
                } else {
                    player.unMute();
                }
                player.playVideo();
                onReadyCallback?.(player);
            },
        },
    });
}

// ===== COMPONENTE CARD =====

/**
 * Cria um card de filme/série interativo
 * @param {object} item - Objeto com dados do filme/série
 * @returns {HTMLElement} Elemento do card
 */
export function createCard(item) {
    // Container principal do card
    const card = document.createElement('div');
    card.className = 'movie-card';
    if (item.progress) {
        card.classList.add('has-progress');
    }

    // Imagem do card
    const img = document.createElement('img');
    img.src = item.img;
    img.alt = `Capa de ${item.title || 'conteúdo'}`;

    // Iframe para reprodução do YouTube
    const iframe = document.createElement('iframe');
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; encrypted-media';
    iframe.allowFullscreen = true;
    iframe.id = `yt-player-${Math.random().toString(36).slice(2, 10)}`;

    const videoId = getYouTubeId(item.youtube);

    card.appendChild(iframe);
    card.appendChild(img);

    // Dados do card com fallbacks padrão
    const matchScore = item.matchScore || 85;
    const ageBadge = item.age
        ? { text: item.age, class: item.ageClass || '' }
        : { text: '16', class: '' };
    const genres = item.genres || ['Entretenimento'];
    const duration = item.duration || 'N/A';

    // Seção de detalhes (botões, info, tags)
    const details = document.createElement('div');
    details.className = 'card-details';
    details.innerHTML = `
        <div class="details-buttons">
            <div class="left-buttons">
                <button class="btn-icon btn-play-icon" aria-label="Reproduzir"><i class="fas fa-play" style="margin-left:2px;"></i></button>
                ${item.progress ? '<button class="btn-icon" aria-label="Já assistido"><i class="fas fa-check"></i></button>' : '<button class="btn-icon" aria-label="Adicionar à lista"><i class="fas fa-plus"></i></button>'}
                <button class="btn-icon" aria-label="Gostei"><i class="fas fa-thumbs-up"></i></button>
            </div>
            <div class="right-buttons">
                <button class="btn-icon btn-mute-icon" aria-label="Som desligado"><i class="fas fa-volume-mute"></i></button>
                <button class="btn-icon" aria-label="Mais informações"><i class="fas fa-chevron-down"></i></button>
            </div>
        </div>
        <div class="details-info">
            <span class="match-score">${matchScore}% relevante</span>
            <span class="age-badge ${ageBadge.class}">${ageBadge.text}</span>
            <span class="duration">${duration}</span>
            <span class="resolution">HD</span>
        </div>
        <div class="details-tags">
            ${genres.map((genre) => `<span>${genre}</span>`).join('')}
        </div>
    `;
    card.appendChild(details);

    // ===== GERENCIAMENTO DE ESTADO DO CARD =====
    const muteButton = details.querySelector('.btn-mute-icon');
    const muteIcon = muteButton.querySelector('i');
    let isMuted = true;
    let player;
    let playerReady = false;
    let isHovered = false;

    /**
     * Atualiza o ícone de som baseado no estado de mute
     */
    const updateMuteButton = () => {
        muteIcon.classList.toggle('fa-volume-mute', isMuted);
        muteIcon.classList.toggle('fa-volume-up', !isMuted);
        muteButton.setAttribute('aria-label', isMuted ? 'Som desligado' : 'Som ligado');
    };

    /**
     * Inicializa o player do YouTube sob demanda
     * @returns {Promise} Resolve com o player pronto
     */
    const initializePlayer = () => {
        if (playerReady) {
            return Promise.resolve(player);
        }

        // Define o src do iframe antes de criar o player
        if (!iframe.src) {
            iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&mute=1&controls=0&modestbranding=1&loop=1&playlist=${videoId}&rel=0&playsinline=1`;
        }

        return loadYouTubeIframeAPI().then(() => {
            return new Promise((resolve) => {
                player = createYouTubePlayer(iframe.id, videoId, isMuted, (createdPlayer) => {
                    player = createdPlayer;
                    playerReady = true;
                    if (!isHovered) {
                        player.pauseVideo();
                    }
                    resolve(player);
                });
            });
        });
    };

    // ===== EVENT LISTENERS =====

    /**
     * Alterna o estado de mute do player
     */
    muteButton.addEventListener('click', (event) => {
        event.stopPropagation();
        isMuted = !isMuted;
        updateMuteButton();

        if (playerReady && player) {
            if (isMuted) {
                player.mute();
            } else {
                player.unMute();
            }
        }
    });

    // Inicializa o ícone de som
    updateMuteButton();

    // Cria barra de progresso se o conteúdo foi parcialmente assistido
    if (item.progress) {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-bar-container';
        const progressValue = document.createElement('div');
        progressValue.className = 'progress-value';
        progressValue.style.width = `${item.progress}%`;
        progressContainer.appendChild(progressValue);
        card.appendChild(progressContainer);
    }

    let playTimeout;

    /**
     * Ao passar o mouse: inicia reprodução do YouTube após 600ms
     */
    card.addEventListener('mouseenter', () => {
        isHovered = true;
        const rect = card.getBoundingClientRect();
        const windowWidth = window.innerWidth;

        // Ajusta origem de transformação para evitar corte nas bordas
        if (rect.left < 100) {
            card.classList.add('origin-left');
        } else if (rect.right > windowWidth - 100) {
            card.classList.add('origin-right');
        }

        playTimeout = setTimeout(() => {
            initializePlayer()
                .then((currentPlayer) => {
                    if (!isHovered) return; // Cancelado se mouse saiu

                    iframe.classList.add('playing');
                    img.classList.add('playing-video');
                    currentPlayer.playVideo();

                    if (isMuted) {
                        currentPlayer.mute();
                    } else {
                        currentPlayer.unMute();
                    }
                })
                .catch((error) => {
                    console.warn('Erro ao inicializar o player do YouTube:', error);
                });
        }, 600);
    });

    /**
     * Ao sair o mouse: pausa reprodução e remove classes de hover
     */
    card.addEventListener('mouseleave', () => {
        isHovered = false;
        clearTimeout(playTimeout);
        iframe.classList.remove('playing');
        img.classList.remove('playing-video');
        if (playerReady && player) {
            player.pauseVideo();
        }
        card.classList.remove('origin-left');
        card.classList.remove('origin-right');
    });

    return card;
}
