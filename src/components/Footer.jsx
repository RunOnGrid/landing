import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-background text-white mx-auto">
      <section className="mx-auto flex flex-col justify-between pt-8 pb-2 max-w-7xl">
        {/* columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 place-items-center md:place-items-center">
          {/* Columna principal */}
          <div className="text-center md:text-left">
            <h2 className="font-heading text-[1.7rem] md:text-2xl font-semibold">
              GRID CLOUD
            </h2>
            <p className="mt-3 text-sm opacity-90 max-w-xs mx-auto md:mx-0">
              Grid Cloud is a decentralized Web3 cloud infrastructure comprised
              of user-operated, scalable and globally distributed computational
              nodes.
            </p>
          </div>

          {/* Columna logo + redes */}
          <div className="flex flex-col items-center justify-center text-center mx-auto">
            <Image
              alt="Grid Cloud"
              src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/ca632650-5de1-46bd-88f4-03c847c04200/public"
              width={180}
              height={100}
              className="h-auto w-[180px]"
              priority
            />
            <div className="mt-4 flex items-center justify-center gap-4">
              <Link
                href="https://www.linkedin.com/company/ongridrun"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition hover:opacity-90"
              >
                <img
                  alt="LinkedIn"
                  className="h-[25px] w-[25px]"
                  src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/2e798f2d-355d-49e1-0d6b-0b41e0e33300/public"
                />
              </Link>

              <Link
                href="https://discord.gg/yjkPTHjKeZ"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="transition hover:opacity-90"
              >
                <img
                  alt="Discord"
                  className="h-[25px] w-[25px]"
                  src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/c96aafa3-ab90-4620-b01d-3ca123d26500/public"
                />
              </Link>

              <Link
                href="https://x.com/OnGridRun"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="transition hover:opacity-90"
              >
                <img
                  alt="X"
                  className="h-[25px] w-[25px]"
                  src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/5e077990-681e-4183-916c-64a5313a1900/public"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Licencias / copy */}
        <div className="mt-10 flex justify-center">
          <p className="font-mono text-xs text-tertiary/80">© 2025 Grid</p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
