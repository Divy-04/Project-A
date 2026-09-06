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
import { services } from "@/data/services";
import { site } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  description:
    "Aluminium doors, windows, partitions and ACP glazing, KDM PVC profile work, modular kitchens and wooden furniture in Himatnagar, Sabarkantha. Free site visit — call " +
    site.phoneDisplay +
    ".",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <ComparisonSlider
        beforeSrc="/images/process/before.png"
        afterSrc="/images/process/after.png"
        alt="Process comparison"
      />
      <FeaturedWork />
      <HowItWorks />
      {/* The towns, running past — the same list the footer states plainly,
          given a bit of motion where the page changes gear. */}
      <Marquee
        label="Towns we work in"
        items={[...site.serviceAreas, ...services.map((s) => s.title)]}
      />
      <ServiceArea />
      <Testimonials />
      <CtaBand />
    </>
  );
}
