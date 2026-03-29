"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
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
import { loginSchema, type LoginInput } from "@/lib/validation/auth";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [isPending, startTransition] = useTransition();
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    setAuthError(null);

    startTransition(async () => {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl,
      });

      if (!result || result.error) {
        setAuthError("Invalid email or password.");
        return;
      }

      router.push(result.url ?? callbackUrl);
      router.refresh();
    });
  });

  return (
    <motion.div layout className="mx-auto w-full max-w-xl">
      <Card className="overflow-hidden border-white/10 bg-[#070707]/78">
        <CardHeader className="pb-5">
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>
            Access the protected deployment surface for your Akash DB environments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={(event) => void onSubmit(event)}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="operator@akashdb.dev"
                autoComplete="email"
                {...form.register("email")}
              />
              {form.formState.errors.email ? (
                <p className="text-sm text-primary">{form.formState.errors.email.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                {...form.register("password")}
              />
              {form.formState.errors.password ? (
                <p className="text-sm text-primary">
                  {form.formState.errors.password.message}
                </p>
              ) : null}
            </div>

            {authError ? <p className="text-sm text-primary">{authError}</p> : null}

            <Button className="w-full" size="lg" type="submit" disabled={isPending}>
              {isPending ? "Signing in..." : "Enter dashboard"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-[#bababa]">
            No account yet?{" "}
            <Link className="font-semibold text-white hover:text-primary" href="/register">
              Create one
            </Link>
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
