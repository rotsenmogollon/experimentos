#!/usr/bin/env bash
# Inicia un túnel Cloudflare hacia Mixpost (localhost:9090).
# No cierres esta terminal mientras quieras usar el túnel.
# Requiere: cloudflared instalado y Mixpost corriendo (docker compose up -d).

set -e
cd "$(dirname "$0")"

if ! command -v cloudflared &>/dev/null; then
  echo "No se encontró 'cloudflared'. Instálalo primero:"
  echo "  Linux: curl -L -o cloudflared https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 && chmod +x cloudflared && sudo mv cloudflared /usr/local/bin/"
  echo "  macOS: brew install cloudflared"
  exit 1
fi

echo "Asegúrate de que Mixpost esté corriendo: docker compose up -d"
echo ""
echo "Iniciando túnel a http://localhost:9090 ..."
echo "Cuando veas la URL (https://....trycloudflare.com), cópiala y en otra terminal ejecuta:"
echo "  export MIXPOST_APP_URL=https://ESA-URL.trycloudflare.com"
echo "  docker compose up -d --force-recreate app"
echo ""
cloudflared tunnel --url http://localhost:9090
