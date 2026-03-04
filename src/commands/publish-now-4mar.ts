/**
 * Elimina todos los posts del 4 de marzo (incl. ERROR) y programa el post para
 * dentro de 2 minutos (type: schedule). Así el worker de Temporal lo publica en breve.
 *
 * Uso: npx tsx src/commands/publish-now-4mar.ts
 */
import "dotenv/config";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { getConfig, getPostizApiBase } from "../config.js";
import { createPostizClient } from "../postiz/client.js";

const config = getConfig();
const baseUrl = getPostizApiBase(config);
const client = createPostizClient(baseUrl, config.POSTIZ_API_KEY);
const ARTES_DIR = resolve(config.ARTES_DIR);

const POST_4MAR = {
  fileName: "20260304_POST_auto_01.png",
  copy:
    "Préstamo con garantía de auto: préstamos claros y seguros. Auto desde 2017, ingreso mín. $1,500.  Solicita tu evaluación  WhatsApp y teléfono: 6824-3794. Visítanos en PH Colores de Bellavista, Calle 43, frente a Parque Urracá, Bellavista.",
};

async function main(): Promise<void> {
  const filePath = resolve(ARTES_DIR, POST_4MAR.fileName);
  if (!existsSync(filePath)) {
    console.error("No se encuentra la imagen:", filePath);
    process.exit(1);
  }

  const integrationId =
    config.POSTIZ_INSTAGRAM_INTEGRATION_ID ||
    (await (async () => {
      const list = await client.listIntegrations();
      const ig = list.find(
        (i) =>
          (i.identifier === "instagram" || i.identifier === "instagram-standalone") &&
          !i.disabled
      );
      if (!ig) throw new Error("No hay integración de Instagram");
      return ig.id;
    })());

  const startDate = "2026-03-04T00:00:00.000Z";
  const endDate = "2026-03-04T23:59:59.999Z";

  console.log("1. Eliminando todos los posts del 4 de marzo (incl. en ERROR)...");
  const { posts } = await client.listPosts({ startDate, endDate });
  for (const p of posts) {
    if (p.integration.id === integrationId) {
      console.log("   Eliminando id:", p.id, "estado:", p.state);
      await client.deletePost(p.id);
    }
  }

  const scheduleDate = new Date(Date.now() + 2 * 60 * 1000).toISOString();
  console.log("2. Subiendo imagen y programando para dentro de ~2 min:", scheduleDate);

  const media = await client.uploadMedia(filePath);
  await client.createPost({
    type: "schedule",
    date: scheduleDate,
    shortLink: false,
    tags: [],
    posts: [
      {
        integration: { id: integrationId },
        value: [
          {
            content: POST_4MAR.copy,
            image: [{ id: media.id, path: media.path }],
          },
        ],
        settings: {
          __type: "instagram",
          post_type: "post",
          is_trial_reel: false,
          collaborators: [],
        },
      },
    ],
  });

  console.log("   Listo. El post se publicará en Instagram en ~2 minutos.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
