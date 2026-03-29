"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { useSmoothScroll } from "@/components/animations/smooth-scroll-provider";
import { useLandingAnimations } from "@/components/animations/use-landing-animations";

const INSTALL_COMMAND = "npm i cli-akashdb";

function FeatureIconAgent() {
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

function FeatureIconSpend() {
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

function FeatureIconGuardrails() {
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

function FeatureIconHandoffs() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <path
        d="M4.5 12h7.5M12 7.5l4.5 4.5L12 16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="4.5"
        y="5"
        width="15"
        height="14"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.3"
        opacity="0.6"
      />
    </svg>
  );
}

function FeatureIconNetwork() {
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

function FeatureIconOps() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <path
        d="M5 8.5h14M5 12h14M5 15.5h9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <rect
        x="4.5"
        y="5"
        width="15"
        height="14"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.6"
      />
      <circle cx="17" cy="15.5" r="1" fill="currentColor" />
    </svg>
  );
}

function CheckGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
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

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.21.68-.48v-1.7c-2.77.6-3.36-1.19-3.36-1.19-.46-1.16-1.1-1.47-1.1-1.47-.9-.61.07-.59.07-.59 1 .07 1.53 1.04 1.53 1.04.88 1.53 2.32 1.08 2.88.83.09-.65.35-1.09.63-1.34-2.21-.25-4.54-1.11-4.54-4.95 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.28.1-2.67 0 0 .85-.28 2.78 1.03A9.7 9.7 0 0 1 12 6.84a9.7 9.7 0 0 1 2.53.35c1.93-1.31 2.78-1.03 2.78-1.03.55 1.39.2 2.42.1 2.67.64.7 1.03 1.59 1.03 2.69 0 3.85-2.33 4.69-4.56 4.94.36.31.68.91.68 1.84v2.73c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M18.9 3H21l-4.6 5.25L21.8 21h-4.24l-3.32-4.98L9.9 21H7.8l4.93-5.63L3.2 3h4.35l3 4.52L18.9 3Zm-1.5 16.2h1.18L7.56 4.73H6.29L17.4 19.2Z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M18.94 5.34A15.85 15.85 0 0 0 14.98 4l-.19.39c1.43.37 2.08.9 2.63 1.39a13.6 13.6 0 0 0-5.39-1.04 13.6 13.6 0 0 0-5.39 1.04c.55-.49 1.2-1.02 2.63-1.39L9.08 4c-1.39.21-2.74.67-3.96 1.34C2.61 9.1 1.94 12.76 2.18 16.37a15.92 15.92 0 0 0 4.85 2.45l1.04-1.71c-.57-.2-1.12-.45-1.63-.75.13.1.27.19.41.28 1.57.95 3.38 1.45 5.15 1.45s3.58-.5 5.15-1.45c.14-.09.28-.18.41-.28-.51.3-1.06.55-1.63.75l1.04 1.71a15.92 15.92 0 0 0 4.85-2.45c.29-4.2-.5-7.83-2.99-11.03ZM9.7 14.17c-.95 0-1.73-.88-1.73-1.97 0-1.09.76-1.97 1.73-1.97.98 0 1.75.89 1.73 1.97 0 1.09-.76 1.97-1.73 1.97Zm4.6 0c-.95 0-1.73-.88-1.73-1.97 0-1.09.76-1.97 1.73-1.97.98 0 1.75.89 1.73 1.97 0 1.09-.76 1.97-1.73 1.97Z" />
    </svg>
  );
}

function FeatureCard({
  icon,
  number,
  title,
  highlight,
  detail,
  children,
}: {
  icon: ReactNode;
  number: string;
  title: string;
  highlight: string;
  detail: string;
  children: ReactNode;
}) {
  return (
    <article className="feature-card">
      <div className="feature-visual">
        <div className="feature-meta">
          <span className="feature-icon">{icon}</span>
          <span className="feature-number">{number}</span>
        </div>
        {children}
      </div>
      <div className="feature-card-body">
        <h3>{title}</h3>
        <p className="feature-highlight">{highlight}</p>
        <p className="feature-detail">{detail}</p>
      </div>
    </article>
  );
}

