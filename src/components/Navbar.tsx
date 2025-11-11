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
        <div className="mx-auto flex w-full items-center px-4 py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              alt="Grid logo"
              src={logo}
              className="h-auto w-[120px]"
            />
          </Link>

          {/* Acciones */}
          <div className="flex flex-1 items-center justify-center gap-6">
            <Link
              href="/enterprise"
              className="max-[550px]:hidden text-white underline underline-offset-4 font-medium hover:opacity-80 transition-colors"
            >
              {button}
            </Link>
            <Link href="https://documentation.ongrid.run/" className="max-[550px]:hidden text-white underline underline-offset-4 font-medium hover:opacity-80 transition-colors">
              <span>Docs</span>
            </Link>
          </div>

          <Link
            href="https://console.ongrid.run/"
            className="max-[550px]:hidden btn-primary px-6 ml-auto"
          >
            Deploy now
          </Link>
        </div>
      </nav>
    </header>
  );
}
