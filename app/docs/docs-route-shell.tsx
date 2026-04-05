"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
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

type SearchEntry = {
  id: string;
  label: string;
  group: string;
  summary: string;
  haystack: string;
};

const themeVars: Record<DocsTheme, CSSProperties> = {
  light: {
    "--docs-bg": "#fff8f8",
    "--docs-bg-soft": "rgba(255,255,255,0.94)",
    "--docs-bg-subtle": "#fff1f2",
    "--docs-panel": "rgba(255,255,255,0.97)",
    "--docs-panel-muted": "rgba(255,245,245,0.98)",
    "--docs-border": "rgba(99, 19, 28, 0.1)",
    "--docs-border-strong": "rgba(99, 19, 28, 0.18)",
    "--docs-text": "#160c10",
    "--docs-muted": "#73555b",
    "--docs-accent": "#ff414c",
    "--docs-accent-strong": "#ff5963",
    "--docs-accent-soft": "rgba(255,65,76,0.12)",
    "--docs-code-bg": "#fff3f4",
    "--docs-code-border": "rgba(255,65,76,0.16)",
    "--docs-shadow": "0 18px 48px rgba(95, 24, 30, 0.08)",
  } as CSSProperties,
  dark: {
    "--docs-bg": "#050506",
    "--docs-bg-soft": "rgba(10,10,12,0.92)",
    "--docs-bg-subtle": "#101014",
    "--docs-panel": "rgba(12,12,14,0.97)",
    "--docs-panel-muted": "rgba(17,17,20,0.98)",
    "--docs-border": "rgba(255,255,255,0.11)",
    "--docs-border-strong": "rgba(255,255,255,0.18)",
    "--docs-text": "#ffffff",
    "--docs-muted": "#b8a7aa",
    "--docs-accent": "#ff414c",
    "--docs-accent-strong": "#ff5963",
    "--docs-accent-soft": "rgba(255,65,76,0.14)",
    "--docs-code-bg": "#0d0d10",
    "--docs-code-border": "rgba(255,65,76,0.18)",
    "--docs-shadow": "0 22px 54px rgba(0,0,0,0.28)",
  } as CSSProperties,
};

const commandMap = Object.fromEntries(
  commandSections.map((section) => [section.id, section]),
) as Record<string, CommandSection>;

function buildSearchSummary(id: string, summary: string) {
  if (id === "installation") {
    return `${summary} ${installVariants.map((variant) => variant.command).join(" ")}`.toLowerCase();
  }

  if (id === "quick-start") {
    return `${summary} ${quickStartSteps.map((step) => `${step.title} ${step.command}`).join(" ")}`.toLowerCase();
  }

  const section = commandMap[id];
  if (!section) {
    return summary.toLowerCase();
  }

  return [
    summary,
    section.signature,
    ...(section.searchTerms ?? []),
    ...(section.options?.map((option) => `${option.flag} ${option.description}`) ?? []),
    ...(section.examples?.map((example) => `${example.label} ${example.code}`) ?? []),
  ]
    .join(" ")
    .toLowerCase();
}

const searchIndex: SearchEntry[] = docsNavGroups.flatMap((group) =>
  group.items.map((item) => ({
    id: item.id,
    label: item.label,
    group: group.title,
    summary: item.summary,
    haystack: buildSearchSummary(item.id, item.summary),
  })),
);

