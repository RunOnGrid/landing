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
      src: "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/bd77b9a9-36bd-4290-46da-17b8b3207100/public",
      w: 150,
      h: 70,
      alt: "Logo 1",
    },
    {
      src: "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/eea3eb79-10a9-4008-f8a4-3b6db3824d00/public",
      w: 160,
      h: 70,
      alt: "Logo 2",
    },
  ];

  return (
    <section className="text-white max-w-[1400px] mx-auto px-6 mb-36 max-[650px]:px-4 max-[650px]:mb-12">
      {/* Row 1 */}
      <div
        ref={left.ref}
        className={`grid grid-cols-12 lg:gap-24 items-start mb-12 ${left.cls}`}
      >
        <div className="col-span-12 lg:col-span-6">
          <h1 className="title text-3xl lg:text-4xl font-semibold leading-tight">
            Deploy PostgreSQL and Redis with one click
          </h1>
        </div>
        <p className="mt2 lg:mt-0 col-span-12 lg:col-span-6 text-md lg:text-lg text-white/80 leading-relaxed font-light">
          Don't worry about decentralization and configurations—we handle it all. 
          Deploy your databases with the simplicity you need and the power you deserve.
        </p>
      </div>

      {/* Row 2 */}
      <div
        ref={right.ref}
        className={`grid grid-cols-12 lg:gap-24 items-start mb-12 ${right.cls}`}
      >
        <p className="mt-2 lg:mt-0 col-span-12 lg:col-span-6 order-2 lg:order-1 text-md lg:text-lg text-white/80 leading-relaxed font-light">
          We handle all the complex setup, replication, and maintenance behind the scenes. 
          Your databases run on a decentralized network with enterprise-grade performance 
          and reliability, without you managing a thing.
        </p>
        <div className="col-span-12 lg:col-span-6 order-1 lg:order-2">
          <h2 className="title text-3xl lg:text-4xl font-semibold leading-tight">
            We help you scale for millions of users
          </h2>
        </div>
      </div>

      {/* Logos */}
      {/* <div className="hidden lg:flex gap-20 max-w-[1100px] mx-auto items-center justify-center h-[220px]">
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
      </div> */}
    </section>
  );
}
