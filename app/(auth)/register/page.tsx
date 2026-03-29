import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { RegisterForm } from "@/components/auth/register-form";
import { AuthShell } from "@/components/auth/auth-shell";

export default async function RegisterPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <AuthShell
      eyebrow="New Workspace"
      title="Create your Akash DB operator account."
      description="Register once, then launch one or many Postgres instances with validated configuration, protected routes, and a deployment model that is ready for real Akash integration."
    >
      <RegisterForm />
    </AuthShell>
  );
}
