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

ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_REGION  = us-east-1

FROM node:16.13.1
ENV NODE_ENV=production
WORKDIR /usr/src/app
RUN echo "[default]" >> ~/.aws/credentials
RUN echo "aws_access_key_id = $AWS_ACCESS_KEY_ID" >> ~/.aws/credentials
RUN echo "aws_secret_access_key = $AWS_SECRET_ACCESS_KEY" >> ~/.aws/credentials
RUN echo "region = $AWS_REGION" >> ~/.aws/credentials

COPY .env .env
COPY package*.json ./
RUN npm install
COPY --from=builder /usr/src/app/dist/ dist/
EXPOSE $PORT
ENTRYPOINT ["node", "dist/main.js" ]