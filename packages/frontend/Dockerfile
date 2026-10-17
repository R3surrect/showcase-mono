FROM node:24-alpine AS builder
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

ARG VITE_BACKEND_API_URL
ARG VITE_FRONTEND_PORT

ENV VITE_BACKEND_API_URL=$VITE_BACKEND_API_URL
ENV VITE_FRONTEND_PORT=$VITE_FRONTEND_PORT

WORKDIR /app/packages/frontend

RUN pnpm run build
RUN pnpm prune --prod

# ---------------------------

FROM caddy:2.11.7-alpine AS runner

ENV NODE_ENV=production

COPY --from=builder /app/packages/frontend/dist /usr/share/caddy

EXPOSE ${VITE_FRONTEND_PORT}
CMD caddy file-server --root /usr/share/caddy --listen :${VITE_FRONTEND_PORT}
