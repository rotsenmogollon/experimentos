# Financiera Mi Casa – Calendario y programación

Proyecto en **TypeScript (Node.js)** para generar el calendario de publicaciones y programarlas en **Postiz** (redes sociales, incluyendo Instagram).

## Requisitos

- **Node.js 20+**
- Instancia de Postiz configurada (ver [postiz-local/README.md](./postiz-local/README.md))

## Instalación

```bash
npm install
```

## Configuración

Copia el archivo de ejemplo y edita las variables:

```bash
cp .env.example .env
```

Edita `.env` con:

- `POSTIZ_URL` – URL de tu Postiz (ej: `http://localhost:4007`)
- `POSTIZ_API_KEY` – API key (Postiz → Settings → Developers → Public API)
- Opcional: `POSTIZ_INSTAGRAM_INTEGRATION_ID` – Si no se define, se usa la primera cuenta Instagram conectada
- `HORA_POST` / `HORA_HISTORIA` – Horas de publicación (ej: `09:00`, `14:00`)
- `TIMEZONE` – Zona horaria (por defecto `America/Panama`)

## Comandos

| Comando | Descripción |
|--------|-------------|
| `npm run calendar` | Genera `calendario_financiera_mi_casa.csv` y `renombres.txt` a partir de la lógica del calendario (20 días laborables, 1 post + 1 historia/día). |
| `npm run schedule` | Lee el CSV, sube cada imagen a Postiz y crea las publicaciones programadas (post o historia según el tipo). Requiere `.env` configurado. |
| `npm run typecheck` | Verifica tipos TypeScript. |
| `npm run build` | Compila TypeScript a `dist/`. |

## Estructura

```
src/
├── calendar/           # Lógica del calendario (fechas, temas, copies)
│   ├── data.ts         # Listas POST/HISTORIA, temas, copies
│   └── index.ts        # fechasLaborables, generateCalendar
├── postiz/             # Cliente API Postiz
│   ├── client.ts       # listIntegrations, uploadMedia, createPost
│   └── types.ts
├── commands/
│   ├── generate-calendar.ts   # npm run calendar
│   └── schedule-postiz.ts     # npm run schedule
└── config.ts           # Carga y validación de .env (zod)
```

## Flujo recomendado

1. Tener las imágenes en la carpeta `Artes/` (nombres ya renombrados según calendario, ej: `20260304_POST_auto_01.png`).
2. Generar o revisar el CSV: `npm run calendar`.
3. Configurar Postiz y `.env`.
4. Programar en Postiz: `npm run schedule`.

## Acceso en local (Postiz en tu máquina)

1. Entra en la carpeta `postiz-local/`.
2. Copia `.env.example` a `.env` y llena `FACEBOOK_APP_ID` y `FACEBOOK_APP_SECRET`.
3. Ejecuta `docker compose up -d`.
4. Abre **http://localhost:4007** en el navegador, regístrate y conecta tu cuenta de Instagram.
5. Genera tu API key desde **Settings → Developers → Public API**.
6. En el `.env` del proyecto pon `POSTIZ_URL=http://localhost:4007` y `POSTIZ_API_KEY=<tu key>`.

Detalle completo: **[postiz-local/README.md](./postiz-local/README.md)**.

## Nota sobre el script Python

El archivo `calendario_contenido.py` fue la primera implementación del calendario. La lógica está migrada a TypeScript; el proyecto se mantiene en Node.js/TypeScript. Puedes conservar el script Python como referencia o eliminarlo.
