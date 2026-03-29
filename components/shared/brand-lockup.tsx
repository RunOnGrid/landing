import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandLockup({
  href = "/",
  className,
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-3", className)}>
      <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
        <Image
          src="/logo.png"
          alt="Akash DB logo"
          fill
          sizes="44px"
          className="scale-[1.52] object-contain object-center mix-blend-screen brightness-125 contrast-125"
        />
      </span>
      <span className="text-base font-semibold tracking-[-0.03em] text-white">akashDB</span>
    </Link>
  );
}
