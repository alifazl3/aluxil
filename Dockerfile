FROM node:22-bookworm-slim
RUN npm i -g pnpm@10.33.0
WORKDIR /app
COPY . .
RUN pnpm install --no-frozen-lockfile
RUN pnpm build
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
EXPOSE 3000
CMD ["pnpm","start"]
