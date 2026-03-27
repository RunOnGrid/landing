import Link from "next/link";

type FooterProps = {
  className?: string;
  logo?: string;
};

export default function Footer({ className = "", logo }: FooterProps) {
  const year = new Date().getFullYear();
  const brandLogo = logo ?? "/favicon-akash.jpeg";

  return (
    <footer className={["bg-[#060810] border-t border-white/5 w-full", className].join(" ")}>
      <section className="flex flex-col z-0 mx-auto">
        <div className="columnas text-white grid grid-cols-1 md:grid-cols-3 place-items-center max-w-7xl w-full mx-auto ">
          <div className="columna-principal flex flex-col items-center md:items-start text-left text-[1.1rem] mt-[50px]">
            <div className="flex items-center gap-3 text-white text-[1.6rem] font-semibold">
              <img alt="Akash DB" src={brandLogo} className="h-9 w-13 rounded-md" />
              Akash DB
            </div>
            <p className="footer-parrafo w-[320px] text-white text-[0.9rem] py-[10px] text-center lg:text-start">
              CLI for autonomous database deployments on the Akash network.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-center text-center text-[1.1rem] mt-[50px]">
            <h3 className="text-white text-[1.2rem] font-semibold mb-4">
              Resources
            </h3>
            <div className="flex flex-col gap-3">
              <Link
                href="https://akash.network/docs"
                className="text-white/80 text-[0.9rem] hover:text-white hover:underline underline-offset-4 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Documentation
              </Link>
              <Link
                href="https://akash.network/blog"
                className="text-white/80 text-[0.9rem] hover:text-white hover:underline underline-offset-4 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Blog
              </Link>
            </div>
            <h3 className="text-white text-[1.2rem] font-semibold mb-4 mt-6">
              Tools
            </h3>
            <div className="flex flex-col gap-3">
              <Link
                href="https://akash.network"
                className="text-white/80 text-[0.9rem] hover:text-white hover:underline underline-offset-4 transition-colors mb-5"
                target="_blank"
                rel="noopener noreferrer"
              >
                Akash CLI
              </Link>
            </div>
          </div>

          <div className="segunda-columna flex flex-col items-center md:items-end text-center md:text-right text-[1.1rem] mt-[50px] md:col-start-3">
            <img
              alt="Akash DB"
              src={brandLogo}
              className="flex mx-auto h-[60px] w-[90px] rounded-xl"
              loading="lazy"
            />
            <p className="text-white/70 text-sm max-w-xs mt-4">
              Built for operators who want AI agents deploying databases with guardrails, observability, and cost control baked in.
            </p>

            <div className="redes-footer flex mx-auto justify-center">
              <Link
                href="https://www.linkedin.com/company/akash-network"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="icon-redes h-[25px] m-[10px]"
                  alt="LinkedIn"
                  src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/2e798f2d-355d-49e1-0d6b-0b41e0e33300/public"
                />
              </Link>

              <Link
                href="https://discord.gg/akash"
                aria-label="Discord"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="icon-redes h-[25px] m-[10px]"
                  alt="Discord"
                  src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/c96aafa3-ab90-4620-b01d-3ca123d26500/public"
                />
              </Link>

              <Link
                href="https://x.com/akashnet_"
                aria-label="X"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="icon-redes h-[25px] m-[10px]"
                  alt="X"
                  src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/5e077990-681e-4183-916c-64a5313a1900/public"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="licencias-footer flex justify-center font-mono text-white mx-auto mb-[20px] w-full text-[0.8rem]">
          <span className="mx-[10px]">© {year} Akash DB</span>
        </div>
      </section>
    </footer>
  );
}
