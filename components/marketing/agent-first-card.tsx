"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const CALM_EASE = [0.22, 1, 0.36, 1] as const;
const CALM_TRANSITION = {
  duration: 0.45,
  ease: CALM_EASE,
};
const AMBIENT_FLOAT = {
  duration: 5.8,
  ease: "easeInOut" as const,
  repeat: Infinity,
};
const ORBIT_SPIN = {
  duration: 18,
  ease: "linear" as const,
  repeat: Infinity,
};
const SOFT_PULSE = {
  duration: 3.6,
  ease: "easeInOut" as const,
  repeat: Infinity,
};

function AgentGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <path
        d="M5 16.5V8.2c0-.72.58-1.3 1.3-1.3h11.4c.72 0 1.3.58 1.3 1.3v8.3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M8 12h8M9.5 18h5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="8" cy="12" r="0.8" fill="currentColor" />
      <circle cx="16" cy="12" r="0.8" fill="currentColor" />
    </svg>
  );
}

type AgentFirstCardProps = {
  className?: string;
};

export function AgentFirstCard({ className }: AgentFirstCardProps) {
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
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.018)_24%,transparent_58%),radial-gradient(circle_at_top_right,rgba(255,65,76,0.1),transparent_36%)]" />
        <motion.div
          aria-hidden="true"
          variants={
            reduceMotion
              ? undefined
              : {
                  rest: { opacity: 0.45 },
                  hover: { opacity: 1, transition: CALM_TRANSITION },
                }
          }
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,65,76,0.1),transparent_32%),radial-gradient(circle_at_50%_100%,rgba(255,65,76,0.08),transparent_36%)]"
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
                <AgentGlyph />
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
              01
            </motion.span>
          </div>

          <div
            aria-hidden="true"
            className="relative mt-5 flex h-[170px] items-center overflow-hidden rounded-[26px] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012)),rgba(10,10,10,0.88)] px-6 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            <motion.div
              aria-hidden="true"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      x: [0, 10, 0],
                      y: [0, -6, 0],
                    }
              }
              transition={reduceMotion ? undefined : { ...AMBIENT_FLOAT, duration: 7.2 }}
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_50%,rgba(255,65,76,0.18),transparent_28%),radial-gradient(circle_at_84%_18%,rgba(255,255,255,0.08),transparent_18%)]"
            />

              <motion.div
                className="relative flex h-full w-full items-center"
              >
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
                transition={reduceMotion ? undefined : AMBIENT_FLOAT}
                className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,rgba(255,65,76,0.2),transparent_66%),rgba(255,255,255,0.02)] shadow-[0_0_36px_rgba(255,65,76,0.12)]"
              >
                <span className="absolute inset-3 rounded-full border border-[#FF414C]/30" />
                <span className="absolute inset-6 rounded-full border border-white/10" />
                <motion.div
                  variants={
                    reduceMotion
                      ? undefined
                      : {
                          rest: { scale: 1, opacity: 0.72 },
                          hover: { scale: 1.04, opacity: 1, transition: CALM_TRANSITION },
                        }
                  }
                  animate={reduceMotion ? undefined : { rotate: 360 }}
                  transition={reduceMotion ? undefined : ORBIT_SPIN}
                  className="absolute -inset-2 rounded-full border border-dashed border-[#FF414C]/25"
                />
                <motion.div
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          scale: [1, 1.03, 1],
                          opacity: [0.92, 1, 0.92],
                        }
                  }
                  transition={reduceMotion ? undefined : { ...SOFT_PULSE, duration: 4.2 }}
                  className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-[#FF414C]"
                >
                  <AgentGlyph />
                </motion.div>
              </motion.div>

              <div className="relative ml-5 flex flex-1 items-center">
                <motion.div
                  variants={
                    reduceMotion
                      ? undefined
                      : {
                          rest: { opacity: 0.72 },
                          hover: { opacity: 1, transition: CALM_TRANSITION },
                        }
                  }
                  className="absolute left-0 right-5 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-[#FF414C]/60 via-[#FF414C]/20 to-white/10"
                />
                <motion.span
                  aria-hidden="true"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          left: ["8%", "72%", "8%"],
                          opacity: [0.28, 0.92, 0.28],
                        }
                  }
                  transition={reduceMotion ? undefined : { duration: 4.8, ease: "easeInOut", repeat: Infinity }}
                  className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#FF414C] shadow-[0_0_12px_rgba(255,65,76,0.45)]"
                />
                <motion.span
                  aria-hidden="true"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          left: ["4%", "68%", "4%"],
                          opacity: [0, 0.6, 0],
                        }
                  }
                  transition={reduceMotion ? undefined : { duration: 4.8, ease: "easeInOut", repeat: Infinity }}
                  className="absolute top-1/2 h-4 w-14 -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,65,76,0.28),transparent)] blur-[6px]"
                />

                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, 2, 0] }}
                  transition={reduceMotion ? undefined : { ...AMBIENT_FLOAT, delay: 0.8, duration: 6.4 }}
                  className="relative ml-auto flex w-[11rem] flex-col gap-3"
                >
                  <motion.div
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            opacity: [0.5, 0.7, 0.5],
                          }
                    }
                    transition={reduceMotion ? undefined : { ...SOFT_PULSE, duration: 4.4 }}
                    className="rounded-full border border-white/8 bg-white/[0.03] px-4 py-2.5 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-white/58"
                  >
                    Agent request
                  </motion.div>
                  <motion.div
                    animate={reduceMotion ? undefined : { y: [0, -1.5, 0] }}
                    transition={reduceMotion ? undefined : { ...SOFT_PULSE, duration: 4.8 }}
                    variants={
                      reduceMotion
                        ? undefined
                        : {
                            rest: {
                              backgroundColor: "rgba(255, 65, 76, 0.08)",
                              borderColor: "rgba(255, 65, 76, 0.18)",
                            },
                            hover: {
                              backgroundColor: "rgba(255, 65, 76, 0.12)",
                              borderColor: "rgba(255, 65, 76, 0.28)",
                              transition: CALM_TRANSITION,
                            },
                          }
                    }
                    className="flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium tracking-[-0.02em] text-white shadow-[0_0_20px_rgba(255,65,76,0.1)]"
                  >
                    <motion.span
                      aria-hidden="true"
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              scale: [0.95, 1.15, 0.95],
                              opacity: [0.68, 1, 0.68],
                            }
                      }
                      transition={reduceMotion ? undefined : { ...SOFT_PULSE, duration: 2.8 }}
                      className="h-2 w-2 rounded-full bg-[#FF414C] shadow-[0_0_10px_rgba(255,65,76,0.5)]"
                    />
                    <span>postgres.deploy</span>
                  </motion.div>
                </motion.div>
              </div>

              <motion.span
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: [0.34, 0.5, 0.34],
                      }
                }
                transition={reduceMotion ? undefined : { ...SOFT_PULSE, duration: 4.2, delay: 0.6 }}
                className="absolute bottom-1 left-0 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/42"
              >
                Context intact
              </motion.span>
            </motion.div>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col justify-end px-7 py-6">
          <h3 className="text-[1.14rem] font-semibold tracking-[-0.03em] text-white">
            Agent-first
          </h3>
          <p className="mt-3 text-[0.97rem] font-medium leading-7 tracking-[-0.02em] text-white/90">
            One command into deployment
          </p>
          <p className="mt-4 text-[0.95rem] leading-7 text-white/62">
            A single CLI surface for operators and agents to request, provision,
            and hand off Postgres without losing context.
          </p>
        </div>
      </motion.article>
    </motion.div>
  );
}
