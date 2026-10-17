FROM node:22-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

# COPY pnpm-lock.yaml pnpm-workspace.yaml package*.json ./
RUN pnpm install --filter=@showcase-mono/backend --frozen-lockfile
COPY packages/backend ./packages/backend

ARG PORT
ARG PGUSER
ARG PGPASSWORD
ARG PGHOST
ARG PGPORT
ARG PGDATABASE

ENV PORT=$PORT
ENV PGUSER=$PGUSER
ENV PGPASSWORD=$PGPASSWORD
ENV PGHOST=$PGHOST
ENV PGPORT=$PGPORT
ENV PGDATABASE=$PGDATABASE

ENV NODE_ENV=production

WORKDIR /app/packages/backend
RUN pnpm run build
RUN pnpm prune --prod

# ---------------------------

FROM node:22-alpine AS runner

USER node

COPY --from=builder ./app/packages/backend/package*.json ./
COPY --from=builder ./app/packages/backend/node_modules ./node_modules
COPY --from=builder ./app/packages/backend/dist ./dist

EXPOSE ${PORT}

CMD ["node", "dist/app.js"]