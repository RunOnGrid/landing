// src/components/Banner.tsx
import Link from "next/link";
import Triangles from "./Triangles";

type Props = {
  title: string;
  subtitle?: string;
  subtitle2?: string;
};

export default function Banner({ title, subtitle, subtitle2 }: Props) {
  return (
    <section className="relative flex w-full overflow-hidden">
      {/* .banner-container */}
      {/* Texto = .textosBanner */}
      <div
        className="
          z-10 text-left
          mt-[250px] w-1/2 ml-[10%]
          max-[650px]:w-[80%] max-[650px]:ml-[5%] max-[650px]:mt-40
        "
      >
        {/* .tituloBanner */}
        <h1
          className="
            text-[3rem] text-white leading-tight mb-[3%]
            max-[650px]:text-[1.8rem] max-[650px]:font-light
          "
        >
          {title}
        </h1>

        {/* .subtituloBanner */}
        {subtitle && (
          <p
            className="
              text-[1.2rem] text-white w-[90%] mb-5
              max-[650px]:text-[1rem] max-[650px]:flex max-[650px]:justify-center max-[650px]:m-0
            "
          >
            {subtitle}
          </p>
        )}

        {/* .subtituloBanner2 */}
        {subtitle2 && (
          <p
            className="
              flex font-bold text-[1.1rem] text-white w-full
              mt-[15px] mb-[50px] max-[650px]:text-[0.9rem]
            "
          >
            {subtitle2}
          </p>
        )}

        {/* .container-botones */}
        <div
          className="
            flex mt-[50px] mb-[100px]
            max-[650px]:flex-col
          "
        >
          {/* .button-landing-1 */}
          <Link
            href="#"
            className="
              btn-primary
            "
          >
            DEPLOY NOW
          </Link>
        </div>
      </div>

      {/* Fondo / figuras animadas */}
      <Triangles />
    </section>
  );
}
