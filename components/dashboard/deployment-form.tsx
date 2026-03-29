"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { LoaderCircle, ServerCog } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { createDeploymentAction } from "@/app/(dashboard)/dashboard/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  deploymentProfileKeys,
  deploymentProfiles,
  deploymentRegionLabels,
  deploymentRegions,
  deploymentSchema,
  type DeploymentInput,
} from "@/lib/validation/deployment";

export function DeploymentForm() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<DeploymentInput>({
    resolver: zodResolver(deploymentSchema),
    defaultValues: {
      name: "",
      region: "us-east",
      profile: "BALANCED",
      instanceCount: 2,
      storageGb: deploymentProfiles.BALANCED.storageGb,
      postgresVersion: "16",
      action: "deploy",
    },
  });

  const submitWithAction = (action: "draft" | "deploy") =>
    form.handleSubmit((values) => {
      setMessage(null);

      startTransition(async () => {
        const result = await createDeploymentAction({
          ...values,
          action,
        });

        if (!result.success) {
          setMessage(result.message);

          if (result.fieldErrors) {
            for (const [fieldName, errors] of Object.entries(result.fieldErrors)) {
              if (!errors?.[0]) {
                continue;
              }

              form.setError(fieldName as keyof DeploymentInput, {
                type: "server",
                message: errors[0],
              });
            }
          }

          return;
        }

        form.reset({
          name: "",
          region: values.region,
          profile: values.profile,
          instanceCount: values.instanceCount,
          storageGb: values.storageGb,
          postgresVersion: values.postgresVersion,
          action: "deploy",
        });
        setMessage(result.message);
      });
    });

  const selectedProfile = form.watch("profile");

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="border-white/10 bg-[#070707]/80">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
              <ServerCog className="h-5 w-5" />
            </span>
            <div>
              <CardTitle>New deployment</CardTitle>
              <CardDescription>
                Create a draft or one-click deploy a single or multi-agent Postgres setup.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="deployment-name">Deployment name</Label>
              <Input
                id="deployment-name"
                placeholder="customer-insights"
                {...form.register("name")}
              />
              {form.formState.errors.name ? (
                <p className="text-sm text-primary">{form.formState.errors.name.message}</p>
              ) : null}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="deployment-region">Region</Label>
                <select
                  id="deployment-region"
                  className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  {...form.register("region")}
                >
                  {deploymentRegions.map((region) => (
                    <option key={region} value={region}>
                      {deploymentRegionLabels[region]}
                    </option>
                  ))}
                </select>
                {form.formState.errors.region ? (
                  <p className="text-sm text-primary">{form.formState.errors.region.message}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="deployment-version">Postgres version</Label>
                <select
                  id="deployment-version"
                  className="flex h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  {...form.register("postgresVersion")}
                >
                  <option value="16">Postgres 16</option>
                  <option value="17">Postgres 17</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Configuration</Label>
                <Badge variant="secondary">
                  {deploymentProfiles[selectedProfile].label}
                </Badge>
              </div>
              <div className="grid gap-3">
                {deploymentProfileKeys.map((profileKey) => {
                  const preset = deploymentProfiles[profileKey];
                  const isActive = selectedProfile === profileKey;

                  return (
                    <button
                      key={profileKey}
                      type="button"
                      onClick={() => {
                        form.setValue("profile", profileKey, { shouldValidate: true });
                        if (!form.getValues("storageGb")) {
                          form.setValue("storageGb", preset.storageGb, { shouldValidate: true });
                        }
                      }}
                      className={cn(
                        "rounded-[24px] border px-5 py-4 text-left transition-all",
                        isActive
                          ? "border-primary/40 bg-primary/10"
                          : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]",
                      )}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-white">{preset.label}</p>
                          <p className="mt-1 text-sm leading-6 text-[#bababa]">
                            {preset.description}
                          </p>
                        </div>
                        <div className="text-right text-xs uppercase tracking-[0.18em] text-white/45">
                          <p>{preset.cpu} vCPU</p>
                          <p className="mt-2">{preset.memoryMb / 1024} GB RAM</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="instance-count">Agents / instances</Label>
                <Input
                  id="instance-count"
                  type="number"
                  min={1}
                  max={8}
                  {...form.register("instanceCount", { valueAsNumber: true })}
                />
                {form.formState.errors.instanceCount ? (
                  <p className="text-sm text-primary">
                    {form.formState.errors.instanceCount.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="storage-gb">Storage (GB)</Label>
                <Input
                  id="storage-gb"
                  type="number"
                  min={10}
                  max={500}
                  {...form.register("storageGb", { valueAsNumber: true })}
                />
                {form.formState.errors.storageGb ? (
                  <p className="text-sm text-primary">
                    {form.formState.errors.storageGb.message}
                  </p>
                ) : null}
              </div>
            </div>

            {message ? <p className="text-sm text-[#bababa]">{message}</p> : null}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                variant="secondary"
                className="sm:flex-1"
                onClick={() => void submitWithAction("draft")()}
                disabled={isPending}
              >
                {isPending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
                Save draft
              </Button>
              <Button
                type="button"
                className="sm:flex-1"
                onClick={() => void submitWithAction("deploy")()}
                disabled={isPending}
              >
                {isPending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
                Deploy now
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