function CopyButton({ value }: { value: string }) {
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
      className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[var(--docs-border)] bg-transparent px-3 text-xs font-semibold text-[var(--docs-text)] transition hover:border-[var(--docs-border-strong)] hover:bg-[var(--docs-bg-soft)]"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      <span>{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

function Snippet({
  title,
  code,
  description,
}: {
  title: string;
  code: string;
  description?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--docs-code-border)] bg-[var(--docs-code-bg)]">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--docs-code-border)] px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
          {title}
        </p>
        <CopyButton value={code} />
      </div>
      <pre className="overflow-x-auto px-4 py-5 text-sm leading-7 text-[var(--docs-text)]">
        <code>{code}</code>
      </pre>
      {description ? (
        <p className="border-t border-[var(--docs-code-border)] px-4 py-3 text-sm leading-7 text-[var(--docs-muted)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function SectionIntro({
  id,
  title,
  summary,
}: {
  id: string;
  title: string;
  summary: string;
}) {
  return (
    <section
      id={id}
      data-docs-section
      className="scroll-mt-28 border-t border-[var(--docs-border)] py-12 first:border-t-0 sm:py-14"
    >
      <div className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--docs-accent)]">
          {title}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--docs-text)] sm:text-[2.2rem]">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--docs-muted)]">
          {summary}
        </p>
      </div>
    </section>
  );
}

