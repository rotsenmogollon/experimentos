/**
 * Endpoint llamado por Vercel Cron. Comprueba conexión con Postiz y devuelve estado.
 * La programación completa (40 piezas) tarda varios minutos y supera el timeout
 * de Vercel; para eso usa un servidor con cron (ver CRON_SERVIDOR.md).
 */
import type { VercelRequest, VercelResponse } from "@vercel/node";

function requireCronSecret(req: VercelRequest, res: VercelResponse): boolean {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.authorization;
  if (!secret) {
    res.status(500).json({
      ok: false,
      error: "CRON_SECRET no configurado en Vercel",
    });
    return false;
  }
  if (auth !== `Bearer ${secret}`) {
    res.status(401).json({ ok: false, error: "No autorizado" });
    return false;
  }
  return true;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ ok: false, error: "Método no permitido" });
    return;
  }

  if (!requireCronSecret(req, res)) return;

  const postizUrl = process.env.POSTIZ_URL;
  const postizKey = process.env.POSTIZ_API_KEY;

  if (!postizUrl || !postizKey) {
    res.status(200).json({
      ok: true,
      cron: "schedule",
      message: "Cron ejecutado; POSTIZ_* no configurados (solo heartbeat).",
      postiz: null,
    });
    return;
  }

  try {
    const base = `${postizUrl.replace(/\/$/, "")}/api/public/v1`;
    const r = await fetch(`${base}/integrations`, {
      headers: { Accept: "application/json", Authorization: postizKey },
    });
    const data = (await r.json()) as unknown[];
    const ig = Array.isArray(data)
      ? data.find((i: unknown) => {
          if (typeof i !== "object" || i === null || !("identifier" in i)) return false;
          const id = (i as { identifier?: string }).identifier;
          return id === "instagram" || id === "instagram-standalone";
        })
      : null;

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({
      ok: true,
      cron: "schedule",
      message:
        "Para programar las 40 piezas usa un servidor con cron (ver CRON_SERVIDOR.md).",
      postiz: {
        reachable: r.ok,
        integrationsCount: Array.isArray(data) ? data.length : 0,
        hasInstagram: !!ig,
      },
    });
  } catch (err) {
    res.status(200).json({
      ok: true,
      cron: "schedule",
      postiz: { reachable: false, error: err instanceof Error ? err.message : String(err) },
    });
  }
}
