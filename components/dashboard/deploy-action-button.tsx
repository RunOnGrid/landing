"use client";

import { LoaderCircle, Rocket } from "lucide-react";
import { useState, useTransition } from "react";
import { deployExistingDeploymentAction } from "@/app/(dashboard)/dashboard/actions";
import { Button } from "@/components/ui/button";

export function DeployActionButton({ deploymentId }: { deploymentId: string }) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        type="button"
        size="sm"
        onClick={() => {
          setMessage(null);
          startTransition(async () => {
            const result = await deployExistingDeploymentAction({ deploymentId });
            setMessage(result.message);
          });
        }}
        disabled={isPending}
      >
        {isPending ? (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        ) : (
          <Rocket className="h-4 w-4" />
        )}
        {isPending ? "Deploying..." : "Deploy now"}
      </Button>
      {message ? <p className="text-xs text-[#bababa]">{message}</p> : null}
    </div>
  );
}
