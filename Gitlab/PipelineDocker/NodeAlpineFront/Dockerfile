FROM node:13.12.0-alpine as builder

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
RUN npm install --silent
RUN npm install react-scripts --silent

# add app
COPY . ./

# start app
RUN npm run build

#production environement
FROM nginx:stable-alpine

COPY --from=builder ./app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
