import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Thai, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { RevealObserver } from "@/components/RevealObserver";
import { Footer } from "@/components/sections";
import { getCertificates, getProfile } from "@/lib/content";
import { asset } from "@/lib/paths";
import { homeSections } from "@/lib/sections";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const plexThai = IBM_Plex_Sans_Thai({
  subsets: ["thai"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-thai",
  display: "swap",
});
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

const profile = getProfile();
const navItems = homeSections({ hasCertificates: getCertificates().length > 0 });

export const metadata: Metadata = {
  title: { default: `${profile.nameEn} — ${profile.title}`, template: `%s — ${profile.nameEn}` },
  description: profile.tagline,
  // Requirement: public link, but never indexed by search engines.
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0b13" },
  ],
};

// Runs before first paint so there is never a theme flash. Dark is the default;
// a visitor who switches to light keeps that choice.
const themeScript = `(function(){document.documentElement.classList.add("js");try{var t=localStorage.getItem("theme");var d=t?t==="dark":true;document.documentElement.classList.toggle("dark",d)}catch(e){document.documentElement.classList.add("dark")}})()`;

// GitHub Pages cannot send HTTP headers, so the CSP is delivered via <meta>.
// 'unsafe-inline' is required by Next.js static export's inline bootstrap scripts.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'" + (process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'" + (process.env.NODE_ENV === "development" ? " ws:" : ""),
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join("; ");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.variable} ${plexThai.variable} ${jetbrains.variable}`}
    >
      <head>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
        >
          Skip to content
        </a>
        <Navbar brand={profile.nickname.toLowerCase()} items={navItems} resumeHref={asset(profile.resume)} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <RevealObserver />
        <Footer name={profile.nameEn} sourceUrl={process.env.NEXT_PUBLIC_SOURCE_URL} />
      </body>
    </html>
  );
}
