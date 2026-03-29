import type { NextAuthConfig } from "next-auth";

const authConfig = {
  trustHost: true,
  secret:
    process.env.NEXTAUTH_SECRET ??
    (process.env.NODE_ENV !== "production" ? "dev-only-secret-change-me" : undefined),
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [],
} satisfies NextAuthConfig;

export default authConfig;
