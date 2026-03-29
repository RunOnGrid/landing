"use client";

import type Lenis from "lenis";
import { RefObject, useEffect } from "react";

type UseLandingAnimationsArgs = {
  scopeRef: RefObject<HTMLElement | null>;
  heroRef: RefObject<HTMLElement | null>;
  heroMediaInnerRef: RefObject<HTMLElement | null>;
  reduceMotion: boolean;
  lenis: Lenis | null;
};

const REVEAL_VISIBLE_THRESHOLD = 0.92;

export function useLandingAnimations({
  scopeRef,
  heroRef,
  heroMediaInnerRef,
  reduceMotion,
  lenis,
}: UseLandingAnimationsArgs) {
  useEffect(() => {
    const scopeElement = scopeRef.current;
    const hero = heroRef.current;
    const heroMediaInner = heroMediaInnerRef.current;

    if (!scopeElement || !hero || !heroMediaInner) {
      return;
    }

    const heroGlowLeft = scopeElement.querySelector<HTMLElement>(".hero-glow-left");
    const heroGlowRight = scopeElement.querySelector<HTMLElement>(".hero-glow-right");
    const heroGlowBottom = scopeElement.querySelector<HTMLElement>(".hero-glow-bottom");
    const revealTargets = Array.from(
      scopeElement.querySelectorAll<HTMLElement>(".feature-card, .landing-reveal"),
    );

    let rafId = 0;

    const applyHeroMotion = () => {
      const heroRect = hero.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const heroTravel = Math.max(hero.offsetHeight - viewportHeight * 0.2, 1);
      const progress = Math.min(Math.max(-heroRect.top / heroTravel, 0), 1.15);
      const mediaY = progress * -24;
      const mediaScale = 1.08 + progress * 0.026;

      heroMediaInner.style.transform = `translate3d(0, ${mediaY.toFixed(2)}px, 0) scale(${mediaScale.toFixed(4)})`;

      if (heroGlowLeft) {
        const leftX = progress * -16;
        const leftY = progress * 20;
        heroGlowLeft.style.transform = `translate3d(${leftX.toFixed(2)}px, ${leftY.toFixed(2)}px, 0)`;
      }

      if (heroGlowRight) {
        const rightX = progress * 18;
        const rightY = progress * -20;
        heroGlowRight.style.transform = `translate3d(${rightX.toFixed(2)}px, ${rightY.toFixed(2)}px, 0)`;
      }

      if (heroGlowBottom) {
        const bottomX = progress * -10;
        const bottomY = progress * 18;
        heroGlowBottom.style.transform = `translate3d(${bottomX.toFixed(2)}px, ${bottomY.toFixed(2)}px, 0)`;
      }
    };

    const queueHeroMotion = () => {
      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        applyHeroMotion();
      });
    };

    const revealElement = (element: HTMLElement) => {
      if (element.classList.contains("is-visible")) {
        return;
      }

      const delay = element.style.getPropertyValue("--reveal-delay").trim();

      if (delay) {
        element.style.setProperty("transition-delay", delay);

        const clearTransitionDelay = (event: TransitionEvent) => {
          if (event.propertyName !== "opacity" && event.propertyName !== "transform") {
            return;
          }

          element.style.removeProperty("transition-delay");
          element.removeEventListener("transitionend", clearTransitionDelay);
        };

        element.addEventListener("transitionend", clearTransitionDelay);
      }

      element.classList.remove("is-awaiting-reveal");
      element.classList.add("is-visible");
    };

    const prepareReveals = () => {
      const viewportHeight = window.innerHeight || 1;
      const cardDelayMap = [0, 70, 140];
      let revealBlockIndex = 0;

      revealTargets.forEach((element, index) => {
        const isFeatureCard = element.classList.contains("feature-card");
        const rect = element.getBoundingClientRect();

        element.style.setProperty("--reveal-distance", isFeatureCard ? "28px" : "22px");
        element.style.setProperty("--reveal-scale", isFeatureCard ? "0.972" : "1");

        if (isFeatureCard) {
          element.style.setProperty("--reveal-delay", `${cardDelayMap[index % 3]}ms`);
        } else {
          element.style.setProperty("--reveal-delay", `${revealBlockIndex * 55}ms`);
          revealBlockIndex += 1;
        }

        if (rect.top <= viewportHeight * REVEAL_VISIBLE_THRESHOLD) {
          element.style.removeProperty("transition-delay");
          element.classList.remove("is-awaiting-reveal");
          element.classList.add("is-visible");
        } else {
          element.classList.remove("is-visible");
          element.classList.add("is-awaiting-reveal");
        }
      });
    };

    scopeElement.classList.add("motion-enhanced");

    if (reduceMotion) {
      revealTargets.forEach((element) => {
        revealElement(element);
        element.style.removeProperty("--reveal-distance");
        element.style.removeProperty("--reveal-scale");
        element.style.removeProperty("--reveal-delay");
      });

      return () => {
        scopeElement.classList.remove("motion-enhanced");
      };
    }

    prepareReveals();
    applyHeroMotion();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target as HTMLElement;
          revealElement(element);
          observer.unobserve(element);
        });
      },
      {
        root: null,
        threshold: 0.16,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    revealTargets.forEach((element) => {
      if (element.classList.contains("is-awaiting-reveal")) {
        observer.observe(element);
      }
    });

    const handleResize = () => {
      prepareReveals();
      queueHeroMotion();
    };

    const handleWindowScroll = () => {
      queueHeroMotion();
    };

    const handleLenisScroll = ({ scroll: _scroll }: { scroll: number }) => {
      void _scroll;
      queueHeroMotion();
    };

    window.addEventListener("resize", handleResize);

    if (lenis) {
      lenis.on("scroll", handleLenisScroll);
    } else {
      window.addEventListener("scroll", handleWindowScroll, { passive: true });
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleWindowScroll);
      lenis?.off("scroll", handleLenisScroll);
      window.cancelAnimationFrame(rafId);

      scopeElement.classList.remove("motion-enhanced");
      revealTargets.forEach((element) => {
        element.classList.remove("is-awaiting-reveal", "is-visible");
        element.style.removeProperty("--reveal-distance");
        element.style.removeProperty("--reveal-scale");
        element.style.removeProperty("--reveal-delay");
        element.style.removeProperty("transition-delay");
      });

      heroMediaInner.style.removeProperty("transform");
      heroGlowLeft?.style.removeProperty("transform");
      heroGlowRight?.style.removeProperty("transform");
      heroGlowBottom?.style.removeProperty("transform");
    };
  }, [heroMediaInnerRef, heroRef, lenis, reduceMotion, scopeRef]);
}
