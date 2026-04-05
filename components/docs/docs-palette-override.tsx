"use client";

import { useLayoutEffect } from "react";

type ThemeName = "light" | "dark";

const palettes: Record<ThemeName, Record<string, string>> = {
  light: {
    "--docs-bg": "#fff7f7",
    "--docs-bg-soft": "rgba(255, 255, 255, 0.84)",
    "--docs-header": "rgba(255, 247, 247, 0.9)",
    "--docs-panel": "rgba(255, 255, 255, 0.76)",
    "--docs-panel-strong": "#ffffff",
    "--docs-border": "rgba(73, 19, 24, 0.1)",
    "--docs-border-strong": "rgba(73, 19, 24, 0.18)",
    "--docs-text": "#1e1115",
    "--docs-muted": "#73555c",
    "--docs-accent": "#ff414c",
    "--docs-accent-soft": "rgba(255, 65, 76, 0.12)",
    "--docs-accent-strong": "#ff5963",
    "--docs-code-bg": "#fff0f1",
    "--docs-code-border": "rgba(255, 65, 76, 0.16)",
    "--docs-shadow": "0 30px 80px rgba(106, 22, 30, 0.1)",
  },
  dark: {
    "--docs-bg": "#040405",
    "--docs-bg-soft": "rgba(8, 8, 10, 0.88)",
    "--docs-header": "rgba(4, 4, 5, 0.84)",
    "--docs-panel": "rgba(12, 12, 14, 0.78)",
    "--docs-panel-strong": "#0d0d0f",
    "--docs-border": "rgba(255, 255, 255, 0.12)",
    "--docs-border-strong": "rgba(255, 255, 255, 0.2)",
    "--docs-text": "#ffffff",
    "--docs-muted": "#bba9ad",
    "--docs-accent": "#ff414c",
    "--docs-accent-soft": "rgba(255, 65, 76, 0.14)",
    "--docs-accent-strong": "#ff5963",
    "--docs-code-bg": "#0b0b0d",
    "--docs-code-border": "rgba(255, 65, 76, 0.18)",
    "--docs-shadow": "0 30px 90px rgba(0, 0, 0, 0.38)",
  },
};

const darkThemeMarkers = new Set(["#09111f", "#040405", "rgb(9,17,31)", "rgb(4,4,5)"]);

function detectTheme(target: HTMLElement): ThemeName {
  const background = target.style.getPropertyValue("--docs-bg").replace(/\s+/g, "").toLowerCase();

  if (darkThemeMarkers.has(background)) {
    return "dark";
  }

  const storedTheme = window.localStorage.getItem("akashdb-docs-theme");
  return storedTheme === "dark" ? "dark" : "light";
}

function applyPalette(target: HTMLElement) {
  const theme = detectTheme(target);
  const palette = palettes[theme];

  Object.entries(palette).forEach(([key, value]) => {
    target.style.setProperty(key, value);
  });
}

function decorateStructure(root: HTMLElement) {
  root.setAttribute("data-docs-root", "true");

  const header = root.querySelector<HTMLElement>("header");
  header?.setAttribute("data-docs-header", "true");

  const grid = Array.from(root.children).find(
    (child): child is HTMLElement =>
      child instanceof HTMLElement && child.className.includes("mx-auto grid"),
  );
  grid?.setAttribute("data-docs-grid", "true");

  const main = grid?.querySelector<HTMLElement>("main");
  main?.setAttribute("data-docs-main", "true");

  const asides = grid
    ? Array.from(grid.children).filter(
        (child): child is HTMLElement => child instanceof HTMLElement && child.tagName === "ASIDE",
      )
    : [];

  asides[0]?.setAttribute("data-docs-sidebar", "true");
  asides[1]?.setAttribute("data-docs-rail", "true");

  asides[0]
    ?.querySelectorAll<HTMLElement>("nav > div")
    .forEach((group) => group.setAttribute("data-docs-sidebar-group", "true"));

  asides[0]
    ?.querySelectorAll<HTMLElement>("nav button")
    .forEach((button) => button.setAttribute("data-docs-sidebar-item", "true"));

  asides[1]
    ?.querySelectorAll<HTMLElement>("div")
    .forEach((node) => {
      if (node.className.includes("rounded-[1.7rem]") || node.className.includes("rounded-[1.2rem]")) {
        node.setAttribute("data-docs-rail-card", "true");
      }
    });

  root.querySelectorAll<HTMLElement>("[data-docs-section]").forEach((section, index) => {
    section.setAttribute("data-docs-section-index", String(index));

    if (section.id === "overview") {
      section.setAttribute("data-docs-hero", "true");
    }
  });

  root.querySelectorAll<HTMLElement>("pre").forEach((pre) => {
    pre.parentElement?.setAttribute("data-docs-snippet", "true");
  });

  root.querySelectorAll<HTMLElement>("div").forEach((node) => {
    const className = typeof node.className === "string" ? node.className : "";

    if (className.includes("rounded-[1.") && className.includes("border")) {
      node.setAttribute("data-docs-panel", "true");
    }
  });
}

