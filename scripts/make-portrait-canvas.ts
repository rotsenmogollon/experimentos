/**
 * Pone la imagen cuadrada en un lienzo portrait 1080x1350:
 * escala a 1080x1080 y centra con bandas superior/inferior del color de marca.
 * No se recorta nada del diseño original.
 */
import sharp from "sharp";
import { resolve } from "node:path";

const TARGET_WIDTH = 1080;
const TARGET_HEIGHT = 1350;
const BG_COLOR = "#1a2d4a"; // azul oscuro tipo Financiera Mi Casa

const sourcePath = resolve(process.cwd(), "Artes/20260305_POST_auto_02.png");
const outPath = resolve(
  process.cwd(),
  "Artes/20260305_POST_auto_02_portrait_1080x1350.png"
);

async function main() {
  const resized = await sharp(sourcePath)
    .resize(TARGET_WIDTH, TARGET_WIDTH, { fit: "cover", position: "center" })
    .png()
    .toBuffer();

  const paddingY = (TARGET_HEIGHT - TARGET_WIDTH) / 2;

  const background = await sharp({
    create: {
      width: TARGET_WIDTH,
      height: TARGET_HEIGHT,
      channels: 3,
      background: BG_COLOR,
    },
  })
    .png()
    .toBuffer();

  await sharp(background)
    .composite([{ input: resized, top: Math.round(paddingY), left: 0 }])
    .png()
    .toFile(outPath);

  console.log("Guardada:", outPath, "- imagen completa con bandas superior/inferior, sin recorte.");
}

main().catch(console.error);
