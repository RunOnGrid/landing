import type { NextApiRequest, NextApiResponse } from "next";


type Totals = {
  totalCpu: number;
  totalRam: number;
  totalSsd: number;
};

type BenchmarkNode = {
  benchmark: {
    bench: {
      cores: number;
      ram: number;
      totalstorage: number;
    };
  };
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Totals>
) {
  // 1) Si tenés un upstream que ya da los totales, lo usamos
  try {
    const upstream = process.env.FLUX_TOTALS_URL;
    if (upstream) {
      const r = await fetch(upstream, { cache: "no-store" });
      const json = await r.json();

      const data: BenchmarkNode[] = json.data ?? [];

      const totals = data.reduce(
        (acc, node) => {
          acc.totalCpu += node.benchmark.bench.cores ?? 0;
          acc.totalRam += node.benchmark.bench.ram ?? 0;
          acc.totalSsd += node.benchmark.bench.totalstorage ?? 0;
          return acc;
        },
        { totalCpu: 0, totalRam: 0, totalSsd: 0 } as Totals
      );
  
      return res.status(200).json(totals);

    }
  } catch {
    return res.status(500).json({ totalSsd: 0, totalRam: 0, totalCpu: 0 });
  }
}