export function LandingPage() {
  const reduceMotion = useReducedMotion() ?? false;
  const { lenis } = useSmoothScroll();
  const scopeRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroMediaInnerRef = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy");

  useEffect(() => {
    document.body.classList.toggle("menu-open", isMenuOpen);

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const syncScrollState = (currentScroll: number) => {
      setIsScrolled((previous) =>
        previous === (currentScroll > 18) ? previous : currentScroll > 18,
      );

      const delta = currentScroll - lastScrollRef.current;

      if (Math.abs(delta) > 4) {
        const nextHidden = delta > 0 && currentScroll > 140 && !isMenuOpen;
        setIsNavHidden((previous) => (previous === nextHidden ? previous : nextHidden));
        lastScrollRef.current = currentScroll;
      }

      if (currentScroll < 24) {
        setIsNavHidden(false);
        lastScrollRef.current = currentScroll;
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsMenuOpen(false);
      }
    };

    if (lenis) {
      const handleLenisScroll = ({ scroll }: { scroll: number }) => {
        syncScrollState(scroll);
      };

      lenis.on("scroll", handleLenisScroll);
      syncScrollState(window.scrollY);
      window.addEventListener("resize", handleResize);

      return () => {
        lenis.off("scroll", handleLenisScroll);
        window.removeEventListener("resize", handleResize);
      };
    }

    const handleScroll = () => {
      syncScrollState(window.scrollY);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen, lenis]);

  useLandingAnimations({
    scopeRef,
    heroRef,
    heroMediaInnerRef,
    reduceMotion,
    lenis,
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setCopyLabel("Copied");
      window.setTimeout(() => setCopyLabel("Copy"), 1800);
    } catch {
      setCopyLabel("Copy failed");
      window.setTimeout(() => setCopyLabel("Copy"), 1800);
    }
  };

  return (
    <div className="page landing-page-root" ref={scopeRef}>
      <motion.header
        className={`site-header ${isScrolled ? "is-scrolled" : ""}`}
        id="siteHeader"
        initial={false}
        animate={{
          y: isNavHidden ? -110 : 0,
          opacity: isNavHidden ? 0.94 : 1,
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.42,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="nav-shell">
          <a className="brand" href="#top" aria-label="akashDB home">
            <span className="brand-mark">
              <img src="/logo.png" alt="akashDB logo" />
            </span>
            <span className="brand-text">akashDB</span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            <a className="nav-link" href="https://www.npmjs.com/package/cli-akashdb" target="_blank" rel="noopener noreferrer">
              Docs
            </a>
            <a className="nav-link" href="#updates">
              Updates
            </a>
          </nav>

          <div className="nav-actions">
            <motion.a
              className="nav-cta desktop-only"
              href="#cli"
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                    scale: 1.03,
                    boxShadow: "0 24px 46px rgba(255, 65, 76, 0.34)",
                  }
              }
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
            >
              <span>Get the CLI</span>
            </motion.a>

            <button
              className="menu-toggle"
              id="menuToggle"
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={isMenuOpen}
              aria-controls="mobilePanel"
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              <span className="menu-toggle-bar"></span>
              <span className="menu-toggle-bar"></span>
              <span className="menu-toggle-bar"></span>
            </button>
          </div>
        </div>
      </motion.header>

      <div
        className={`mobile-panel ${isMenuOpen ? "is-open" : ""}`}
        id="mobilePanel"
        aria-hidden={!isMenuOpen}
      >
        <div className="mobile-panel-backdrop"></div>
        <div className="mobile-panel-content">
          <nav className="mobile-links" aria-label="Mobile">
            <a className="mobile-link" href="https://www.npmjs.com/package/cli-akashdb" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>
              Docs
            </a>
            <a className="mobile-link" href="#updates" onClick={() => setIsMenuOpen(false)}>
              Updates
            </a>
          </nav>

          <div>
            <motion.a
              className="nav-cta"
              href="#cli"
              style={{ width: "100%" }}
              onClick={() => setIsMenuOpen(false)}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                    scale: 1.01,
                    boxShadow: "0 20px 40px rgba(255, 65, 76, 0.32)",
                  }
              }
              whileTap={reduceMotion ? undefined : { scale: 0.99 }}
            >
              <span>Get the CLI</span>
            </motion.a>
          </div>
        </div>
      </div>

      <main id="top">
        <section className="hero" id="cli" ref={heroRef}>
          <div className="hero-media">
            <div className="hero-media-inner" ref={heroMediaInnerRef}>
              <img
                src="/hero-vortex-grok.jpg"
                alt="Large centered vortex formed by books and floating data cubes"
              />
            </div>
          </div>
          <div className="hero-overlay"></div>
          <div className="hero-top-fade"></div>
          <div className="hero-bottom-fade"></div>
          <div className="hero-glow-left"></div>
          <div className="hero-glow-right"></div>
          <div className="hero-glow-bottom"></div>
          <div className="hero-noise"></div>
          <div className="hero-ribbon">
            <div className="hero-ribbon-inner">
              <span className="hero-ribbon-copy">One CLI Tool</span>
              <span className="hero-ribbon-badge">
                <img src="/logo.png" alt="" />
              </span>
              <span className="hero-ribbon-copy">on Akash Network</span>
            </div>
          </div>

          <div className="hero-inner">
            <div className="hero-copy">
              <div className="hero-command-shell">
                <p className="hero-command-kicker">ONE COMMAND</p>
                <div className="hero-command-frame">
                  <div className="hero-command-top">
                    <div className="terminal-dots" aria-hidden="true">
                      <span
                        className="terminal-dot"
                        style={{ background: "rgba(255,255,255,0.20)" }}
                      ></span>
                      <span
                        className="terminal-dot"
                        style={{ background: "rgba(255,255,255,0.28)" }}
                      ></span>
                      <span
                        className="terminal-dot"
                        style={{ background: "rgba(255,255,255,0.38)" }}
                      ></span>
                    </div>
                    <span className="hero-command-label">akashdb / install</span>
                  </div>

                  <div className="hero-command-row">
                    <span className="hero-command-prompt" aria-hidden="true">
                      $
                    </span>
                    <code className="hero-command-code" id="heroInstallCommand">
                      {INSTALL_COMMAND}
                    </code>
                    <motion.button
                      className={`hero-copy-button ${copyLabel === "Copied" ? "is-copied" : ""
                        }`}
                      type="button"
                      onClick={handleCopy}
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                            scale: 1.03,
                            boxShadow: "0 22px 42px rgba(255, 65, 76, 0.34)",
                          }
                      }
                      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                    >
                      {copyLabel}
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-bridge" id="updates">
          <div className="feature-glows" aria-hidden="true">
            <div className="feature-glow-left"></div>
            <div className="feature-glow-right"></div>
          </div>

          <div className="section-inner">
            <div className="section-bridge-copy landing-reveal">
              <p className="section-kicker">Deployment Surface</p>
              <h2 className="section-title">
                Why choose akashDB?
              </h2>
              <p className="section-copy">
                A operational layer for provisioning, visibility, and cost
                control, designed to feel as clear and deliberate as the first command
                itself.
              </p>
            </div>

            <div className="feature-grid">
              <FeatureCard
                icon={<FeatureIconAgent />}
                number="01"
                title="Agent-first"
                highlight="One command into deployment"
                detail="A single CLI surface for operators and agents to request, provision, and hand off Postgres without losing context."
              >
                <div className="feature-scene scene-poster">
                  <div className="scene-poster-card">
                    <div className="scene-poster-core">
                      <span className="scene-poster-orbit"></span>
                      <img src="/logo.png" alt="" />
                    </div>
                    <span className="scene-poster-spark"></span>
                    <span className="scene-poster-caption">CLI Surface</span>
                  </div>
                </div>
              </FeatureCard>

              <FeatureCard
                icon={<FeatureIconSpend />}
                number="02"
                title="Lower spend"
                highlight="Infrastructure costs with room to breathe"
                detail="Move managed Postgres onto Akash Network with materially lower spend and a cleaner operational footprint."
              >
                <div className="feature-scene scene-network">
                  <div className="scene-network-board"></div>
                  <span className="scene-cost-pill scene-cost-pill-left">Traditional</span>
                  <span className="scene-cost-pill scene-cost-pill-right">Akash DB</span>
                  <div className="scene-cost-stack scene-cost-stack-left">
                    <span className="scene-cost-bar"></span>
                    <span className="scene-cost-bar"></span>
                    <span className="scene-cost-bar"></span>
                  </div>
                  <div className="scene-cost-divider"></div>
                  <div className="scene-cost-stack scene-cost-stack-right">
                    <span className="scene-cost-bar"></span>
                    <span className="scene-cost-bar"></span>
                    <span className="scene-cost-bar"></span>
                  </div>
                  <span className="scene-cost-tag">Lower run cost</span>
                </div>
              </FeatureCard>

              <FeatureCard
                icon={<FeatureIconGuardrails />}
                number="03"
                title="Guardrails"
                highlight="Visibility stays close to the deploy"
                detail="Logs, health checks, and sane defaults stay part of the flow so automation does not hide the system."
              >
                <div className="feature-scene scene-guardrails">
                  <div className="scene-guardrails-panel">
                    <div className="scene-guardrails-top">
                      <span className="scene-guardrails-title">Health checks</span>
                      <span className="scene-guardrails-badge">Passing</span>
                    </div>
                    <div className="scene-guardrails-list">
                      <div className="scene-guardrails-row">
                        <strong>Logs attached</strong>
                        <span className="scene-guardrails-check">
                          <CheckGlyph />
                        </span>
                      </div>
                      <div className="scene-guardrails-row">
                        <strong>Backups active</strong>
                        <span className="scene-guardrails-check">
                          <CheckGlyph />
                        </span>
                      </div>
                      <div className="scene-guardrails-row">
                        <strong>Ready for deploy</strong>
                        <span>42ms</span>
                      </div>
                    </div>
                    <div className="scene-guardrails-glow"></div>
                  </div>
                </div>
              </FeatureCard>

              <FeatureCard
                icon={<FeatureIconHandoffs />}
                number="04"
                title="Clean handoffs"
                highlight="A clearer path between operator and agent"
                detail="Shared steps and predictable outputs keep deploy handoffs readable from request to running database."
              >
                <div className="feature-scene scene-migration">
                  <div className="scene-migration-panel">
                    <div className="scene-handoff-card scene-handoff-card-left">
                      <strong>Operator</strong>
                      <span>Request</span>
                    </div>
                    <div className="scene-handoff-card scene-handoff-card-right">
                      <strong>Agent</strong>
                      <span>Deploy</span>
                    </div>
                    <span className="scene-handoff-pill">postgres.yaml</span>
                    <span className="scene-handoff-dot scene-handoff-dot-left"></span>
                    <span className="scene-handoff-dot scene-handoff-dot-right"></span>
                    <span className="scene-handoff-caption">Shared handoff</span>
                  </div>
                </div>
              </FeatureCard>

              <FeatureCard
                icon={<FeatureIconNetwork />}
                number="05"
                title="Akash-native"
                highlight="Deployment flows grounded in the network"
                detail="Provisioning stays aligned with Akash primitives, so scale, placement, and ownership remain legible as footprint grows."
              >
                <div className="feature-scene scene-support">
                  <div className="scene-akash-network">
                    <span className="scene-akash-link scene-akash-link-a"></span>
                    <span className="scene-akash-link scene-akash-link-b"></span>
                    <span className="scene-akash-link scene-akash-link-c"></span>
                    <span className="scene-akash-link scene-akash-link-d"></span>
                    <div className="scene-akash-hub">
                      <img src="/logo.png" alt="" />
                    </div>
                    <span className="scene-akash-node scene-akash-node-a">US-East</span>
                    <span className="scene-akash-node scene-akash-node-b">EU-West</span>
                    <span className="scene-akash-node scene-akash-node-c">AP-South</span>
                    <span className="scene-akash-node scene-akash-node-d">Hub</span>
                    <span className="scene-akash-caption">Akash primitives</span>
                  </div>
                </div>
              </FeatureCard>

              <FeatureCard
                icon={<FeatureIconOps />}
                number="06"
                title="Production posture"
                highlight="Sane defaults for real workloads"
                detail="Backups, observability, and operational checks stay close to the workflow before the system gets complex."
              >
                <div className="feature-scene scene-observability">
                  <div className="scene-ops-panel">
                    <div className="scene-ops-header">
                      <span className="scene-ops-title">Runtime posture</span>
                      <span className="scene-ops-badge">Healthy</span>
                    </div>
                    <div className="scene-ops-list">
                      <div className="scene-ops-row">
                        <strong>Backups</strong>
                        <span>Enabled</span>
                      </div>
                      <div className="scene-ops-row">
                        <strong>Health checks</strong>
                        <span>Live</span>
                      </div>
                      <div className="scene-ops-row">
                        <strong>Logs</strong>
                        <span>Streaming</span>
                      </div>
                    </div>
                    <div className="scene-ops-footer">
                      <span className="scene-ops-footer-bar"></span>
                      <span className="scene-ops-footer-metric">99.9%</span>
                    </div>
                  </div>
                </div>
              </FeatureCard>
            </div>
          </div>
        </section>

        <section className="section section-proof">
          <div className="section-inner">
            <div className="proof-intro landing-reveal">
              <div className="proof-intro-copy">
                <p className="section-kicker">Why This Direction</p>
                <h2 className="section-title">
                  Minimal in the first screen. Credible underneath.
                </h2>
                <p className="section-copy">
                  Esta capa intermedia nos deja validar si la p&aacute;gina,
                  adem&aacute;s de atm&oacute;sfera, puede sostener se&ntilde;ales de
                  producto, costo y operaci&oacute;n con la misma calma visual del hero.
                </p>
              </div>
              <div className="proof-intro-note">
                <span className="proof-intro-chip">Proof Layer</span>
                <p>
                  Signals, cost posture, and runtime readiness without empujar la
                  p&aacute;gina hacia un dashboard pesado.
                </p>
              </div>
            </div>

            <div className="proof-grid">
              <div className="proof-panel landing-reveal">
                <div className="proof-panel-header">
                  <div>
                    <p className="proof-panel-kicker">Signals</p>
                    <h3>Operator confidence without dashboard bloat</h3>
                  </div>
                  <span className="proof-panel-chip">Calm by design</span>
                </div>
                <p className="proof-panel-copy">
                  Este bloque funciona como una zona de prueba para validar
                  c&oacute;mo podr&iacute;an convivir benchmarks, arquitectura y screenshots
                  sin que la p&aacute;gina pierda aire ni se vuelva una consola antes de
                  tiempo.
                </p>

                <div className="proof-row">
                  <div className="proof-item">
                    <span className="proof-item-label">Surface</span>
                    <strong>1 CLI</strong>
                    <span>One clean surface for provisioning and handoff.</span>
                  </div>
                  <div className="proof-item">
                    <span className="proof-item-label">Spend</span>
                    <strong>80%</strong>
                    <span>Potential infrastructure savings message placeholder.</span>
                  </div>
                  <div className="proof-item">
                    <span className="proof-item-label">Operations</span>
                    <strong>24/7</strong>
                    <span>Operational framing for real workloads and uptime.</span>
                  </div>
                </div>
              </div>

              <div className="metric-panel landing-reveal">
                <div className="metric-hero">
                  <div className="metric-topline">
                    <span className="metric-chip">Runtime Slice</span>
                    <span className="metric-status">Live mock</span>
                  </div>
                  <h3>Mockup Dashboard Slice</h3>
                  <p>
                    No es producto real todav&iacute;a. Es una superficie de prueba para
                    ver c&oacute;mo conviven los mensajes de costo, provisioning y salud.
                  </p>
                </div>

                <div className="metric-stack">
                  <div className="metric-row">
                    <span>Provisioning status</span>
                    <strong className="metric-ready">Ready</strong>
                  </div>
                  <div className="metric-row">
                    <span>Database engine</span>
                    <strong>Postgres 16</strong>
                  </div>
                  <div className="metric-row">
                    <span>Deploy target</span>
                    <strong>Akash Network</strong>
                  </div>
                  <div className="metric-row">
                    <span>Observed latency</span>
                    <strong>42ms</strong>
                  </div>
                </div>
                <div className="metric-footer">
                  <span className="metric-footer-bar"></span>
                  <div className="metric-footer-meta">
                    <span>Health trend</span>
                    <strong>Stable</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer" id="footer">
          <div className="footer-inner">
            <div className="footer-grid">
              <div className="footer-brand landing-reveal">
                <div className="footer-brand-top">
                  <span className="footer-brand-mark">
                    <img src="/logo.png" alt="akashDB logo" />
                  </span>
                  <div>
                    <div className="footer-kicker">akashDB</div>
                    <h2>Built for agent-native operators</h2>
                  </div>
                </div>

                <p>
                  Built for operators who want AI agents deploying databases with
                  guardrails, lower spend, and a surface that stays legible.
                </p>

                <div className="socials">
                  <a className="social-link" href="#cli" aria-label="GitHub">
                    <GithubIcon />
                  </a>
                  <a className="social-link" href="#updates" aria-label="X">
                    <XIcon />
                  </a>
                  <a className="social-link" href="#footer" aria-label="Discord">
                    <DiscordIcon />
                  </a>
                </div>
              </div>

              <div className="footer-column landing-reveal">
                <h3>Resources</h3>
                <ul className="footer-links">
                  <li>
                    <a href="https://www.npmjs.com/package/cli-akashdb" target="_blank" rel="noopener noreferrer">Docs</a>
                  </li>
                  <li>
                    <a href="#updates">Updates</a>
                  </li>
                  <li>
                    <a href="#cli">Install Guide</a>
                  </li>
                </ul>
              </div>

              <div className="footer-column landing-reveal">
                <h3>Tools</h3>
                <ul className="footer-links">
                  <li>
                    <a href="#cli">Get the CLI</a>
                  </li>
                  <li>
                    <a href="#footer">Talk with us</a>
                  </li>
                  <li>
                    <a href="#top">Akash Network</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <span>Copyright 2026 © Akash DB</span>
              <div className="footer-bottom-links">
                <a href="#top">Privacy</a>
                <a href="#top">Terms</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
