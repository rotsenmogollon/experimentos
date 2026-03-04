/**
 * Redimensiona la imagen del post de una fecha a 1080x1350 (portrait),
 * elimina el post programado en Postiz y lo reprograma con la nueva imagen.
 *
 * Uso: npx tsx src/commands/resize-and-reschedule-post.ts [fecha YYYY-MM-DD]
 * Por defecto usa el post de mañana (2026-03-05).
 */
import "dotenv/config";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import sharp from "sharp";
import { getConfig, getPostizApiBase } from "../config.js";
import { createPostizClient } from "../postiz/client.js";
import type { PostizListPost } from "../postiz/types.js";

const TARGET_WIDTH = 1080;
const TARGET_HEIGHT = 1350;
const HORA_POST = "09:00";

const config = getConfig();
const baseUrl = getPostizApiBase(config);
const client = createPostizClient(baseUrl, config.POSTIZ_API_KEY);

const ARTES_DIR = resolve(config.ARTES_DIR);

// Fila del calendario para 2026-03-05 Post
const ROW = {
  "Fecha publicación": "2026-03-05",
  "Nombre archivo": "20260305_POST_auto_02.png",
  Copy:
    "Préstamos con garantía de auto. Visítanos en Bellavista. Auto desde 2017, ingreso mín. $1,500.  Solicita tu evaluación  WhatsApp y teléfono: 6824-3794. Visítanos en PH Colores de Bellavista, Calle 43, frente a Parque Urracá, Bellavista.",
};

async function main(): Promise<void> {
  const dateArg = process.argv[2];
  const fecha = dateArg || "2026-03-05";
  const fileName = ROW["Nombre archivo"];
  const filePath = resolve(ARTES_DIR, fileName);

  if (!existsSync(filePath)) {
    console.error("No se encuentra la imagen:", filePath);
    process.exit(1);
  }

  const outPath = resolve(
    ARTES_DIR,
    fileName.replace(".png", `_${TARGET_WIDTH}x${TARGET_HEIGHT}.png`)
  );

  console.log("1. Redimensionando imagen a", TARGET_WIDTH, "x", TARGET_HEIGHT);
  await sharp(filePath)
    .resize(TARGET_WIDTH, TARGET_HEIGHT, { fit: "cover", position: "center" })
    .png()
    .toFile(outPath);
  console.log("   Guardada:", outPath);

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

  const startDate = `${fecha}T00:00:00.000Z`;
  const endDate = `${fecha}T23:59:59.999Z`;

  console.log("2. Listando posts programados para", fecha);
  const { posts } = await client.listPosts({ startDate, endDate });
  const targetTime = `${fecha}T${HORA_POST}:00.000Z`;
  const postToDelete = posts.find(
    (p: PostizListPost) =>
      p.integration.id === integrationId &&
      (p.publishDate === targetTime || p.publishDate.startsWith(`${fecha}T09:`)) &&
      p.state === "QUEUE"
  );
  if (!postToDelete) {
    console.warn("   No se encontró post programado para ese día/hora. Se creará uno nuevo.");
  } else {
    console.log("3. Eliminando post programado id:", postToDelete.id);
    await client.deletePost(postToDelete.id);
  }

  console.log("4. Subiendo imagen nueva y programando post");
  const media = await client.uploadMedia(outPath);
  const scheduleDate = `${fecha}T${HORA_POST}:00.000Z`;
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
            content: ROW.Copy,
            image: [{ id: media.id, path: media.path }],
          },
        ],
        settings: { __type: "instagram", post_type: "post" },
      },
    ],
  });

  console.log("   Listo. Post reprogramado para", scheduleDate, "con imagen", TARGET_WIDTH + "x" + TARGET_HEIGHT);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
