"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const CALM_EASE = [0.22, 1, 0.36, 1] as const;
const CALM_TRANSITION = {
  duration: 0.45,
  ease: CALM_EASE,
};
const AMBIENT_FLOAT = {
  duration: 6.2,
  ease: "easeInOut" as const,
  repeat: Infinity,
};
const SOFT_PULSE = {
  duration: 3.8,
  ease: "easeInOut" as const,
  repeat: Infinity,
};

function SpendGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <path
        d="M6 16.5L10.2 12l2.6 2.7L18 8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 8.5H18V11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 5.5h13"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>
  );
}

function SpendBar({
  className,
  animate,
  transition,
}: {
  className: string;
  animate?: { scaleY: number[]; opacity?: number[] };
  transition?: { duration: number; ease: "easeInOut"; repeat: number; delay?: number };
}) {
  return (
    <motion.span
      animate={animate}
      transition={transition}
      className={cn(
        "block w-3 rounded-full bg-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        className,
      )}
      style={{ transformOrigin: "bottom center" }}
    />
  );
}

type LowerSpendCardProps = {
  className?: string;
};

export function LowerSpendCard({ className }: LowerSpendCardProps) {
  const reduceMotion = useReducedMotion() ?? false;

  const revealProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.35 },
        transition: { duration: 0.5, ease: CALM_EASE },
      };

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
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(255,65,76,0.12),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(255,65,76,0.06),transparent_40%)]"
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
                <SpendGlyph />
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
              02
            </motion.span>
          </div>

          <div
            aria-hidden="true"
            className="relative mt-5 flex h-[170px] items-center overflow-hidden rounded-[26px] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)),rgba(10,10,10,0.88)] px-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : {
                      x: [0, -8, 0],
                      y: [0, 5, 0],
                    }
              }
              transition={reduceMotion ? undefined : { ...AMBIENT_FLOAT, duration: 7.4 }}
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_72%,rgba(255,255,255,0.06),transparent_22%),radial-gradient(circle_at_84%_28%,rgba(255,65,76,0.14),transparent_26%)]"
            />

            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -1.5, 0] }}
              transition={reduceMotion ? undefined : { ...AMBIENT_FLOAT, duration: 6.8 }}
              className="relative mx-auto grid h-[124px] w-full grid-cols-[1fr_auto_1fr] items-center gap-3 px-1 py-1"
            >
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -1.5, 0] }}
                transition={reduceMotion ? undefined : { ...AMBIENT_FLOAT, duration: 6.8 }}
                className="flex h-full flex-col justify-between"
              >
                <span className="w-fit rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1.5 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-white/56">
                  Traditional
                </span>

                <div className="flex h-[58px] items-end gap-2">
                  <SpendBar
                    className="h-[46px] w-2.5"
                    animate={reduceMotion ? undefined : { scaleY: [1, 1.05, 1], opacity: [0.72, 0.88, 0.72] }}
                    transition={reduceMotion ? undefined : { duration: 4.8, ease: "easeInOut", repeat: Infinity }}
                  />
                  <SpendBar
                    className="h-[32px] w-2.5"
                    animate={reduceMotion ? undefined : { scaleY: [1, 1.04, 1], opacity: [0.62, 0.78, 0.62] }}
                    transition={
                      reduceMotion
                        ? undefined
                        : { duration: 5.2, ease: "easeInOut", repeat: Infinity, delay: 0.3 }
                    }
                  />
                  <SpendBar
                    className="h-[52px] w-2.5"
                    animate={reduceMotion ? undefined : { scaleY: [1, 1.03, 1], opacity: [0.76, 0.9, 0.76] }}
                    transition={
                      reduceMotion
                        ? undefined
                        : { duration: 5.6, ease: "easeInOut", repeat: Infinity, delay: 0.55 }
                    }
                  />
                </div>

                <span className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/34">
                  Legacy spend
                </span>
              </motion.div>

              <div className="relative flex h-full items-center justify-center">
                <motion.span
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: [0.35, 0.75, 0.35],
                        }
                  }
                  transition={reduceMotion ? undefined : { ...SOFT_PULSE, duration: 3.4 }}
                  className="h-[72px] w-px bg-gradient-to-b from-white/10 via-[#FF414C]/45 to-white/10"
                />
                <motion.span
                  aria-hidden="true"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          top: ["22%", "74%", "22%"],
                          opacity: [0.16, 0.9, 0.16],
                        }
                  }
                  transition={reduceMotion ? undefined : { duration: 4.6, ease: "easeInOut", repeat: Infinity }}
                  className="absolute h-7 w-7 rounded-full bg-[radial-gradient(circle,rgba(255,65,76,0.24),transparent_72%)] blur-[8px]"
                />
              </div>

              <motion.div
                animate={reduceMotion ? undefined : { y: [0, 1.5, 0] }}
                transition={reduceMotion ? undefined : { ...AMBIENT_FLOAT, duration: 6.4, delay: 0.7 }}
                className="relative flex h-full flex-col justify-between"
              >
                <span className="w-fit rounded-full border border-[#FF414C]/16 bg-[#FF414C]/8 px-2.5 py-1.5 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-white/82 shadow-[0_0_20px_rgba(255,65,76,0.08)]">
                  Akash DB
                </span>

                <div className="relative flex h-[58px] items-end gap-2">
                  <motion.div
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            x: ["-14%", "14%", "-14%"],
                            opacity: [0.16, 0.28, 0.16],
                          }
                    }
                    transition={reduceMotion ? undefined : { duration: 4.9, ease: "easeInOut", repeat: Infinity }}
                    className="absolute inset-y-1 left-0 right-0 rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,65,76,0.18),transparent)] blur-[8px]"
                  />

                  <motion.span
                    animate={reduceMotion ? undefined : { scaleY: [1, 1.03, 1], opacity: [0.88, 1, 0.88] }}
                    transition={reduceMotion ? undefined : { duration: 4.6, ease: "easeInOut", repeat: Infinity }}
                    className="block h-[28px] w-2.5 rounded-full bg-[#FF414C]/88 shadow-[0_0_18px_rgba(255,65,76,0.14)]"
                    style={{ transformOrigin: "bottom center" }}
                  />
                  <motion.span
                    animate={reduceMotion ? undefined : { scaleY: [1, 1.04, 1], opacity: [0.82, 0.96, 0.82] }}
                    transition={
                      reduceMotion
                        ? undefined
                        : { duration: 5, ease: "easeInOut", repeat: Infinity, delay: 0.35 }
                    }
                    className="block h-[20px] w-2.5 rounded-full bg-[#FF414C]/74 shadow-[0_0_18px_rgba(255,65,76,0.12)]"
                    style={{ transformOrigin: "bottom center" }}
                  />
                  <motion.span
                    animate={reduceMotion ? undefined : { scaleY: [1, 1.02, 1], opacity: [0.84, 1, 0.84] }}
                    transition={
                      reduceMotion
                        ? undefined
                        : { duration: 5.4, ease: "easeInOut", repeat: Infinity, delay: 0.55 }
                    }
                    className="block h-[34px] w-2.5 rounded-full bg-[#FF414C]/82 shadow-[0_0_18px_rgba(255,65,76,0.12)]"
                    style={{ transformOrigin: "bottom center" }}
                  />
                </div>

                <motion.span
                  animate={reduceMotion ? undefined : { opacity: [0.42, 0.62, 0.42] }}
                  transition={reduceMotion ? undefined : { ...SOFT_PULSE, duration: 4.2 }}
                  className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#FF414C]"
                >
                  Lower cost
                </motion.span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col justify-end px-7 py-6">
          <h3 className="text-[1.14rem] font-semibold tracking-[-0.03em] text-white">
            Lower spend
          </h3>
          <p className="mt-3 text-[0.97rem] font-medium leading-7 tracking-[-0.02em] text-white/90">
            Infrastructure costs with room to breathe
          </p>
          <p className="mt-4 max-w-[32ch] text-[0.95rem] leading-7 text-white/62">
            Move managed Postgres onto Akash Network with materially lower spend
            and a cleaner operational footprint.
          </p>
        </div>
      </motion.article>
    </motion.div>
  );
}
