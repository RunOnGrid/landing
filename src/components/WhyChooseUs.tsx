// src/components/WhyChooseGrid.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Feature = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
};

type Props = {
  headingLeft?: string;
  headingRight?: string;
  items?: Feature[];
};

const DEFAULT_ITEMS: Feature[] = [
  {
    title: "Complete lifecycle",
    description:
      "Grid supports the complete software lifecycle through three core pillars — Proactive, Anticipation, and Strategic Foresight — ensuring seamless and scalable integration with DePIN technologies.",
    imageSrc:
      "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/edee45c7-f1fb-43da-f13b-c7c0bbc0c200/public",
  },
  {
    title: "Scalable",
    description:
      "No resource restrictions, no platform lock-ins, no terms of use to hold you back. Built on Flux and Akash, the largest decentralized clouds, you get permissionless, highly available compute that scales globally in seconds. Deploy anywhere, run everywhere.",
    imageSrc:
      "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/e11781f9-0f7e-436d-e347-e953af2ca500/public",
  },
  {
    title: "Significant Cost Savings",
    description:
      "With Grid, cut your cloud costs by up to 60% compare to traditional Platforms-as-a-service",
    imageSrc:
      "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/a7f34cf5-b571-4fc2-cd02-0f6832a6fb00/public",
  },
  {
    title: "Enterprise-grade cloud computing",
    description:
      "Power rendering, machine learning, and AI development with high availability and global scale.",
    imageSrc:
      "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/deba4469-0586-44a0-73cc-a8cdbe5de900/public",
  },
];

/** Hook: observa un contenedor con altura y expone isVisible */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, isVisible };
}

export default function WhyChooseGrid({
  headingLeft = "WHY",
  headingRight = "CHOOSE GRID?",
  items = DEFAULT_ITEMS,
}: Props) {
  return (
    <section className="bg-primary py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 pb-16">
          <div className="lg:col-start-2 lg:col-span-9">
            <div className="flex flex-wrap items-baseline gap-x-6">
              <span className="font-heading leading-none text-7xl sm:text-8xl lg:text-9xl text-secondary/90">
                {headingLeft}
              </span>
              <h2 className="font-heading leading-tight text-3xl sm:text-4xl lg:text-5xl text-secondary/90">
                {headingRight}
              </h2>
            </div>
          </div>
        </div>

        {/* Grid de features */}
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center lg:place-items-center gap-10 lg:gap-12 lg:px-10">
          {items.map(({ title, description, imageSrc, imageAlt }, i) => {
            const reveal = useReveal<HTMLDivElement>();
            return (
              <article key={i} className="max-w-sm w-full space-y-8">
                {/* Card con altura reservada (aspect) */}
                <div className="bg-[#EDEDED] overflow-hidden max-w-sm">
                  {/* El ref va en el contenedor con altura */}
                  <div
                    ref={reveal.ref}
                    className="relative w-full aspect-[8/5]"
                  >
                    {/* Animación en overlay absoluto que no afecta el layout */}
                    <div
                      className={`absolute inset-0 transition-all duration-[900ms] ease-out will-change-transform ${
                        reveal.isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                    >
                      <Image
                        src={imageSrc}
                        alt={imageAlt ?? title}
                        fill
                        className="object-contain block" /* SVGs → mejor contain para no recortar */
                        priority={i < 2}
                        unoptimized /* necesario para SVG externo/Cloudflare */
                      />
                    </div>
                  </div>
                </div>

                {/* Texto */}
                <h3 className="title text-4xl font-semibold text-black/80">
                  {title}
                </h3>
                <p className="text-base leading-relaxed text-black/70 -mt-2">
                  {description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
