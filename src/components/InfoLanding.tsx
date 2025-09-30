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

  // Clases de animación equivalentes a .scroll2-in-left/right
  const base =
    "opacity-0 transition-all duration-[1500ms] ease-out will-change-transform";
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
    <section
      className="
        text-white max-h-[90vh] w-[80%] mx-auto mb-[200px]
        max-[650px]:w-[90%] max-[650px]:mb-[50px]
      "
    >
      {/* Row 1 */}
      <div
        ref={left.ref}
        className={[
          "flex items-start justify-between gap-8",
          "mb-12",
          left.cls,
        ].join(" ")}
      >
        <div className="flex-1">
          <h1
            className="
              text-[3rem] max-[1450px]:text-[2rem] max-[650px]:text-[1.2rem]
              w-[70%] max-[650px]:w-full
            "
          >
            Seamlessly transition from any cloud provider
          </h1>
        </div>

        <span
            className="
              text-white/80 text-[0.9rem] w-[40%] mx-auto
              max-[1450px]:w-[60%]
              max-[650px]:w-full max-[650px]:text-[0.8rem]
            "
        >
          Decentralized infrastructures use containers, allowing for seamless
          transitions from any cloud provider.
        </span>
      </div>

      {/* Row 2 */}
      <div
        ref={right.ref}
        className={[
          "flex items-start justify-between gap-8",
          "mb-6",
          right.cls,
        ].join(" ")}
      >
        <span
          className="
            text-white/80 text-[0.9rem] w-[40%] mx-auto
            max-[1450px]:w-[60%]
            max-[650px]:w-full max-[650px]:text-[0.8rem]
          "
        >
          Connect your GitHub repository to Grid and use our Buildpacks solution
          to deploy your applications with ease. Our automated process takes
          care of the build, deployment, and scaling, so you can focus
          on writing code.
        </span>

        <div className="flex-1">
          <h2
            className="
              text-[3rem] max-[1450px]:text-[2rem] max-[650px]:text-[1.2rem]
              w-[70%] ml-auto max-[650px]:w-full max-[650px]:ml-0
            "
          >
            From code to deployment in minutes
          </h2>
        </div>
      </div>

      {/* Logos */}
      <div
        className="
          hidden max-[650px]:hidden
          md:flex w-[80%] mx-auto justify-around items-center
          h-[250px]
        "
      >
        {logos.map((l) => (
          <Image key={l.src} src={l.src} alt={l.alt} width={l.w} height={l.h}
                 className="max-[1450px]:h-[60px] w-auto" />
        ))}
      </div>
    </section>
  );
}
