FROM node:18

WORKDIR /app

# Copia apenas arquivos essenciais primeiro (cache melhor)
COPY package.json package-lock.json ./

RUN npm install

# Copia o restante do código
COPY . .

# Porta usada pelo backend
EXPOSE 5000

# Comando final para iniciar o servidor
CMD ["node", "server.js"]