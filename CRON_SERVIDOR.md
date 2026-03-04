# Ejecutar la programación con cron (en tu servidor)

La programación completa (40 piezas en Postiz) tarda varios minutos. En Vercel el timeout de las funciones no permite ejecutarla entera, así que conviene correrla en **tu propio servidor** con cron.

## 1. En el servidor: clonar y configurar

```bash
git clone https://github.com/TU_USUARIO/experimentos.git
cd experimentos
cp .env.example .env
# Editar .env con POSTIZ_URL, POSTIZ_API_KEY, etc.
npm install
chmod +x scripts/run-schedule.sh
```

Asegúrate de que la carpeta `Artes/` y el CSV `calendario_financiera_mi_casa.csv` estén en el repo (o cópialos a mano).

## 2. Probar a mano

```bash
./scripts/run-schedule.sh
# o
npm run schedule
```

## 3. Programar con cron (ejemplo: una vez al día a las 8:00)

```bash
crontab -e
```

Añade una línea (ajusta la ruta a tu clon):

```cron
0 8 * * * cd /home/rotsen/experimentos && ./scripts/run-schedule.sh >> /var/log/postiz-schedule.log 2>&1
```

O si prefieres solo los días laborables (lun–vie):

```cron
0 8 * * 1-5 cd /home/rotsen/experimentos && ./scripts/run-schedule.sh >> /var/log/postiz-schedule.log 2>&1
```

## Nota

- No hace falta ejecutar el schedule cada día si ya tienes todo el mes programado en Postiz; solo cuando cambies el calendario o las artes y quieras volver a subir todo.
- Para borrar la cola y reprogramar desde cero: `npm run schedule:delete-all` y luego `npm run schedule`.
