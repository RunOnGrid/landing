"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  Menu,
  MoonStar,
  Search,
  SunMedium,
  X,
} from "lucide-react";
import { useSmoothScroll } from "@/components/animations/smooth-scroll-provider";
import { cn } from "@/lib/utils";
import {
  commandSections,
  docsNavGroups,
  installVariants,
  logServices,
  packageMeta,
  quickStartSteps,
  resourceTiers,
  type CommandSection,
  type ResourceTier,
} from "@/lib/docs-content";

type DocsTheme = "light" | "dark";

type SearchTarget = {
  id: string;
  label: string;
  group: string;
  summary: string;
  haystack: string;
};

const themeVars: Record<DocsTheme, CSSProperties> = {
  light: {
    "--docs-bg": "#f5f8fc",
    "--docs-bg-soft": "rgba(255, 255, 255, 0.82)",
    "--docs-header": "rgba(245, 248, 252, 0.86)",
    "--docs-panel": "rgba(255, 255, 255, 0.7)",
    "--docs-panel-strong": "#ffffff",
    "--docs-border": "rgba(15, 23, 42, 0.1)",
    "--docs-border-strong": "rgba(15, 23, 42, 0.16)",
    "--docs-text": "#10213a",
    "--docs-muted": "#5c6b84",
    "--docs-accent": "#635bff",
    "--docs-accent-soft": "rgba(99, 91, 255, 0.12)",
    "--docs-accent-strong": "#5148e5",
    "--docs-code-bg": "#eef3fb",
    "--docs-code-border": "rgba(99, 91, 255, 0.14)",
    "--docs-shadow": "0 30px 80px rgba(16, 33, 58, 0.08)",
  } as CSSProperties,
  dark: {
    "--docs-bg": "#09111f",
    "--docs-bg-soft": "rgba(10, 18, 32, 0.86)",
    "--docs-header": "rgba(9, 17, 31, 0.82)",
    "--docs-panel": "rgba(12, 21, 37, 0.74)",
    "--docs-panel-strong": "#0d1728",
    "--docs-border": "rgba(148, 163, 184, 0.18)",
    "--docs-border-strong": "rgba(148, 163, 184, 0.26)",
    "--docs-text": "#edf3ff",
    "--docs-muted": "#91a0bb",
    "--docs-accent": "#7a74ff",
    "--docs-accent-soft": "rgba(122, 116, 255, 0.14)",
    "--docs-accent-strong": "#9b97ff",
    "--docs-code-bg": "#0d1728",
    "--docs-code-border": "rgba(122, 116, 255, 0.18)",
    "--docs-shadow": "0 30px 90px rgba(0, 0, 0, 0.38)",
  } as CSSProperties,
};

const commandSectionById: Record<string, CommandSection> = Object.fromEntries(
  commandSections.map((section) => [section.id, section]),
);

const searchableSections: SearchTarget[] = docsNavGroups.flatMap((group) =>
  group.items.map((item) => {
    const commandSection = commandSectionById[item.id];
    const extraTerms =
      item.id === "overview"
        ? [
            "AkashDB docs",
            "Stripe-style layout",
            "sidebar navigation",
            "copy snippets",
            "search",
          ]
        : item.id === "installation"
          ? installVariants.map((variant) => variant.command).join(" ")
          : item.id === "quick-start"
            ? quickStartSteps.map((step) => `${step.title} ${step.command}`).join(" ")
            : [
                commandSection?.signature ?? "",
                ...(commandSection?.searchTerms ?? []),
                ...(commandSection?.options?.map(
                  (option) => `${option.flag} ${option.description}`,
                ) ?? []),
                ...(commandSection?.examples?.map(
                  (example) =>
                    `${example.label} ${example.code} ${example.description ?? ""}`,
                ) ?? []),
              ].join(" ");

    return {
      id: item.id,
      label: item.label,
      group: group.title,
      summary: item.summary,
      haystack: `${item.label} ${item.summary} ${extraTerms}`.toLowerCase(),
    };
  }),
);

const pageLinks = docsNavGroups.flatMap((group) => group.items);

