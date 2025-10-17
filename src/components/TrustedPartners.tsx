import Image from "next/image";
import Link from "next/link";
import ContactFormModal from "./Form";
import { useState } from "react";

type Partner = {
  name: string;
  href?: string;
  logoSrc?: string; // opcional: si ponés logo, se muestra centrado
  featured?: boolean; // pinta el borde azul del ejemplo
};

type Props = {
  title?: string;
  partners?: Partner[];
};

const DEFAULT_PARTNERS: Partner[] = [
  {
    name: "Akash Ecosystem",
    featured: false,
    logoSrc:
      "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/78e9a213-b3c1-4165-54f1-76ba5e961600/public",
  },
];

export default function TrustedPartners({
  title = "Trusted partners",
  partners = DEFAULT_PARTNERS,
}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center font-heading text-2xl sm:text-3xl font-semibold text-black/80">
          {title}
        </h2>

        <ul className="mt-8 sm:mt-10 grid grid-cols-1 gap-6 sm:gap-8 place-items-center">
          {partners.map((p) => {
            const ringClasses = p.featured
              ? "ring-2 ring-sky-500"
              : "ring-1 ring-black/40 group-hover:ring-primary/40";
            return (
              <li key={p.name} className="w-full max-w-xl">
                <Link
                  href={p.href ?? "#"}
                  className="group block"
                  aria-label={p.name}
                >
                  <div
                    className={[
                      "aspect-[16/9] w-full rounded-2xl bg-black",
                      "shadow-[0_12px_30px_rgba(0,0,0,0.25)]",
                      "transition group-hover:-translate-y-0.5",
                      ringClasses,
                    ].join(" ")}
                  >
                    {p.logoSrc && (
                      <div className="flex h-full w-full items-center justify-center p-6">
                        <Image
                          src={p.logoSrc}
                          alt={p.name}
                          width={320}
                          height={320}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                  <p className="mt-3 text-center text-sm sm:text-base text-black/70">
                    {p.name}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {/* CTA */}
      <div className="mt-4">
        <ContactFormModal
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={(data) => {
            console.log("Form data", data);
            setOpen(false);
          }}
        />
      </div>
      <div className="flex items-center justify-center mt-16">
        <button
          onClick={() => setOpen(true)}
          className="btn-secondary px-6 py-3 text-sm rounded-full"
        >
          Contact Us
        </button>
      </div>
    </section>
  );
}
