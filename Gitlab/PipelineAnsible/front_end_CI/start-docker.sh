#!/bin/bash

cd front && docker-compose build
cd ../nginx-ssl && docker-compose up -d
