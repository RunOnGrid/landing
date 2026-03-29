import { AgentStatus, DeploymentProfile, DeploymentStatus } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";
import { DeployActionButton } from "@/components/dashboard/deploy-action-button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { deploymentProfiles, deploymentRegionLabels } from "@/lib/validation/deployment";

const deploymentStatusVariant: Record<
  DeploymentStatus,
  "default" | "secondary" | "success" | "warning" | "destructive"
> = {
  DRAFT: "secondary",
  QUEUED: "warning",
  PROVISIONING: "warning",
  RUNNING: "success",
  FAILED: "destructive",
  STOPPED: "secondary",
};

const agentStatusVariant: Record<
  AgentStatus,
  "default" | "secondary" | "success" | "warning" | "destructive"
> = {
  QUEUED: "warning",
  PROVISIONING: "warning",
  RUNNING: "success",
  FAILED: "destructive",
  STOPPED: "secondary",
};

function profileLabel(profile: DeploymentProfile) {
  return deploymentProfiles[profile].label;
}

export async function DeploymentList({ userId }: { userId: string }) {
  noStore();

  const deployments = await prisma.deployment.findMany({
    where: {
      userId,
    },
    include: {
      agents: {
        orderBy: {
          instanceIndex: "asc",
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  if (deployments.length === 0) {
    return (
      <Card className="border-dashed border-white/12 bg-[#070707]/65">
        <CardHeader>
          <CardTitle>No deployments yet</CardTitle>
          <CardDescription>
            Start by creating a draft or launching a multi-agent Postgres deployment from the form.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">
          Active Deployments
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">
          Current runtime inventory
        </h2>
      </div>

      <div className="space-y-4">
        {deployments.map((deployment) => (
          <Card key={deployment.id} className="border-white/8 bg-[#070707]/72">
            <CardHeader className="gap-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-2xl">{deployment.name}</CardTitle>
                    <Badge variant={deploymentStatusVariant[deployment.status]}>
                      {deployment.status}
                    </Badge>
                    <Badge variant="secondary">{profileLabel(deployment.profile)}</Badge>
                  </div>
                  <CardDescription className="mt-3">
                    {deploymentRegionLabels[
                      deployment.region as keyof typeof deploymentRegionLabels
                    ] ?? deployment.region}
                    {" · "}
                    {deployment.instanceCount} agents
                    {" · "}
                    Postgres {deployment.postgresVersion}
                    {" · "}
                    {deployment.storageGb} GB storage
                  </CardDescription>
                </div>

                <div className="flex flex-col gap-2 text-sm text-[#bababa] lg:items-end">
                  <p>Updated {formatDate(deployment.updatedAt)}</p>
                  {deployment.status !== DeploymentStatus.RUNNING ? (
                    <DeployActionButton deploymentId={deployment.id} />
                  ) : (
                    <p className="font-medium text-emerald-300">
                      Live endpoint ready for operator handoff
                    </p>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
                <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                    Deployment Notes
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-white/55">CPU / Memory</p>
                      <p className="mt-1 text-sm text-white">
                        {deployment.cpu} vCPU · {deployment.memoryMb / 1024} GB RAM
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-white/55">Manifest</p>
                      <p className="mt-1 text-sm text-white">
                        {deployment.manifestJson ? "Generated" : "Pending"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-white/55">Connection host</p>
                      <p className="mt-1 break-all text-sm text-white">
                        {deployment.connectionHost ?? "Created after deploy"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-white/55">Connection string</p>
                      <p className="mt-1 break-all text-sm text-white/80">
                        {deployment.connectionString ?? "Generated after deploy"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                    Agents
                  </p>
                  <div className="mt-4 space-y-3">
                    {deployment.agents.length === 0 ? (
                      <p className="text-sm text-[#bababa]">
                        No agent instances created yet. Deploy the draft to allocate them.
                      </p>
                    ) : (
                      deployment.agents.map((agent, index) => (
                        <div key={agent.id}>
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-sm font-medium text-white">{agent.name}</p>
                              <p className="mt-1 text-xs text-[#bababa]">
                                {agent.endpoint ?? "Awaiting endpoint"} ·{" "}
                                {deploymentRegionLabels[
                                  agent.region as keyof typeof deploymentRegionLabels
                                ] ?? agent.region}
                              </p>
                            </div>
                            <Badge variant={agentStatusVariant[agent.status]}>
                              {agent.status}
                            </Badge>
                          </div>
                          {index < deployment.agents.length - 1 ? (
                            <Separator className="mt-3" />
                          ) : null}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
