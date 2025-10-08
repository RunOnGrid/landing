import Link from "next/link";

type Solution = { title: string; href?: string };

const DEFAULT_ITEMS: Solution[] = [
  { title: "Cloud consulting", href: "#" },
  { title: "Cloud migration", href: "#" },
  { title: "Cloud management", href: "#" },
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
              <div
                className="
                  aspect-[4/3] w-full rounded-2xl
                  bg-black
                  shadow-[0_12px_30px_rgba(0,0,0,0.25)]
                  ring-1 ring-black/40
                  transition
                  group-hover:-translate-y-0.5
                  group-hover:ring-primary/40
                "
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
