#!/bin/bash
# Inicia el túnel Cloudflare para Postiz (HTTPS). Úsalo cuando quieras conectar Instagram u otras apps que no aceptan localhost.
# Deja esta terminal abierta; al cerrarla se corta el túnel.

cd "$(dirname "$0")"
echo "Iniciando túnel a http://localhost:4007 ..."
echo "Cuando aparezca la URL https://....trycloudflare.com, úsala para:"
echo "  1. Entrar a Postiz en el navegador"
echo "  2. En Meta (developers.facebook.com) → tu app → Facebook Login → Valid OAuth Redirect URIs:"
echo "     https://TU-URL-AQUI/integrations/social/instagram"
echo "     https://TU-URL-AQUI/integrations/social/facebook"
echo ""
cloudflared tunnel --url http://localhost:4007
