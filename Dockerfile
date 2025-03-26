FROM node:22-slim

WORKDIR /app

RUN npm install -g pnpm@10

COPY package*.json ./pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD pnpm run build && node build