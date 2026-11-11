#!/usr/bin/env sh
# Abre o Dojo no Linux e no macOS. Deixe o terminal aberto enquanto estuda (Ctrl+C encerra).
cd "$(dirname "$0")" || exit 1
[ -d node_modules/typescript ] || npm install
exec node servidor.mjs
