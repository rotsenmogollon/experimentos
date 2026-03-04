#!/usr/bin/env bash
# Ejecuta la programación en Postiz (40 piezas). Para usar con cron en tu servidor.
# Requiere: repo clonado, .env con POSTIZ_*, npm install ya hecho.
set -e
cd "$(dirname "$0")/.."
export NODE_ENV=production
npx tsx src/commands/schedule-postiz.ts
