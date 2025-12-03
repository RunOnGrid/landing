"use client";

import React from "react";
import CountUp from "react-countup";
import type { AkashProviders, AkashTotals } from "./DeployChoice";

type Props = {
  image: string;
  title: string;
  data: AkashTotals;
  nodes: AkashProviders;
  className?: string;
  countries?: number;
};

export default function DeployOption({
  image,
  title,
  data,
  nodes,
  className,
  countries,
}: Props) {
  return (
    <div
      className={[
        "flex flex-col items-center w-full md:w-[100%]",
        className ?? "",
      ].join(" ")}
    >
      {/* header */}
      <div className="w-full max-w-xl text-center">
        <img
          alt=""
          src={image}
          width={220}
          height={150}
          className="mx-auto h-24"
          loading="lazy"
        />
        <h2 className=" mx-auto text-center font-bold tracking-wide text-xl pt-2 pb-6">
          {title}
        </h2>
      </div>

      {/* métricas */}
      <div className="mt-6 flex flex-col items-center">
        <div className="flex justify-center">
          <div className="flex mt-3">
            <MetricCard label="Total Nodes" value={nodes.totalNodes} />
            <MetricCard
              label="Total RAM"
              value={Math.floor(data.totalRam) / 10}
              suffix=" PB"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <MetricCard
            label="Total CPU"
            value={Math.floor(data.totalCpu) / 1000}
            suffix=" K"
          />
          <MetricCard
            label="Total Storage"
            value={Math.floor(data.totalSsd) / 100}
            suffix=" PB"
          />
        </div>

        {countries ? (
          <h5 className="text-xl mt-4">Countries: {countries}</h5>
        ) : null}
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number;
  suffix?: string;
}) {
  return (
    <div className="bg-white/20 rounded-xl w-[160px] m-2 py-2">
      <h4 className="flex justify-center text-lg">{label}</h4>
      <p className="flex justify-center  text-lg">
        <CountUp start={0} end={value} duration={2.0} suffix={suffix} />
      </p>
    </div>
  );
}
