#FROM mhart/alpine-node:11 AS builder
FROM node:lts

WORKDIR /app
COPY front/app /app

RUN mkdir /build-dir
RUN cp -r . /build-dir

WORKDIR /build-dir

RUN yarn install
RUN yarn build