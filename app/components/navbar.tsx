"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoMark } from "./logo-mark";

const navLinks = [
  { label: "Docs", href: "https://www.npmjs.com/package/cli-akashdb" },
  { label: "Community", href: "#" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const syncScrollState = () => {
      const nextValue = window.scrollY > 18;
      setIsScrolled((currentValue) =>
        currentValue === nextValue ? currentValue : nextValue,
      );
    };

    syncScrollState();
    window.addEventListener("scroll", syncScrollState, { passive: true });

    return () => window.removeEventListener("scroll", syncScrollState);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-[1.65rem] border px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-all duration-500 sm:px-6 ${
          isScrolled
            ? "border-white/14 bg-[#070b15]/78 backdrop-blur-2xl"
            : "border-white/10 bg-white/[0.05] backdrop-blur-xl"
        }`}
      >
        <Link href="#hero" className="inline-flex items-center gap-3 text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-white/[0.04] sm:h-11 sm:w-11">
            <LogoMark className="h-8 w-8 sm:h-9 sm:w-9" priority />
          </span>
          <span className="text-[0.95rem] font-semibold tracking-[0.16em] text-white sm:text-base">
            akashDB
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium tracking-[0.08em] text-white/70 transition duration-300 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#9aa5ff]/18 bg-white/[0.06] px-4 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition duration-300 hover:bg-white/[0.1] sm:px-5"
        >
          Install the CLI
        </Link>
      </motion.div>
    </header>
  );
}
