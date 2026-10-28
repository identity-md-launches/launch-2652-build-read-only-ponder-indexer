FROM node:22.22.0-bookworm-slim
WORKDIR /app

# Match packageManager in package.json. Registry access is needed at build time.
RUN npm install --global pnpm@10.28.2
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm codegen && pnpm typecheck \
    && node -e "require('node:fs').writeFileSync('.build-id', 'plea_' + require('node:crypto').randomUUID().replaceAll('-', '') + '\n')" \
    && chown -R node:node /app

ENV NODE_ENV=production
ENV PORT=42069
USER node
EXPOSE 42069
HEALTHCHECK --interval=30s --timeout=5s --start-period=3600s --retries=3 CMD ["node", "scripts/healthcheck.mjs"]
CMD ["sh", "scripts/start.sh"]
