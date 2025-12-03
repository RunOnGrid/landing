"use client";

import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

/** === Tipos locales === */
type Totals = { totalCpu: number; totalRam: number; totalSsd: number };
type Nodes = { totalNodes: number };

/** === Utils de formato === */
const fmtCompact = (n: number) =>
  new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 0,
  }).format(n);

/** Normaliza respuesta del proxy Flux a Totals */
const toFluxTotals = (raw: any): Totals => ({
  totalCpu: Number(raw.totalCpu ?? 0), // cores
  totalRam: Math.floor(Number(raw.totalRam ?? raw.totalRamGB ?? 0) / 1024), // TB si vino en GB
  totalSsd: Math.floor(Number(raw.totalSsd ?? raw.totalSsdGB ?? 0) / 1024), // TB
});

/** Normaliza respuesta del proxy Akash a Totals */
const toAkashTotals = (raw: any): Totals => ({
  totalCpu: Number(raw.totalCpu ?? 0), // cores
  totalRam: Number(raw.totalRam ?? 0), // TB (ya viene procesado de la API)
  totalSsd: Number(raw.totalSsd ?? 0), // TB (ya viene procesado de la API)
});

/** ==== Card de métricas ==== */
function Stat({
  value,
  suffix = "",
  subtitle,
  withDivider,
}: {
  value: number | string;
  suffix?: string;
  subtitle: string;
  withDivider?: boolean;
}) {
  const isNum = typeof value === "number";
  return (
    <div className="flex items-center mt-2">
      <div>
        <div className="text-2xl md:text-[28px] font-bold leading-none tracking-wide">
          {isNum ? (
            <CountUp
              end={value as number}
              duration={1.2}
              decimals={0}
              suffix={suffix}
            />
          ) : (
            value
          )}
        </div>
        <div className="mt-1 text-xs md:text-md uppercase tracking-[0.12em] opacity-90">
          {subtitle}
        </div>
      </div>
      {withDivider && (
        <div className="mx-6 h-8 w-px bg-white/15 md:h-10" aria-hidden />
      )}
    </div>
  );
}

function ProviderCard({
  logoSrc,
  dark,
  totals,
  nodes,
}: {
  logoSrc: string;
  dark?: boolean;
  totals: Totals;
  nodes: Nodes;
}) {
  // CPU: floor antes de dividir para números enteros
  const cpuK = Math.floor(Math.floor(totals.totalCpu) / 1000); // cores → K (entero)
  const ramTB = Math.floor(totals.totalRam); // TB (entero)
  const ssdPB = Math.floor(Math.floor(totals.totalSsd ?? 0) / 100); // TB / 100 → PB (entero)

  return (
    <div
      className={[
        "rounded-3xl px-6 md:px-8 py-5 md:py-7 w-xl shadow-2xl",
        "border border-white/10 text-white",
        dark ? "bg-[#0F0B09]" : "bg-[#2D2724]/95",
      ].join(" ")}
    >
      {/* header */}
      <div className="flex items-center gap-4">
        <img src={logoSrc} alt="" className="h-16 object-contain" />
        <div>
          <div className="text-xl md:text-2xl font-bold tracking-wide">
            <CountUp
              end={nodes.totalNodes ?? 0}
              duration={1.2}
              formattingFn={(n) => fmtCompact(Number(n))}
            />
          </div>
          <div className="text-sm opacity-90">Total nodes worldwide</div>
        </div>
      </div>

      <div className="mt-4 h-px w-full bg-white/20" />

      <div className="mt-2 flex items-center justify-evenly">
        <Stat value={cpuK} suffix="K" subtitle="CPU CORES" withDivider />
        <Stat value={ramTB} suffix="TB" subtitle="RAM" withDivider />
        <Stat value={ssdPB} suffix="PB" subtitle="SSD DISK" />
      </div>
    </div>
  );
}

/** ===== Componente principal: ahora trae Flux nodes desde /api/flux-nodes ===== */
export default function ProvidersDuo({
  className = "",
}: {
  className?: string;
}) {
  const [akashTotals, setAkashTotals] = useState<Totals | null>(null);
  const [akashNodes, setAkashNodes] = useState<Nodes | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        // Totales
        const [fluxTotalsRes, akashTotalsRes] = await Promise.all([
          fetch("/api/flux-proxy", { cache: "no-store" }),
          fetch("/api/akash-proxy", { cache: "no-store" }),
        ]);
        const fluxTotalsJson = await fluxTotalsRes.json(); // { totalCpu, totalRam, totalSsd }
        const akashTotalsJson = await akashTotalsRes.json(); // { totalCpu, totalRam, totalSsd }

        // Nodes por endpoint dedicado
        const [fluxNodesRes, akashNodesRes] = await Promise.all([
          fetch("/api/flux-nodes", { cache: "no-store" }),
          fetch("/api/akash-nodes", { cache: "no-store" }).catch(() => null), // si no tenés, lo leemos del proxy
        ]);

        const fluxNodesJson = await fluxNodesRes.json(); // { totalNodes } | { count }
        const akashNodesJson =
          akashNodesRes && akashNodesRes.ok
            ? await akashNodesRes.json()
            : { totalNodes: akashTotalsJson.totalNodes ?? 0 }; // fallback

        if (!alive) return;
       
    

        setAkashTotals(toAkashTotals(akashTotalsJson));
        setAkashNodes({
          totalNodes: Number(
            akashNodesJson.totalNodes ?? akashNodesJson.count ?? 0
          ),
        });
      } catch {
        if (!alive) return;
        // Fallbacks del mock
        setAkashTotals({ totalCpu: 19130, totalRam: 132, totalSsd: 11});
        setAkashNodes({ totalNodes: 64 });
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (!akashTotals || !akashNodes) {
    return (
      <div
        className={[
          "mx-auto w-full max-w-[1100px] h-[487px] flex items-center justify-center",
          className,
        ].join(" ")}
      >
        Loading…
      </div>
    );
  }

  return (
    <div className="mx-auto w-full flex flex-col items-center justify-start space-y-8 lg:space-y-0 lg:block scale-65 md:scale-65 xl:scale-80 lg:h-[487px] mt-2 lg:mt-16">

      {/* Inferior (Akash) */}
      <div className="translate-x-0 sm:translate-x-5 sm:-translate-y-10 lg:-translate-y-3 lg:absolute lg:translate-x-15  2xl:translate-x-28">
        <ProviderCard
          logoSrc="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/60682d18-d4c4-4db9-29f9-88547214cc00/public"
          totals={akashTotals}
          nodes={akashNodes}
          dark
        />
      </div>
    </div>
  );
}
