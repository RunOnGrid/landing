import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@akashnet_" />
        <meta
          name="twitter:title"
          content="Akash DB - The CLI for database deployments built for AI agents"
        />
        <meta
          name="twitter:description"
          content="One CLI tool. Give your agent the ability to deploy databases for storing and reading data."
        />
        <meta name="twitter:image" content="https://akashdb.com/og-image.png" />

        {/* Open Graph Meta Tags (for Facebook, LinkedIn, etc.) */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Akash DB - The CLI for database deployments built for AI agents"
        />
        <meta
          property="og:description"
          content="One CLI tool. Give your agent the ability to deploy databases for storing and reading data."
        />
        <meta property="og:image" content="https://akashdb.com/og-image.png" />

        <link rel="icon" type="image/png" href="/favicon-akash.jpeg" />
        <link rel="shortcut icon" href="/favicon-akash.jpeg" />
        <link rel="apple-touch-icon" href="/favicon-akash.jpeg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
