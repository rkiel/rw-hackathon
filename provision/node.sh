#!/usr/bin/env bash

echo "Installing node"

echo "  adding chris-lea repository"
add-apt-repository -y ppa:chris-lea/node.js >/dev/null 2>&1

echo "  updating"
apt-get update >/dev/null 2>&1

echo "  installing node.js"
apt-get install -y nodejs >/dev/null 2>&1

echo "  installing npm"
apt-get install -y npm >/dev/null 2>&1

echo "  installing gcc make build-essential"
apt-get install -y gcc make build-essential

echo "  installing webpack"
npm install -g webpack >/dev/null 2>&1

echo "node installed"
