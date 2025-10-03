// src/components/InfoLanding.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function useReveal<T extends HTMLElement>(direction: "left" | "right") {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const base =
    "opacity-0 transition-all duration-[1200ms] ease-out will-change-transform";
  const before =
    direction === "left" ? "translate-x-[-120px]" : "translate-x-[120px]";
  const after = "opacity-100 translate-x-0";
  return { ref, cls: `${base} ${visible ? after : before}` };
}

export default function InfoLanding() {
  const left = useReveal<HTMLDivElement>("left");
  const right = useReveal<HTMLDivElement>("right");

  const logos = [
    {
      src: "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/4b703d3a-9c54-4639-dd70-b46c544e7f00/public",
      w: 170,
      h: 70,
      alt: "Logo 1",
    },
    {
      src: "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/e929561a-7618-4e11-9b34-4662c399de00/public",
      w: 80,
      h: 70,
      alt: "Logo 2",
    },
    {
      src: "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/3c3700bf-6c3e-4b90-9029-a5dff93fff00/public",
      w: 150,
      h: 70,
      alt: "Logo 3",
    },
    {
      src: "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/e1fd7391-46c2-429a-1e39-fecd94eb7e00/public",
      w: 180,
      h: 70,
      alt: "Logo 4",
    },
    {
      src: "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/21cd7431-b97f-4b26-6752-cd62a2c63800/public",
      w: 160,
      h: 70,
      alt: "Logo 5",
    },
  ];

  return (
    <section className="text-white max-w-[1400px] mx-auto px-6 mb-36 max-[650px]:px-4 max-[650px]:mb-12">
      {/* Row 1 */}
      <div
        ref={left.ref}
        className={`grid grid-cols-12 lg:gap-24 items-start mb-12 ${left.cls}`}
      >
        <div className="col-span-12 md:col-span-6">
          <h1 className="title text-3xl md:text-4xl font-semibold leading-tight">
            Seamlessly transition from any cloud provider
          </h1>
        </div>
        <p className="mt2 lg:mt-0 col-span-12 md:col-span-6 text-md md:text-lg text-white/80 leading-relaxed font-extralight">
          Decentralized infrastructures use containers, allowing for seamless
          transitions from any cloud provider.
        </p>
      </div>

      {/* Row 2 */}
      <div
        ref={right.ref}
        className={`grid grid-cols-12 lg:gap-24 items-start mb-12 ${right.cls}`}
      >
        <p className="mt-2 lg:mt-0 col-span-12 md:col-span-6 order-2 md:order-1 text-md md:text-lg text-white/80 leading-relaxed font-extralight">
          Connect your GitHub repository to Grid and use our Buildpacks solution
          to deploy your applications with ease. Our automated process takes
          care of the build, deployment, and scaling, so you can focus on
          writing code.
        </p>
        <div className="col-span-12 md:col-span-6 order-1 md:order-2">
          <h2 className="title text-3xl md:text-4xl font-semibold leading-tight">
            From code to deployment in minutes
          </h2>
        </div>
      </div>

      {/* Logos */}
      <div className="hidden md:grid grid-cols-5 gap-6 max-w-[1100px] mx-auto place-items-center h-[220px]">
        {logos.map((l) => (
          <Image
            key={l.src}
            src={l.src}
            alt={l.alt}
            width={l.w}
            height={l.h}
            className="h-[70px] max-[1450px]:h-[60px] w-auto"
          />
        ))}
      </div>
    </section>
  );
}
