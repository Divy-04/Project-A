import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileTabBar } from "@/components/MobileTabBar";
import { BusinessSchema } from "@/components/BusinessSchema";
import { siteUrl } from "@/lib/site-url";
import { getSettings } from "@/sanity/loaders";

/**
 * One variable family for the whole site. Weight, case and tracking carry
 * the hierarchy instead of a second typeface — cohesive, and one font file.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSettings();

  return {
    /** Required for the per-page `alternates.canonical` paths to resolve. */
    metadataBase: new URL(siteUrl),
    title: {
      default: `${site.name} — Aluminium, Glass, PVC & Furniture in Himatnagar`,
      template: `%s | ${site.name}`,
    },
    description:
      "Aluminium doors, windows, partitions and ACP glazing, PVC profile work, modular kitchens and wooden furniture. Serving Himatnagar and Sabarkantha since " +
      site.establishedYear +
      ".",
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_IN",
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const site = await getSettings();

  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ground text-ink">
        {/* The header and tab bar are client components (active-route state),
            so they take the few settings they need as props; everything
            server-rendered reads Sanity for itself. */}
        <Header
          settings={{
            name: site.name,
            phone: site.phone,
            phoneDisplay: site.phoneDisplay,
          }}
        />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileTabBar settings={{ owner: site.owner, whatsapp: site.whatsapp }} />
        <BusinessSchema />
      </body>
    </html>
  );
}
