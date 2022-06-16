#!/bin/sh

cp -r /build-dir/build front/app/ 
cp -r front/app/build ./nginx-ssl/public/
