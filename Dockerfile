FROM node:22-bookworm-slim
RUN corepack enable
WORKDIR /app
COPY . .
# pnpm-workspace.yaml here only carries ignoredBuiltDependencies (no packages) -> breaks install; drop it
RUN rm -f pnpm-workspace.yaml && pnpm install --no-frozen-lockfile
RUN pnpm build
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
EXPOSE 3000
CMD ["pnpm","start"]
