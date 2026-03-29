"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const CALM_EASE = [0.22, 1, 0.36, 1] as const;
const PICKER_EASE = [0.25, 1, 0.5, 1] as const;
const CALM_TRANSITION = {
  duration: 0.45,
  ease: CALM_EASE,
};
const EXTENSIONS = ["pgvector", "pg_cron", "pg_net", "pg_graphql", "vault"] as const;
const ROW_HEIGHT = 32;
const VIEWPORT_HEIGHT = 128;
const CENTER_OFFSET = (VIEWPORT_HEIGHT - ROW_HEIGHT) / 2;
const ADVANCE_MS = 2250;
const WHEEL_DURATION_MS = 720;

function ExtensionsGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <rect
        x="4.5"
        y="4.5"
        width="6"
        height="6"
        rx="1.7"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <rect
        x="13.5"
        y="4.5"
        width="6"
        height="6"
        rx="1.7"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <rect
        x="4.5"
        y="13.5"
        width="6"
        height="6"
        rx="1.7"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M16.5 13.5h-1.8a1.2 1.2 0 0 0-1.2 1.2v3.6a1.2 1.2 0 0 0 1.2 1.2h3.6a1.2 1.2 0 0 0 1.2-1.2v-1.8"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 16.5h6M16.5 13.5v6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

type SupabaseExtensionsCardProps = {
  className?: string;
};

