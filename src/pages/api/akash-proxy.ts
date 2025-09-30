import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = process.env.AKASH_TOTALS_URL;
    if (!url) {
      return res.status(500).json({ error: "Missing AKASH_TOTALS_URL" });
    }

    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) {
      return res
        .status(r.status)
        .json({ error: "Upstream error", status: r.status });
    }
    const raw = await r.json();

    // Soporta ambas formas: plana o anidada en raw.data
    const g = (k: string) => raw?.[k] ?? raw?.data?.[k] ?? 0;

    const totalSsd = Number(g("availableStorage")) / 1_000_000_000_000; // TB
    const totalRam = Number(g("availableMemory")) / 1_000_000_000_000; // TB
    const totalStorage = Number(g("availableCPU")) / 1_000_000; // “millones” de CPU
    const totalNodes = Number(g("activeProviderCount"));

    // Enviamos ya normalizado con los nombres que usa el front
    return res.status(200).json({
      totalSsd: isFinite(totalSsd) ? totalSsd : 0,
      totalRam: isFinite(totalRam) ? totalRam : 0,
      totalStorage: isFinite(totalStorage) ? totalStorage : 0,
      totalNodes: isFinite(totalNodes) ? totalNodes : 0,
    });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message ?? "Unknown error" });
  }
}
