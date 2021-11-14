# BUILD ENVIRONMENT
FROM node:12.2.0-alpine as build

WORKDIR /app
COPY ./app/package.json /app/package.json

RUN npm install

COPY ./app /app

RUN npm run build

# PRODUCT ENVIRONMENT
FROM nginx:1.16.0-alpine
COPY --from=build ./app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]