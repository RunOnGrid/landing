import Image from "next/image";
import React from "react";

const Enterprise = () => {
  return (
    <section className="grid">
      {/* Contenedor de hero seccion & enhance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-[#E8E9E9] lg:max-h-[80vh] pb-8">
        {/* Texto */}
        <div className="grid place-items-center px-6 pt-32 pb-8 lg:pb-0 lg:pt-0 ">
          <div className=" grid">
            <h1 className="title font-semibold tracking-wider">Enterprise</h1>
            <p className="subtitle">
              We help you migrate to DePIN with the
              <br /> best practices.
            </p>
            <div className="mt-4">
              <a href="#deploy" className="btn-primary">
                Deploy Now
              </a>
            </div>
          </div>
        </div>

        {/* Imagen + fondo SVG */}
        <div className="relative overflow-hidden md:min-h-[660px] lg:min-h-[690px]">
          {/* SVG de fondo (ya no tiene z negativo) */}
          <svg
            viewBox="0 0 1230 1509"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMaxYMin"
            className="absolute inset-0 h-full lg:w-full z-0 pointer-events-none select-none lg:block hidden"
          >
            <defs>
              <linearGradient
                id="paint0_linear_1101_27"
                x1="1039.24"
                y1="-361.336"
                x2="1039.24"
                y2="1374.66"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#0E0500" stopOpacity="0.1" />
                <stop offset="1" stopColor="#037050" />
              </linearGradient>
            </defs>

            <ellipse
              cx="1039.24"
              cy="506.664"
              rx="1153"
              ry="868"
              transform="rotate(-41.2191 1039.24 506.664)"
              fill="url(#paint0_linear_1101_27)"
            />
          </svg>

          <Image
            src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/5617ce26-8cff-4fa0-416f-e7cbf9829000/public"
            width={979}
            height={487}
            alt="nodes info"
            className="relative lg:top-60 xl:top-50 2xl:top-15 z-10 mx-auto"
            priority
          />
        </div>
      </div>

      <div className="flex-col items-center justify-center mx-auto font-semibold lg:w-full max-w-5xl py-16 gap-16 ">
        <div class="space-y-0 text-3xl">
          <p>Enhance your cloud </p>
          <p> operations with</p>
          <p className="text-primary"> decentralized cloud </p>
          <p className="text-primary">providers.</p>
        </div>
        <div className="mt-8 font-normal space-y-6">
          <p>CI/CD Pipelines</p>
          <p>Disaster recovery service</p>
          <p>Database </p>
          <p>Monitoring and Logging</p>
        </div>
      </div>
    </section>
  );
};

export default Enterprise;
