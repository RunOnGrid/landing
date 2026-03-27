import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/Footer";
import ContactFormModal from "@/components/Form";
import NavBar from "@/components/Navbar";

const highlights = [
  {
    label: "Agent-first",
    value: "CLI that speaks workflows",
    detail: "Declarative Postgres deployment your agents can automate.",
  },
  {
    label: "Cost wins",
    value: "Up to 80% less",
    detail: "Decentralized Akash providers beat centralized cloud pricing.",
  },
  {
    label: "Guardrails",
    value: "Observability built in",
    detail: "Live logs, audits, and backups ship with every deploy.",
  },
];

const featureCards = [
  {
    title: "Agent-native delivery",
    copy: "One CLI to spin up Postgres, issue credentials, and hand them directly to your AI agents.",
  },
  {
    title: "Decentralized control plane",
    copy: "Akash's marketplace keeps your data portable across audited providers with transparent uptime and pricing.",
  },
  {
    title: "Production guardrails",
    copy: "Live logs, secure access, and automated S3 backups come standard—no extra config or plugins required.",
  },
];

const steps = [
  {
    title: "Install",
    copy: "Pull the Akash DB CLI and log in with your Akash account.",
  },
  {
    title: "Deploy",
    copy: "Run one command to provision Postgres on the best provider for your SLA.",
  },
  {
    title: "Hand off",
    copy: "Share connection strings with your agents; rotate credentials and scale without downtime.",
  },
];

const guardrails = [
  "Audited providers with uptime and active lease visibility",
  "Secure SSH access and credential rotation built in",
  "Automated backups to S3-compatible storage",
];

export default function AkashDBLanding() {
  const [open, setOpen] = useState(false);

  return (
    <div className="container-home text-white min-h-screen">
      <NavBar />

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
        <div className="pointer-events-none absolute right-0 bottom-10 h-96 w-96 rounded-full bg-[#3b47ff]/10 blur-[140px]" />

        <section className="max-w-6xl mx-auto px-6 pt-16 lg:pt-24">
          <div className="flex flex-col gap-10">
            <div className="max-w-4xl">
              <h1 className="text-4xl lg:text-5xl font-normal leading-tight mt-4 max-w-4xl">
                One CLI tool. Give your agent the ability to deploy databases.
              </h1>
              <p className="text-lg text-white/75 mt-6 max-w-3xl">
                Provision Postgres on Akash Network.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link href="https://akash.network" className="btn-primary px-10 py-3">
                  Install the CLI
                </Link>
                <button onClick={() => setOpen(true)} className="btn-secondary px-8 py-3">
                  Talk with us
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-6 shadow-inner shadow-black/40">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/50">CLI flow</p>
                  <h2 className="text-2xl font-normal mt-2">One command to ship a database</h2>
                </div>
              </div>
              <div className="mt-6 font-mono text-sm bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 text-white/60">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                </div>
                <pre className="px-5 py-4 text-white/90 overflow-x-auto">
                  {`curl -s https://akash.network/db-cli.sh | bash `}
                </pre>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            {highlights.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-white/60">{item.label}</div>
                <div className="text-xl font-normal mt-2 text-white">{item.value}</div>
                <p className="text-sm text-white/60 mt-2 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-14 lg:py-20">
          <div className="grid gap-6 md:grid-cols-3">
            {featureCards.map((card) => (
              <div
                key={card.title}
                className="h-full rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
              >
                <h3 className="text-xl font-normal mb-3">{card.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{card.copy}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />

      <ContactFormModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(data) => {
          console.log("Form data", data);
          setOpen(false);
        }}
        intent={[
          ["Get technical support", "support"],
          ["Contact the team", "team"],
        ]}
      />
    </div>
  );
}
