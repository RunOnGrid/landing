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
const COMPARISON_ROWS = [
  { label: "Compute", traditional: 88, akash: 46, delay: 0 },
  { label: "Standby", traditional: 72, akash: 24, delay: 0.16 },
  { label: "Overhead", traditional: 94, akash: 34, delay: 0.3 },
] as const;

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

type LowerSpendCardProps = {
  className?: string;
};

function ConsumptionTrack({
  value,
  tone,
  delay,
  reduceMotion,
}: {
  value: number;
  tone: "traditional" | "akash";
  delay: number;
  reduceMotion: boolean;
}) {
  return (
    <div className="relative h-4 overflow-hidden rounded-full bg-white/[0.045] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: tone === "akash" ? [0.82, 1, 0.82] : [0.54, 0.74, 0.54],
                scaleX: [1, 1.015, 1],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: tone === "akash" ? 3.8 + delay : 4.6 + delay,
                ease: "easeInOut",
                repeat: Infinity,
                delay,
              }
        }
        style={{ width: `${value}%`, transformOrigin: "left center" }}
        className={cn(
          "absolute inset-y-0 left-0 overflow-hidden rounded-full",
          tone === "akash"
            ? "bg-[linear-gradient(90deg,rgba(255,65,76,0.22),rgba(255,65,76,0.56))] shadow-[0_0_18px_rgba(255,65,76,0.12)]"
            : "bg-[linear-gradient(90deg,rgba(255,255,255,0.12),rgba(255,255,255,0.2))]",
        )}
      >
        <motion.span
          aria-hidden="true"
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [-36, 180, -36],
                  opacity: tone === "akash" ? [0, 0.9, 0] : [0, 0.55, 0],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: tone === "akash" ? 3.2 + delay : 4.1 + delay,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay,
                }
          }
          className={cn(
            "absolute inset-y-0 w-10 rounded-full blur-[6px]",
            tone === "akash"
              ? "bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.58),transparent)]"
              : "bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.24),transparent)]",
          )}
        />
      </motion.div>
    </div>
  );
}

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
            className="relative mt-5 flex h-[170px] items-center overflow-hidden rounded-[26px] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)),rgba(10,10,10,0.88)] px-6 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
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
              transition={reduceMotion ? undefined : { ...AMBIENT_FLOAT, duration: 7.2 }}
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_72%,rgba(255,255,255,0.06),transparent_22%),radial-gradient(circle_at_84%_28%,rgba(255,65,76,0.14),transparent_26%)]"
            />

            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -1.2, 0] }}
              transition={reduceMotion ? undefined : { ...AMBIENT_FLOAT, duration: 6.6 }}
              className="relative flex h-full w-full flex-col px-1 py-1"
            >
              <div className="relative mt-1 flex-1 px-1 pb-1 pt-2">
                <motion.div
                  animate={reduceMotion ? undefined : { opacity: [0.14, 0.24, 0.14] }}
                  transition={reduceMotion ? undefined : { ...SOFT_PULSE, duration: 5 }}
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(circle_at_22%_52%,rgba(255,255,255,0.08),transparent_54%)]"
                />
                <motion.div
                  animate={reduceMotion ? undefined : { opacity: [0.16, 0.32, 0.16] }}
                  transition={reduceMotion ? undefined : { ...SOFT_PULSE, duration: 4.2 }}
                  className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_78%_42%,rgba(255,65,76,0.16),transparent_54%)]"
                />
                <div className="pointer-events-none absolute inset-y-1 left-[calc(4.4rem_+_0.75rem)] w-px bg-gradient-to-b from-transparent via-white/6 to-transparent" />
                <div className="pointer-events-none absolute inset-y-1 left-[calc(4.4rem_+_0.75rem_+_50%_-_0.375rem)] w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-10 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

                <div className="grid grid-cols-[4.4rem_1fr_1fr] items-center gap-x-3 gap-y-3">
                  <span />
                  <span className="pb-1 text-[0.52rem] font-semibold uppercase tracking-[0.16em] text-white/42">
                    Traditional deployments
                  </span>
                  <span className="pb-1 text-[0.52rem] font-semibold uppercase tracking-[0.16em] text-[#FF414C]">
                    Akash deploy
                  </span>

                  {COMPARISON_ROWS.map((row) => (
                    <div
                      key={row.label}
                      className="contents"
                    >
                      <span className="text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-white/34">
                        {row.label}
                      </span>
                      <ConsumptionTrack
                        value={row.traditional}
                        tone="traditional"
                        delay={row.delay}
                        reduceMotion={reduceMotion}
                      />
                      <ConsumptionTrack
                        value={row.akash}
                        tone="akash"
                        delay={row.delay + 0.08}
                        reduceMotion={reduceMotion}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between pt-3">
                  <span className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/34">
                    Higher consumption
                  </span>
                  <motion.span
                    animate={reduceMotion ? undefined : { opacity: [0.42, 0.64, 0.42] }}
                    transition={reduceMotion ? undefined : { ...SOFT_PULSE, duration: 4.2 }}
                    className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#FF414C]"
                  >
                    Lower consumption
                  </motion.span>
                </div>
              </div>
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
          <p className="mt-4 text-[0.95rem] leading-7 text-white/62">
            Move managed Postgres onto Akash Network with materially lower spend
            and a cleaner operational footprint.
          </p>
        </div>
      </motion.article>
    </motion.div>
  );
}
