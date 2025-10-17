import Image from "next/image";
import Link from "next/link";

type Solution = { title: string; href?: string; image: string };

const DEFAULT_ITEMS: Solution[] = [
  {
    title: "Cloud consulting",
    href: "#",
    image:
      "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/6daa1e48-d4ab-46cb-3c0c-df72bb27c600/public",
  },
  {
    title: "Cloud migration",
    href: "#",
    image:
      "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/6e00fb1a-021b-40b0-9f62-12ac431d8700/public",
  },
  {
    title: "Cloud management",
    href: "#",
    image:
      "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/4a77a9d1-3e38-4bd2-b71d-baf7bdd6cf00/public",
  },
];

export default function SolutionsPicker({
  title = "Choose the solution that suits you",
  items = DEFAULT_ITEMS,
}: {
  title?: string;
  items?: Solution[];
}) {
  return (
    <section className="bg-background2 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-4">
        {/* título */}
        <h2 className="text-center font-heading text-2xl sm:text-3xl font-semibold text-black/80">
          {title}
        </h2>

        {/* grid de cards */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 place-items-center">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.href ?? "#"}
              className="group w-full max-w-sm"
              aria-label={item.title}
            >
              {/* card */}
              <Image
                alt={`${title} illustration`}
                src={item.image}
                width={720}
                height={560}
                className="w-96"
                priority
                unoptimized
              />
              {/* label */}
              <div className="mt-3 text-center text-sm sm:text-base text-black/70 group-hover:text-black font-medium">
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
