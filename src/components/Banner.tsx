import Link from "next/link";
import Triangles from "./Triangles";

type Props = {
  title: string;
  subtitle?: string;
  subtitle2?: string;
};

export default function Banner({ title, subtitle, subtitle2 }: Props) {
  return (
    <section className="relative flex justify-around overflow-hidden py-16 lg:py-48 lg:mt-4">
      <div className="grid place-items-start gap-4 z-10 lg:w-1/2 px-8 lg:px-0">
        <h1 className="title text-[#00b174] mb-2 lg:mb-4">{title}</h1>
        {subtitle && (
          <p className="subtitle text-white max-w-2xl">{subtitle}</p>
        )}
        {subtitle2 && (
          <p className="subtitle text-white font-bold mt-2 mb-4">{subtitle2}</p>
        )}

        <div className="">
          <Link href="#" className="btn-primary">
            DEPLOY NOW
          </Link>
        </div>
      </div>
      <div>
        <Triangles />
      </div>
    </section>
  );
}
