import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileTabBar } from "@/components/MobileTabBar";
import { BusinessSchema } from "@/components/BusinessSchema";
import { PAGES } from "@/data/seo";
import { homeTitle } from "@/lib/page-meta";
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

/**
 * Verification and analytics are switched on from the host, not the code:
 * set any of these as build variables in Workers Builds and redeploy.
 *   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION  Search Console's HTML-tag token
 *   NEXT_PUBLIC_BING_SITE_VERIFICATION    Bing Webmaster Tools' msvalidate.01
 *   NEXT_PUBLIC_CF_ANALYTICS_TOKEN        Cloudflare Web Analytics site token
 * Unset, nothing is emitted.
 */
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
const analyticsToken = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSettings();

  return {
    /** Required for the per-page `alternates.canonical` paths to resolve. */
    metadataBase: new URL(siteUrl),
    title: {
      default: homeTitle(site.name),
      // A dash, not a pipe: Google rewrites cluttered titles more often.
      template: `%s – ${site.name}`,
    },
    description: PAGES.home.description,
    applicationName: site.name,
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_IN",
    },
    twitter: { card: "summary_large_image" },
    verification: {
      ...(googleVerification ? { google: googleVerification } : {}),
      ...(bingVerification
        ? { other: { "msvalidate.01": bingVerification } }
        : {}),
    },
  };
}

/** The ground colour, so a phone's browser bar runs into the header. */
export const viewport: Viewport = {
  themeColor: "#faf9f7",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const site = await getSettings();

  return (
    <html lang="en-IN" className={`${archivo.variable} h-full antialiased`}>
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
        {/* Cookieless, and Cloudflare's own, so it adds no third party the
            site does not already depend on. Deferred: never blocks paint. */}
        {analyticsToken && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: analyticsToken })}
          />
        )}
      </body>
    </html>
  );
}
