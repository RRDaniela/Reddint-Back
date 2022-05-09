FROM node:16.13.1 as builder

WORKDIR /usr/src/app
# Copy files to /usr/src/app
COPY package*.json ./
# Install packages
RUN npm install
COPY tsconfig*.json ./
COPY src src
# Build ts project
RUN npm run build

FROM node:16.13.1
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY .env .env
COPY package*.json ./
RUN npm install
COPY --from=builder /usr/src/app/dist/ dist/
EXPOSE $PORT
ENTRYPOINT ["node", "dist/main.js" ]