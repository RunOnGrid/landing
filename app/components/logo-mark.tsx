import Image from "next/image";

export function LogoMark({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-transparent ${className ?? ""}`}>
      <Image
        src="/logo.png"
        alt="Akash DB logo"
        fill
        priority={priority}
        sizes="(max-width: 640px) 40px, 56px"
        className="object-contain object-center mix-blend-screen brightness-[1.3] contrast-125 scale-[1.42]"
      />
    </div>
  );
}
