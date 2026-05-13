/**
 * Inicializa a página de catálogo
 * Carrega o perfil selecionado e cria os carrosséis de filmes/séries
 */

import { categories } from './data.js';
import { createCarousel } from './components/Carousel.js';

document.addEventListener('DOMContentLoaded', () => {
    // Recupera o perfil selecionado do localStorage
    const profileName = localStorage.getItem('profileName');
    const profileImage = localStorage.getItem('profileImage');

    // Atualiza a UI com informações do perfil selecionado
    if (profileName && profileImage) {
        const profileNameElement = document.querySelector('.kids-link');
        const profileIconElement = document.querySelector('.profile-icon');

        const normalizedProfileImage = profileImage.startsWith('./')
            ? `../${profileImage.slice(2)}`
            : profileImage.startsWith('assets/')
                ? `../${profileImage}`
                : profileImage;

        if (profileNameElement) {
            profileNameElement.textContent = profileName;
        }
        if (profileIconElement) {
            profileIconElement.src = normalizedProfileImage;
        }
    }

    // Renderiza os carrosséis de categorias
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        categories.forEach(category => {
            const carousel = createCarousel(category);
            mainContent.appendChild(carousel);
        });
    }
});
