import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "@/components/auth/login-form";
import { AuthShell } from "@/components/auth/auth-shell";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <AuthShell
      eyebrow="Operator Access"
      title="Sign in to your deployment surface."
      description="Use your operator credentials to manage Postgres agents, launch fresh Akash deployments, and keep runtime posture visible."
    >
      <LoginForm />
    </AuthShell>
  );
}
