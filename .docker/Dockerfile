# Multi-stage build for Next.js static site
FROM node:23.5.0-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci && npm cache clean --force

# Copy source code
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Set empty environment variables for build (app will work without functionality)
ENV SMTP_HOST=""
ENV SMTP_PORT=""
ENV SMTP_SECURE=""
ENV SMTP_USER=""
ENV SMTP_PASS=""
ENV SMTP_TO=""

# Build the application
RUN npm run build

# Production stage with nginx
FROM nginx:alpine

# Install gettext for envsubst (environment variable substitution)
RUN apk add --no-cache gettext

# Copy static files from builder
COPY --from=builder /app/out /usr/share/nginx/html

# Copy nginx configuration template
COPY .docker/nginx/default.conf.template /etc/nginx/templates/default.conf.template

# Set default environment variables (can be overridden at runtime)
ENV NGINX_PORT=80
ENV CORS_ORIGIN="*"
ENV CACHE_MAX_AGE=31536000

# Runtime SMTP variables (empty by default - email won't work but app will run)
ENV SMTP_HOST=""
ENV SMTP_PORT=""
ENV SMTP_SECURE=""
ENV SMTP_USER=""
ENV SMTP_PASS=""
ENV SMTP_TO=""

# Expose port
EXPOSE 80

# Start nginx (templates are automatically processed)
CMD ["nginx", "-g", "daemon off;"]
