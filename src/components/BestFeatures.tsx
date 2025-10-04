// src/components/BestFeatures.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Features from "./Features";

type RevealOpts = {
  threshold?: number;
  rootMargin?: string;
};

/** Hook para revelar al entrar al viewport (equiv. a .scroll-in/.visible) */
function useReveal<T extends HTMLElement>({
  threshold = 0.1,
  rootMargin = "0px 0px -20% 0px",
}: RevealOpts = {}) {
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
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return { ref, visible };
}

export default function BestFeatures() {
  // Revelado de los headings
  const h3 = useReveal<HTMLHeadingElement>();
  const h1 = useReveal<HTMLHeadingElement>();

  // Delays para cada feature (0.3s / 0.6s / 0.9s)
  const delays = ["300ms", "600ms", "900ms"] as const;

  // Data (misma que tenías)
  const items = [
    {
      image:
        "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/fae77dbc-fe25-47e9-3653-f28ffce7aa00/public",
      title: "NO EXPERIENCE NEEDED",
      subtitle:
        "Discover the freedom of managing a cloud without stress or DevOps expertise. Our Automatic Builds system lets you focus on your project, while we take care of implementation and deployment in a fast and secure way.",
    },
    {
      image:
        "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/ac6dd116-8f8c-422d-1bf8-876b70036500/public",
      title: "ORGANIZE AND UPSCALE",
      subtitle:
        "Manage your project efficiently with our platform. Group services, configure environments, and receive real-time notifications via Slack. Assign roles and permissions to ensure security and control.",
    },
    {
      image:
        "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/7f7eda15-ce83-46b9-ca7f-5baf97c8cb00/public",
      title: "DECENTRALIZATION",
      subtitle:
        "Access to low cost computing power and democratized deployment of secure, censorship-resistant apps, available to all developers.",
    },
  ];

  return (
    <section
      className="
        w-[90%] text-white mx-auto text-center py-24 lg:py-32"
    >
      {/* h3: ABOUT US (font-size 1rem, fade-in) */}
      <h3
        ref={h3.ref}
        className={[
          "subtitle mb-4",
          "opacity-0 transition-opacity duration-1000 ease-out",
          h3.visible ? "opacity-100" : "",
        ].join(" ")}
      >
        ABOUT US
      </h3>

      {/* h1: Best features (3rem desktop, 2rem mobile, -20px margin-top) */}
      <h1
        ref={h1.ref}
        className={[
          "title font-semibold",
          "opacity-0 transition-opacity duration-1000 ease-out",
          h1.visible ? "opacity-100" : "",
        ].join(" ")}
      >
        Best features
      </h1>

      {/* .features-container -> flex row, column en mobile */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center">
        {items.map((it, idx) => {
          // Cada item se revela con translateY + fade y delay creciente
          const [shown, setShown] = useState(false);
          const itemRef = useRef<HTMLDivElement | null>(null);

          useEffect(() => {
            const el = itemRef.current;
            if (!el) return;
            const io = new IntersectionObserver(
              ([entry]) => {
                if (entry.isIntersecting) {
                  setShown(true);
                  io.unobserve(entry.target);
                }
              },
              { rootMargin: "0px 0px -20% 0px" }
            );
            io.observe(el);
            return () => io.disconnect();
          }, []);

          return (
            <div
              key={it.title}
              ref={itemRef}
              style={{ transitionDelay: delays[idx] }}
              className={[
                "mx-auto", // .features { margin: auto }
                // animaciones: opacity/translate como .features
                "opacity-0 translate-y-5",
                "transition-all duration-1000 ease-out",
                shown ? "opacity-100 translate-y-0" : "",
                // hover scale (icon-hover / scale-hover equivalentes)
                "hover:scale-[1.03] md:hover:scale-105 transition-transform",
                // Para ayudar a que el contenido no se desborde en mobile
                "max-w-7xl w-full",
              ].join(" ")}
            >
              <Features
                className="w-full" // mantiene tu API pasada por props
                image={it.image}
                title={it.title}
                subtitle={it.subtitle}
              />
            </div>
          );
        })}
      </div>

      {/* Ajustes mobile extra (del CSS): 
          - h2 1.5rem, span 100% width, img 150x150 -> 
          Como no controlamos el interior de <Features/>, si necesitás forzar imagen 150px en mobile,
          agregá esa clase dentro del propio componente Features. */}
    </section>
  );
}
