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
COPY --from=builder /app .
EXPOSE 5000
CMD ["npm", "run", "start"]