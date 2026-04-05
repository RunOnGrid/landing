export type DocsNavGroup = {
  title: string;
  items: Array<{
    id: string;
    label: string;
    summary: string;
  }>;
};

export type CodeExample = {
  label: string;
  code: string;
  description?: string;
};

export type CommandOption = {
  flag: string;
  description: string;
};

export type CommandSection = {
  id: string;
  group: string;
  title: string;
  summary: string;
  signature: string;
  notes?: string[];
  options?: CommandOption[];
  examples?: CodeExample[];
  searchTerms?: string[];
};

export type InstallVariant = {
  id: "npm" | "pnpm" | "yarn";
  label: string;
  command: string;
};

export type QuickStartStep = {
  title: string;
  description: string;
  command: string;
};

export type ResourceTier = {
  id: "starter" | "standard" | "pro" | "production";
  label: string;
  specs: string;
  price: string;
  command: string;
  summary: string;
};

export type LogService = {
  id: "postgres" | "pgbouncer" | "s3backup";
  label: string;
  description: string;
  command: string;
};

export const packageMeta = {
  name: "cli-akashdb",
  version: "3.0.0",
  description: "CLI tool for managing AkashDB",
  packageUrl: "https://www.npmjs.com/package/cli-akashdb",
  designReferenceUrl: "https://docs.stripe.com/",
};

export const installVariants: InstallVariant[] = [
  { id: "npm", label: "npm", command: "npm i -g cli-akashdb" },
  { id: "pnpm", label: "pnpm", command: "pnpm i -g cli-akashdb" },
  { id: "yarn", label: "yarn", command: "yarn global add cli-akashdb" },
];

export const quickStartSteps: QuickStartStep[] = [
  {
    title: "Login with your Akash mnemonic",
    description: "Stores the mnemonic securely in your system keychain.",
    command: "akashdb login your twelve word mnemonic phrase here",
  },
  {
    title: "Generate a JWT for provider communication",
    description: "Creates the token used to securely talk to providers.",
    command: "akashdb jwt",
  },
  {
    title: "Create your first PostgreSQL deployment",
    description: "Starts an interactive deployment using the starter tier.",
    command: "akashdb create postgres --starter",
  },
  {
    title: "List active databases",
    description: "Confirms the deployment and shows the database inventory.",
    command: "akashdb database ls",
  },
];

export const resourceTiers: ResourceTier[] = [
  {
    id: "starter",
    label: "Starter",
    specs: "0.5 CPU, 1GB RAM, 5GB storage",
    price: "~$0.89/month",
    command: "akashdb create postgres --starter",
    summary: "Best for your first AkashDB deployment and interactive setup.",
  },
  {
    id: "standard",
    label: "Standard",
    specs: "1 CPU, 2GB RAM, 10GB storage",
    price: "~$1.79/month",
    command: "akashdb create postgres --standard",
    summary: "A balanced preset for small production workloads.",
  },
  {
    id: "pro",
    label: "Pro",
    specs: "2 CPU, 4GB RAM, 20GB storage",
    price: "~$3.39/month",
    command: "akashdb create postgres --pro",
    summary: "More compute headroom for heavier application traffic.",
  },
  {
    id: "production",
    label: "Production",
    specs: "2 CPU, 8GB RAM, 40GB storage",
    price: "~$4.19/month",
    command: "akashdb create postgres --production",
    summary: "Largest preset in the published CLI for durable workloads.",
  },
];

export const logServices: LogService[] = [
  {
    id: "postgres",
    label: "postgres",
    description: "Inspect the core PostgreSQL container.",
    command: "akashdb logs 12345 postgres https://provider.example",
  },
  {
    id: "pgbouncer",
    label: "pgbouncer",
    description: "Debug the connection pooler when pgBouncer is enabled.",
    command: "akashdb logs 12345 pgbouncer https://provider.example",
  },
  {
    id: "s3backup",
    label: "s3backup",
    description: "Validate the backup sidecar and schedule execution.",
    command: "akashdb logs 12345 s3backup https://provider.example",
  },
];

