import React from "react";
import CountUp from "react-countup";

type Props = {
  image: string;
  title: string;
  text: string;
  className?: string;
  data: {
    totalSsd: number; // TB
    totalRam: number; // TB
    totalCpu: number; // Millones de vCPU
    totalNodes: number;
  };
  nodes: number; // redundante, pero si lo querés separado, OK
};

const DeployOption2: React.FC<Props> = ({
  image,
  title,
  text,
  className = "",
  data,
  nodes,
}) => {
  const safe = (n: unknown) => (typeof n === "number" && isFinite(n) ? n : 0);

  return (
    <div className={`flex flex-col items-center w-full md:w-1/2 ${className}`}>
      <div className="w-4/5 text-center">
        <img alt="" src={image} width={220} height={150} className="mx-auto" />
        <h2 className="mt-3 mb-6 font-normal text-xl">{title}</h2>
        <span className="block mx-auto text-sm text-white/80 w-4/5">
          {text}
        </span>
      </div>

      <div className="mt-6 flex flex-col items-center">
        <div className="flex justify-center">
          <div className="bg-white/20 rounded-xl w-44 h-24 m-2 p-3">
            <h4 className="text-center text-lg">Total Providers</h4>
            <p className="text-center text-3xl -mt-1">
              <CountUp end={safe(nodes)} duration={1.6} />
            </p>
          </div>

          <div className="bg-white/20 rounded-xl w-44 h-24 m-2 p-3">
            <h4 className="text-center text-lg">Total RAM</h4>
            <p className="text-center text-3xl -mt-1">
              <CountUp
                end={Math.round(safe(data.totalRam))}
                duration={1.6}
                suffix=" TB"
              />
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-white/20 rounded-xl w-44 h-24 m-2 p-3">
            <h4 className="text-center text-lg">Total CPU</h4>
            <p className="text-center text-3xl -mt-1">
              {/* totalStorage está en “millones” → uso sufijo M */}
              <CountUp
                end={Number(safe(data.totalCpu))/1000}
                decimals={0}
                suffix=" K"
                duration={1.6}
              />
            </p>
          </div>

          <div className="bg-white/20 rounded-xl w-44 h-24 m-2 p-3">
            <h4 className="text-center text-lg">Total Storage</h4>
            <p className="text-center text-3xl -mt-1">
              <CountUp
                end={Math.round(safe(data.totalSsd))}
                duration={1.6}
                suffix=" PB"
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeployOption2;
