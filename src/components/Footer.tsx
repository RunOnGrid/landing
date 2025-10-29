import Image from "next/image";
import Link from "next/link";

type FooterProps = {
  className?: string;
  logo: string;
};

export default function Footer({ className = "", logo }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={["bg-black w-full", className].join(" ")}>
      {/* container-footer */}
      <section className="flex flex-col z-0 mx-auto">
        {/* columnas (90% como en tu CSS) */}
        <div className="columnas text-white grid grid-cols-1 md:grid-cols-2 place-items-center max-w-7xl w-full mx-auto ">
          {/* columna-principal */}
          <div className="columna-principal flex flex-col items-center md:items-start text-left text-[1.1rem] mt-[50px]">
            <h2 className="footer-titulo-principal text-white text-[1.7rem]">
              GRID
            </h2>
            <p className="footer-parrafo w-[320px] text-white text-[0.8rem] py-[10px] text-center lg:text-start">
            The decentralized database development platform.
            </p>
          </div>

          {/* segunda-columna */}
          <div className="segunda-columna flex flex-col items-center md:items-end text-center md:text-right text-[1.1rem] mt-[50px]">
            <Image
              alt="Grid Cloud"
              src={logo}
              width={180}
              height={100}
              className="flex mx-auto"
              priority
            />

            {/* redes-footer */}
            <div className="redes-footer flex mx-auto justify-center">
              <Link
                href="https://www.linkedin.com/company/ongridrun"
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
                href="https://discord.gg/yjkPTHjKeZ"
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
                href="https://x.com/OnGridRun"
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

        {/* licencias-footer */}
        <div className="licencias-footer flex justify-center font-mono text-white mx-auto mb-[20px] w-full text-[0.8rem]">
          <span className="mx-[10px]">© {year} Grid</span>
        </div>
      </section>
    </footer>
  );
}
