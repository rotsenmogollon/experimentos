/**
 * Elimina en Postiz todos los posts (programados y publicados) en el rango de fechas
 * del calendario (2026-03-04 a 2026-03-31).
 *
 * Uso: npx tsx src/commands/delete-all-postiz-posts.ts
 */
import "dotenv/config";
import { getConfig, getPostizApiBase } from "../config.js";
import { createPostizClient } from "../postiz/client.js";

const config = getConfig();
const baseUrl = getPostizApiBase(config);
const client = createPostizClient(baseUrl, config.POSTIZ_API_KEY);

const START = "2026-03-04T00:00:00.000Z";
const END = "2026-03-31T23:59:59.999Z";

async function main(): Promise<void> {
  console.log("Listando posts en Postiz entre", START, "y", END);
  const { posts } = await client.listPosts({ startDate: START, endDate: END });
  console.log("Encontrados:", posts.length);
  for (const p of posts) {
    console.log("  Eliminando id:", p.id, "fecha:", p.publishDate, "estado:", p.state);
    await client.deletePost(p.id);
  }
  console.log("Listo. Todos los posts del rango eliminados.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
