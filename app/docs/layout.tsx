import type { ReactNode } from "react";
import { DocsRouteShell } from "./docs-route-shell";

export default function DocsLayout({ children: _children }: { children: ReactNode }) {
  return <DocsRouteShell />;
}
