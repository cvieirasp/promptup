FROM node:slim

ARG GITHUB_CLIENT_ID
ARG GITHUB_CLIENT_SECRET
ARG MONGODB_URI
ARG NEXTAUTH_URL
ARG NEXTAUTH_URL_INTERNAL
ARG NEXTAUTH_SECRET

RUN apt-get update && \
    apt-get install -y wget netcat && \
    wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
    chmod +x /usr/bin/wait-for

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