function sanitizeVisibleCopy(root: HTMLElement) {
  const replaceText = (selector: string, value: string) => {
    const node = root.querySelector<HTMLElement>(selector);
    if (node) {
      node.textContent = value;
    }
  };

  const overview = root.querySelector<HTMLElement>("#overview");

  if (overview) {
    replaceText(
      "#overview h1",
      "AkashDB CLI documentation and command reference.",
    );

    replaceText(
      "#overview h1 + p",
      "Use these docs to install the CLI, authenticate with Akash, create PostgreSQL deployments, inspect logs, and manage databases with the published cli-akashdb package.",
    );

    const actionLinks = Array.from(
      overview.querySelectorAll<HTMLAnchorElement | HTMLButtonElement>("a, button"),
    ).filter((node) => {
      const text = node.textContent?.trim();
      return text === "Start with install" || text === "Jump to quick start" || text === "Stripe docs reference";
    });

    const installAction = actionLinks.find(
      (node) => node.textContent?.trim() === "Start with install",
    );
    if (installAction) {
      installAction.textContent = "Installation";
    }

    const quickStartAction = actionLinks.find(
      (node) => node.textContent?.trim() === "Jump to quick start",
    );
    if (quickStartAction) {
      quickStartAction.textContent = "Quick start";
    }

    const referenceAction = actionLinks.find(
      (node) => node.textContent?.trim() === "Stripe docs reference",
    );
    if (referenceAction) {
      referenceAction.textContent = "Command reference";

      if (referenceAction instanceof HTMLAnchorElement) {
        referenceAction.href = "#login";
        referenceAction.removeAttribute("target");
        referenceAction.removeAttribute("rel");
      }
    }

    const leafTextReplacements = new Map([
      ["Docs experience", "What’s inside"],
      ["Rebrand", "Package version"],
      ["External sources", "Source package"],
      ["Stripe docs", "Published README"],
      [
        "Design reference for navigation density, search, and code treatment.",
        "Review the published README and package version used as the source for this reference.",
      ],
      [
        "CLI docs rebuilt for AkashDB with a clearer, Stripe-style reading flow.",
        "AkashDB CLI documentation and command reference.",
      ],
      [
        "This section keeps the published npm package as the source of truth for commands, flags, and examples while reshaping the experience around fast scanning, copyable snippets, and task-first navigation.",
        "Use these docs to install the CLI, authenticate with Akash, create PostgreSQL deployments, inspect logs, and manage databases with the published cli-akashdb package.",
      ],
    ]);

    root.querySelectorAll<HTMLElement>("h1, h2, h3, p, span, a, button").forEach((node) => {
      const text = node.textContent?.trim();

      if (!text || node.children.length > 0) {
        return;
      }

      const replacement = leafTextReplacements.get(text);
      if (replacement) {
        node.textContent = replacement;
      }
    });
  }

  root.querySelectorAll<HTMLElement>("a, button, p, div, span").forEach((node) => {
    const text = node.textContent?.trim() ?? "";

    if (text === "Stripe docs") {
      const removable = node.closest("a");
      if (removable && removable.getAttribute("href")?.includes("stripe")) {
        removable.remove();
      }
    }
  });
}

function findDocsRoot() {
  return document.querySelector<HTMLElement>('div[style*="--docs-bg"]');
}

export function DocsPaletteOverride() {
  useLayoutEffect(() => {
    const applyEnhancements = () => {
      const root = findDocsRoot();

      if (!root) {
        return false;
      }

      applyPalette(root);
      decorateStructure(root);
      sanitizeVisibleCopy(root);
      return true;
    };

    if (applyEnhancements()) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      applyEnhancements();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return null;
}
