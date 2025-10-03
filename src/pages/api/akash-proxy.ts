import type { NextApiRequest, NextApiResponse } from "next";

type AkashTotalsDto = {
  totalSsd: number; // TB
  totalRam: number; // TB
  totalCpu: number; // millones de vCPU (o M millicores)
  totalNodes: number; // providers activos
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AkashTotalsDto | { error: string; details?: string }>
) {
  try {
    const upstream = "https://console-api.akash.network/v1/network-capacity";
    const r = await fetch(upstream, { cache: "no-store" });

    if (!r.ok) {
      const body = await r.text();
      return res
        .status(r.status)
        .json({ error: "Upstream error", details: body.slice(0, 200) });
    }

    // Intentamos leer valores desde varias rutas posibles
    const raw = await r.json();
    
    const totalNodes = Number(
      raw?.activeProviderCount??
      0
    );

    const ramBytes = Number(
      raw?.totalMemory??
        0
    );

    const storageBytes = Number(
      raw?.totalStorage ??
        0
    );

    const cpuUnits = Number(
      raw?.totalCPU ??
        0
    );

    // Normalizamos unidades
    const totalSsd = storageBytes / 1_000_000_000_000; // PB (de bytes)
    const totalRam = ramBytes / 1_000_000_000_000; // TB (de bytes)
    const totalCpu = cpuUnits / 1000

    return res.status(200).json({
      totalSsd,
      totalRam,
      totalCpu,
      totalNodes,
    });
  } catch (e: any) {
    return res.status(500).json({
      error: "Failed to fetch Akash",
      details: e?.message ?? String(e),
    });
  }
}
function Round(arg0: number) {
  throw new Error("Function not implemented.");
}

