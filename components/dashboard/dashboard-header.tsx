import Link from "next/link";
import { logoutAction } from "@/app/(auth)/actions";
import { BrandLockup } from "@/components/shared/brand-lockup";
import { Button } from "@/components/ui/button";

export function DashboardHeader({ userName }: { userName: string }) {
  return (
    <header className="border-b border-white/8 bg-black/35 backdrop-blur-2xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-5 sm:px-8 lg:px-10">
        <div className="flex items-center gap-4">
          <BrandLockup />
          <div className="hidden h-10 w-px bg-white/10 sm:block" />
          <div className="hidden sm:block">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
              Operator Surface
            </p>
            <p className="mt-1 text-sm text-[#bababa]">
              Welcome back, <span className="text-white">{userName}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant="secondary" size="sm">
            <Link href="/">View landing</Link>
          </Button>
          <form action={logoutAction}>
            <Button size="sm" variant="default" type="submit">
              Sign out
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
