FROM node:22-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

# COPY pnpm-lock.yaml pnpm-workspace.yaml package*.json ./
RUN pnpm install --filter=@showcase-mono/backend --frozen-lockfile
COPY packages/backend ./packages/backend

WORKDIR /app/packages/backend
RUN pnpm run build
RUN pnpm prune --prod

# ---------------------------

FROM node:22-alpine AS runner

ARG ENV_PORT
ENV PORT=$ENV_PORT
ENV NODE_ENV=production

USER node

COPY --from=builder ./app/packages/backend/package*.json ./
COPY --from=builder ./app/packages/backend/node_modules ./node_modules
COPY --from=builder ./app/packages/backend/dist ./dist

EXPOSE ${PORT}

CMD ["node", "dist/app.js"]