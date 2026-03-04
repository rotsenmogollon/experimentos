import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  POSTIZ_URL: z.string().url(),
  POSTIZ_API_KEY: z.string().min(1),
  POSTIZ_INSTAGRAM_INTEGRATION_ID: z.string().optional(),
  HORA_POST: z.string().regex(/^\d{2}:\d{2}$/).default("09:00"),
  HORA_HISTORIA: z.string().regex(/^\d{2}:\d{2}$/).default("14:00"),
  TIMEZONE: z.string().default("America/Panama"),
  ARTES_DIR: z.string().default("Artes"),
  CSV_CALENDARIO: z.string().default("calendario_financiera_mi_casa.csv"),
});

export type Config = z.infer<typeof envSchema>;

let cached: Config | null = null;

export function getConfig(): Config {
  if (cached) return cached;
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error("Configuración inválida (.env):");
    console.error(parsed.error.flatten().fieldErrors);
    process.exit(1);
  }
  cached = parsed.data;
  return cached;
}

export function getPostizApiBase(config: Config): string {
  return `${config.POSTIZ_URL.replace(/\/$/, "")}/api/public/v1`;
}
