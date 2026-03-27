"use client";

import Link from "next/link";

type Props = {
  logo?: string;
};

export default function Navbar({ logo }: Props) {
  const brandLogo = logo ?? "/favicon-akash.jpeg";

  return (
    <header className="sticky top-0 z-[1000] w-full bg-[#070a14]/80 backdrop-blur-md border-b border-white/5">
      <nav className="w-full">
        <div className="mx-auto flex w-full items-center px-4 py-3">
          <Link href="/" className="flex items-center gap-3 text-white">
            <img alt="Akash DB" src={brandLogo} className="h-9 w-13 rounded-md" />
            <span className="font-semibold tracking-tight">Akash DB</span>
          </Link>

          <div className="flex flex-1 items-center justify-center gap-6 text-sm font-medium">
            <Link
              href="https://akash.network/docs"
              className="max-[550px]:hidden text-white/80 hover:text-white transition-colors"
            >
              Docs
            </Link>
            <Link
              href="https://akash.network/blog"
              className="max-[550px]:hidden text-white/80 hover:text-white transition-colors"
            >
              Updates
            </Link>
          </div>

          <Link
            href="https://akash.network"
            className="max-[550px]:hidden btn-primary px-6 ml-auto"
          >
            Get the CLI
          </Link>
        </div>
      </nav>
    </header>
  );
}
