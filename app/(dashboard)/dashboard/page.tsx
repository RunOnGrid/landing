import { Suspense } from "react";
import { auth } from "@/auth";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DeploymentForm } from "@/components/dashboard/deployment-form";
import { DeploymentList } from "@/components/dashboard/deployment-list";
import { DeploymentStats } from "@/components/dashboard/deployment-stats";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function StatsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-9 w-72" />
      </div>
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
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-44" />
        <Skeleton className="h-9 w-80" />
      </div>
      {Array.from({ length: 2 }).map((_, index) => (
        <Card key={index} className="border-white/8 bg-[#070707]/72">
          <CardHeader className="space-y-3">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-4 w-80" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default async function DashboardPage() {
  const session = await auth();
  const userName = session?.user?.name ?? "Operator";
  const userId = session?.user?.id ?? "";

  return (
    <div className="min-h-screen bg-[#030303]">
      <DashboardHeader userName={userName} />

      <main className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
        <div className="grid gap-8 xl:grid-cols-[400px_minmax(0,1fr)] xl:items-start">
          <div className="xl:sticky xl:top-8">
            <DeploymentForm />
          </div>

          <div className="space-y-8">
            <Suspense fallback={<StatsSkeleton />}>
              <DeploymentStats userId={userId} />
            </Suspense>

            <Suspense fallback={<ListSkeleton />}>
              <DeploymentList userId={userId} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
