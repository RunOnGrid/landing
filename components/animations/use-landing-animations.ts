"use client";

import type Lenis from "lenis";
import { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type UseLandingAnimationsArgs = {
  scopeRef: RefObject<HTMLElement | null>;
  heroRef: RefObject<HTMLElement | null>;
  heroMediaInnerRef: RefObject<HTMLElement | null>;
  reduceMotion: boolean;
  lenis: Lenis | null;
};

export function useLandingAnimations({
  scopeRef,
  heroRef,
  heroMediaInnerRef,
  reduceMotion,
  lenis,
}: UseLandingAnimationsArgs) {
  useGSAP(
    (context) => {
      const hero = heroRef.current;
      const heroMediaInner = heroMediaInnerRef.current;

      if (!hero || !heroMediaInner) {
        return;
      }

      const syncScrollTrigger = () => ScrollTrigger.update();
      lenis?.on("scroll", syncScrollTrigger);

      const media = gsap.matchMedia();

      media.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          finePointer: "(pointer: fine)",
        },
        (matchContext) => {
          const shouldReduce =
            reduceMotion || Boolean(matchContext.conditions?.reduce);
          const featureCards = gsap.utils.toArray<HTMLElement>(".feature-card");
          const revealBlocks = gsap.utils.toArray<HTMLElement>(".landing-reveal");

          gsap.set(
            [
              ".site-header",
              ".nav-shell",
              ".hero-media-inner",
              ".hero-command-shell",
              ".hero-command-frame",
              ".hero-command-code",
              ".hero-copy-button",
              ".feature-card",
              ".feature-icon",
            ],
            {
              force3D: true,
            },
          );

          if (shouldReduce) {
            gsap.set([featureCards, revealBlocks], {
              clearProps: "all",
            });
            return;
          }

          gsap.set(featureCards, {
            autoAlpha: 0,
            y: 34,
            scale: 0.968,
          });

          gsap.set(revealBlocks, {
            autoAlpha: 0,
            y: 26,
          });

          gsap.to(heroMediaInner, {
            yPercent: -3.6,
            scale: 1.105,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 1.15,
            },
          });

          gsap.to(".hero-glow-right", {
            xPercent: 6,
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
            },
          });

          gsap.to(".hero-glow-left", {
            xPercent: -4,
            yPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 1.3,
            },
          });

          gsap.to(".hero-glow-bottom", {
            xPercent: -3,
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 1.18,
            },
          });

          if (matchContext.conditions?.finePointer) {
            const xTo = gsap.quickTo(heroMediaInner, "x", {
              duration: 0.85,
              ease: "power3.out",
            });
            const yTo = gsap.quickTo(heroMediaInner, "y", {
              duration: 0.85,
              ease: "power3.out",
            });

            const rightGlow = hero.querySelector<HTMLElement>(".hero-glow-right");
            const bottomGlow = hero.querySelector<HTMLElement>(".hero-glow-bottom");

            const rightXTo = rightGlow
              ? gsap.quickTo(rightGlow, "x", {
                  duration: 0.95,
                  ease: "power3.out",
                })
              : null;
            const rightYTo = rightGlow
              ? gsap.quickTo(rightGlow, "y", {
                  duration: 0.95,
                  ease: "power3.out",
                })
              : null;
            const bottomXTo = bottomGlow
              ? gsap.quickTo(bottomGlow, "x", {
                  duration: 1,
                  ease: "power3.out",
                })
              : null;
            const bottomYTo = bottomGlow
              ? gsap.quickTo(bottomGlow, "y", {
                  duration: 1,
                  ease: "power3.out",
                })
              : null;

            const handlePointerMove = (event: PointerEvent) => {
              const rect = hero.getBoundingClientRect();
              const x = (event.clientX - rect.left) / rect.width - 0.5;
              const y = (event.clientY - rect.top) / rect.height - 0.5;

              xTo(Math.round(x * -16));
              yTo(Math.round(y * -10));
              rightXTo?.(Math.round(x * 20));
              rightYTo?.(Math.round(y * -14));
              bottomXTo?.(Math.round(x * -12));
              bottomYTo?.(Math.round(y * 12));
            };

            const resetPointer = () => {
              xTo(0);
              yTo(0);
              rightXTo?.(0);
              rightYTo?.(0);
              bottomXTo?.(0);
              bottomYTo?.(0);
            };

            hero.addEventListener("pointermove", handlePointerMove);
            hero.addEventListener("pointerleave", resetPointer);
            hero.addEventListener("pointercancel", resetPointer);

            context.add(() => {
              hero.removeEventListener("pointermove", handlePointerMove);
              hero.removeEventListener("pointerleave", resetPointer);
              hero.removeEventListener("pointercancel", resetPointer);
            });
          }

          ScrollTrigger.batch(featureCards, {
            start: "top 84%",
            once: true,
            onEnter: (batch) => {
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.82,
                ease: "power3.out",
                stagger: 0.11,
                overwrite: true,
                clearProps: "opacity,visibility,transform",
              });
            },
          });

          ScrollTrigger.batch(revealBlocks, {
            start: "top 86%",
            once: true,
            onEnter: (batch) => {
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                duration: 0.72,
                ease: "power3.out",
                stagger: 0.1,
                overwrite: true,
                clearProps: "opacity,visibility,transform",
              });
            },
          });
        },
      );

      const refreshScroll = () => ScrollTrigger.refresh();
      window.addEventListener("load", refreshScroll);
      window.requestAnimationFrame(refreshScroll);

      return () => {
        lenis?.off("scroll", syncScrollTrigger);
        window.removeEventListener("load", refreshScroll);
        media.revert();
      };
    },
    { scope: scopeRef },
  );
}
