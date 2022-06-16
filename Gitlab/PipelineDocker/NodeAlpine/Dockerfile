# build environment
FROM node:13.12.0-alpine as build
WORKDIR ./
#ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /build /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
