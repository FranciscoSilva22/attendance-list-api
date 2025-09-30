# Usa uma imagem base com Node.js
FROM node:20-bullseye

# Define o diretório de trabalho dentro do container
WORKDIR /app

RUN apt-get update && apt-get install -y postgresql-client

COPY package*.json ./
# Instala as dependências
RUN npm install

# Copia os arquivos do projeto para o container
COPY . .

RUN npm run build

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expõe a porta usada pelo AdonisJS
EXPOSE 3333

CMD ["sh", "/entrypoint.sh"]