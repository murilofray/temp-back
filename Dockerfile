# Etapa de build
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./ 
COPY tsconfig.json ./ 
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npm run build

# Etapa de produção
FROM node:18-slim

WORKDIR /app

# Instalar dependências do sistema
RUN apt-get update -y && apt-get install -y openssl ca-certificates

COPY package*.json ./ 

RUN npm ci --only=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

# Gerar o cliente Prisma
RUN npx prisma generate

# Configurar variáveis de ambiente
ENV DATABASE_URL="mysql://ifsp:3y1jKK9PsvD9@secedu.mysql.database.azure.com:3306/secedu?sslaccept=accept_invalid_certs"

EXPOSE 8080

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
