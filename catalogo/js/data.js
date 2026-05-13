/**
 * Dados do catálogo de filmes e séries
 * 
 * Estrutura do objeto item:
 * - img (string): URL da imagem de capa
 * - matchScore (number): Porcentagem de compatibilidade (0-100)
 * - age (string): Classificação indicativa ('16', '18', etc)
 * - genres (array): Lista de gêneros
 * - duration (string): Duração ou número de temporadas
 * - youtube (string): URL do vídeo de preview no YouTube
 * - progress (number, opcional): Progresso de assistência em % (0-100)
 * - ageClass (string, opcional): Classe CSS para estilo especial
 */

export const categories = [
    {
        title: "Mais assistidos",
        items: [
            {
                img: "https://imgs.elpais.com.uy/dims4/default/d59030a/2147483647/strip/true/crop/688x473+131+0/resize/1440x990!/format/webp/quality/90/?url=https%3A%2F%2Fel-pais-uruguay-production-web.s3.us-east-1.amazonaws.com%2Fbrightspot%2Fuploads%2F2020%2F06%2F25%2F5ef4e52c9046d.jpeg",
                top10: true,
                badge: "Clássico",
                badgeColor: "green",
                progress: 70,
                matchScore: 90,
                age: '16',
                ageClass: '',
                genres: ['Suspense', 'Ficção científica'],
                duration: '3 temporadas',
                youtube: "https://youtu.be/JCCssUOtn2E"
            },
            {
                img: "https://dnm.nflximg.net/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABTWGrLjDUXHyZZwVT2_kjTXOq8nF8IBgEL5Gp3i97xghSCY3z5nsAKDRMm5qmQ9KNUFFnbWufml7YIz9hVHDoBxpqsrKS_S-VS_5.jpg?r=94b",
                progress: 0,
                matchScore: 96,
                age: '16',
                ageClass: '',
                genres: ['Ficção científica'],
                duration: '5 temporadas',
                youtube: "https://youtu.be/b9EkMc79ZSU"
            },
            {
                img: "https://portaln10.com.br/wp-content/uploads/2025/03/black-mirror-poster-gbqux8n5pndwjdrn.jpg",
                progress: 0,
                matchScore: 90,
                age: '16',
                ageClass: 'red-accent',
                genres: ['Ficção científica', 'Suspense', 'Distopia'],
                duration: '7 temporadas',
                youtube: "https://youtu.be/M8qG0vS2zWM"
            },
            {
                img: "https://cdn.oantagonista.com/uploads/2024/06/O-Mal-Que-Nos-Habita-o-filme-de-terror-argentino-estreia-no-Streaming.jpg",
                progress: 0,
                matchScore: 75,
                age: '18',
                ageClass: 'red-accent',
                genres: ['Terror', 'Sobrenatural', 'Latino'],
                duration: '1h 40m',
                youtube: "https://youtu.be/RNLsXOmnbT0"
            },
        ]
    },
    {
        title: "Séries",
        items: [
            {
                img: "https://m.media-amazon.com/images/S/pv-target-images/76a7d0394a37009f3fc2ca61f1b777eb44f00930f4a51ce77c5ce521b8f90af0.png",
                top10: true,
                badge: "Nova temporada",
                badgeColor: "red",
                matchScore: 97,
                age: '16',
                ageClass: '',
                genres: ['Comédia Sombria', 'Drama'],
                duration: '2 temporadas',
                youtube: "https://youtu.be/FjDCzYrPTi0"
            },
            {
                img: "https://i.ytimg.com/vi/Hn38T0GxGcA/maxresdefault.jpg",
                top10: true,
                matchScore: 92,
                age: '14',
                ageClass: '',
                genres: ['Drama','Crime'],
                duration: '6 temporadas',
                youtube: "https://youtu.be/-34d3TT0Wo4"
            },
            {
                img: "https://ca-times.brightspotcdn.com/dims4/default/d0dd73f/2147483647/strip/true/crop/4680x3240+0+0/resize/1200x831!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F5e%2F51%2F08e2ace149ff9067e7b5bf86e8c5%2Fthe-office-20th-copy.jpg",
                badge: "Novo episódio",
                badgeColor: "red",
                matchScore: 95,
                age: '16',
                ageClass: '',
                genres: ['Comédia', 'Sitcom'],
                duration: '9 temporadas',
                youtube: "https://www.youtube.com/watch?v=wLo9bfgla4k"
            },
            {
                img: "https://oespecialista.safra.com.br/wp-content/uploads/2021/10/squid-game-round-6-netflix.jpg",
                badge: "Novidade",
                badgeColor: "red",
                matchScore: 88,
                age: '16',
                ageClass: '',
                genres: ['Sobrevivência', 'Thriller', 'Distopia'],
                duration: '3 temporadas',
                youtube: "https://youtu.be/Ncra_hUVtMM"
            },
        ]
    },
    {
        title: "Para maratonar",
        items: [
            {
                img: "https://m.media-amazon.com/images/S/pv-target-images/d9ee3ff94f3c9718a7946d1f797cb077e058adaef1e9632f3543e57e7f96af98.jpg",
                top10: true,
                matchScore: 93,
                age: '16',
                ageClass: '',
                genres: ['Terror', 'Suspense', 'Mistério'],
                duration: '1 temporada',
                youtube: "https://youtu.be/OJCbEude3_E"
            },
            {
                img: "https://files.tecnoblog.net/wp-content/uploads/2022/06/breaking-bad.jpg",
                top10: true,
                badge: "Novidade",
                badgeColor: "red",
                matchScore: 94,
                age: '16',
                ageClass: '',
                genres: ['Crime', 'Drama', 'Clássico'],
                duration: '5 temporadas',
                youtube: "https://youtu.be/HhesaQXLuRY"
            },
            {
                img: "https://resizing.flixster.com/N-FkVr-YyPaA5CytibVOKCR5U5E=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p16594930_b_h8_ak.jpg",
                top10: true,
                badge: "Novo episódio",
                badgeColor: "red",
                matchScore: 93,
                age: '16',
                ageClass: '',
                genres: ['Ficção científica', 'Fantasia'],
                duration: '4 temporadas',
                youtube: "https://youtu.be/CZcq9iPbjLg"
            },
            {
                img: "https://occ-0-8407-90.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABZpptxbVQLE7xYv8Y9RyAM7b_m_YiDVK6Ry6vvNR_ImjZcUovjU5KhOj8NMaKK4Ysw4xOtOG45ib9EYyyjSJ8ovBhQiNQdMYmE6o7tybM5ww58ZqyU-OtQuZBGC9OMXWUOCcEw.webp?r=11b",
                top10: true,
                badge: "Novo episódio",
                badgeColor: "red",
                matchScore: 89,
                age: '16',
                ageClass: '',
                genres: ['Mocumentário', 'Comédia'],
                duration: '1 temporada',
                youtube: "https://www.youtube.com/watch?v=wLo9bfgla4k"
            },
        ]
    }
];
