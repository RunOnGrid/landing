# Multi-stage build for Next.js standalone server
FROM node:23.5.0-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci && npm cache clean --force

# Copy source
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

FROM node:23.5.0-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Runtime environment variables (override in `docker run`)
ENV AKASH_API=
ENV SMTP_TO=
ENV SMTP_FROM=
ENV SMTP_HOST=
ENV SMTP_PASS=
ENV SMTP_PORT=
ENV SMTP_SECURE=
ENV SMTP_USER=
# Copy standalone output
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./

EXPOSE 3000

CMD ["node", "server.js"]
