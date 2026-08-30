import { Button } from "@/components/Button";
import { MarkWatermark } from "@/components/Backdrop";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { site, telLink, waLink } from "@/data/site";

export function CtaBand() {
  return (
    <section className="grain relative overflow-hidden bg-brand">
      <MarkWatermark className="-top-16 -right-16 h-[26rem] w-[26rem] text-white/[0.07]" />

      <div className="relative z-10 shell flex flex-col gap-10 py-16 lg:flex-row lg:items-center lg:justify-between lg:py-20">
        <div className="max-w-xl">
          <p className="eyebrow text-white/60">Free site visit</p>
          <h2 className="mt-5 text-[1.75rem] leading-[1.12] font-extrabold tracking-[-0.03em] text-balance text-white sm:text-4xl">
            Tell us the opening, we&rsquo;ll tell you what it takes.
          </h2>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-white/75 sm:text-base">
            Send a photo on WhatsApp for a rough idea, or call {site.owner} to
            book a measurement. No charge for the visit.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0 lg:flex-col xl:flex-row">
          <Button href={telLink} variant="solidLight" size="lg">
            <PhoneIcon className="h-4 w-4" />
            {site.phoneDisplay}
          </Button>
          <Button
            href={waLink(
              `Hello ${site.owner}, I found your website and would like a quote for `,
            )}
            variant="ghostLight"
            size="lg"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Message on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
