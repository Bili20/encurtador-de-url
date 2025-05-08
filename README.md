# Encurtador de URL

Este projeto é um encurtador de URL desenvolvido como estudo de tecnologias para construção de aplicações web. Ele permite que URLs longas sejam transformadas em URLs curtas.

## Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Express**
- **Knex.js**
- **PostgreSQL**
- **Docker**
- **Redis**

## Funcionalidades

- Encurtar URLs longas.
- Rate limiting para evitar abusos
- Redirecionar para a URL original a partir da URL curta.
- Interface para o usuário.
- Copiar a URL encurtada para a área de transferência.
- Cache automático de URLs populares
- Jobs agendados para otimização do cache

## Comandos

1 - `npm run build:front` faz o build do front.
2 - `npm run start` levanta o servidor do backend.
