import type { Metadata } from "next";
import { DocsPage } from "@/components/docs/docs-page";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "AkashDB CLI documentation with Stripe-style navigation, quick search, interactive snippets, and package-aligned command reference.",
};

export default function DocumentationPage() {
  return <DocsPage />;
}
