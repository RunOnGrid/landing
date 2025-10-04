// src/components/Features.tsx
import React from "react";

type FeaturesProps = {
  image: string;
  title: string;
  subtitle: string;
  className?: string;
};

export default function Features({
  image,
  title,
  subtitle,
  className = "",
}: FeaturesProps) {
  return (
    <article
      className={[
        // Card base
        "mx-auto text-center",

        "p-6 sm:px-8 hover:shadow-xl",
        "transition-transform duration-300 hover:-translate-y-1",
        className,
      ].join(" ")}
    >
      {/* Imagen (150px mobile / 250px desktop) */}
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="mx-auto h-[150px] w-[150px] md:h-[250px] md:w-[250px] object-contain"
      />

      {/* Título */}
      <h2 className="mt-4 text-white text-xl md:text-2xl font-normal flex justify-center">
        {title}
      </h2>

      {/* Texto (≈20vw en desktop como tu CSS) */}
      <span className="mt-3 block text-white/80 text-sm md:text-base leading-relaxed mx-auto w-full max-w-lg">
        {subtitle}
      </span>
    </article>
  );
}
