FROM node:22-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-lock.yaml pnpm-workspace.yaml package*.json ./
COPY ./packages/frontend/package*.json ./packages/frontend/
COPY packages/api-client/package*.json ./packages/api-client/
COPY packages/backend/package*.json ./packages/backend/
COPY packages/api-client ./packages/api-client

RUN pnpm install --filter=@showcase-mono/frontend... --frozen-lockfile

COPY packages/frontend ./packages/frontend
COPY packages/backend ./packages/backend

WORKDIR /app/packages/frontend

RUN pnpm run build
RUN pnpm prune --prod

# ---------------------------

FROM caddy:2.11.7-alpine AS runner

ARG ENV_PORT
ENV PORT=$ENV_PORT
ENV NODE_ENV=production

COPY --from=builder /app/packages/frontend/dist /usr/share/caddy

EXPOSE ${PORT}
CMD caddy file-server --root /usr/share/caddy --listen :$PORT
