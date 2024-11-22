# Etapa de build
FROM node:18 AS build

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos necessários para instalar as dependências
COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

# Instale as dependências de desenvolvimento e produção
RUN npm install

# Copie todo o código da aplicação
COPY . .

# Execute o build da aplicação
RUN npm run build

# Etapa de produção
FROM node:18-slim

# Defina o diretório de trabalho
WORKDIR /app

# Copie apenas os arquivos necessários
COPY package*.json ./

# Instale apenas as dependências de produção
RUN npm install --production

# Instale o Prisma CLI para executar as migrações
RUN npm install prisma --no-save

# Copie o código compilado e os arquivos do Prisma
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

# Exponha a porta que a aplicação utiliza (ajuste se necessário)
EXPOSE 8080

# Comando para executar migrações e iniciar a aplicação
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
