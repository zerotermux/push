#!/usr/bin/bash

echo -e "\n\n\t\x1b[46m\x1b[1m\x20\x20START INSTALLATION\x20\x20\x1b[0m\n\n"

pkg update -y && pkg install -y git nodejs ffmpeg unzip

rm -rf node_modules
rm -rf data/auth
rm -rf data/store.json

npm i

echo -e "\n\n\t\x1b[44m\x1b[1m\x20\x20FINISHED INSTALLATION\x20\x20\x1b[0m\n"

npm start
