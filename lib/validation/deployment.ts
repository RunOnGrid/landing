import { z } from "zod";

export const deploymentRegions = [
  "us-east",
  "eu-west",
  "ap-south",
  "sa-east",
] as const;

export const deploymentRegionLabels: Record<(typeof deploymentRegions)[number], string> = {
  "us-east": "US East",
  "eu-west": "EU West",
  "ap-south": "AP South",
  "sa-east": "South America East",
};

export const deploymentProfiles = {
  STARTER: {
    label: "Starter",
    description: "Single-node environments for dev, preview, and lightweight agents.",
    cpu: 1,
    memoryMb: 2048,
    storageGb: 20,
  },
  BALANCED: {
    label: "Balanced",
    description: "General-purpose production workloads with extra headroom.",
    cpu: 2,
    memoryMb: 4096,
    storageGb: 80,
  },
  HA: {
    label: "High Availability",
    description: "Multi-agent production clusters with stronger failover posture.",
    cpu: 4,
    memoryMb: 8192,
    storageGb: 160,
  },
  ANALYTICS: {
    label: "Analytics",
    description: "Heavier read/write patterns and larger datasets for data jobs.",
    cpu: 6,
    memoryMb: 12288,
    storageGb: 240,
  },
} as const;

export const deploymentProfileKeys = Object.keys(
  deploymentProfiles,
) as Array<keyof typeof deploymentProfiles>;

export const deploymentSchema = z.object({
  name: z
    .string()
    .min(2, "Deployment name must be at least 2 characters.")
    .max(48, "Deployment name must be shorter than 48 characters."),
  region: z.enum(deploymentRegions, {
    message: "Choose a supported region.",
  }),
  profile: z.enum(deploymentProfileKeys, {
    message: "Choose a deployment configuration.",
  }),
  instanceCount: z
    .number()
    .int("Instance count must be a whole number.")
    .min(1, "At least one agent is required.")
    .max(8, "Deploy up to 8 agents at a time."),
  storageGb: z
    .number()
    .int("Storage must be a whole number.")
    .min(10, "Storage must be at least 10 GB.")
    .max(500, "Storage must be 500 GB or less."),
  postgresVersion: z.enum(["16", "17"]),
  action: z.enum(["draft", "deploy"]),
});

export type DeploymentInput = z.infer<typeof deploymentSchema>;
export type DeploymentProfile = keyof typeof deploymentProfiles;
