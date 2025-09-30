import type { NextApiRequest, NextApiResponse } from "next";

type Totals = { totalSsd: number; totalRam: number; totalStorage: number };

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Totals>
) {
  // 1) Si tenés un upstream que ya da los totales, lo usamos
  try {
    const upstream = process.env.FLUX_TOTALS_URL;
    if (upstream) {
      const r = await fetch(upstream, { cache: "no-store" });
      if (r.ok) {
        const j = await r.json();
        return res.status(200).json({
          totalSsd: Number(j.totalSsd) || 0,
          totalRam: Number(j.totalRam) || 0,
          totalStorage: Number(j.totalStorage) || 0,
        });
      }
    }
  } catch {
    // seguimos al fallback
  }

  // 2) Fallback: calculamos en base a cantidad de nodos * heurística por nodo
  try {
    const r = await fetch("https://api.runonflux.io/daemon/getfluxnodecount", {
      cache: "no-store",
    });
    const j = await r.json();
    const totalNodes = Number(j?.data?.total) || 0;

    const ramPerNodeGb = Number(process.env.FLUX_RAM_PER_NODE_GB ?? 32); // GB
    const ssdPerNodeGb = Number(process.env.FLUX_SSD_PER_NODE_GB ?? 500); // GB
    const cpuPerNode = Number(process.env.FLUX_CPU_PER_NODE ?? 8); // vCPU

    const totalRamTB = +((totalNodes * ramPerNodeGb) / 1024).toFixed(1);
    const totalSsdTB = +((totalNodes * ssdPerNodeGb) / 1024).toFixed(1);
    const totalCpu = totalNodes * cpuPerNode; // cores

    return res.status(200).json({
      totalSsd: totalSsdTB,
      totalRam: totalRamTB,
      totalStorage: totalCpu,
    });
  } catch {
    return res.status(200).json({ totalSsd: 0, totalRam: 0, totalStorage: 0 });
  }
}