function CommandSectionView({
  section,
  selectedTier,
  setSelectedTier,
  selectedLogService,
  setSelectedLogService,
}: {
  section: CommandSection;
  selectedTier: ResourceTier["id"];
  setSelectedTier: (id: ResourceTier["id"]) => void;
  selectedLogService: (typeof logServices)[number]["id"];
  setSelectedLogService: (id: (typeof logServices)[number]["id"]) => void;
}) {
  const activeTier =
    resourceTiers.find((tier) => tier.id === selectedTier) ?? resourceTiers[0];
  const activeLogService =
    logServices.find((service) => service.id === selectedLogService) ?? logServices[0];

  return (
    <div className="-mt-4 pb-12 sm:pb-14">
      <div className="space-y-6">
        <div className="rounded-2xl border border-[var(--docs-border)] bg-[var(--docs-panel)] p-6 shadow-[var(--docs-shadow)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
                Command
              </p>
              <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-[var(--docs-text)] sm:text-xl">
                {section.signature}
              </h3>
            </div>
            <CopyButton value={section.signature} />
          </div>
        </div>

        {section.id === "create-postgres" ? (
          <div className="rounded-2xl border border-[var(--docs-border)] bg-[var(--docs-panel)] p-6 shadow-[var(--docs-shadow)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
              Resource presets
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {resourceTiers.map((tier) => {
                const active = tier.id === activeTier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedTier(tier.id)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-semibold transition",
                      active
                        ? "border-[var(--docs-accent)] bg-[var(--docs-accent-soft)] text-[var(--docs-accent)]"
                        : "border-[var(--docs-border)] text-[var(--docs-muted)] hover:border-[var(--docs-border-strong)] hover:text-[var(--docs-text)]",
                    )}
                  >
                    {tier.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(340px,0.96fr)]">
              <div className="rounded-2xl border border-[var(--docs-border)] bg-[var(--docs-panel-muted)] p-5">
                <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--docs-text)]">
                  {activeTier.label}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--docs-muted)]">
                  {activeTier.summary}
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
                      Capacity
                    </p>
                    <p className="mt-2 text-sm text-[var(--docs-text)]">{activeTier.specs}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
                      Estimate
                    </p>
                    <p className="mt-2 text-sm text-[var(--docs-text)]">{activeTier.price}</p>
                  </div>
                </div>
              </div>

              <Snippet
                title="Selected preset"
                code={activeTier.command}
                description="Choose a preset to preview the matching create command."
              />
            </div>
          </div>
        ) : null}

        {section.id === "logs" ? (
          <div className="rounded-2xl border border-[var(--docs-border)] bg-[var(--docs-panel)] p-6 shadow-[var(--docs-shadow)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
              Service targets
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {logServices.map((service) => {
                const active = service.id === activeLogService.id;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setSelectedLogService(service.id)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-semibold transition",
                      active
                        ? "border-[var(--docs-accent)] bg-[var(--docs-accent-soft)] text-[var(--docs-accent)]"
                        : "border-[var(--docs-border)] text-[var(--docs-muted)] hover:border-[var(--docs-border-strong)] hover:text-[var(--docs-text)]",
                    )}
                  >
                    {service.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(340px,0.96fr)]">
              <div className="rounded-2xl border border-[var(--docs-border)] bg-[var(--docs-panel-muted)] p-5">
                <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--docs-text)]">
                  {activeLogService.label}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--docs-muted)]">
                  {activeLogService.description}
                </p>
              </div>
              <Snippet
                title="Example"
                code={activeLogService.command}
                description="The CLI supports postgres, pgbouncer, and s3backup log streams."
              />
            </div>
          </div>
        ) : null}

        {section.notes?.length ? (
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
              Notes
            </p>
            {section.notes.map((note) => (
              <div
                key={note}
                className="rounded-2xl border border-[var(--docs-border)] bg-[var(--docs-panel)] px-5 py-4 text-sm leading-7 text-[var(--docs-text)]"
              >
                {note}
              </div>
            ))}
          </div>
        ) : null}

        {section.options?.length ? (
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
              Options
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--docs-border)] bg-[var(--docs-panel)]">
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
              Examples
            </p>
            <div className="mt-4 grid gap-4 xl:grid-cols-2">
              {section.examples.map((example) => (
                <Snippet
                  key={`${section.id}-${example.label}`}
                  title={example.label}
                  code={example.code}
                  description={example.description}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function DocsRouteShell() {
  const [theme, setTheme] = useState<DocsTheme>("dark");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeId, setActiveId] = useState("overview");
  const [query, setQuery] = useState("");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(docsNavGroups.map((group) => [group.title, true])),
  );
  const [selectedInstall, setSelectedInstall] = useState<"npm" | "pnpm" | "yarn">("npm");
  const [selectedTier, setSelectedTier] = useState<ResourceTier["id"]>("starter");
  const [selectedLogService, setSelectedLogService] =
    useState<(typeof logServices)[number]["id"]>("postgres");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("akashdb-docs-theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      return;
    }

    setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("akashdb-docs-theme", theme);
  }, [theme]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-docs-section]"));
    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-18% 0px -64% 0px",
        threshold: [0.15, 0.35, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        Boolean(target?.isContentEditable);

      if (!isTyping && event.key === "/") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const visibleGroups = useMemo(() => {
    if (!query.trim()) {
      return docsNavGroups;
    }

    const normalized = query.trim().toLowerCase();
    const matchedIds = new Set(
      searchIndex.filter((entry) => entry.haystack.includes(normalized)).map((entry) => entry.id),
    );

    return docsNavGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => matchedIds.has(item.id)),
      }))
      .filter((group) => group.items.length > 0);
  }, [query]);

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    const normalized = query.trim().toLowerCase();
    return searchIndex.filter((entry) => entry.haystack.includes(normalized)).slice(0, 8);
  }, [query]);

  const installVariant =
    installVariants.find((variant) => variant.id === selectedInstall) ?? installVariants[0];
  const pageLinks = docsNavGroups.flatMap((group) => group.items);

  const jumpToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) {
      return;
    }

    setActiveId(id);
    setMobileNavOpen(false);
    window.history.replaceState(null, "", `#${id}`);
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      style={themeVars[theme]}
      className="min-h-screen bg-[var(--docs-bg)] text-[var(--docs-text)]"
    >
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[10%] top-[-9rem] h-[22rem] w-[22rem] rounded-full bg-[var(--docs-accent-soft)] blur-3xl" />
        <div className="absolute bottom-[-10rem] right-[8%] h-[24rem] w-[24rem] rounded-full bg-[var(--docs-accent-soft)] blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-[var(--docs-border)] bg-[var(--docs-bg-soft)]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1560px] items-center gap-3 px-4 py-3 lg:px-6">
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
                CLI reference from the published npm package
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
            onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--docs-border)] bg-[var(--docs-panel)] text-[var(--docs-text)] transition hover:border-[var(--docs-border-strong)]"
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
            className="hidden min-h-11 items-center gap-2 rounded-full border border-[var(--docs-border)] bg-[var(--docs-panel)] px-4 text-sm font-semibold text-[var(--docs-text)] transition hover:border-[var(--docs-border-strong)] hover:bg-[var(--docs-panel-muted)] sm:inline-flex"
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
          "fixed inset-0 z-30 bg-black/45 backdrop-blur-sm transition lg:hidden",
          mobileNavOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMobileNavOpen(false)}
      />

      <div className="mx-auto grid max-w-[1560px] lg:grid-cols-[272px_minmax(0,1fr)] xl:grid-cols-[272px_minmax(0,1fr)_244px]">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-[88vw] max-w-[320px] border-r border-[var(--docs-border)] bg-[var(--docs-bg-soft)] px-4 pb-8 pt-24 shadow-[var(--docs-shadow)] transition duration-300 lg:sticky lg:top-[69px] lg:z-10 lg:block lg:h-[calc(100vh-69px)] lg:w-auto lg:max-w-none lg:translate-x-0 lg:bg-transparent lg:px-5 lg:pt-8 lg:shadow-none",
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

          <nav className="space-y-5" aria-label="Documentation navigation">
            {visibleGroups.map((group) => {
              const open = query.trim() ? true : openGroups[group.title];

              return (
                <div key={group.title} className="border-b border-[var(--docs-border)] pb-4 last:border-b-0">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenGroups((current) => ({
                        ...current,
                        [group.title]: !current[group.title],
                      }))
                    }
                    className="flex w-full items-center justify-between gap-3 py-1 text-left"
                  >
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
                        {group.title}
                      </p>
                      <p className="mt-1 text-sm text-[var(--docs-text)]">
                        {group.items.length} section{group.items.length > 1 ? "s" : ""}
                      </p>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-[var(--docs-muted)] transition",
                        open ? "rotate-180" : "rotate-0",
                      )}
                    />
                  </button>

                  {open ? (
                    <div className="mt-3 space-y-1">
                      {group.items.map((item) => {
                        const active = item.id === activeId;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => jumpToSection(item.id)}
                            className={cn(
                              "w-full rounded-xl px-3 py-3 text-left transition",
                              active
                                ? "bg-[var(--docs-accent-soft)] text-[var(--docs-accent)]"
                                : "text-[var(--docs-muted)] hover:bg-[var(--docs-panel)] hover:text-[var(--docs-text)]",
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
          <section id="overview" data-docs-section className="scroll-mt-28 pb-12 sm:pb-14">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1.65fr)_360px]">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--docs-border)] bg-[var(--docs-panel)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--docs-accent)]">
                  <span>AkashDB CLI docs</span>
                  <span className="h-1 w-1 rounded-full bg-[var(--docs-accent)]" />
                  <span>{packageMeta.name}@{packageMeta.version}</span>
                </div>

                <h1 className="mt-6 max-w-[11ch] text-5xl font-semibold tracking-[-0.065em] text-[var(--docs-text)] sm:text-[4.4rem] sm:leading-[0.98]">
                  AkashDB CLI documentation and command reference.
                </h1>

                <p className="mt-6 max-w-[60ch] text-lg leading-9 text-[var(--docs-muted)]">
                  Install the CLI, authenticate with Akash, create PostgreSQL deployments,
                  inspect logs, and manage databases with the published{" "}
                  <code className="rounded bg-[var(--docs-accent-soft)] px-1.5 py-0.5 text-[0.95em] text-[var(--docs-text)]">
                    cli-akashdb
                  </code>{" "}
                  package.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => jumpToSection("installation")}
                    className="inline-flex min-h-12 items-center rounded-full bg-[var(--docs-accent)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--docs-accent-strong)]"
                  >
                    Installation
                  </button>
                  <button
                    type="button"
                    onClick={() => jumpToSection("quick-start")}
                    className="inline-flex min-h-12 items-center rounded-full border border-[var(--docs-border)] bg-[var(--docs-panel)] px-5 text-sm font-semibold text-[var(--docs-text)] transition hover:border-[var(--docs-border-strong)] hover:bg-[var(--docs-panel-muted)]"
                  >
                    Quick start
                  </button>
                  <button
                    type="button"
                    onClick={() => jumpToSection("login")}
                    className="inline-flex min-h-12 items-center rounded-full border border-[var(--docs-border)] bg-transparent px-5 text-sm font-semibold text-[var(--docs-text)] transition hover:border-[var(--docs-border-strong)] hover:bg-[var(--docs-panel)]"
                  >
                    Command reference
                  </button>
                </div>

                <div className="mt-12 grid gap-5 border-t border-[var(--docs-border)] pt-8 md:grid-cols-3">
                  <div className="rounded-2xl border border-[var(--docs-border)] bg-[var(--docs-panel)] p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
                      Source of truth
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--docs-text)]">
                      Commands, flags, and examples are aligned with the published npm package.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[var(--docs-border)] bg-[var(--docs-panel)] p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
                      What&apos;s covered
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--docs-text)]">
                      Install, login, JWT, database management, deployment creation, logs, and shell access.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[var(--docs-border)] bg-[var(--docs-panel)] p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
                      Package version
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--docs-text)]">
                      This reference targets <span className="font-semibold">{packageMeta.version}</span>.
                    </p>
                  </div>
                </div>

                {query.trim() ? (
                  <div className="mt-10 rounded-2xl border border-[var(--docs-border)] bg-[var(--docs-panel)] p-6 shadow-[var(--docs-shadow)]">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
                          Search results
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--docs-text)]">
                          {searchResults.length
                            ? `Matches for "${query.trim()}"`
                            : `No matches for "${query.trim()}"`}
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => setQuery("")}
                        className="rounded-full border border-[var(--docs-border)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--docs-muted)] transition hover:border-[var(--docs-border-strong)] hover:text-[var(--docs-text)]"
                      >
                        Clear
                      </button>
                    </div>

                    <div className="mt-5 space-y-3">
                      {searchResults.length ? (
                        searchResults.map((result) => (
                          <button
                            key={`${result.group}-${result.id}`}
                            type="button"
                            onClick={() => jumpToSection(result.id)}
                            className="w-full rounded-2xl border border-[var(--docs-border)] bg-[var(--docs-panel-muted)] px-4 py-4 text-left transition hover:border-[var(--docs-border-strong)]"
                          >
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
                              {result.group}
                            </p>
                            <p className="mt-2 text-base font-semibold text-[var(--docs-text)]">
                              {result.label}
                            </p>
                            <p className="mt-2 text-sm leading-7 text-[var(--docs-muted)]">
                              {result.summary}
                            </p>
                          </button>
                        ))
                      ) : (
                        <p className="text-sm leading-7 text-[var(--docs-muted)]">
                          Try searching for <code>jwt</code>, <code>--s3-backup</code>, or{" "}
                          <code>refund</code>.
                        </p>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="space-y-5">
                <Snippet
                  title="Install"
                  code={installVariant.command}
                  description="Choose npm, pnpm, or yarn in the Installation section to preview the matching command."
                />

                <div className="rounded-2xl border border-[var(--docs-border)] bg-[var(--docs-panel)] p-6 shadow-[var(--docs-shadow)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
                    Included in this page
                  </p>
                  <div className="mt-5 space-y-4">
                    <div className="rounded-2xl border border-[var(--docs-border)] bg-[var(--docs-panel-muted)] px-4 py-4">
                      <p className="text-sm font-semibold text-[var(--docs-text)]">
                        Setup and authentication
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[var(--docs-muted)]">
                        Install the CLI, store the mnemonic, and generate JWTs for provider communication.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[var(--docs-border)] bg-[var(--docs-panel-muted)] px-4 py-4">
                      <p className="text-sm font-semibold text-[var(--docs-text)]">
                        Deployment workflows
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[var(--docs-muted)]">
                        Review resource presets, PostgreSQL options, backup flags, and example commands.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[var(--docs-border)] bg-[var(--docs-panel-muted)] px-4 py-4">
                      <p className="text-sm font-semibold text-[var(--docs-text)]">
                        Day-two operations
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[var(--docs-muted)]">
                        Inspect databases, stream service logs, reconnect shells, and manage JWT state.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <SectionIntro
            id="installation"
            title="installation"
            summary="Install the published AkashDB CLI globally with the package manager your team already uses."
          />
          <div className="-mt-4 pb-12 sm:pb-14">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {installVariants.map((variant) => {
                  const active = variant.id === selectedInstall;
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedInstall(variant.id)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-semibold transition",
                        active
                          ? "border-[var(--docs-accent)] bg-[var(--docs-accent-soft)] text-[var(--docs-accent)]"
                          : "border-[var(--docs-border)] text-[var(--docs-muted)] hover:border-[var(--docs-border-strong)] hover:text-[var(--docs-text)]",
                      )}
                    >
                      {variant.label}
                    </button>
                  );
                })}
              </div>

              <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
                <Snippet
                  title={`${installVariant.label} install`}
                  code={installVariant.command}
                  description="The published package includes install commands for npm, pnpm, and yarn."
                />

                <div className="rounded-2xl border border-[var(--docs-border)] bg-[var(--docs-panel)] p-6 shadow-[var(--docs-shadow)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
                    Package info
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--docs-text)]">
                    {packageMeta.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--docs-muted)]">
                    {packageMeta.description}. This reference is aligned to version{" "}
                    <span className="font-semibold text-[var(--docs-text)]">{packageMeta.version}</span>.
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
          </div>

          <SectionIntro
            id="quick-start"
            title="quick start"
            summary="These four commands cover the shortest path from installation to a running PostgreSQL deployment."
          />
          <div className="-mt-4 pb-12 sm:pb-14">
            <div className="space-y-4">
              {quickStartSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="grid gap-5 rounded-2xl border border-[var(--docs-border)] bg-[var(--docs-panel)] p-6 shadow-[var(--docs-shadow)] xl:grid-cols-[72px_minmax(0,1fr)_minmax(340px,0.95fr)]"
                >
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--docs-accent-soft)] text-lg font-semibold text-[var(--docs-accent)]">
                    {index + 1}
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--docs-text)]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--docs-muted)]">
                      {step.description}
                    </p>
                  </div>
                  <Snippet title={`Step ${index + 1}`} code={step.command} />
                </div>
              ))}
            </div>
          </div>

          {commandSections.map((section) => (
            <div key={section.id}>
              <SectionIntro id={section.id} title={section.title} summary={section.summary} />
              <CommandSectionView
                section={section}
                selectedTier={selectedTier}
                setSelectedTier={setSelectedTier}
                selectedLogService={selectedLogService}
                setSelectedLogService={setSelectedLogService}
              />
            </div>
          ))}
        </main>

        <aside className="hidden border-l border-[var(--docs-border)] px-6 py-10 xl:block">
          <div className="sticky top-[96px] space-y-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
                On this page
              </p>
              <div className="mt-4 space-y-1">
                {pageLinks.map((link) => {
                  const active = link.id === activeId;
                  return (
                    <button
                      key={link.id}
                      type="button"
                      onClick={() => jumpToSection(link.id)}
                      className={cn(
                        "w-full rounded-xl px-3 py-2 text-left text-sm transition",
                        active
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

            <div className="rounded-2xl border border-[var(--docs-border)] bg-[var(--docs-panel)] p-5 shadow-[var(--docs-shadow)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--docs-muted)]">
                Source package
              </p>
              <a
                href={packageMeta.packageUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 block rounded-2xl border border-[var(--docs-border)] bg-[var(--docs-panel-muted)] px-4 py-4 transition hover:border-[var(--docs-border-strong)]"
              >
                <p className="text-sm font-semibold text-[var(--docs-text)]">npm package</p>
                <p className="mt-2 text-sm leading-7 text-[var(--docs-muted)]">
                  Review the published README and the package version used as the source for this reference.
                </p>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
