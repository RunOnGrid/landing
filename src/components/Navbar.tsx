"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-[1000] w-full transition-colors duration-300 bg-black">
      <nav className="w-full">
        <div className="mx-auto flex w-full items-center justify-between px-4 py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              alt="Grid logo"
              src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/d4e80dd3-61e5-4b44-2495-c2594875dc00/public"
              className="h-auto w-[120px]"
            />
          </Link>

          {/* Acciones */}
          <div className="flex w-full max-w-xs items-center justify-between">
            <Link
              href="/enterprise"
              className="max-[550px]:hidden btn-secondary"
            >
              Enterprise
            </Link>

            <Link
              href="https://documentation.ongrid.run/"
              className="ml-auto inline-flex"
            >
              <span className="subtitle text-white underline">Docs</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