export const commandSections: CommandSection[] = [
  {
    id: "login",
    group: "Core commands",
    title: "login",
    summary: "Stores your Akash mnemonic securely in the system keychain.",
    signature: "akashdb login <mnemonic words...>",
    examples: [
      {
        label: "Minimal login",
        code: "akashdb login your twelve word mnemonic phrase here",
      },
      {
        label: "Expanded example",
        code:
          "akashdb login word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12",
      },
    ],
    searchTerms: ["auth", "mnemonic", "wallet", "keychain"],
  },
  {
    id: "create-postgres",
    group: "Core commands",
    title: "create postgres",
    summary: "Creates a PostgreSQL deployment on Akash with optional pooling and backups.",
    signature: "akashdb create postgres [options]",
    notes: [
      "PostgreSQL versions supported by the published package are 14, 15, 16, and 17.",
      "The default PostgreSQL version in the npm package is 16.",
    ],
    options: [
      { flag: "--starter", description: "0.5 CPU, 1GB RAM, 5GB storage preset." },
      { flag: "--standard", description: "1 CPU, 2GB RAM, 10GB storage preset." },
      { flag: "--pro", description: "2 CPU, 4GB RAM, 20GB storage preset." },
      { flag: "--production", description: "2 CPU, 8GB RAM, 40GB storage preset." },
      {
        flag: "--version <version>",
        description: "PostgreSQL version: 14, 15, 16, or 17. Defaults to 16.",
      },
      { flag: "--pgbouncer", description: "Enables pgBouncer connection pooling." },
      {
        flag: "--pgbouncer-port <port>",
        description: "Sets the pgBouncer port. Defaults to 6432.",
      },
      { flag: "--s3-backup", description: "Enables S3 backups for the deployment." },
      { flag: "--s3-access-key <key>", description: "AWS access key used for backups." },
      { flag: "--s3-secret-key <key>", description: "AWS secret key used for backups." },
      { flag: "--s3-bucket <bucket>", description: "S3 bucket name for backups." },
      {
        flag: "--s3-region <region>",
        description: "AWS region for backups. Defaults to us-east-2.",
      },
      {
        flag: "--backup-schedule <cron>",
        description: 'Cron expression for backups. Defaults to "0 5 * * *".',
      },
      { flag: "-y, --yes", description: "Auto-selects the first provider." },
    ],
    examples: [
      {
        label: "Starter tier",
        code: "akashdb create postgres --starter",
        description: "Launches an interactive starter deployment.",
      },
      {
        label: "Production with pgBouncer",
        code: "akashdb create postgres --production --pgbouncer",
      },
      {
        label: "Standard with S3 backups",
        code:
          "akashdb create postgres --standard --s3-backup \\\n+  --s3-access-key AKIAIOSFODNN7EXAMPLE \\\n+  --s3-secret-key wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY \\\n+  --s3-bucket my-db-backups",
      },
    ],
    searchTerms: ["postgres", "deploy", "s3", "pgbouncer", "backup", "tier"],
  },
  {
    id: "database",
    group: "Core commands",
    title: "database",
    summary: "Lists, inspects, deletes, refunds, and checks bids for database deployments.",
    signature: "akashdb database <subcommand>",
    examples: [
      { label: "Fetch a database by id", code: "akashdb database 12345" },
      { label: "List databases", code: "akashdb database ls" },
      { label: "Delete by id", code: "akashdb database delete 12345" },
      { label: "Delete failed deployments", code: "akashdb database delete failed" },
      { label: "Refund and close a deployment", code: "akashdb database refund 12345" },
      { label: "List provider bids", code: "akashdb database bids 987654" },
    ],
    searchTerms: ["list", "delete", "refund", "bids", "inventory"],
  },
  {
    id: "logs",
    group: "Operations",
    title: "logs",
    summary: "Streams logs from AkashDB deployments and optional sidecar services.",
    signature: "akashdb logs <dseq> [service] [providerUri]",
    options: [
      { flag: "-g, --gseq <gseq>", description: "Group sequence. Defaults to 1." },
      { flag: "-o, --oseq <oseq>", description: "Order sequence. Defaults to 1." },
      { flag: "-t, --tail <lines>", description: "Number of lines to show. Defaults to 100." },
      { flag: "-f, --follow", description: "Follows logs continuously. Enabled by default." },
      { flag: "--no-follow", description: "Prints logs and exits." },
    ],
    examples: [
      {
        label: "Default postgres stream",
        code: "akashdb logs 12345 postgres https://provider.example",
      },
      {
        label: "Tail and exit",
        code: "akashdb logs 12345 postgres https://provider.example --tail 50 --no-follow",
      },
    ],
    searchTerms: ["tail", "provider", "pgbouncer", "s3backup"],
  },
  {
    id: "shell",
    group: "Operations",
    title: "shell",
    summary: "Reconnects to a deployment shell, runs commands, or jumps straight into psql.",
    signature: "akashdb shell <dseq> [password] [options]",
    options: [
      {
        flag: "--psql",
        description: "Connects directly to PostgreSQL. Requires a local psql client.",
      },
      { flag: "-u, --user <user>", description: "Database user. Defaults to admin." },
      { flag: "-d, --database <db>", description: "Database name. Defaults to mydb." },
    ],
    examples: [
      {
        label: "Reconnect with saved config",
        code: "akashdb shell",
      },
      {
        label: "Direct psql connection",
        code: "akashdb shell 12345 mypassword --psql",
      },
      {
        label: "Custom database user",
        code: "akashdb shell 12345 mypassword --psql -u postgres -d production",
      },
      {
        label: "Execute a single command",
        code: 'akashdb shell -c "ls -la"',
      },
    ],
    searchTerms: ["psql", "exec", "container", "reconnect"],
  },
  {
    id: "jwt",
    group: "Operations",
    title: "jwt",
    summary: "Generates or inspects the JWT used for secure provider communication.",
    signature: "akashdb jwt [options]",
    options: [
      { flag: "-s, --status", description: "Checks JWT status." },
      { flag: "-r, --regenerate", description: "Forces a fresh JWT." },
    ],
    examples: [
      { label: "Generate a token", code: "akashdb jwt" },
      { label: "Check token status", code: "akashdb jwt --status" },
      { label: "Regenerate a token", code: "akashdb jwt --regenerate" },
    ],
    searchTerms: ["token", "provider", "security", "status"],
  },
];

export const docsNavGroups: DocsNavGroup[] = [
  {
    title: "Start here",
    items: [
      {
        id: "overview",
        label: "Overview",
        summary: "AkashDB CLI docs, package source, and navigation.",
      },
      {
        id: "installation",
        label: "Installation",
        summary: "Global install commands for npm, pnpm, and yarn.",
      },
      {
        id: "quick-start",
        label: "Quick start",
        summary: "Four commands to log in, mint JWT, create, and list databases.",
      },
    ],
  },
  {
    title: "Core commands",
    items: commandSections
      .filter((section) => section.group === "Core commands")
      .map((section) => ({
        id: section.id,
        label: section.title,
        summary: section.summary,
      })),
  },
  {
    title: "Operations",
    items: commandSections
      .filter((section) => section.group === "Operations")
      .map((section) => ({
        id: section.id,
        label: section.title,
        summary: section.summary,
      })),
  },
];
