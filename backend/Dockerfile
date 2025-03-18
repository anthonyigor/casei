# Etapa de build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de produção
FROM node:18-slim
WORKDIR /app

# Instalar OpenSSL
RUN apt-get update -y && apt-get install -y openssl

COPY --from=builder /app .

# Gera os arquivos Prisma Client
RUN npx prisma generate

EXPOSE 5000
CMD ["npm", "run", "start"]
