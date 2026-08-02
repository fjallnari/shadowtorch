# ---- build ----
FROM node:22-alpine AS build
WORKDIR /app
RUN npm install -g pnpm@10
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
ARG LIGHTS_ENABLED=false
ENV LIGHTS_ENABLED=$LIGHTS_ENABLED
RUN pnpm run build

# ---- prod ----
FROM node:22-alpine AS runtime
WORKDIR /app
RUN npm install -g pnpm@10
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile
COPY --from=build /app/build ./build
EXPOSE 3000
CMD ["node", "build"]