# Configurar Instagram en Mixpost (local)

Si ya configuraste Facebook pero **no ves Instagram** al hacer clic en "Add account", o la conexión falla, revisa **estos puntos en orden**. Todo debe coincidir.

---

## 1. URLs de redirección (redirect URIs) en la app de Meta

En [developers.facebook.com](https://developers.facebook.com) → tu app → **Facebook Login for Business** → **Settings** (Configuración), en **Valid OAuth Redirect URIs** deben estar **exactamente** estas dos líneas (una por línea):

```
http://localhost:9090/mixpost/callback/facebook_page
http://localhost:9090/mixpost/callback/instagram
```

- Usa **http** (no https) si accedes por `localhost:9090`.
- Si usas la **IP del servidor** (ej. `http://192.168.1.100:9090`), pon esa misma base en las URIs:
  - `http://192.168.1.100:9090/mixpost/callback/facebook_page`
  - `http://192.168.1.100:9090/mixpost/callback/instagram`
- Sin barra final, sin espacios, mismo puerto que en el navegador.
- Guarda los cambios en Meta.

---

## 2. Dónde se pegan App ID y App Secret en Mixpost (Lite)

En **Mixpost Lite** las credenciales se configuran en:

- Menú de usuario (abajo a la izquierda) → **Admin Console** → **Services** (en el menú izquierdo).
- Ahí debe estar el formulario de **Facebook**; pega **App ID** y **App Secret** y guarda.

No basta con configurarlo solo desde el workspace. Si lo pusiste solo en "Configure Services" del workspace, entra también a **Admin Console → Services** y comprueba que Facebook esté guardado ahí.

---

## 3. Permisos de la app en Meta (Instagram)

En la app de Facebook, en el panel izquierdo entra a **Publish** (o **Use cases** / permisos).

Deben existir **dos casos de uso** (o permisos equivalentes):

1. **Manage everything on your Page** (gestión de la página de Facebook).
2. **Manage messaging & content on Instagram** (publicar y gestionar contenido en Instagram).

Para Instagram, entre los permisos deben estar al menos:

- `instagram_basic`
- `instagram_content_publish`

Si la app se creó solo para “página de Facebook” y no para Instagram, Instagram no aparecerá o no conectará. Añade el caso de uso / permisos de Instagram y guarda.

---

## 4. Versión de la app de Facebook

En Mixpost, en el formulario de Facebook (Admin Console → Services) suele haber un campo para **versión de la API** de la app. Debe coincidir con la versión que usa tu app en Meta:

- En Meta: **App Settings** → **Advanced** → revisa la versión de la API.
- En Mixpost elige la misma versión (o la que Mixpost recomiende para tu versión Lite).

---

## 5. Modo de la app (Development vs Live)

- Si la app está en **Development**: solo los usuarios que son **administradores, desarrolladores o probadores** de la app en Meta pueden conectar sus cuentas. La cuenta de Instagram que uses debe estar vinculada a un perfil Facebook que tenga ese rol en la app.
- Para que cualquiera pueda conectar: en Meta, en **Publish**, pasa la app a **Live** (y acepta la revisión si Meta lo pide).

---

## 6. Cómo probar de nuevo

1. Cierra sesión en Mixpost o usa una ventana de incógnito.
2. Entra de nuevo a Mixpost (ej. `http://localhost:9090`).
3. Ve a un **workspace** → **Social Accounts** → **Add account**.
4. Debería aparecer **Instagram** (y/o Facebook) en la lista. Elige **Instagram** y completa el inicio de sesión.

Si Instagram sigue sin aparecer, revisa de nuevo: **Admin Console → Services** (Facebook con App ID y App Secret), **Redirect URIs** exactos y **permisos/casos de uso de Instagram** en la app de Meta.

---

## Resumen rápido

| Dónde | Qué revisar |
|-------|-------------|
| Meta – Facebook Login for Business → Settings | URIs: `http://localhost:9090/mixpost/callback/facebook_page` y `.../callback/instagram` |
| Mixpost – Admin Console → Services | Facebook con App ID y App Secret guardados |
| Meta – Publish / Use cases | Caso de uso y permisos de **Instagram** (`instagram_basic`, `instagram_content_publish`) |
| Meta – App mode | Development (solo roles de la app) o Live (público) |
