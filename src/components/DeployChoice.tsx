"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import DeployOption from "./DeployOption";
import DeployOption2 from "./DeployOption2";

export type CommonTotals = {
  totalSsd: number; // TB
  totalRam: number; // TB
  totalCpu: number; // cores 
}

export type FluxNodes = { totalNodes: number };

export type AkashTotals = CommonTotals & { totalNodes: number };

export default function DeployChoice() {
  const [fluxData, setFluxData] = useState<CommonTotals | null>(null);
  const [fluxNodes, setFluxNodes] = useState<FluxNodes | null>(null);
  const [akashData, setAkashData] = useState<AkashTotals | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlux = async () => {
      try {
        const res = await fetch("/api/flux-proxy", { cache: "no-store" });
        if (!res.ok) throw new Error(`Flux totals ${res.status}`);
        const data: CommonTotals = await res.json();
        setFluxData({
          totalSsd: Number(data.totalSsd) || 0,
          totalRam: Number(data.totalRam) || 0,
          totalCpu: Number(data.totalCpu) || 0,
        });
      } catch (err) {
        console.error("Flux totals:", err);
        setFluxData({ totalSsd: 0, totalRam: 0, totalCpu: 0 }); // fallback para que renderice
      }
    };

    const fetchFluxNodes = async () => {
      try {
        const url =
          process.env.NEXT_PUBLIC_FLUX_NODES_PROXY || "/api/flux-nodes";
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`Flux nodes ${res.status}`);
        const data: { totalNodes: number } = await res.json();
        setFluxNodes({ totalNodes: Number(data.totalNodes) || 0 });
      } catch (err) {
        console.error("Flux nodes:", err);
        setFluxNodes({ totalNodes: 0 }); // fallback
      }
    };

    const fetchAkash = async () => {
      try {
        const res = await fetch("/api/akash-proxy");
        if (!res.ok) throw new Error(`Akash API error: ${res.statusText}`);
        const dto = (await res.json()) as AkashTotals; // { totalSsd, totalRam, totalStorage, totalNodes }
        setAkashData(dto);
      } catch (err) {
        console.error(err);
      }
    };

    (async () => {
      setLoading(true);
      await Promise.all([fetchFlux(), fetchFluxNodes(), fetchAkash()]);
      setLoading(false);
    })();
  }, []);

  if (loading || !fluxData || !fluxNodes) {
    return (
      <div className="text-white w-[90%] mx-auto my-24">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/10 rounded w-1/3 mx-auto" />
          <div className="h-4 bg-white/10 rounded w-1/4 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="h-64 bg-white/5 rounded-2xl" />
            <div className="h-64 bg-white/5 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="text-white w-[90%] mx-auto mb-24 flex flex-col">
      {/* Título */}
      <h1 className="flex justify-center text-center text-[2.5rem] md:text-[3.5rem] font-medium mb-5">
        Deploy on the cloud of your choice
      </h1>

      {/* Subtítulo */}
      <span className="flex justify-center text-white/80 mb-10">
        Access computing with the best providers
      </span>

      {/* Opciones */}
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-10">
        <DeployOption
          image="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/c61ff49d-574b-4546-bd53-fadb83f03e00/public"
          title="The largest decentralized computing network"
          text="Connected Worldwide, Across All Continents, Flux is the largest decentralized network in the world, offering a secure, scalable, and cost-effective cloud for building decentralized applications."
          data={fluxData}
          nodes={fluxNodes}
        />

        {akashData && (
          <DeployOption2
            image="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/a1957f28-d510-41b8-254a-2188ea92de00/public"
            title="Supercloud"
            text="Explore the power of Akash Network for your decentralized cloud needs. Akash offers a robust and flexible solution for all your hosting requirements, ensuring reliability and ease of use."
            data={akashData}
            nodes={akashData.totalNodes}
          />
        )}
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-10">
        <Link href="#" className="btn-primary px-10 py-3 rounded-full">
          DEPLOY NOW
        </Link>
      </div>
    </section>
  );
}
