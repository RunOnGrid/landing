"use server";

import { hash } from "bcryptjs";
import { signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { registerSchema, type RegisterInput } from "@/lib/validation/auth";

export type ActionResult = {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

export async function registerUserAction(
  input: RegisterInput,
): Promise<ActionResult> {
  const parsedInput = registerSchema.safeParse(input);

  if (!parsedInput.success) {
    return {
      success: false,
      message: "Please fix the highlighted fields.",
      fieldErrors: parsedInput.error.flatten().fieldErrors,
    };
  }

  const email = parsedInput.data.email.toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      success: false,
      message: "An account with that email already exists.",
      fieldErrors: {
        email: ["An account with that email already exists."],
      },
    };
  }

  const passwordHash = await hash(parsedInput.data.password, 12);

  await prisma.user.create({
    data: {
      name: parsedInput.data.name.trim(),
      email,
      passwordHash,
    },
  });

  return {
    success: true,
    message: "Account created successfully.",
  };
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}
