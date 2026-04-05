"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AkashNativeCard } from "@/components/marketing/akash-native-card";
import { useSmoothScroll } from "@/components/animations/smooth-scroll-provider";
import { useLandingAnimations } from "@/components/animations/use-landing-animations";
import { AgentFirstCard } from "@/components/marketing/agent-first-card";
import { GuardrailsCard } from "@/components/marketing/guardrails-card";
import { LowerSpendCard } from "@/components/marketing/lower-spend-card";
import { SupabaseExtensionsCard } from "@/components/marketing/supabase-extensions-card";

const INSTALL_COMMAND = "npm i cli-akashdb";

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
            <a className="nav-link" href="/docs">
              Docs
            </a>
            <a className="nav-link" href="#updates">
              Updates
            </a>
          </nav>

          <div className="nav-actions">
            <motion.a
              className="nav-cta desktop-only"
              href="/docs#installation"
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
            <a className="mobile-link" href="/docs" onClick={() => setIsMenuOpen(false)}>
              Docs
            </a>
            <a className="mobile-link" href="#updates" onClick={() => setIsMenuOpen(false)}>
              Updates
            </a>
          </nav>

          <div>
            <motion.a
              className="nav-cta"
              href="/docs#installation"
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
              <div className="feature-grid-row feature-grid-row-duo">
                <AgentFirstCard />
                <LowerSpendCard />
              </div>

              <div className="feature-grid-row feature-grid-row-trio">
                <GuardrailsCard />
                <AkashNativeCard />
                <SupabaseExtensionsCard />
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
                    <a href="/docs">Docs</a>
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
