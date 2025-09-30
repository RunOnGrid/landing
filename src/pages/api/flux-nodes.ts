import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Endpoint público de Flux para contar nodos
    const r = await fetch("https://api.runonflux.io/daemon/getfluxnodecount", {
      // SSR: OK
      next: { revalidate: 60 }, // cache 60s en prod
    });

    if (!r.ok) throw new Error(`Flux nodes ${r.status}`);
    const j = (await r.json()) as { data?: { total?: number } };

    res.status(200).json({ totalNodes: j?.data?.total ?? 0 });
  } catch (e: any) {
    console.error("flux-nodes error:", e?.message || e);
    // fallback para que el front no se rompa
    res.status(200).json({ totalNodes: 0 });
  }
}
