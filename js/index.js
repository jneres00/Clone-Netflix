/**
 * Gerencia a seleção de perfil na tela inicial
 * Armazena o perfil selecionado no localStorage e o carrega na página de catálogo
 */

document.addEventListener('DOMContentLoaded', () => {
    const profileLinks = document.querySelectorAll('.profile');

    profileLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Extrai o nome e imagem do perfil clicado
            const profileName = link.querySelector('figcaption')?.textContent.trim();
            const profileImage = link.querySelector('img')?.getAttribute('src');

            // Valida se encontrou os dados
            if (!profileName || !profileImage) {
                console.warn('Perfil inválido: dados incompletos');
                return;
            }

            // Armazena os dados no localStorage para uso na página de catálogo
            try {
                localStorage.setItem('profileName', profileName);
                localStorage.setItem('profileImage', profileImage);
            } catch (error) {
                console.error('Erro ao salvar perfil no localStorage:', error);
                // Continua mesmo se localStorage falhar (pode estar em modo privado)
            }
        });
    });
});