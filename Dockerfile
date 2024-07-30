FROM node:18-alpine

WORKDIR /home/app

# Copiar package.json e package-lock.json antes para aproveitar cache do Docker
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos
COPY . .

EXPOSE 3333

CMD [ "npm", "run", "dev" ]
