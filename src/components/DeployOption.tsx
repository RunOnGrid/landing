"use client";

import React from "react";
import CountUp from "react-countup";
import type { CommonTotals, FluxNodes } from "./DeployChoice";

type Props = {
  image: string;
  title: string;
  text: string;
  data: CommonTotals;
  nodes: FluxNodes;
  className?: string;
};

export default function DeployOption({
  image,
  title,
  text,
  data,
  nodes,
  className,
}: Props) {
  return (
    <div
      className={[
        "flex flex-col items-center w-full md:w-[48%]",
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
          className="mx-auto"
          loading="lazy"
        />
        <h2 className="mx-auto text-center mb-3 font-normal text-2xl md:text-[1.6rem]">
          {title}
        </h2>
        <span className="mx-auto text-center text-sm md:text-base text-white/90 block max-w-[80%]">
          {text}
        </span>
      </div>

      {/* métricas */}
      <div className="mt-6 flex flex-col items-center">
        <div className="flex justify-center">
          <div className="flex mt-3">
            <MetricCard label="Total Nodes" value={nodes.totalNodes} />
            <MetricCard
              label="Total RAM"
              value={Math.floor(data.totalRam)}
              suffix=" TB"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <MetricCard
            label="Total CPU"
            value={Math.floor(data.totalStorage / 1000)}
            suffix=" K"
          />
          <MetricCard
            label="Total SSD"
            value={Math.floor(data.totalSsd)}
            suffix=" TB"
          />
        </div>

        <h5 className="text-xl mt-4">Countries : 78</h5>
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
    <div className="bg-white/20 rounded-xl w-[180px] h-[100px] m-2">
      <h4 className="flex justify-center text-lg mt-2">{label}</h4>
      <p className="flex justify-center -mt-1 text-2xl">
        <CountUp start={0} end={value} duration={2.0} suffix={suffix} />
      </p>
    </div>
  );
}
