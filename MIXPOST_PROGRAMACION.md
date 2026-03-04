# Análisis: Programación de publicaciones con Mixpost API

Documentación basada en la [API Reference de Mixpost](https://docs.mixpost.app/api/). Objetivo: programar las 40 piezas del calendario de Financiera Mi Casa (posts e historias de Instagram) usando Mixpost como herramienta open source.

---

## 1. Qué es Mixpost y qué necesitamos

- **Mixpost**: software de gestión de redes sociales **self‑hosted** (Lite / Pro / Enterprise). Permite crear, programar y publicar en varias redes desde un solo lugar.
- **Para este proyecto**: necesitamos **crear 40 publicaciones programadas** (20 posts de feed + 20 historias de Instagram), cada una con:
  - **Fecha y hora** de publicación
  - **Imagen** (archivo en `Artes/`)
  - **Copy** (texto)
  - **Tipo**: post (feed) o story (historia)

---

## 2. Requisitos previos (qué tener antes de desarrollar)

| Requisito | Descripción |
|-----------|-------------|
| **Instancia de Mixpost** | Mixpost instalado y accesible (Lite, Pro o Enterprise). URL base, ej: `https://tu-dominio.com`. |
| **MIXPOST_CORE_PATH** | Ruta base de la API. Por defecto: `mixpost`. URL de la API: `https://tu-dominio.com/mixpost/api/`. |
| **Workspace UUID** | Identificador del workspace donde están (o estarán) las cuentas. Se usa en todas las llamadas. Ej: `3bbd0951-5b04-432b-b2a0-688588b0720e`. |
| **Cuenta(s) de Instagram** | Cuenta(s) conectadas y autorizadas en Mixpost en ese workspace. Una misma cuenta puede publicar post y story. |
| **Access Token** | Token de API generado en el dashboard: menú de usuario → **Access Tokens** → **Create** → copiar el token. |

---

## 3. Autenticación

- **Método**: Bearer token en cabecera.
- **Cabecera**: `Authorization: Bearer <token>`.
- **Cabecera recomendada**: `Accept: application/json`.

Todas las peticiones a la API deben incluir esta cabecera.

---

## 4. Endpoints que necesitamos

### 4.1 Listar cuentas (obtener account_id de Instagram)

- **Método**: GET  
- **URL**: `https://<BASE_URL>/<MIXPOST_CORE_PATH>/api/<WORKSPACE_UUID>/accounts`  
- **Documentación**: [List accounts](https://docs.mixpost.app/api/accounts/list)

**Uso**: Obtener el `id` (numérico) de la cuenta de Instagram que usaremos. Ese `id` se usa en `accounts` y en `versions[].account_id` al crear el post.

**Ejemplo de respuesta** (relevante):

```json
{
  "data": [
    {
      "id": 6,
      "uuid": "...",
      "name": "Financiera Mi Casa",
      "username": "financeramicasa",
      "provider": "instagram",
      "authorized": true
    }
  ]
}
```

---

### 4.2 Subir archivo de medio (imagen)

- **Método**: POST  
- **URL**: `https://<BASE_URL>/<MIXPOST_CORE_PATH>/api/<WORKSPACE_UUID>/media`  
- **Documentación**: [Upload a media file (binary)](https://docs.mixpost.app/api/media/upload)

**Body** (multipart/form-data):

| Campo     | Tipo   | Requerido | Descripción      |
|----------|--------|-----------|------------------|
| `file`   | binary | Sí        | Archivo (imagen) |
| `alt_text` | string | No      | Texto alternativo |

**Respuesta** (relevante):

```json
{
  "id": 1,
  "uuid": "511b8c2d-c424-3a6a-a154-be271418ff01",
  "name": "blue.png",
  "mime_type": "image/png",
  "type": "image",
  "url": "https://...",
  "is_video": false
}
```

**Uso**: Por cada imagen del calendario (cada fila del CSV) subir el archivo correspondiente de `Artes/` y guardar el `id` devuelto. Ese `id` se usa en `versions[].content[].media[]` al crear el post.

---

### 4.3 Crear y programar un post

- **Método**: POST  
- **URL**: `https://<BASE_URL>/<MIXPOST_CORE_PATH>/api/<WORKSPACE_UUID>/posts`  
- **Documentación**: [Create a post](https://docs.mixpost.app/api/posts/create)

**Body** (JSON):

| Campo       | Tipo    | Requerido | Descripción |
|------------|---------|-----------|-------------|
| `date`     | string  | Sí        | Fecha en formato `Y-m-d` (ej: `2026-03-04`) |
| `time`     | string  | Sí        | Hora en formato `H:i` (ej: `09:00`) |
| `timezone` | string  | Recomendado | Zona horaria (ej: `America/Panama`) |
| `schedule` | boolean | Sí        | `true` para programar la publicación |
| `schedule_now` | boolean | No   | Si se programa “ahora” (ver doc) |
| `queue`    | boolean | No        | `true` para añadir a la cola en lugar de hora fija |
| `accounts` | array   | Sí        | Lista de `account_id` (ej: `[6]` para una cuenta Instagram) |
| `tags`     | array   | No        | IDs de etiquetas (opcional) |
| `versions` | array   | Sí        | Contenido por cuenta (ver abajo) |

**Estructura de `versions`** (una versión por cuenta o versión “original”):

- `account_id`: para la versión “original” usar `0`; para una cuenta concreta usar su `id`.
- `is_original`: la primera versión debe ser `true`.
- `content`: array de bloques. Cada bloque puede tener:
  - `body`: texto del post (nuestro copy).
  - `media`: array de IDs de medios (los `id` devueltos al subir).
- `options`: opciones por red. Para **Instagram**:
  - `instagram.type`: `"post"` (feed) o `"story"` (historia).

**Ejemplo mínimo para una publicación de feed (post)**:

```json
{
  "date": "2026-03-04",
  "time": "09:00",
  "timezone": "America/Panama",
  "schedule": true,
  "accounts": [6],
  "versions": [
    {
      "account_id": 0,
      "is_original": true,
      "content": [
        {
          "body": "Préstamo con garantía de auto: préstamos claros y seguros...",
          "media": [123]
        }
      ],
      "options": {
        "instagram": {
          "type": "post"
        }
      }
    }
  ]
}
```

**Ejemplo para historia (story)** (mismo día, otra hora o mismo horario según estrategia):

```json
{
  "date": "2026-03-04",
  "time": "12:00",
  "timezone": "America/Panama",
  "schedule": true,
  "accounts": [6],
  "versions": [
    {
      "account_id": 0,
      "is_original": true,
      "content": [
        {
          "body": "Liquidez con tu casa. Proceso rápido y seguro...",
          "media": [124]
        }
      ],
      "options": {
        "instagram": {
          "type": "story"
        }
      }
    }
  ]
}
```

**Mapeo con nuestro CSV**:

- `Fecha publicación` → `date`
- Hora a decidir (ej. post 09:00, historia 14:00) → `time`
- `Copy` → `versions[0].content[0].body`
- `Nombre archivo` → archivo a subir; el `id` devuelto → `versions[0].content[0].media[0]`
- `Tipo pieza` (Post / Historia) → `options.instagram.type` (`"post"` / `"story"`)

---

### 4.4 Programar un post ya creado (opcional)

- **Método**: POST  
- **URL**: `https://<BASE_URL>/<MIXPOST_CORE_PATH>/api/<WORKSPACE_UUID>/posts/schedule/<postUuid>`  
- **Documentación**: [Schedule a post](https://docs.mixpost.app/api/posts/schedule/)

**Body**:

```json
{
  "postNow": true
}
```

**Uso**: Si en lugar de crear el post ya programado (`schedule: true`) se crea como borrador, luego se puede programar con este endpoint. Para nuestro flujo, crear con `schedule: true` suele ser suficiente.

---

## 5. Flujo de desarrollo recomendado

1. **Configuración**
   - Base URL de Mixpost, `MIXPOST_CORE_PATH`, `WORKSPACE_UUID`, `ACCESS_TOKEN`.
   - Definir hora (y si hace falta hora distinta para post vs historia) y `timezone` (ej: `America/Panama`).

2. **Obtener cuenta de Instagram**
   - GET `.../accounts`, filtrar por `provider === "instagram"`, guardar `id` (y comprobar `authorized === true`).

3. **Por cada fila del CSV** (40 filas):
   - Leer: fecha, tipo (Post/Historia), nombre de archivo, copy.
   - Subir la imagen desde `Artes/<Nombre archivo>` con POST `.../media`.
   - Guardar el `id` del medio devuelto.
   - Crear el post con POST `.../posts`:
     - `date` y `time` según la fila (y la hora definida para post/historia).
     - `accounts`: `[instagram_account_id]`.
     - `versions[0].content[0].body` = copy de la fila.
     - `versions[0].content[0].media` = `[media_id]`.
     - `versions[0].options.instagram.type` = `"post"` o `"story"` según tipo de pieza.

4. **Manejo de errores**
   - Reintentos ante 5xx o timeouts en upload/create.
   - Log de filas fallidas para reprocesar (por ejemplo guardando en un CSV de “errores”).

5. **Idempotencia (opcional)**
   - Guardar en un archivo o BD la relación `nombre_archivo_o_fecha_tipo → post_uuid` (o `media_id`) para no duplicar publicaciones si se re-ejecuta el script.

---

## 6. Consideraciones importantes

| Tema | Detalle |
|------|--------|
| **Zona horaria** | Usar `America/Panama` en `timezone` para que las horas coincidan con Panamá. |
| **Hora de publicación** | Definir una hora para posts (ej: 09:00) y otra para historias (ej: 14:00), o la misma; documentarla en el script o en el CSV. |
| **Post vs historia** | En nuestro CSV, “Post” = feed (`type: "post"`), “Historia” = story (`type: "story"`). |
| **Una sola cuenta Instagram** | Si solo hay una cuenta, `accounts` tendrá un solo `id` y una sola versión con `account_id: 0` e `is_original: true`. |
| **Límites de la API / Instagram** | Respetar límites de Mixpost y de la API de Instagram (no hacer cientos de peticiones en segundos). Introducir un pequeño delay entre peticiones si se programa todo de una vez. |
| **Medios** | Cada publicación usa exactamente 1 imagen; `content[0].media` es un array con un solo ID. |
| **URL de la API** | En la documentación a veces la URL aparece con espacios; en código usar sin espacios: `https://base/mixpost/api/<workspace_uuid>/recurso`. |

---

## 7. Resumen de datos a tener antes de codificar

- [ ] **BASE_URL** – URL de la instancia Mixpost (ej: `https://mixpost.agencia.com`).
- [ ] **MIXPOST_CORE_PATH** – normalmente `mixpost`.
- [ ] **WORKSPACE_UUID** – UUID del workspace (dashboard o API de workspaces).
- [ ] **ACCESS_TOKEN** – token de API (Access Tokens en el dashboard).
- [ ] **Instagram account_id** – obtenido con GET accounts (número, ej: `6`).
- [ ] **Hora para posts** (ej: `09:00`).
- [ ] **Hora para historias** (ej: `14:00` o igual que posts).
- [ ] **Timezone** – `America/Panama`.

**Implementación:** En este proyecto la programación está implementada en **TypeScript (Node.js)**. Uso:

1. Configura `.env` según `.env.example`.
2. Ejecuta `npm run schedule` para leer el CSV, subir cada imagen a Mixpost y crear las 40 publicaciones programadas.
