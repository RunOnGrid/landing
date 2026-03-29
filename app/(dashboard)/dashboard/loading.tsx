import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#030303]">
      <div className="border-b border-white/8 bg-black/35 px-6 py-5 sm:px-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <Skeleton className="h-11 w-40" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>

      <main className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
        <div className="grid gap-8 xl:grid-cols-[400px_minmax(0,1fr)]">
          <Card className="border-white/8 bg-[#070707]/72">
            <CardHeader className="space-y-4">
              <Skeleton className="h-10 w-10 rounded-2xl" />
              <Skeleton className="h-7 w-44" />
              <Skeleton className="h-4 w-80" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-12 w-full" />
              ))}
            </CardContent>
          </Card>

          <div className="space-y-8">
            <div className="grid gap-4 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="border-white/8 bg-[#070707]/72">
                  <CardHeader className="space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-16" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {Array.from({ length: 2 }).map((_, index) => (
              <Card key={index} className="border-white/8 bg-[#070707]/72">
                <CardHeader className="space-y-3">
                  <Skeleton className="h-8 w-56" />
                  <Skeleton className="h-4 w-72" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-28 w-full" />
                  <Skeleton className="h-28 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
