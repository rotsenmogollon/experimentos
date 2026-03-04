# Túnel Cloudflare para probar Mixpost con HTTPS

Así puedes usar una URL pública HTTPS (por ejemplo para que Meta acepte el redirect de Instagram). El túnel es temporal: al cerrar la terminal se pierde la URL.

## Requisitos

- **cloudflared** instalado.
- Mixpost corriendo en el puerto 9090 (`docker compose up -d`).

## Instalar cloudflared (si no lo tienes)

**Linux (64 bits):**
```bash
curl -L -o cloudflared https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
chmod +x cloudflared
sudo mv cloudflared /usr/local/bin/
```

**macOS (Homebrew):**
```bash
brew install cloudflared
```

**Windows:** Descarga desde [github.com/cloudflare/cloudflared/releases](https://github.com/cloudflare/cloudflared/releases).

---

## Pasos para probar

### 1. Asegúrate de que Mixpost esté corriendo

```bash
cd mixpost-local
docker compose ps
```

Si el servicio `app` no está "Up", ejecuta:

```bash
docker compose up -d
```

### 2. Inicia el túnel

En una terminal:

```bash
cloudflared tunnel --url http://localhost:9090
```

Verás algo como:

```
Your quick Tunnel has been created! Visit it at:
https://algo-random.trycloudflare.com
```

**Copia esa URL** (por ejemplo `https://abc-xyz-123.trycloudflare.com`). **No cierres esa terminal** mientras quieras usar el túnel.

### 3. Indica a Mixpost que use la URL del túnel

En **otra terminal**, desde la carpeta `mixpost-local`:

```bash
export MIXPOST_APP_URL=https://TU-URL-AQUI.trycloudflare.com
docker compose up -d --force-recreate app
```

Sustituye `TU-URL-AQUI` por la URL que te dio cloudflared (sin barra final). Ejemplo:

```bash
export MIXPOST_APP_URL=https://abc-xyz-123.trycloudflare.com
docker compose up -d --force-recreate app
```

### 4. Configura Meta (Facebook/Instagram) con la URL del túnel

En la app de Meta, en los **URI de redireccionamiento** (Facebook Login y/o Instagram Business login), usa:

- `https://TU-URL.trycloudflare.com/mixpost/callback/facebook_page`
- `https://TU-URL.trycloudflare.com/mixpost/callback/instagram`

(Con la misma URL que copiaste, sin barra final antes de `/mixpost`.)

Guarda los cambios.

### 5. Usa Mixpost por el túnel

- Abre en el navegador: **https://TU-URL.trycloudflare.com**
- Inicia sesión si hace falta.
- Ve a **Social Accounts** → **Add account** → **Instagram** y sigue el flujo.

---

## Dejar de usar el túnel

1. En la terminal donde corre `cloudflared`, pulsa **Ctrl+C**.
2. Para que Mixpost vuelva a localhost:

   ```bash
   cd mixpost-local
   unset MIXPOST_APP_URL
   docker compose up -d --force-recreate app
   ```

---

## Nota

Cada vez que ejecutes `cloudflared tunnel --url http://localhost:9090` puede generarse una **URL distinta**. Si cambia, repite el paso 3 (MIXPOST_APP_URL) y el paso 4 (URIs en Meta) con la nueva URL.
