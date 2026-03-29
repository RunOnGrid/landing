"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { BrandLockup } from "@/components/shared/brand-lockup";
import { Button } from "@/components/ui/button";

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,65,76,0.16),transparent_30%),linear-gradient(180deg,#050505_0%,#030303_100%)]" />
      <div className="absolute inset-0 surface-grid opacity-25" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between">
          <BrandLockup />
          <Button asChild variant="secondary" size="sm">
            <Link href="/">Back to site</Link>
          </Button>
        </div>

        <div className="grid flex-1 gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-primary">
              {eyebrow}
            </p>
            <h1 className="max-w-[12ch] text-balance text-5xl font-semibold leading-[0.94] tracking-[-0.05em] text-white sm:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#bababa]">{description}</p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                  Auth
                </p>
                <p className="mt-3 text-sm leading-6 text-white/80">
                  Credentials-based access with protected operator routes.
                </p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                  Deploy
                </p>
                <p className="mt-3 text-sm leading-6 text-white/80">
                  Launch one or many Postgres agents from the same flow.
                </p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                  Ready
                </p>
                <p className="mt-3 text-sm leading-6 text-white/80">
                  Prisma, NextAuth v5, and server actions wired for real backends.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.section>
        </div>
      </div>
    </main>
  );
}
