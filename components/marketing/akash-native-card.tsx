"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const CALM_EASE = [0.22, 1, 0.36, 1] as const;
const CALM_TRANSITION = {
  duration: 0.45,
  ease: CALM_EASE,
};
const AMBIENT_FLOAT = {
  duration: 6.6,
  ease: "easeInOut" as const,
  repeat: Infinity,
};
const ORBIT_SPIN = {
  duration: 18,
  ease: "linear" as const,
  repeat: Infinity,
};
const SOFT_PULSE = {
  duration: 3.8,
  ease: "easeInOut" as const,
  repeat: Infinity,
};

const REGION_NODES = [
  { name: "US-East", className: "left-5 top-[2.95rem]" },
  { name: "EU-West", className: "right-5 top-[2.95rem]" },
  { name: "AP-South", className: "left-1/2 bottom-[0.55rem] -translate-x-1/2" },
] as const;

function NetworkGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <circle cx="12" cy="5.5" r="2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="6" cy="17.5" r="2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="18" cy="17.5" r="2" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M10.8 7.2 7.2 15.8m9.6 0-3.6-8.6M8 17.5h8"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

type AkashNativeCardProps = {
  className?: string;
};

export function AkashNativeCard({ className }: AkashNativeCardProps) {
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
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_26%,rgba(255,255,255,0.06),transparent_24%),radial-gradient(circle_at_82%_82%,rgba(255,65,76,0.1),transparent_30%)]"
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
                <NetworkGlyph />
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
              05
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
              transition={reduceMotion ? undefined : { ...AMBIENT_FLOAT, duration: 7.2 }}
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.06),transparent_20%),radial-gradient(circle_at_84%_82%,rgba(255,65,76,0.16),transparent_24%)]"
            />

            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -1.5, 0] }}
              transition={reduceMotion ? undefined : { ...AMBIENT_FLOAT, duration: 6.4 }}
              className="relative mx-auto h-[124px] w-[90%] max-w-[24rem] px-0.5 py-1"
            >
              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/44">
                    Akash mesh
                  </span>
                  <p className="mt-1 text-[0.94rem] font-medium tracking-[-0.02em] text-white/86">
                    Placement stays visible
                  </p>
                </div>

                <motion.span
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: [0.82, 1, 0.82],
                          boxShadow: [
                            "0 0 0 rgba(255,65,76,0)",
                            "0 0 18px rgba(255,65,76,0.18)",
                            "0 0 0 rgba(255,65,76,0)",
                          ],
                        }
                  }
                  transition={reduceMotion ? undefined : { ...SOFT_PULSE, duration: 3.2 }}
                  className="rounded-full border border-[#FF414C]/18 bg-[#FF414C]/8 px-2.5 py-1.5 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-white"
                >
                  Network
                </motion.span>
              </div>

              <div className="relative mt-2 h-[74px]">
                <div className="absolute left-1/2 top-[1rem] h-[2.85rem] w-px -translate-x-1/2 bg-gradient-to-b from-[#FF414C]/30 to-white/8" />
                <div className="absolute left-[4.8rem] top-[1.95rem] h-px w-[2.5rem] bg-gradient-to-r from-white/8 to-[#FF414C]/30" />
                <div className="absolute right-[4.8rem] top-[1.95rem] h-px w-[2.5rem] bg-gradient-to-l from-white/8 to-[#FF414C]/30" />

                <motion.span
                  aria-hidden="true"
                  animate={reduceMotion ? undefined : { rotate: 360 }}
                  transition={reduceMotion ? undefined : ORBIT_SPIN}
                  className="absolute left-1/2 top-[1.95rem] h-[3.3rem] w-[3.3rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#FF414C]/18"
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
                  className="absolute left-1/2 top-[1.95rem] flex h-[2.35rem] w-[2.35rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#FF414C]/20 bg-[#FF414C]/[0.06] shadow-[0_0_20px_rgba(255,65,76,0.1)]"
                >
                  <span className="h-2 w-2 rounded-full bg-[#FF414C] shadow-[0_0_12px_rgba(255,65,76,0.45)]" />
                </motion.div>

                {REGION_NODES.map((node, index) => (
                  <motion.div
                    key={node.name}
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            y: [0, index === 2 ? 1.5 : -1.5, 0],
                          }
                    }
                    transition={
                      reduceMotion
                        ? undefined
                        : {
                            duration: 5.6,
                            ease: "easeInOut",
                            repeat: Infinity,
                            delay: index * 0.25,
                          }
                    }
                    className={cn(
                      "absolute rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1.5",
                      node.className,
                    )}
                  >
                    <span className="text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-white/74">
                      {node.name}
                    </span>
                  </motion.div>
                ))}

                <motion.span
                  aria-hidden="true"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          top: ["1.2rem", "4.4rem", "1.2rem"],
                          opacity: [0.12, 0.8, 0.12],
                        }
                  }
                  transition={reduceMotion ? undefined : { duration: 4.8, ease: "easeInOut", repeat: Infinity }}
                  className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#FF414C] shadow-[0_0_12px_rgba(255,65,76,0.38)]"
                />
              </div>

              <motion.div
                animate={reduceMotion ? undefined : { y: [0, 1.2, 0] }}
                transition={reduceMotion ? undefined : { duration: 5.8, ease: "easeInOut", repeat: Infinity, delay: 0.55 }}
                className="relative mt-1.5 flex items-center justify-between px-1"
              >
                <span className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/42">
                  Hub, region, ownership
                </span>
                <span className="rounded-full border border-[#FF414C]/14 bg-[#FF414C]/8 px-2.5 py-1.5 text-[0.56rem] font-medium uppercase tracking-[0.16em] text-white">
                  Visible
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col justify-end px-7 py-6">
          <h3 className="text-[1.14rem] font-semibold tracking-[-0.03em] text-white">
            Akash-native
          </h3>
          <p className="mt-3 text-[0.97rem] font-medium leading-7 tracking-[-0.02em] text-white/90">
            Deployment flows grounded in the network
          </p>
          <p className="mt-4 max-w-[32ch] text-[0.95rem] leading-7 text-white/62">
            Provisioning stays aligned with Akash primitives, so scale,
            placement, and ownership remain legible as footprint grows.
          </p>
        </div>
      </motion.article>
    </motion.div>
  );
}
