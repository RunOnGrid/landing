"use server";

import {
  DeploymentProfile,
  DeploymentStatus,
  Prisma,
  type Deployment,
} from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { akashDeploymentProvider } from "@/lib/akash/mock-provider";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import {
  deploymentProfiles,
  deploymentSchema,
  type DeploymentInput,
} from "@/lib/validation/deployment";

export type DeploymentActionResult = {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

async function requireUserId() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return session.user.id;
}

async function createUniqueSlug(userId: string, baseName: string) {
  const baseSlug = slugify(baseName) || "deployment";
  const existingCount = await prisma.deployment.count({
    where: {
      userId,
      slug: {
        startsWith: baseSlug,
      },
    },
  });

  return existingCount === 0 ? baseSlug : `${baseSlug}-${existingCount + 1}`;
}

async function hydrateDeployment(
  deployment: Deployment,
  userId: string,
): Promise<void> {
  const result = await akashDeploymentProvider.deploy({
    id: deployment.id,
    name: deployment.name,
    slug: deployment.slug,
    profile: deployment.profile,
    region: deployment.region,
    postgresVersion: deployment.postgresVersion,
    cpu: deployment.cpu,
    memoryMb: deployment.memoryMb,
    storageGb: deployment.storageGb,
    instanceCount: deployment.instanceCount,
    exposedPort: deployment.exposedPort,
  });

  await prisma.$transaction(async (tx) => {
    await tx.deploymentAgent.deleteMany({
      where: {
        deploymentId: deployment.id,
      },
    });

    await tx.deployment.update({
      where: {
        id: deployment.id,
      },
      data: {
        status: result.status,
        connectionHost: result.connectionHost,
        connectionPort: result.connectionPort,
        connectionString: result.connectionString,
        manifestJson: result.manifestJson,
        lastDeployedAt: result.lastDeployedAt,
        agents: {
          createMany: {
            data: result.agents,
          },
        },
      },
    });
  });

  revalidatePath("/dashboard");
  revalidatePath("/");

  void userId;
}

export async function createDeploymentAction(
  input: DeploymentInput,
): Promise<DeploymentActionResult> {
  const userId = await requireUserId();
  const parsedInput = deploymentSchema.safeParse(input);

  if (!parsedInput.success) {
    return {
      success: false,
      message: "Please fix the deployment form and try again.",
      fieldErrors: parsedInput.error.flatten().fieldErrors,
    };
  }

  const profilePreset = deploymentProfiles[parsedInput.data.profile];
  const slug = await createUniqueSlug(userId, parsedInput.data.name);

  const deployment = await prisma.deployment.create({
    data: {
      name: parsedInput.data.name.trim(),
      slug,
      profile: parsedInput.data.profile as DeploymentProfile,
      region: parsedInput.data.region,
      postgresVersion: parsedInput.data.postgresVersion,
      cpu: profilePreset.cpu,
      memoryMb: profilePreset.memoryMb,
      storageGb: parsedInput.data.storageGb,
      instanceCount: parsedInput.data.instanceCount,
      status:
        parsedInput.data.action === "deploy"
          ? DeploymentStatus.QUEUED
          : DeploymentStatus.DRAFT,
      userId,
    },
  });

  if (parsedInput.data.action === "deploy") {
    await hydrateDeployment(deployment, userId);

    return {
      success: true,
      message: `${deployment.name} is now running on the mock Akash provider.`,
    };
  }

  revalidatePath("/dashboard");

  return {
    success: true,
    message: `${deployment.name} was saved as a draft deployment.`,
  };
}

export async function deployExistingDeploymentAction(input: {
  deploymentId: string;
}): Promise<DeploymentActionResult> {
  const userId = await requireUserId();

  const deployment = await prisma.deployment.findFirst({
    where: {
      id: input.deploymentId,
      userId,
    },
  });

  if (!deployment) {
    return {
      success: false,
      message: "Deployment not found.",
    };
  }

  await prisma.deployment.update({
    where: {
      id: deployment.id,
    },
    data: {
      status: DeploymentStatus.PROVISIONING,
      manifestJson: Prisma.JsonNull,
    },
  });

  await hydrateDeployment(deployment, userId);

  return {
    success: true,
    message: `${deployment.name} was deployed successfully.`,
  };
}
