# Promptup App

Aplicação permite o compartilhamento de Prompts de IA. O usuário é capaz de autenticar-se utilizando uma conta do github e criar Prompts que poderão ser compartilhados com outros usuários. O objetivo da criação desse projeto é o aprendizado dos conceitos mais importantes do Next.js e como eles se encaixam no ecossistema React.

## Pré-requisitos para execução local

- NodeJS v20 ou superior
- MongoDB v5 ou superior

## Instalação Local

1. Clone o repositório
2. Execute o comando `npm install` na raiz do projeto
3. Crie um arquivo `.env.local` e preencha com as variáveis de ambiente necessárias, conforme arquivo `.env.example`
4. Execute o comando `npm run dev` para iniciar o servidor local
5. Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para visualizar o projeto

## Instalação Docker

1. Clone o repositório
2. Altere o arquivo `docker-compose.yaml` com as variáveis de ambiente necessárias
4. Execute o comando `docker-compose up -d --build` para criar os conteineres do banco de dados MongoDB e Aplicação Node
5. Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para visualizar o projeto

## Tecnologias utilizadas

- [NextJS 13](https://nextjs.org/docs)
- [Tailwind](https://tailwindcss.com/docs/installation)
- [MongoDB](https://www.mongodb.com/)

## Referência

Desenvolvimento à partir do curso disponibilizado pelo canal do YouTube [JavaScript Mastery](https://www.youtube.com/watch?v=wm5gMKuwSYk&ab_channel=JavaScriptMastery).
