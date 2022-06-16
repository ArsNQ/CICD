# build environment
FROM node:13.12.0-alpine as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 3000
CMD [ "pm2-runtime", "/app/server.js"]
