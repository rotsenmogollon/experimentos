# Postiz en local

Para usar Postiz en tu máquina y programar el calendario de Financiera Mi Casa.

Documentación oficial: [Postiz - Docker Compose](https://docs.postiz.com/installation/docker-compose)

## Requisitos

- **Docker** y **Docker Compose** instalados
- Al menos **2 GB de RAM** disponibles (Postiz + Temporal + Elasticsearch)

## Levantar Postiz

1. Copia `.env.example` a `.env` y llena tus credenciales de Meta:

```bash
cp .env.example .env
# Edita .env con tu FACEBOOK_APP_ID y FACEBOOK_APP_SECRET
```

2. Levanta los contenedores:

```bash
cd postiz-local
docker compose up -d
```

La primera vez descargará varias imágenes y puede tardar unos minutos.

## Acceso

1. Abre el navegador en: **http://localhost:4007**
2. Regístrate (crea tu cuenta de administrador)
3. Ve a **Settings > Channels > Add Channel > Instagram**
4. Completa la autenticación con Facebook/Instagram
5. Ve a **Settings > Developers > Public API** y genera tu API key

## Configurar el proyecto

En la raíz del proyecto (`experimentos/`), en tu archivo `.env`:

```env
POSTIZ_URL=http://localhost:4007
POSTIZ_API_KEY=<la API key que generaste>
```

## Redirect URIs para Meta

En tu app de Meta (developers.facebook.com), configura estos redirect URIs:

```
http://localhost:4007/integrations/social/instagram
http://localhost:4007/integrations/social/facebook
```

Si usas túnel Cloudflare, reemplaza `http://localhost:4007` por la URL del túnel.

## Programar publicaciones

```bash
npm run schedule
```

## Parar Postiz

```bash
cd postiz-local
docker compose down
```

Para borrar datos:

```bash
docker compose down -v
```

## Puertos usados

| Servicio | Puerto |
|----------|--------|
| Postiz (web) | 4007 |
| Temporal UI | 8080 |
| Temporal gRPC | 7233 |
