// src/components/WhyChooseGrid.tsx
import Image from "next/image";

type Feature = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
};

type Props = {
  headingLeft?: string; // "WHY"
  headingRight?: string; // "CHOOSE GRID?"
  items?: Feature[];
};

const DEFAULT_IMG =
  "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/5617ce26-8cff-4fa0-416f-e7cbf9829000/public";

const DEFAULT_ITEMS: Feature[] = [
  {
    title: "Complete lifecycle",
    description:
      "Grid supports the complete software lifecycle through proactive strategy and seamless, scalable integration with DePIN technologies.",
    imageSrc: DEFAULT_IMG,
  },
  {
    title: "Scalable",
    description:
      "No resource limits or platform lock-ins. Built on decentralized clouds with permissionless, highly available compute that scales globally.",
    imageSrc: DEFAULT_IMG,
  },
  {
    title: "Significant Cost Savings",
    description:
      "Cut cloud costs by up to 60% compared to traditional platforms-as-a-service.",
    imageSrc: DEFAULT_IMG,
  },
  {
    title: "Enterprise-grade cloud computing",
    description:
      "Power rendering, ML, and AI development with high availability and global scale.",
    imageSrc: DEFAULT_IMG,
  },
];

export default function WhyChooseGrid({
  headingLeft = "WHY",
  headingRight = "CHOOSE GRID?",
  items = DEFAULT_ITEMS,
}: Props) {
  return (
    <section className="bg-primary py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8">
          <div className="lg:col-start-2 lg:col-span-9">
            <div className="flex flex-wrap items-baseline gap-x-6">
              <span className="font-heading leading-none text-7xl sm:text-8xl lg:text-9xl text-secondary/90">
                {headingLeft}
              </span>
              <h2 className="font-heading leading-tight text-3xl sm:text-4xl lg:text-5xl text-secondary/90">
                {headingRight}
              </h2>
            </div>
          </div>
        </div>

        {/* Grid de features */}
        <div className="mt-10 lg:mt-14 grid grid-cols-1 md:grid-cols-2 place-items-center gap-10 lg:gap-12 lg:px-10">
          {items.map(({ title, description, imageSrc, imageAlt }, i) => (
            <article key={i} className="max-w-xl">
              {/* Imagen/visual */}
              <div className="rounded-xl bg-black/90 ring-1 ring-black/30 shadow-[0_15px_40px_rgba(0,0,0,0.35)] overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={imageAlt ?? title}
                  width={560}
                  height={350}
                  className="h-auto w-full"
                  priority={i < 2}
                />
              </div>

              {/* Texto */}
              <h3 className="mt-4 font-heading text-lg font-semibold text-black/80">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/70">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
