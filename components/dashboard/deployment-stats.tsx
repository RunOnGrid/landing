import { DeploymentStatus } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export async function DeploymentStats({ userId }: { userId: string }) {
  noStore();

  const [deploymentCount, activeDeployments, runningAgents, lastDeployment] =
    await Promise.all([
      prisma.deployment.count({
        where: { userId },
      }),
      prisma.deployment.count({
        where: {
          userId,
          status: {
            in: [DeploymentStatus.QUEUED, DeploymentStatus.PROVISIONING, DeploymentStatus.RUNNING],
          },
        },
      }),
      prisma.deploymentAgent.count({
        where: {
          deployment: {
            userId,
          },
        },
      }),
      prisma.deployment.findFirst({
        where: { userId },
        orderBy: {
          updatedAt: "desc",
        },
        select: {
          name: true,
          updatedAt: true,
        },
      }),
    ]);

  const cards = [
    {
      label: "Deployments",
      value: deploymentCount,
      helper: "Saved configs and active environments",
    },
    {
      label: "Active",
      value: activeDeployments,
      helper: "Queued, provisioning, or already running",
    },
    {
      label: "Agents",
      value: runningAgents,
      helper: "Provisioned Postgres instances across all deployments",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">
            Runtime Summary
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">
            Deployments at a glance
          </h2>
        </div>
        {lastDeployment ? (
          <Badge variant="secondary">
            Last change: {lastDeployment.name} · {formatDate(lastDeployment.updatedAt)}
          </Badge>
        ) : null}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.label} className="border-white/8 bg-[#070707]/72">
            <CardHeader className="pb-3">
              <CardDescription>{card.label}</CardDescription>
              <CardTitle className="text-4xl font-semibold tracking-[-0.05em]">
                {card.value}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-[#bababa]">{card.helper}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