function CopyButton({
  value,
  label = "Copy",
}: {
  value: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[var(--docs-border)] bg-[var(--docs-panel)] px-3 text-xs font-semibold text-[var(--docs-text)] transition hover:border-[var(--docs-border-strong)] hover:bg-[var(--docs-panel-strong)]"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      <span>{copied ? "Copied" : label}</span>
    </button>
  );
}

function SnippetFrame({
  label,
  code,
  description,
}: {
  label: string;
  code: string;
  description?: string;
}) {
  return (
    <div className="overflow-hidden rounded-[1.6rem] border border-[var(--docs-code-border)] bg-[var(--docs-code-bg)] shadow-[var(--docs-shadow)]">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--docs-code-border)] px-4 py-3">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
          {label}
        </span>
        <CopyButton value={code} />
      </div>
      <pre className="overflow-x-auto px-4 py-5 text-sm leading-7 text-[var(--docs-text)]">
        <code>{code}</code>
      </pre>
      {description ? (
        <p className="border-t border-[var(--docs-code-border)] px-4 py-3 text-sm text-[var(--docs-muted)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function SectionShell({
  id,
  title,
  summary,
  children,
}: {
  id: string;
  title: string;
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-docs-section
      className="scroll-mt-28 border-t border-[var(--docs-border)] py-12 sm:py-14"
    >
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--docs-accent)]">
          {title}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--docs-text)] sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--docs-muted)]">
          {summary}
        </p>
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function CommandSectionView({
  section,
  selectedTierId,
  onSelectTier,
  selectedLogServiceId,
  onSelectLogService,
}: {
  section: CommandSection;
  selectedTierId: string;
  onSelectTier: (tierId: ResourceTier["id"]) => void;
  selectedLogServiceId: string;
  onSelectLogService: (serviceId: "postgres" | "pgbouncer" | "s3backup") => void;
}) {
  const selectedTier =
    resourceTiers.find((tier) => tier.id === selectedTierId) ?? resourceTiers[0];
  const selectedLogService =
    logServices.find((service) => service.id === selectedLogServiceId) ?? logServices[0];

  return (
    <SectionShell id={section.id} title={section.title} summary={section.summary}>
      <div className="space-y-8">
        <div className="rounded-[1.7rem] border border-[var(--docs-border)] bg-[var(--docs-panel)] p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
                Command signature
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[var(--docs-text)]">
                {section.signature}
              </h3>
            </div>
            <CopyButton value={section.signature} label="Copy command" />
          </div>
        </div>

        {section.id === "create-postgres" ? (
          <div className="rounded-[1.7rem] border border-[var(--docs-border)] bg-[var(--docs-panel)] p-6">
            <div className="flex flex-wrap gap-2">
              {resourceTiers.map((tier) => {
                const isActive = tier.id === selectedTier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => onSelectTier(tier.id)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-semibold transition",
                      isActive
                        ? "border-[var(--docs-accent)] bg-[var(--docs-accent-soft)] text-[var(--docs-accent)]"
                        : "border-[var(--docs-border)] text-[var(--docs-muted)] hover:border-[var(--docs-border-strong)] hover:text-[var(--docs-text)]",
                    )}
                  >
                    {tier.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.95fr)]">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
                  Recommended preset
                </p>
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--docs-text)]">
                  {selectedTier.label}
                </h3>
                <p className="text-base leading-7 text-[var(--docs-muted)]">
                  {selectedTier.summary}
                </p>
                <div className="grid gap-4 pt-2 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
                      Capacity
                    </p>
                    <p className="mt-2 text-sm text-[var(--docs-text)]">{selectedTier.specs}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
                      Estimated cost
                    </p>
                    <p className="mt-2 text-sm text-[var(--docs-text)]">{selectedTier.price}</p>
                  </div>
                </div>
              </div>

              <SnippetFrame
                label="Tier command"
                code={selectedTier.command}
                description="Switch tiers here to see the matching create command."
              />
            </div>
          </div>
        ) : null}

        {section.id === "logs" ? (
          <div className="rounded-[1.7rem] border border-[var(--docs-border)] bg-[var(--docs-panel)] p-6">
            <div className="flex flex-wrap gap-2">
              {logServices.map((service) => {
                const isActive = service.id === selectedLogService.id;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => onSelectLogService(service.id)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-semibold transition",
                      isActive
                        ? "border-[var(--docs-accent)] bg-[var(--docs-accent-soft)] text-[var(--docs-accent)]"
                        : "border-[var(--docs-border)] text-[var(--docs-muted)] hover:border-[var(--docs-border-strong)] hover:text-[var(--docs-text)]",
                    )}
                  >
                    {service.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.95fr)]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
                  Selected service
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[var(--docs-text)]">
                  {selectedLogService.label}
                </h3>
                <p className="mt-3 text-base leading-7 text-[var(--docs-muted)]">
                  {selectedLogService.description}
                </p>
              </div>

              <SnippetFrame
                label="Service example"
                code={selectedLogService.command}
                description="The package supports postgres, pgbouncer, and s3backup services."
              />
            </div>
          </div>
        ) : null}

        {section.notes?.length ? (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
              Notes
            </p>
            <div className="space-y-3">
              {section.notes.map((note) => (
                <div
                  key={note}
                  className="rounded-[1.35rem] border border-[var(--docs-border)] bg-[var(--docs-panel)] px-5 py-4 text-sm leading-7 text-[var(--docs-text)]"
                >
                  {note}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {section.options?.length ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
              Options
            </p>
            <div className="mt-4 overflow-hidden rounded-[1.6rem] border border-[var(--docs-border)] bg-[var(--docs-panel)]">
              {section.options.map((option) => (
                <div
                  key={option.flag}
                  className="grid gap-3 border-t border-[var(--docs-border)] px-5 py-4 first:border-t-0 md:grid-cols-[230px_minmax(0,1fr)]"
                >
                  <code className="text-sm font-semibold text-[var(--docs-accent)]">
                    {option.flag}
                  </code>
                  <p className="text-sm leading-7 text-[var(--docs-muted)]">
                    {option.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {section.examples?.length ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
              Examples
            </p>
            <div className="mt-4 grid gap-4 xl:grid-cols-2">
              {section.examples.map((example) => (
                <SnippetFrame
                  key={`${section.id}-${example.label}`}
                  label={example.label}
                  code={example.code}
                  description={example.description}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </SectionShell>
  );
}

export function DocsPage() {
  const { lenis } = useSmoothScroll();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [theme, setTheme] = useState<DocsTheme>("light");
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(docsNavGroups.map((group) => [group.title, true])),
  );
  const [selectedInstallId, setSelectedInstallId] = useState<"npm" | "pnpm" | "yarn">("npm");
  const [selectedTierId, setSelectedTierId] =
    useState<(typeof resourceTiers)[number]["id"]>("starter");
  const [selectedLogServiceId, setSelectedLogServiceId] =
    useState<(typeof logServices)[number]["id"]>("postgres");

  const selectedInstall =
    installVariants.find((variant) => variant.id === selectedInstallId) ?? installVariants[0];

  const normalizedQuery = query.trim().toLowerCase();
  const searchResults = normalizedQuery
    ? searchableSections
        .map((target) => ({
          ...target,
          score: target.haystack.includes(normalizedQuery) ? 1 : 0,
        }))
        .filter((target) => target.score > 0)
        .slice(0, 8)
    : [];
  const matchedIds = new Set(searchResults.map((result) => result.id));
  const visibleGroups = docsNavGroups
    .map((group) => ({
      ...group,
      items: normalizedQuery
        ? group.items.filter((item) => matchedIds.has(item.id))
        : group.items,
    }))
    .filter((group) => group.items.length > 0);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("akashdb-docs-theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
      return;
    }

    setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("akashdb-docs-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTypingField =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        Boolean(target?.isContentEditable);

      if (!isTypingField && event.key === "/") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-docs-section]"),
    );

    if (!sections.length) {
      return;
    }

    if (window.location.hash) {
      const targetId = window.location.hash.slice(1);
      const element = document.getElementById(targetId);
      if (element) {
        window.setTimeout(() => {
          if (lenis) {
            lenis.scrollTo(element, { offset: -108 });
          } else {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 0);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-18% 0px -62% 0px",
        threshold: [0.15, 0.32, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [lenis]);

  const jumpToSection = (id: string) => {
    const element = document.getElementById(id);

    if (!element) {
      return;
    }

    setActiveId(id);
    setMobileNavOpen(false);
    window.history.replaceState(null, "", `#${id}`);

    if (lenis) {
      lenis.scrollTo(element, { offset: -108 });
      return;
    }

    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      style={themeVars[theme]}
      className="min-h-screen bg-[var(--docs-bg)] text-[var(--docs-text)]"
    >
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[12%] top-[-12rem] h-[28rem] w-[28rem] rounded-full bg-[var(--docs-accent-soft)] blur-3xl" />
        <div className="absolute bottom-[-14rem] right-[10%] h-[30rem] w-[30rem] rounded-full bg-[var(--docs-accent-soft)] blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-[var(--docs-border)] bg-[var(--docs-header)] backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1620px] items-center gap-3 px-4 py-3 lg:px-6">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--docs-border)] bg-[var(--docs-panel)] text-[var(--docs-text)] lg:hidden"
            aria-label="Open docs navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--docs-border)] bg-[var(--docs-panel)] text-sm font-black tracking-[-0.04em] text-[var(--docs-accent)]">
              A
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-[-0.02em] text-[var(--docs-text)]">
                AkashDB Docs
              </p>
              <p className="truncate text-xs text-[var(--docs-muted)]">
                CLI reference sourced from the published npm package
              </p>
            </div>
          </Link>

          <div className="relative ml-auto hidden max-w-xl flex-1 md:block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--docs-muted)]" />
            <input
              ref={searchInputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search commands, flags, and workflows"
              className="h-11 w-full rounded-full border border-[var(--docs-border)] bg-[var(--docs-panel)] pl-11 pr-14 text-sm text-[var(--docs-text)] outline-none transition placeholder:text-[var(--docs-muted)] focus:border-[var(--docs-accent)]"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 inline-flex h-7 min-w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--docs-border)] px-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--docs-muted)]">
              /
            </span>
          </div>

          <button
            type="button"
            onClick={() => setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"))}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--docs-border)] bg-[var(--docs-panel)] text-[var(--docs-text)] transition hover:border-[var(--docs-border-strong)] hover:bg-[var(--docs-panel-strong)]"
            aria-label="Toggle docs theme"
          >
            {theme === "light" ? (
              <MoonStar className="h-4.5 w-4.5" />
            ) : (
              <SunMedium className="h-4.5 w-4.5" />
            )}
          </button>

          <a
            href={packageMeta.packageUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden min-h-11 items-center gap-2 rounded-full border border-[var(--docs-border)] bg-[var(--docs-panel)] px-4 text-sm font-semibold text-[var(--docs-text)] transition hover:border-[var(--docs-border-strong)] hover:bg-[var(--docs-panel-strong)] sm:inline-flex"
          >
            <span>Package</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="border-t border-[var(--docs-border)] px-4 py-3 md:hidden">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--docs-muted)]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search docs"
              className="h-11 w-full rounded-full border border-[var(--docs-border)] bg-[var(--docs-panel)] pl-11 pr-4 text-sm text-[var(--docs-text)] outline-none transition placeholder:text-[var(--docs-muted)] focus:border-[var(--docs-accent)]"
            />
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-30 bg-[#040813]/45 backdrop-blur-sm transition lg:hidden",
          mobileNavOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMobileNavOpen(false)}
      />

      <div className="mx-auto grid max-w-[1620px] gap-0 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_250px]">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-[88vw] max-w-[320px] border-r border-[var(--docs-border)] bg-[var(--docs-bg-soft)] px-4 pb-8 pt-24 shadow-[var(--docs-shadow)] transition duration-300 lg:sticky lg:top-[69px] lg:z-10 lg:block lg:h-[calc(100vh-69px)] lg:w-auto lg:max-w-none lg:translate-x-0 lg:bg-transparent lg:px-5 lg:pt-8 lg:shadow-none xl:pb-12",
            mobileNavOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          )}
        >
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <div>
              <p className="text-sm font-semibold text-[var(--docs-text)]">Docs navigation</p>
              <p className="text-xs text-[var(--docs-muted)]">Browse the AkashDB CLI reference</p>
            </div>
            <button
              type="button"
              onClick={() => setMobileNavOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--docs-border)] bg-[var(--docs-panel)] text-[var(--docs-text)]"
              aria-label="Close docs navigation"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="space-y-3" aria-label="Documentation navigation">
            {visibleGroups.map((group) => {
              const isOpen = normalizedQuery ? true : openGroups[group.title];

              return (
                <div
                  key={group.title}
                  className="rounded-[1.55rem] border border-[var(--docs-border)] bg-[var(--docs-panel)] px-3 py-3"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenGroups((currentState) => ({
                        ...currentState,
                        [group.title]: !currentState[group.title],
                      }))
                    }
                    className="flex w-full items-center justify-between gap-3 px-2 py-2 text-left"
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--docs-muted)]">
                        {group.title}
                      </p>
                      <p className="mt-1 text-sm text-[var(--docs-text)]">
                        {group.items.length} section{group.items.length > 1 ? "s" : ""}
                      </p>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-[var(--docs-muted)] transition",
                        isOpen ? "rotate-180" : "rotate-0",
                      )}
                    />
                  </button>

                  {isOpen ? (
                    <div className="mt-2 space-y-1">
                      {group.items.map((item) => {
                        const isActive = item.id === activeId;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => jumpToSection(item.id)}
                            className={cn(
                              "w-full rounded-2xl px-3 py-3 text-left transition",
                              isActive
                                ? "bg-[var(--docs-accent-soft)] text-[var(--docs-accent)]"
                                : "text-[var(--docs-muted)] hover:bg-[var(--docs-bg-soft)] hover:text-[var(--docs-text)]",
                            )}
                          >
                            <p className="text-sm font-semibold">{item.label}</p>
                            <p className="mt-1 text-xs leading-5">{item.summary}</p>
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0 px-4 py-10 sm:px-6 lg:px-8 xl:px-10">
          <section
            id="overview"
            data-docs-section
            className="scroll-mt-28 pb-12 pt-2 sm:pb-14"
          >
            <div className="grid gap-10 xl:grid-cols-[minmax(0,1.65fr)_360px]">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--docs-border)] bg-[var(--docs-panel)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--docs-accent)]">
                  <span>AkashDB documentation</span>
                  <span className="h-1 w-1 rounded-full bg-[var(--docs-accent)]" />
                  <span>{packageMeta.name}@{packageMeta.version}</span>
                </div>

                <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-[var(--docs-text)] sm:text-6xl">
                  CLI docs rebuilt for AkashDB with a clearer, Stripe-style reading flow.
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-9 text-[var(--docs-muted)]">
                  This section keeps the published npm package as the source of truth for
                  commands, flags, and examples while reshaping the experience around fast
                  scanning, copyable snippets, and task-first navigation.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => jumpToSection("installation")}
                    className="inline-flex min-h-12 items-center rounded-full bg-[var(--docs-accent)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--docs-accent-strong)]"
                  >
                    Start with install
                  </button>
                  <button
                    type="button"
                    onClick={() => jumpToSection("quick-start")}
                    className="inline-flex min-h-12 items-center rounded-full border border-[var(--docs-border)] bg-[var(--docs-panel)] px-5 text-sm font-semibold text-[var(--docs-text)] transition hover:border-[var(--docs-border-strong)] hover:bg-[var(--docs-panel-strong)]"
                  >
                    Jump to quick start
                  </button>
                  <a
                    href={packageMeta.designReferenceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--docs-border)] bg-transparent px-5 text-sm font-semibold text-[var(--docs-text)] transition hover:border-[var(--docs-border-strong)] hover:bg-[var(--docs-panel)]"
                  >
                    <span>Stripe docs reference</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-12 grid gap-6 border-t border-[var(--docs-border)] pt-8 md:grid-cols-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
                      Source of truth
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--docs-text)]">
                      Published npm package metadata and README for
                      <span className="font-semibold"> {packageMeta.name}</span>.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
                      Docs experience
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--docs-text)]">
                      Sticky navigation, quick search, command signatures, and copy-to-clipboard
                      snippets.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
                      Rebrand
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--docs-text)]">
                      All surfaced docs copy in this section now uses AkashDB branding.
                    </p>
                  </div>
                </div>

                {normalizedQuery ? (
                  <div className="mt-10 rounded-[1.8rem] border border-[var(--docs-border)] bg-[var(--docs-panel)] p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
                          Search results
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[var(--docs-text)]">
                          {searchResults.length
                            ? `Matches for "${query.trim()}"`
                            : `No matches for "${query.trim()}"`}
                        </h2>
                      </div>
                      {query ? (
                        <button
                          type="button"
                          onClick={() => setQuery("")}
                          className="rounded-full border border-[var(--docs-border)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--docs-muted)] transition hover:border-[var(--docs-border-strong)] hover:text-[var(--docs-text)]"
                        >
                          Clear
                        </button>
                      ) : null}
                    </div>

                    <div className="mt-5 space-y-3">
                      {searchResults.length ? (
                        searchResults.map((result) => (
                          <button
                            key={`${result.id}-${result.group}`}
                            type="button"
                            onClick={() => jumpToSection(result.id)}
                            className="w-full rounded-[1.35rem] border border-[var(--docs-border)] bg-[var(--docs-bg-soft)] px-4 py-4 text-left transition hover:border-[var(--docs-border-strong)] hover:bg-[var(--docs-panel-strong)]"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--docs-muted)]">
                                  {result.group}
                                </p>
                                <p className="mt-2 text-base font-semibold text-[var(--docs-text)]">
                                  {result.label}
                                </p>
                                <p className="mt-2 text-sm leading-7 text-[var(--docs-muted)]">
                                  {result.summary}
                                </p>
                              </div>
                              <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--docs-muted)]" />
                            </div>
                          </button>
                        ))
                      ) : (
                        <p className="text-sm leading-7 text-[var(--docs-muted)]">
                          Try searching for a command like <code>jwt</code>, a flag like{" "}
                          <code>--s3-backup</code>, or a workflow like <code>refund</code>.
                        </p>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="space-y-6">
                <SnippetFrame
                  label="Install now"
                  code={selectedInstall.command}
                  description="Switch package manager in the Installation section to update this command."
                />

                <div className="rounded-[1.8rem] border border-[var(--docs-border)] bg-[var(--docs-panel)] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
                    Reading model
                  </p>
                  <div className="mt-5 space-y-4">
                    <div className="rounded-[1.25rem] border border-[var(--docs-border)] bg-[var(--docs-bg-soft)] px-4 py-4">
                      <p className="text-sm font-semibold text-[var(--docs-text)]">
                        1. Install and authenticate
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[var(--docs-muted)]">
                        Start with installation, then login and generate a JWT.
                      </p>
                    </div>
                    <div className="rounded-[1.25rem] border border-[var(--docs-border)] bg-[var(--docs-bg-soft)] px-4 py-4">
                      <p className="text-sm font-semibold text-[var(--docs-text)]">
                        2. Provision a Postgres deployment
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[var(--docs-muted)]">
                        Use the interactive tier selector to choose the correct preset.
                      </p>
                    </div>
                    <div className="rounded-[1.25rem] border border-[var(--docs-border)] bg-[var(--docs-bg-soft)] px-4 py-4">
                      <p className="text-sm font-semibold text-[var(--docs-text)]">
                        3. Operate it from the CLI
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[var(--docs-muted)]">
                        Inspect databases, stream logs, connect with shell, and manage JWTs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <SectionShell
            id="installation"
            title="installation"
            summary="Install the published AkashDB CLI globally with the package manager your team already uses."
          >
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {installVariants.map((variant) => {
                  const isActive = variant.id === selectedInstall.id;
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedInstallId(variant.id)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-semibold transition",
                        isActive
                          ? "border-[var(--docs-accent)] bg-[var(--docs-accent-soft)] text-[var(--docs-accent)]"
                          : "border-[var(--docs-border)] text-[var(--docs-muted)] hover:border-[var(--docs-border-strong)] hover:text-[var(--docs-text)]",
                      )}
                    >
                      {variant.label}
                    </button>
                  );
                })}
              </div>

              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
                <SnippetFrame
                  label={`${selectedInstall.label} install`}
                  code={selectedInstall.command}
                  description="The npm package README publishes installation commands for npm, pnpm, and yarn."
                />

                <div className="rounded-[1.7rem] border border-[var(--docs-border)] bg-[var(--docs-panel)] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
                    Package info
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--docs-text)]">
                    {packageMeta.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--docs-muted)]">
                    {packageMeta.description}. The docs below are aligned to the published version{" "}
                    <span className="font-semibold text-[var(--docs-text)]">
                      {packageMeta.version}
                    </span>
                    .
                  </p>
                  <a
                    href={packageMeta.packageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--docs-accent)]"
                  >
                    <span>Open package on npm</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </SectionShell>

          <SectionShell
            id="quick-start"
            title="quick start"
            summary="These four commands cover the shortest successful path from install to a running PostgreSQL deployment."
          >
            <div className="space-y-4">
              {quickStartSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="grid gap-4 rounded-[1.7rem] border border-[var(--docs-border)] bg-[var(--docs-panel)] p-6 lg:grid-cols-[72px_minmax(0,1fr)_minmax(320px,0.95fr)] lg:items-start"
                >
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--docs-accent-soft)] text-lg font-semibold text-[var(--docs-accent)]">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--docs-text)]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--docs-muted)]">
                      {step.description}
                    </p>
                  </div>
                  <SnippetFrame label={`Step ${index + 1}`} code={step.command} />
                </div>
              ))}
            </div>
          </SectionShell>

          {commandSections.map((section) => (
            <CommandSectionView
              key={section.id}
              section={section}
              selectedTierId={selectedTierId}
              onSelectTier={setSelectedTierId}
              selectedLogServiceId={selectedLogServiceId}
              onSelectLogService={setSelectedLogServiceId}
            />
          ))}
        </main>

        <aside className="hidden border-l border-[var(--docs-border)] px-6 py-10 xl:block">
          <div className="sticky top-[96px] space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
                On this page
              </p>
              <div className="mt-4 space-y-1">
                {pageLinks.map((link) => {
                  const isActive = link.id === activeId;
                  return (
                    <button
                      key={link.id}
                      type="button"
                      onClick={() => jumpToSection(link.id)}
                      className={cn(
                        "w-full rounded-2xl px-3 py-2 text-left text-sm transition",
                        isActive
                          ? "bg-[var(--docs-accent-soft)] text-[var(--docs-accent)]"
                          : "text-[var(--docs-muted)] hover:bg-[var(--docs-panel)] hover:text-[var(--docs-text)]",
                      )}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[1.7rem] border border-[var(--docs-border)] bg-[var(--docs-panel)] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
                External sources
              </p>
              <div className="mt-4 space-y-4">
                <a
                  href={packageMeta.packageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-[1.2rem] border border-[var(--docs-border)] bg-[var(--docs-bg-soft)] px-4 py-4 transition hover:border-[var(--docs-border-strong)] hover:bg-[var(--docs-panel-strong)]"
                >
                  <p className="text-sm font-semibold text-[var(--docs-text)]">npm package</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--docs-muted)]">
                    Review the published README and current package version.
                  </p>
                </a>
                <a
                  href={packageMeta.designReferenceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-[1.2rem] border border-[var(--docs-border)] bg-[var(--docs-bg-soft)] px-4 py-4 transition hover:border-[var(--docs-border-strong)] hover:bg-[var(--docs-panel-strong)]"
                >
                  <p className="text-sm font-semibold text-[var(--docs-text)]">Stripe docs</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--docs-muted)]">
                    Design reference for navigation density, search, and code treatment.
                  </p>
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
