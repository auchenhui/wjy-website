import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { ClientEffects } from "./components/ClientEffects";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);

  return {
    metadataBase: baseUrl,
    title: {
      default: "WJY Lighting | Outdoor lighting engineered for place",
      template: "%s | WJY Lighting",
    },
    description: "Garden, post-top, solar and LED street lighting by Changzhou Wanjiayao Lighting.",
    icons: { icon: "/favicon.jpg", shortcut: "/favicon.jpg" },
    openGraph: {
      title: "WJY Lighting | Light that belongs to the place",
      description: "Outdoor luminaires engineered for streets, parks and public landscapes.",
      images: [{ url: new URL("/og.png", baseUrl), width: 1792, height: 920, alt: "WJY Lighting - Light that belongs to the place" }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "WJY Lighting | Light that belongs to the place",
      description: "Outdoor luminaires engineered for streets, parks and public landscapes.",
      images: [new URL("/og.png", baseUrl)],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="scroll-progress" aria-hidden="true" />
        <ClientEffects />
        <header className="site-header">
          <Link className="brand" href="/" aria-label="WJY Lighting home">
            <span className="brand-mark">WJY</span>
            <span>Wanjiayao Lighting</span>
          </Link>
          <nav aria-label="Primary navigation">
            <Link href="/">Company</Link>
            <Link href="/catalogue">Products</Link>
            <Link className="nav-cta" href="/contact">Contact us <span>↗</span></Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div>
            <span className="brand-mark">WJY</span>
            <p>Engineering outdoor light for better public spaces.</p>
          </div>
          <div className="footer-links">
            <Link href="/">Company</Link>
            <Link href="/catalogue">Full catalogue</Link>
            <Link href="/catalogue#catalogue">Technical collections</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <p className="footer-meta">© 2026 Changzhou Wanjiayao Lighting Co., Ltd.</p>
        </footer>
      </body>
    </html>
  );
}
