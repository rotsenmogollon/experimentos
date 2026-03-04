import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { stringify } from "csv-stringify/sync";
import { generateCalendar } from "../calendar/index.js";

const ARTES_DIR = process.env.ARTES_DIR ?? "Artes";
const CSV_PATH = process.env.CSV_CALENDARIO ?? "calendario_financiera_mi_casa.csv";
const RENAMES_PATH = "renombres.txt";

const { rows, renames } = generateCalendar({
  desde: "2026-03-04",
  cantidad: 20,
  artesDir: ARTES_DIR,
});

const csvContent = stringify(rows, {
  header: true,
  columns: [
    "Fecha publicación",
    "Día semana",
    "Tipo pieza",
    "Nombre archivo",
    "Nombre archivo original",
    "Copy",
    "CTA",
    "Web",
    "Contacto",
  ],
});

writeFileSync(resolve(CSV_PATH), csvContent, "utf-8");
writeFileSync(
  resolve(RENAMES_PATH),
  renames.map((r) => `${r.oldPath}\t${r.newPath}`).join("\n"),
  "utf-8"
);

console.log("Calendario generado:");
console.log("  -", CSV_PATH);
console.log("  -", RENAMES_PATH);
