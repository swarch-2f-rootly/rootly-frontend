# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Compilar CSS con Tailwind (necesario para SSR)
RUN npm run build:css

# Construir aplicación para producción (cliente y servidor)
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependencias de producción + tsx para ejecutar el servidor
RUN npm ci --omit=dev && npm install tsx

# Copiar archivos construidos desde el builder
COPY --from=builder /app/dist ./dist

# Copiar archivos necesarios para el servidor SSR
COPY server.ts ./
COPY vite.config.ts ./
COPY index.html ./
COPY build-css.js ./

# Variables de entorno para producción
ENV NODE_ENV=production
ENV PORT=3000

# Expose port 3000
EXPOSE 3000

# Healthcheck para Docker/Kubernetes
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

# Iniciar servidor SSR con tsx
CMD ["npx", "tsx", "server.ts"]
