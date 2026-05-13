/**
 * Componente de Carrossel
 * Renderiza um carrossel de filmes/séries com título e cards
 */

import { createCard } from './Card.js';

/**
 * Cria um carrossel de categoria
 * @param {object} category - Objeto com título e itens
 * @returns {HTMLElement} Elemento da seção do carrossel
 */
export function createCarousel(category) {
    // Container principal da seção
    const section = document.createElement('div');
    section.className = 'slider-section';

    // Header com título e indicadores
    const header = document.createElement('div');
    header.className = 'slider-header';

    const title = document.createElement('h2');
    title.className = 'slider-title';
    title.textContent = category.title;

    const indicators = document.createElement('div');
    indicators.className = 'slider-indicators';

    header.appendChild(title);
    header.appendChild(indicators);
    section.appendChild(header);

    // Row com cards dos filmes/séries
    const row = document.createElement('div');
    row.className = 'movie-row';

    category.items.forEach(item => {
        const card = createCard(item);
        row.appendChild(card);
    });

    section.appendChild(row);
    return section;
}
