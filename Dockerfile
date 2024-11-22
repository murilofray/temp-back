# Etapa de construção
FROM node:18.20-alpine AS builder

# Cria o diretório da aplicação
WORKDIR /usr/src/app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia todo o código-fonte
COPY . .

# Gera o cliente Prisma
RUN npx prisma generate  # Gera o cliente Prisma aqui

# Expondo a porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]  # Inicia a aplicação
