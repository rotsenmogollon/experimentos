# Mixpost en local

Para usar Mixpost en tu máquina (sin servidor remoto) y probar la programación del calendario.

Si algo no arranca bien, revisa la guía oficial: [Mixpost Lite - Docker](https://docs.mixpost.app/lite/installation/docker/).

**Si no ves Instagram al añadir cuentas:** sigue la guía **[CONFIGURAR-INSTAGRAM.md](./CONFIGURAR-INSTAGRAM.md)** (redirect URIs, Admin Console → Services, permisos en Meta).

**Para probar con HTTPS (p. ej. redirect de Instagram en Meta):** usa un túnel Cloudflare. Guía **[TUNEL-CLOUDFLARE.md](./TUNEL-CLOUDFLARE.md)**. Comando rápido: `./iniciar-tunel.sh` (o `cloudflared tunnel --url http://localhost:9090`).

## Requisitos

- **Docker** y **Docker Compose** instalados.

## Levantar Mixpost

Desde esta carpeta:

```bash
cd mixpost-local
docker compose up -d
```

La primera vez descargará las imágenes (Mixpost, MySQL, Redis) y puede tardar unos minutos. Se usa el puerto **9090** (cámbialo en `docker-compose.yml` si está ocupado).

## Acceso

1. Abre el navegador en: **http://localhost:9090**
2. Completa el asistente de instalación (crear cuenta de administrador, etc.).
3. Crea un **workspace** y conecta al menos una cuenta (ej. Instagram) desde el panel.
4. Genera un **Access Token**: menú de usuario (arriba a la derecha) → **Access Tokens** → **Create** → copia el token.

## Configurar el proyecto para usar Mixpost local

En la raíz del proyecto (`experimentos/`), en tu archivo `.env`:

```env
MIXPOST_BASE_URL=http://localhost:9090
MIXPOST_CORE_PATH=mixpost
MIXPOST_WORKSPACE_UUID=<el UUID de tu workspace>
MIXPOST_ACCESS_TOKEN=<el token que copiaste>
```

Para ver el **Workspace UUID**: en Mixpost, al entrar a un workspace la URL suele ser algo como  
`http://localhost:9090/mixpost/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`. Esa parte final es el UUID.

## Programar en local

Con Mixpost corriendo y `.env` configurado:

```bash
npm run schedule
```

## Parar Mixpost

```bash
cd mixpost-local
docker compose down
```

Para borrar también los datos (base de datos, storage):

```bash
docker compose down -v
```
