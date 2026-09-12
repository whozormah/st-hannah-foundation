# Built in CI and pulled by the droplet (ARC-05). Never built on the server.
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# npm ci against the committed lockfile: the spike found npm re-resolving this
# tree can fail spuriously, so a deploy must never depend on resolution.
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/next.config.ts ./next.config.ts
COPY --from=build /app/payload.config.ts ./payload.config.ts
COPY --from=build /app/payload ./payload
COPY --from=build /app/migrations ./migrations
COPY --from=build /app/tsconfig.json ./tsconfig.json

USER nextjs
EXPOSE 3000
CMD ["npm", "run", "start"]
