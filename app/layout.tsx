import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Akash DB",
    template: "%s | Akash DB",
  },
  description:
    "Agent-native Postgres deployments on Akash Network with secure authentication, protected operations, and multi-instance deployment flows.",
  metadataBase: new URL("https://akashdb.example"),
  openGraph: {
    title: "Akash DB",
    description:
      "Provision Postgres on Akash Network with a production-ready operator surface.",
    images: [{ url: "/banner.png", width: 1200, height: 630, alt: "Akash DB" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akash DB",
    description:
      "Provision Postgres on Akash Network with a production-ready operator surface.",
    images: ["/banner.png"],
  },
  icons: {
    icon: [{ url: "/icon" }],
    shortcut: ["/icon"],
    apple: [{ url: "/icon" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
