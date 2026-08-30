import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileTabBar } from "@/components/MobileTabBar";
import { BusinessSchema } from "@/components/BusinessSchema";
import { site } from "@/data/site";

/**
 * One variable family for the whole site. Weight, case and tracking carry
 * the hierarchy instead of a second typeface — cohesive, and one font file.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  /** Required for the per-page `alternates.canonical` paths to resolve. */
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Aluminium, Glass, PVC & Furniture in Himatnagar`,
    template: `%s | ${site.name}`,
  },
  description:
    "Aluminium doors, windows, partitions and ACP glazing, KDM PVC profile work, modular kitchens and wooden furniture. Serving Himatnagar and Sabarkantha since " +
    site.establishedYear +
    ".",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ground text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileTabBar />
        <BusinessSchema />
      </body>
    </html>
  );
}
