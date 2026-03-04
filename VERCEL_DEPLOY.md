# Desplegar en Vercel por CLI

## Conectar GitHub (deploys automáticos en cada push)

Para que cada `git push` dispare un deploy en Vercel:

```bash
cd /home/rotsen/experimentos
vercel git connect
```

Responde a las preguntas (cuenta, repo de GitHub). A partir de ahí, los pushes a la rama de producción (p. ej. `main`) generan un deploy automático.

**Alternativa por dashboard:** [vercel.com](https://vercel.com) → **Add New** → **Project** → **Import Git Repository** → elige el repo y conecta. Los deploys automáticos quedan activos.

---

## 1. Iniciar sesión (solo la primera vez)

En la terminal, desde la raíz del proyecto:

```bash
cd /home/rotsen/experimentos
vercel login
```

Te pedirá email y abrirá el navegador o te dará un enlace para autorizar. Sigue los pasos.

## 2. Desplegar

```bash
vercel
```

- La primera vez te preguntará: *Set up and deploy?* → **Y**
- *Which scope?* → tu cuenta
- *Link to existing project?* → **N** (crear proyecto nuevo)
- *Project name?* → **experimentos** (o el que quieras)
- *Directory?* → **./** (Enter)

Para subir a **producción** directamente:

```bash
vercel --prod
```

## 3. Variables de entorno

Si el proyecto usa `.env` (Postiz API, etc.), en Vercel no se sube el archivo. Añádelas en el dashboard:

1. [vercel.com](https://vercel.com) → tu proyecto → **Settings** → **Environment Variables**
2. Añade las mismas que en tu `.env` (por ejemplo `POSTIZ_URL`, `POSTIZ_API_KEY`, etc.)

**Para el cron** (opcional pero recomendado): crea `CRON_SECRET` con un valor secreto (p. ej. `openssl rand -hex 24`). Vercel lo envía en el header `Authorization: Bearer ...` cuando llama a `/api/cron/schedule`.

Por CLI:

```bash
vercel env add POSTIZ_URL
vercel env add POSTIZ_API_KEY
vercel env add CRON_SECRET
# etc.
```

Luego vuelve a desplegar para que se apliquen: `vercel --prod`

## Endpoints

- **GET /api/health** – Comprueba que el proyecto está desplegado (responde `{ "status": "ok", ... }`).
- **GET /api/cron/schedule** – Llamado por Vercel Cron cada día (14:00 UTC). Requiere header `Authorization: Bearer <CRON_SECRET>`. Comprueba conexión con Postiz; la programación completa de 40 piezas se hace en tu servidor con cron (ver **CRON_SERVIDOR.md**).
