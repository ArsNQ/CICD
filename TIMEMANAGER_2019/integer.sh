#/bin/bash

app=$1

sed -i "s/^APP_VERSION=.*/APP_VERSION=$app/" .env
