"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { registerUserAction } from "@/app/(auth)/actions";
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
import { registerSchema, type RegisterInput } from "@/lib/validation/auth";

export function RegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    setMessage(null);

    startTransition(async () => {
      const result = await registerUserAction(values);

      if (!result.success) {
        setMessage(result.message);

        if (result.fieldErrors) {
          for (const [fieldName, errors] of Object.entries(result.fieldErrors)) {
            if (!errors?.[0]) {
              continue;
            }

            form.setError(fieldName as keyof RegisterInput, {
              type: "server",
              message: errors[0],
            });
          }
        }

        return;
      }

      const signInResult = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (!signInResult || signInResult.error) {
        setMessage("Account created, but automatic sign-in failed. Please sign in manually.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    });
  });

  return (
    <motion.div layout className="mx-auto w-full max-w-xl">
      <Card className="overflow-hidden border-white/10 bg-[#070707]/78">
        <CardHeader className="pb-5">
          <CardTitle className="text-2xl">Create account</CardTitle>
          <CardDescription>
            Register an operator account and start shipping Postgres deployments on Akash.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={(event) => void onSubmit(event)}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Akash Operator"
                autoComplete="name"
                {...form.register("name")}
              />
              {form.formState.errors.name ? (
                <p className="text-sm text-primary">{form.formState.errors.name.message}</p>
              ) : null}
            </div>

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

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  {...form.register("password")}
                />
                {form.formState.errors.password ? (
                  <p className="text-sm text-primary">
                    {form.formState.errors.password.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  {...form.register("confirmPassword")}
                />
                {form.formState.errors.confirmPassword ? (
                  <p className="text-sm text-primary">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                ) : null}
              </div>
            </div>

            {message ? <p className="text-sm text-primary">{message}</p> : null}

            <Button className="w-full" size="lg" type="submit" disabled={isPending}>
              {isPending ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-[#bababa]">
            Already have an account?{" "}
            <Link className="font-semibold text-white hover:text-primary" href="/login">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
