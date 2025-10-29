"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  logo: string;
  button: string;
};

export default function Navbar({ logo, button }: Props) {
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
              src={logo}
              className="h-auto w-[120px]"
            />
          </Link>

          {/* Acciones */}
          <div className="flex w-full max-w-xs items-center justify-between">
            <Link
              href="/enterprise"
              className="max-[550px]:hidden btn-secondary"
            >
              {button}
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
