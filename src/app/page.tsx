import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ComparisonSlider } from "@/components/home/ComparisonSlider";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Services } from "@/components/home/Services";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ServiceArea } from "@/components/home/ServiceArea";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaBand } from "@/components/CtaBand";
import { Marquee } from "@/components/Marquee";
import { imageUrl } from "@/sanity/image";
import { getDivisions, getHomePage, getSettings } from "@/sanity/loaders";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSettings();
  return {
    alternates: { canonical: "/" },
    description:
      "Aluminium doors, windows, partitions and ACP glazing, PVC profile work, modular kitchens and wooden furniture in Himatnagar, Sabarkantha. Free site visit — call " +
      site.phoneDisplay +
      ".",
  };
}

export default async function HomePage() {
  const [site, divisions, home] = await Promise.all([
    getSettings(),
    getDivisions(),
    getHomePage(),
  ]);

  /* The slider takes two plain URLs. From the Studio they come pre-cropped
     to 16:9 at 1600px by Sanity's CDN; until both photographs are uploaded
     it keeps the illustrations that shipped with the design. */
  const comparison =
    home.beforeImage && home.afterImage
      ? {
          before: imageUrl(home.beforeImage, 1600, 16 / 9),
          after: imageUrl(home.afterImage, 1600, 16 / 9),
          alt: home.afterImage.alt ?? "Before and after",
        }
      : {
          before: "/images/process/before.webp",
          after: "/images/process/after.webp",
          alt: "Process comparison",
        };

  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <ComparisonSlider
        beforeSrc={comparison.before}
        afterSrc={comparison.after}
        alt={comparison.alt}
      />
      <FeaturedWork />
      <HowItWorks />
      {/* The towns, running past — the same list the footer states plainly,
          given a bit of motion where the page changes gear. */}
      <Marquee
        label="Towns we work in"
        items={[...site.serviceAreas, ...divisions.map((d) => d.title)]}
      />
      <ServiceArea />
      <Testimonials />
      <CtaBand />
    </>
  );
}
