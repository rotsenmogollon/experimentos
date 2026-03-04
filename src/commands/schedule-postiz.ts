import { existsSync } from "node:fs";
import { createReadStream } from "node:fs";
import { resolve } from "node:path";
import { parse } from "csv-parse";
import axios from "axios";
import { getConfig, getPostizApiBase } from "../config.js";
import { createPostizClient } from "../postiz/client.js";

const config = getConfig();
const baseUrl = getPostizApiBase(config);
const client = createPostizClient(baseUrl, config.POSTIZ_API_KEY);

const ARTES_DIR = resolve(config.ARTES_DIR);
const CSV_PATH = resolve(config.CSV_CALENDARIO);

interface CsvRow {
  "Fecha publicación": string;
  "Día semana": string;
  "Tipo pieza": string;
  "Nombre archivo": string;
  "Nombre archivo original": string;
  Copy: string;
  CTA: string;
  Web: string;
  Contacto: string;
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function getInstagramIntegrationId(): Promise<string> {
  if (config.POSTIZ_INSTAGRAM_INTEGRATION_ID) {
    return config.POSTIZ_INSTAGRAM_INTEGRATION_ID;
  }
  const integrations = await client.listIntegrations();
  const ig = integrations.find(
    (i) =>
      (i.identifier === "instagram" ||
        i.identifier === "instagram-standalone") &&
      !i.disabled
  );
  if (!ig) {
    throw new Error(
      "No hay cuenta de Instagram conectada en Postiz. Conéctala desde la UI o define POSTIZ_INSTAGRAM_INTEGRATION_ID en .env"
    );
  }
  console.log(`  Usando integración: ${ig.name} (@${ig.profile}) [${ig.identifier}]`);
  return ig.id;
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
  if (!existsSync(CSV_PATH)) {
    console.error("No se encuentra el CSV:", CSV_PATH);
    console.error("Ejecuta primero: npm run calendar");
    process.exit(1);
  }

  console.log("Conectando a Postiz:", baseUrl);

  const integrationId = await getInstagramIntegrationId();
  console.log("Instagram integration ID:", integrationId);

  const rows = await parseCsv(CSV_PATH);
  console.log("Filas en el calendario:", rows.length);

  const timePost = config.HORA_POST;
  const timeHistoria = config.HORA_HISTORIA;

  let ok = 0;
  let errors = 0;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]!;
    const filePath = resolve(ARTES_DIR, row["Nombre archivo"]);

    if (!existsSync(filePath)) {
      console.warn(`  [SKIP] Archivo no encontrado: ${row["Nombre archivo"]}`);
      errors++;
      continue;
    }

    const isStory = row["Tipo pieza"] === "Historia";
    const time = isStory ? timeHistoria : timePost;
    const postType = isStory ? "story" : "post";

    try {
      console.log(
        `  [${i + 1}/${rows.length}] Subiendo ${row["Nombre archivo"]}...`
      );
      const media = await client.uploadMedia(filePath);
      await delay(500);

      const scheduleDate = `${row["Fecha publicación"]}T${time}:00.000Z`;

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
                content: isStory ? "" : row.Copy,
                image: [{ id: media.id, path: media.path }],
              },
            ],
            settings: {
              __type: "instagram",
              post_type: postType,
            },
          },
        ],
      });

      console.log(
        `  [OK] ${row["Fecha publicación"]} ${time} ${row["Tipo pieza"]} – ${row["Nombre archivo"]}`
      );
      ok++;
    } catch (err: unknown) {
      const msg =
        axios.isAxiosError(err) && err.response
          ? JSON.stringify(err.response.data)
          : err instanceof Error
            ? err.message
            : String(err);
      console.error(`  [ERROR] ${row["Nombre archivo"]}: ${msg}`);
      errors++;
    }

    await delay(2500);
  }

  console.log(`\nResultado: ${ok} programados, ${errors} errores.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
