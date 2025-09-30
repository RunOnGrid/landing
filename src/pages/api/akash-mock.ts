import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  // Valores de ejemplo (en bytes / microCPU / count)
  return res.status(200).json({
    availableStorage: 5_500_000_000_000, // 5.5 TB
    availableMemory: 2_400_000_000_000, // 2.4 TB
    availableCPU: 7_800_000, // 7.8 "M" microCPU (→ 7.8 en tu UI si dividís por 1e6)
    activeProviderCount: 128,
  });
}