export function SupabaseExtensionsCard({ className }: SupabaseExtensionsCardProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const itemCount = EXTENSIONS.length;
  const baseIndex = itemCount;
  const [wheelIndex, setWheelIndex] = useState<number>(baseIndex);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setWheelIndex((current) => current + 1);
    }, ADVANCE_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || wheelIndex < itemCount * 2) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setInstant(true);
      setWheelIndex(baseIndex);
    }, WHEEL_DURATION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [baseIndex, itemCount, reduceMotion, wheelIndex]);

  useEffect(() => {
    if (!instant) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      setInstant(false);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [instant]);

  const revealProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.35 },
        transition: { duration: 0.5, ease: CALM_EASE },
      };

  const wheelItems = [...EXTENSIONS, ...EXTENSIONS, ...EXTENSIONS];

  return (
    <motion.div {...revealProps} className={cn("h-full min-h-[390px]", className)}>
      <motion.article
        initial="rest"
        animate="rest"
        whileHover={reduceMotion ? undefined : "hover"}
        variants={
          reduceMotion
            ? undefined
            : {
                rest: {
                  y: 0,
                  borderColor: "rgba(81, 81, 81, 1)",
                  boxShadow:
                    "0 24px 64px rgba(0, 0, 0, 0.36), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
                },
                hover: {
                  y: -8,
                  borderColor: "rgba(255, 65, 76, 0.24)",
                  boxShadow:
                    "0 34px 82px rgba(0, 0, 0, 0.44), 0 0 0 1px rgba(255, 65, 76, 0.12), 0 0 32px rgba(255, 65, 76, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                  transition: CALM_TRANSITION,
                },
              }
        }
        className="group relative flex h-full min-h-[390px] flex-col overflow-hidden rounded-3xl border bg-[rgba(26,26,26,0.8)] backdrop-blur-2xl"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.018)_24%,transparent_58%),radial-gradient(circle_at_top_right,rgba(255,65,76,0.08),transparent_34%)]" />
        <motion.div
          aria-hidden="true"
          variants={
            reduceMotion
              ? undefined
              : {
                  rest: { opacity: 0.42 },
                  hover: { opacity: 1, transition: CALM_TRANSITION },
                }
          }
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(255,255,255,0.05),transparent_24%),radial-gradient(circle_at_82%_84%,rgba(255,65,76,0.1),transparent_28%)]"
        />
        <div className="pointer-events-none absolute inset-[1px] rounded-[23px] border border-white/5" />

        <div className="relative flex min-h-[236px] flex-col border-b border-white/5 px-6 pt-6">
          <div className="flex items-start justify-between gap-4">
            <motion.div
              variants={
                reduceMotion
                  ? undefined
                  : {
                      rest: {
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        borderColor: "rgba(255, 255, 255, 0.08)",
                      },
                      hover: {
                        backgroundColor: "rgba(255, 65, 76, 0.08)",
                        borderColor: "rgba(255, 65, 76, 0.2)",
                        transition: CALM_TRANSITION,
                      },
                    }
              }
              className="flex h-11 w-11 items-center justify-center rounded-2xl border text-[#FF414C]"
            >
              <motion.div
                variants={
                  reduceMotion
                    ? undefined
                    : {
                        rest: { scale: 1 },
                        hover: { scale: 1.08, transition: CALM_TRANSITION },
                      }
                }
              >
                <ExtensionsGlyph />
              </motion.div>
            </motion.div>

            <motion.span
              variants={
                reduceMotion
                  ? undefined
                  : {
                      rest: { color: "rgba(255, 255, 255, 0.28)" },
                      hover: { color: "#FF414C", transition: CALM_TRANSITION },
                    }
              }
              className="pt-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em]"
            >
              06
            </motion.span>
          </div>

          <div
            aria-hidden="true"
            className="relative mt-5 flex h-[170px] items-center overflow-hidden rounded-[26px] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)),rgba(10,10,10,0.88)] px-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(255,255,255,0.05),transparent_20%),radial-gradient(circle_at_82%_78%,rgba(255,65,76,0.12),transparent_26%)]" />

            <div className="relative mx-auto flex h-[130px] w-full items-center justify-center px-1">
              <div
                className="relative w-full overflow-hidden rounded-[20px] px-2"
                style={{ height: `${VIEWPORT_HEIGHT}px`, perspective: "1200px" }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_26%,rgba(255,255,255,0.03),transparent_22%),radial-gradient(circle_at_82%_72%,rgba(255,65,76,0.065),transparent_26%)]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-10 bg-gradient-to-b from-[rgba(20,20,20,0.72)] via-[rgba(20,20,20,0.34)] to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-10 bg-gradient-to-t from-[rgba(20,20,20,0.72)] via-[rgba(20,20,20,0.34)] to-transparent" />

                <div
                  className="pointer-events-none absolute inset-x-2 top-1/2 z-20 h-8 -translate-y-1/2 rounded-full border border-white/6 bg-white/[0.028]"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />
                  <div className="absolute inset-x-6 inset-y-0 rounded-[14px] bg-[radial-gradient(circle_at_center,rgba(255,65,76,0.12),transparent_72%)]" />
                </div>

                <motion.div
                  animate={{ y: CENTER_OFFSET - wheelIndex * ROW_HEIGHT }}
                  transition={
                    instant || reduceMotion
                      ? { duration: 0 }
                      : { duration: WHEEL_DURATION_MS / 1000, ease: PICKER_EASE }
                  }
                  className="absolute inset-x-0 top-0"
                >
                  {wheelItems.map((name, index) => {
                    const distance = index - wheelIndex;
                    const absDistance = Math.abs(distance);

                    let opacity = 0;
                    if (absDistance === 0) opacity = 1;
                    if (absDistance === 1) opacity = 0.34;
                    if (absDistance === 2) opacity = 0.1;

                    const scale = absDistance === 0 ? 1 : absDistance === 1 ? 0.92 : 0.82;
                    const rotateX = distance * -22;
                    const blur = absDistance === 0 ? 0 : absDistance === 1 ? 0.2 : 0.6;
                    const fontSize =
                      absDistance === 0 ? "1.05rem" : absDistance === 1 ? "0.92rem" : "0.82rem";

                    return (
                      <div
                        key={`${name}-${index}`}
                        className="flex items-center justify-center"
                        style={{ height: `${ROW_HEIGHT}px` }}
                      >
                        <span
                          className="font-medium tracking-[-0.03em] text-white"
                          style={{
                            opacity,
                            filter: `blur(${blur}px)`,
                            fontSize,
                            transform: `perspective(900px) rotateX(${rotateX}deg) scale(${scale})`,
                            textShadow:
                              absDistance === 0 ? "0 0 20px rgba(255,255,255,0.08)" : "none",
                            transition:
                              instant || reduceMotion
                                ? "none"
                                : "transform 720ms cubic-bezier(0.25, 1, 0.5, 1), opacity 720ms cubic-bezier(0.25, 1, 0.5, 1), filter 720ms cubic-bezier(0.25, 1, 0.5, 1), font-size 720ms cubic-bezier(0.25, 1, 0.5, 1)",
                          }}
                        >
                          {name}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col justify-end px-7 py-6">
          <h3 className="text-[1.14rem] font-semibold tracking-[-0.03em] text-white">
            Production posture
          </h3>
          <p className="mt-3 text-[0.97rem] font-medium leading-7 tracking-[-0.02em] text-white/90">
            Core Supabase extensions in one wheel
          </p>
          <p className="mt-4 max-w-[32ch] text-[0.95rem] leading-7 text-white/62">
            pgvector, pg_cron, pg_net, pg_graphql, and Vault stay close to Postgres in
            a single operational surface.
          </p>
        </div>
      </motion.article>
    </motion.div>
  );
}
