"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import DeployOption from "./DeployOption";

export type AkashTotals = {
  totalSsd: number; // TB
  totalRam: number; // TB
  totalCpu: number;
  totalNodes: number;
};

export type AkashProviders = { totalNodes: number };


export default function DeployChoice() {
  const [akashProviders, setAkashProviders] = useState<AkashProviders | null>(
    null
  );
  const [akashData, setAkashData] = useState<AkashTotals | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAkash = async () => {
      try {
        const res = await fetch("/api/akash-proxy");
        if (!res.ok) throw new Error(`Akash API error: ${res.statusText}`);
        const dto = await res.json(); // { totalSsd, totalRam, totalStorage, totalNodes }
        setAkashData(dto);
        setAkashProviders({ totalNodes: dto.totalNodes });
      } catch (err) {
        console.error(err);
        setAkashProviders({ totalNodes: 0 });
        setAkashData({ totalSsd: 0, totalRam: 0, totalCpu: 0, totalNodes: 0 });
      }
    };

    (async () => {
      setLoading(true);
      await fetchAkash();
      setLoading(false);
    })();
  }, []);

  if (loading || !akashData) {
    return (
      <div className="text-white w-[90%] mx-auto my-24">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/10 rounded w-1/3 mx-auto" />
          <div className="h-4 bg-white/10 rounded w-1/4 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="h-64 bg-white/5 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="text-white w-[90%] mx-auto mb-24 flex flex-col">
      {/* Título */}
      <h1 className="flex justify-center text-center text-[2.5rem] md:text-[3.5rem] font-medium leading-12">
        Our provider
      </h1>

      {/* Subtítulo */}
      <span className="subtitle flex justify-center text-white/80 pt-4 pb-8">
        Truly decentralized compute
      </span>

      {/* Opciones */}
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-10 max-w-7xl mx-auto">
        {akashData && (
          <DeployOption
            image="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/a1957f28-d510-41b8-254a-2188ea92de00/public"
            title="Supercloud"
            text="Explore the power of Akash Network for your decentralized cloud needs. Akash offers a robust and flexible solution for all your hosting requirements, ensuring reliability and ease of use."
            data={akashData}
            nodes={akashProviders!}
            countries={0}
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
