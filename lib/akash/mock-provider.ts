import { AgentStatus, DeploymentProfile, DeploymentStatus, type Prisma } from "@prisma/client";
import { deploymentProfiles, deploymentRegionLabels } from "@/lib/validation/deployment";

export type DeployableDraft = {
  id: string;
  name: string;
  slug: string;
  profile: DeploymentProfile;
  region: string;
  postgresVersion: string;
  cpu: number;
  memoryMb: number;
  storageGb: number;
  instanceCount: number;
  exposedPort: number;
};

type MockDeploymentResult = {
  status: DeploymentStatus;
  connectionHost: string;
  connectionPort: number;
  connectionString: string;
  manifestJson: Prisma.InputJsonValue;
  lastDeployedAt: Date;
  agents: Array<{
    name: string;
    status: AgentStatus;
    instanceIndex: number;
    region: string;
    endpoint: string;
    lastHeartbeatAt: Date;
  }>;
};

interface AkashDeploymentProvider {
  deploy(draft: DeployableDraft): Promise<MockDeploymentResult>;
}

class MockAkashDeploymentProvider implements AkashDeploymentProvider {
  async deploy(draft: DeployableDraft): Promise<MockDeploymentResult> {
    const profile = deploymentProfiles[draft.profile];
    const suffix = draft.id.slice(-6);
    const regionLabel =
      deploymentRegionLabels[draft.region as keyof typeof deploymentRegionLabels] ??
      draft.region;
    const connectionHost = `${draft.slug}-${suffix}.${draft.region}.db.akash.mock`;
    const connectionPort = draft.exposedPort;

    return {
      status: DeploymentStatus.RUNNING,
      connectionHost,
      connectionPort,
      connectionString: `postgresql://operator:mock-${suffix}@${connectionHost}:${connectionPort}/${draft.slug}?sslmode=require`,
      lastDeployedAt: new Date(),
      manifestJson: {
        apiVersion: "akash.network/v1alpha1",
        kind: "AkashPostgresDeployment",
        metadata: {
          name: draft.slug,
          region: draft.region,
        },
        spec: {
          engine: "postgres",
          version: draft.postgresVersion,
          profile: draft.profile,
          instances: draft.instanceCount,
          resources: {
            cpu: draft.cpu,
            memoryMb: draft.memoryMb,
            storageGb: draft.storageGb,
          },
          notes: `Mock provider output for ${profile.label} in ${regionLabel}. Replace this with the real Akash deployment API when integration is ready.`,
        },
      } satisfies Prisma.InputJsonValue,
      agents: Array.from({ length: draft.instanceCount }, (_, index) => ({
        name: `${draft.slug}-agent-${index + 1}`,
        status: AgentStatus.RUNNING,
        instanceIndex: index + 1,
        region: draft.region,
        endpoint: `${draft.slug}-${index + 1}.${draft.region}.db.akash.mock`,
        lastHeartbeatAt: new Date(),
      })),
    };
  }
}

export const akashDeploymentProvider: AkashDeploymentProvider =
  new MockAkashDeploymentProvider();
