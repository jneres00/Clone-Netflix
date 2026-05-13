/**
 * Funções utilitárias para o processamento de dados de vídeos e conteúdo
 */

/**
 * Extrai o ID do YouTube de uma URL
 * @param {string} url - URL do YouTube
 * @returns {string} ID do vídeo ou ID padrão se inválido
 */
export function getYouTubeId(url) {
    if (!url) {
        return '7RUA0IOfar8'; // Vídeo padrão caso não haja URL
    }

    // Trata URL no formato: https://youtu.be/ID
    if (url.includes('youtu.be')) {
        return url.split('/').pop().split('?')[0];
    }

    // Trata URL no formato: https://www.youtube.com/watch?v=ID
    if (url.includes('v=')) {
        return url.split('v=')[1].split('&')[0];
    }

    // Retorna a última parte da URL como fallback
    return url.split('/').pop();
}
