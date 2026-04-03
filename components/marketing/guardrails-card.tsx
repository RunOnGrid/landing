"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const CALM_EASE = [0.22, 1, 0.36, 1] as const;
const CALM_TRANSITION = {
  duration: 0.45,
  ease: CALM_EASE,
};
const AMBIENT_FLOAT = {
  duration: 6,
  ease: "easeInOut" as const,
  repeat: Infinity,
};
const SOFT_PULSE = {
  duration: 3.7,
  ease: "easeInOut" as const,
  repeat: Infinity,
};

function GuardrailsGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <path
        d="M12 4l6 2.6v4.8c0 4.1-2.54 6.98-6 8.6-3.46-1.62-6-4.5-6-8.6V6.6L12 4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M9.6 12.2l1.55 1.55L14.8 10.1"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckMini() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" aria-hidden="true">
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type GuardrailsCardProps = {
  className?: string;
};

export function GuardrailsCard({ className }: GuardrailsCardProps) {
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
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.018)_24%,transparent_58%),radial-gradient(circle_at_top_right,rgba(255,65,76,0.09),transparent_34%)]" />
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
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_24%,rgba(255,255,255,0.06),transparent_24%),radial-gradient(circle_at_78%_84%,rgba(255,65,76,0.1),transparent_28%)]"
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
                <GuardrailsGlyph />
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
              03
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
                      x: [0, 8, 0],
                      y: [0, -5, 0],
                    }
              }
              transition={reduceMotion ? undefined : { ...AMBIENT_FLOAT, duration: 7 }}
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.06),transparent_20%),radial-gradient(circle_at_80%_84%,rgba(255,65,76,0.14),transparent_24%)]"
            />

            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -2, 0] }}
              transition={reduceMotion ? undefined : { ...AMBIENT_FLOAT, duration: 6.5 }}
              className="relative h-full w-full overflow-hidden px-1 py-1"
            >
              <motion.span
                aria-hidden="true"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        top: ["14%", "84%", "14%"],
                        opacity: [0, 0.45, 0],
                      }
                }
                transition={reduceMotion ? undefined : { duration: 5.4, ease: "easeInOut", repeat: Infinity }}
                className="pointer-events-none absolute left-3 right-3 h-8 rounded-full bg-[linear-gradient(180deg,transparent,rgba(255,65,76,0.12),transparent)] blur-[8px]"
              />

              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/46">
                    Health checks
                  </span>
                  <p className="mt-1 text-[0.94rem] font-medium tracking-[-0.02em] text-white/86">
                    Runtime guardrails
                  </p>
                </div>

                <motion.span
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          boxShadow: [
                            "0 0 0 rgba(255,65,76,0)",
                            "0 0 18px rgba(255,65,76,0.18)",
                            "0 0 0 rgba(255,65,76,0)",
                          ],
                          opacity: [0.86, 1, 0.86],
                        }
                  }
                  transition={reduceMotion ? undefined : { ...SOFT_PULSE, duration: 3.2 }}
                  className="rounded-full border border-[#FF414C]/18 bg-[#FF414C]/8 px-2.5 py-1.5 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-white"
                >
                  Passing
                </motion.span>
              </div>

              <div className="relative mt-3">
                <motion.div
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          x: [0, 1.5, 0],
                        }
                  }
                  transition={
                    reduceMotion
                      ? undefined
                      : { duration: 5.4, ease: "easeInOut", repeat: Infinity }
                  }
                  className="flex items-center justify-between rounded-[18px] border border-white/6 bg-white/[0.025] px-3 py-2.5"
                >
                  <span className="text-[0.92rem] font-medium tracking-[-0.02em] text-white/82">
                    Logs attached
                  </span>

                  <div className="flex items-center gap-2">
                    <motion.span
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              scale: [0.96, 1.12, 0.96],
                              opacity: [0.74, 1, 0.74],
                            }
                      }
                      transition={
                        reduceMotion
                          ? undefined
                          : {
                              duration: 2.8,
                              ease: "easeInOut",
                              repeat: Infinity,
                            }
                      }
                      className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#FF414C]/12 text-[#FF414C]"
                    >
                      <CheckMini />
                    </motion.span>
                    <span className="text-[0.92rem] font-semibold tracking-[-0.02em] text-white">
                      Live
                    </span>
                  </div>
                </motion.div>
              </div>

              <div className="relative mt-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <motion.span
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            scale: [0.92, 1.08, 0.92],
                            opacity: [0.48, 0.92, 0.48],
                          }
                    }
                    transition={reduceMotion ? undefined : { duration: 3.2, ease: "easeInOut", repeat: Infinity, delay: 0.25 }}
                    className="h-1.5 w-1.5 rounded-full bg-[#FF414C] shadow-[0_0_10px_rgba(255,65,76,0.38)]"
                  />
                  <span className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/40">
                    Backups active
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/58">
                    Ready
                  </span>
                  <motion.span
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            opacity: [0.62, 1, 0.62],
                          }
                    }
                    transition={
                      reduceMotion
                        ? undefined
                        : { duration: 3.4, ease: "easeInOut", repeat: Infinity, delay: 0.8 }
                    }
                    className="text-[0.82rem] font-semibold tracking-[-0.02em] text-white"
                  >
                    42ms
                  </motion.span>
                </div>
              </div>

              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: [0.22, 0.42, 0.22],
                        scaleX: [0.96, 1, 0.96],
                      }
                }
                transition={reduceMotion ? undefined : { ...SOFT_PULSE, duration: 4.4 }}
                className="absolute bottom-3 left-3.5 right-3.5 h-px origin-center bg-gradient-to-r from-transparent via-[#FF414C]/45 to-transparent"
              />
            </motion.div>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col justify-end px-7 py-6">
          <h3 className="text-[1.14rem] font-semibold tracking-[-0.03em] text-white">
            Guardrails
          </h3>
          <p className="mt-3 text-[0.97rem] font-medium leading-7 tracking-[-0.02em] text-white/90">
            Visibility stays close to the deploy
          </p>
          <p className="mt-4 max-w-[32ch] text-[0.95rem] leading-7 text-white/62">
            Logs, health checks, and sane defaults stay part of the flow so
            automation does not hide the system.
          </p>
        </div>
      </motion.article>
    </motion.div>
  );
}
