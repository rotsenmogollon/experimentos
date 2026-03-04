/**
 * Copia las imágenes de la carpeta Post/ a Artes/ con los nombres del calendario
 * (solo posts, en orden de fecha). Elimina variantes antiguas (_1080x1350, _portrait_*).
 *
 * Uso: npx tsx scripts/migrate-post-to-artes.ts
 */
import "dotenv/config";
import { createReadStream } from "node:fs";
import { readdir, copyFile, unlink } from "node:fs/promises";
import { resolve } from "node:path";
import { parse } from "csv-parse";
import { getConfig } from "../src/config.js";

const config = getConfig();
const ROOT = resolve(process.cwd());
const POST_DIR = resolve(ROOT, "Post");
const ARTES_DIR = resolve(ROOT, config.ARTES_DIR);
const CSV_PATH = resolve(ROOT, config.CSV_CALENDARIO);

interface CsvRow {
  "Tipo pieza": string;
  "Nombre archivo": string;
}

function parseCsv(path: string): Promise<CsvRow[]> {
  return new Promise((resolvePromise, reject) => {
    const rows: CsvRow[] = [];
    createReadStream(path, "utf-8")
      .pipe(
        parse({
          columns: true,
          skip_empty_lines: true,
          trim: true,
        })
      )
      .on("data", (row: CsvRow) => rows.push(row))
      .on("end", () => resolvePromise(rows))
      .on("error", reject);
  });
}

async function main(): Promise<void> {
  const rows = await parseCsv(CSV_PATH);
  const postNames = rows
    .filter((r) => r["Tipo pieza"] === "Post")
    .map((r) => r["Nombre archivo"]);
  if (postNames.length !== 20) {
    throw new Error(`Se esperaban 20 posts en el CSV, hay ${postNames.length}`);
  }

  const files = (await readdir(POST_DIR))
    .filter((f) => f.endsWith(".png") || f.endsWith(".jpg"))
    .sort();
  if (files.length !== 20) {
    throw new Error(`Se esperaban 20 imágenes en Post/, hay ${files.length}`);
  }

  console.log("Copiando 20 posts de Post/ a Artes/ con nombres del calendario...");
  for (let i = 0; i < 20; i++) {
    const src = resolve(POST_DIR, files[i]!);
    const dest = resolve(ARTES_DIR, postNames[i]!);
    await copyFile(src, dest);
    console.log(`  ${files[i]} → ${postNames[i]}`);
  }

  const artesFiles = await readdir(ARTES_DIR);
  const toRemove = artesFiles.filter(
    (f) =>
      f.includes("_1080x1350") ||
      (f.includes("_portrait_") && f.includes("1080"))
  );
  for (const f of toRemove) {
    await unlink(resolve(ARTES_DIR, f));
    console.log("  Eliminada variante:", f);
  }
  console.log("Listo.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
