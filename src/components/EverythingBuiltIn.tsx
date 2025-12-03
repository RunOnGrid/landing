"use client";

import { useEffect, useRef, useState } from "react";

function useReveal<T extends HTMLElement>() {
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

  return { ref, visible };
}

export default function EverythingBuiltIn() {
  const titleRef = useReveal<HTMLHeadingElement>();
  const subtitleRef = useReveal<HTMLParagraphElement>();
  const featuresRef = useReveal<HTMLDivElement>();

  const features = [
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      title: "Live logs",
      description: "Real-time logging of your databases",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      title: "Secure Access",
      description: "Database SSH access with enterprise-grade security",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
      title: "No setup required",
      description: "Everything configured and ready to use out of the box",
    },
  ];

  return (
    <section className="text-white w-[90%] mx-auto py-24 lg:py-32">
      {/* Title */}
      <h2
        ref={titleRef.ref}
        className={[
          "title font-semibold text-center mb-4",
          "opacity-0 transition-opacity duration-1000 ease-out",
          titleRef.visible ? "opacity-100" : "",
        ].join(" ")}
      >
        Everything built in
      </h2>

      {/* Subtitle */}
      <p
        ref={subtitleRef.ref}
        className={[
          "subtitle text-center text-white/80 mb-16 max-w-2xl mx-auto",
          "opacity-0 transition-opacity duration-1000 ease-out delay-200",
          subtitleRef.visible ? "opacity-100" : "",
        ].join(" ")}
      >
        Powerful features included by default. No additional configuration needed.
      </p>

      {/* Features Grid */}
      <div
        ref={featuresRef.ref}
        className={[
          "grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto",
          "opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-300",
          featuresRef.visible ? "opacity-100 translate-y-0" : "",
        ].join(" ")}
      >
        {features.map((feature, idx) => (
          <div
            key={feature.title}
            style={{ transitionDelay: `${400 + idx * 100}ms` }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:bg-white/10"
          >
            <div className="text-primary mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

