import "./globals.css";
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, JetBrains_Mono, Martian_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { profile } from "@/data/profile";

const display = Martian_Mono({ subsets: ["latin"], weight: ["400", "600", "800"], variable: "--font-display" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-mono" });
const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: `${profile.name} · ${profile.title}`,
  description: profile.pitch,
  openGraph: {
    title: `${profile.name} · ${profile.title}`,
    description: profile.pitch,
    url: profile.siteUrl,
    siteName: `~/${profile.handle}`,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#141416",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
