"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-[1000] transition-colors duration-300",
        isSticky
          ? "bg-gray-800 backdrop-blur-md shadow-[0_2px_5px_rgba(0,0,0,0.1)]"
          : "bg-[#0c1317d9]",
      ].join(" ")}
    >
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

          {/* Acciones derecha */}
          <div className="flex w-full max-w-xs items-center justify-between">
            {/* CTA principal — oculto <=550px */}
            <Link href="#" className="max-[550px]:hidden">
              <button className="btn-primary">Deploy Now</button>
            </Link>

            {/* Docs con subrayado */}
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
