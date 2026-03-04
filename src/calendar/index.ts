import {
  CONTACTO,
  POSTS,
  HISTORIAS,
  getTemaPost,
  getTemaHist,
  getCopyPost,
  getCopyHist,
  getDiaSemana,
} from "./data.js";

export interface CalendarRow {
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

export interface RenameEntry {
  oldPath: string;
  newPath: string;
}

const WEB = "";

/**
 * Genera fechas laborables (lun–vie) desde una fecha inicial.
 */
export function fechasLaborables(desde: string, cantidad: number): string[] {
  const d = new Date(desde + "T12:00:00");
  const fechas: string[] = [];
  while (fechas.length < cantidad) {
    const day = d.getDay();
    if (day >= 1 && day <= 5) {
      fechas.push(d.toISOString().slice(0, 10));
    }
    d.setDate(d.getDate() + 1);
  }
  return fechas;
}

/**
 * Construye el copy completo (mensaje + CTA + contacto, sin web).
 */
function buildCopy(msg: string, cta: string): string {
  const bloque = WEB ? `\n\n${WEB}\n${CONTACTO}` : `\n\n${CONTACTO}`;
  return `${msg}\n\n${cta}${bloque}`;
}

/**
 * Genera las filas del calendario y la lista de renombrados.
 */
export function generateCalendar(options: {
  desde: string;
  cantidad?: number;
  artesDir?: string;
}): { rows: CalendarRow[]; renames: RenameEntry[] } {
  const { desde, cantidad = 20, artesDir = "Artes" } = options;
  const fechas = fechasLaborables(desde, cantidad);
  const rows: CalendarRow[] = [];
  const renames: RenameEntry[] = [];

  for (let i = 0; i < fechas.length; i++) {
    const fecha = fechas[i]!;
    const d = new Date(fecha + "T12:00:00");
    const weekday = d.getDay() === 0 ? 7 : d.getDay();
    const diaSem = getDiaSemana(weekday - 1);
    const pref = fecha.replace(/-/g, "");

    const postFile = POSTS[i]!;
    const histFile = HISTORIAS[i]!;
    const tPost = getTemaPost(postFile);
    const tHist = getTemaHist(histFile);

    const postNew = `${pref}_POST_${tPost}_${String(i + 1).padStart(2, "0")}.png`;
    const histNew = `${pref}_HISTORIA_${tHist}_${String(i + 1).padStart(2, "0")}.png`;

    const [msgPost, ctaPost] = getCopyPost(postFile);
    const [msgHist, ctaHist] = getCopyHist(histFile);

    const copyPost = buildCopy(msgPost, ctaPost);
    const copyHist = buildCopy(msgHist, ctaHist);

    for (const [
      tipo,
      archivoOrig,
      archivoNuevo,
      copy,
      cta,
    ] of [
      ["Post", postFile, postNew, copyPost, ctaPost] as const,
      ["Historia", histFile, histNew, copyHist, ctaHist] as const,
    ]) {
      rows.push({
        "Fecha publicación": fecha,
        "Día semana": diaSem,
        "Tipo pieza": tipo,
        "Nombre archivo": archivoNuevo,
        "Nombre archivo original": archivoOrig,
        Copy: copy.replace(/\n/g, " "),
        CTA: cta,
        Web: WEB,
        Contacto: CONTACTO,
      });
      renames.push({
        oldPath: `${artesDir}/${archivoOrig}`,
        newPath: `${artesDir}/${archivoNuevo}`,
      });
    }
  }

  return { rows, renames };
}
