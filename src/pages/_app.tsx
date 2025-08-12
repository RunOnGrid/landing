import "@/styles/globals.css";
import "@/styles/Banner.css";
import "@/styles/Footer.css";
import "@/styles/bestFeatures.css";
import "@/styles/deployChoice.css";
import "@/styles/graphs.css";
import "@/styles/Navbar.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
