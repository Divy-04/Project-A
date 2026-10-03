import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Faqs } from "@/components/Faqs";
import { FooterMap } from "@/components/FooterMap";
import { PageHeader } from "@/components/PageHeader";
import { SectionHead } from "@/components/SectionHead";
import {
  ArrowIcon,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { FaqSchema } from "@/components/FaqSchema";
import { PAGES } from "@/data/seo";
import { mapsUrl, telLink, waLink } from "@/lib/links";
import { pageMetadata } from "@/lib/page-meta";
import { getDivisions, getSettings } from "@/sanity/loaders";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSettings();
  return pageMetadata({
    ...PAGES.contact,
    description: `Call ${site.phoneDisplay} or WhatsApp. ${site.address.line1}, ${site.address.city}, ${site.address.district}. Free site visit, measurement and quote.`,
    path: "/contact",
  });
}

/**
 * Call and WhatsApp stay the primary actions — around here that is how the
 * enquiry actually arrives, and both work with no JavaScript. The form is the
 * third option, for the people who will not ring; it emails the owner via
 * /api/enquiry so the Brevo key never reaches the browser.
 */
export default async function ContactPage() {
  const [site, divisions] = await Promise.all([getSettings(), getDivisions()]);
  const tel = telLink(site);

  const faqs = [
    {
      q: "Do you charge for a site visit?",
      a: "No. We come out, measure the opening and give you a figure. There is no charge for the visit and no obligation afterwards.",
    },
    {
      q: "How far do you travel?",
      a: `${site.serviceAreas.join(", ")} and the villages between them. If you are nearby and not on that list, call and ask — it is usually a yes.`,
    },
    {
      q: "How long does a job take?",
      a: "It depends entirely on the size and the material, which is why we would rather measure than guess. We will give you a realistic date at the time of quoting, not an optimistic one.",
    },
    {
      q: "Can I get a rough idea before you visit?",
      a: "Send photographs on WhatsApp with an approximate width and height and we can give you a ballpark. Anything firm still needs a measurement.",
    },
    {
      q: "Do you handle repairs and alterations?",
      a: "Yes — re-glazing, shutter and roller adjustments, replacing a damaged section. Call and describe it, or send a photograph.",
    },
  ];

  const channels = [
    {
      href: tel,
      icon: <PhoneIcon className="h-5 w-5" />,
      label: "Call",
      value: site.phoneDisplay,
      note: `Speak to ${site.owner} directly.`,
      primary: true,
    },
    {
      href: waLink(
        site,
        `Hello ${site.owner}, I found your website and would like a quote for `,
      ),
      icon: <WhatsAppIcon className="h-5 w-5" />,
      label: "WhatsApp",
      value: "Send a message",
      note: "Photographs and rough sizes welcome.",
      primary: false,
    },
    {
      href: `mailto:${site.email}`,
      icon: <MailIcon className="h-5 w-5" />,
      label: "Email",
      value: site.email,
      note: "Best for drawings and larger files.",
      primary: false,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us the opening. We will tell you what it takes."
        intro={`Call or message ${site.owner} directly. Site visit and measurement are free, anywhere in ${site.address.district}.`}
      >
        <Breadcrumbs trail={[{ href: "/contact", label: "Contact" }]} />
      </PageHeader>

      <section className="bg-ground py-14 lg:py-20">
        <div className="shell grid gap-5 md:grid-cols-3">
          {channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              {...(channel.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={`group flex flex-col rounded-sm border p-7 transition-colors ${
                channel.primary
                  ? "border-brand bg-brand text-white hover:bg-brand-dark"
                  : "border-line bg-surface hover:border-line-strong"
              }`}
            >
              <span
                className={
                  channel.primary ? "text-white/70" : "text-brand"
                }
              >
                {channel.icon}
              </span>
              <span
                className={`eyebrow mt-5 ${
                  channel.primary ? "text-white/60" : "text-ink-3"
                }`}
              >
                {channel.label}
              </span>
              <span
                className={`mt-2.5 text-lg font-bold tracking-[-0.02em] break-words ${
                  channel.primary ? "text-white" : "text-ink"
                }`}
              >
                {channel.value}
              </span>
              <span
                className={`mt-2 flex-1 text-sm ${
                  channel.primary ? "text-white/70" : "text-ink-2"
                }`}
              >
                {channel.note}
              </span>
              <ArrowIcon
                className={`mt-6 h-4 w-4 transition-transform group-hover:translate-x-0.5 ${
                  channel.primary ? "text-white/70" : "text-ink-3"
                }`}
              />
            </a>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface py-16 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead
              label="Send a message"
              title="Or write it down and we will come back."
              intro="Enough detail to be useful beats a perfect description — rough sizes and the town you are in are plenty to start with."
            />
          </div>
          <div className="lg:col-span-7">
            <EnquiryForm
              divisions={divisions.map(({ slug, title }) => ({ slug, title }))}
              settings={{
                owner: site.owner,
                phone: site.phone,
                phoneDisplay: site.phoneDisplay,
                whatsapp: site.whatsapp,
              }}
            />
          </div>
        </div>
      </section>

      <section className="bg-ground py-16 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHead
              label="Visit the workshop"
              title={`${site.address.line1.split(", ").pop()}, ${site.address.city}.`}
              intro="Come and see the sections and the finishes in person — it is a lot easier to choose a profile with it in your hand than from a photograph."
            />

            <address className="mt-9 space-y-4 text-[0.9375rem] not-italic">
              <p className="flex items-start gap-3.5">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span className="text-ink-2">
                  <span className="font-semibold text-ink">{site.name}</span>
                  <br />
                  {site.address.line1}
                  <br />
                  {site.address.city}, Dist. {site.address.district}
                  <br />
                  {site.address.state} {site.address.postalCode}
                </span>
              </p>
              <p className="flex items-center gap-3.5">
                <PhoneIcon className="h-4 w-4 shrink-0 text-brand" />
                <a
                  href={tel}
                  className="font-semibold text-ink transition-colors hover:text-brand"
                >
                  {site.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-3.5">
                <MailIcon className="h-4 w-4 shrink-0 text-brand" />
                <a
                  href={`mailto:${site.email}`}
                  className="text-ink-2 transition-colors hover:text-brand"
                >
                  {site.email}
                </a>
              </p>
              <p className="flex items-center gap-3.5">
                <ClockIcon className="h-4 w-4 shrink-0 text-brand" />
                <span className="text-ink-2">{site.hours}</span>
              </p>
            </address>

            <a
              href={mapsUrl(site)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-brand"
            >
              Open in Google Maps
              <ArrowIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="lg:col-span-6">
            {/* 16:10 is the locator's own aspect — cropping it to a squarer
                box zooms past most of the street grid. */}
            <FooterMap tone="light" ratio="16/10" label="Get directions" />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-20 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead
              label="Ask about a division"
              title="Message us about a specific job."
              intro="These open WhatsApp with the division already written in, so you only have to add what you need."
            />
          </div>

          <div className="lg:col-span-7">
            <ul className="divide-y divide-line border-y border-line">
              {divisions.map((service) => (
                <li key={service.slug}>
                  <a
                    href={waLink(
                      site,
                      `Hello ${site.owner}, I found your website. I would like a quote for ${service.title} — `,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-6 py-6"
                  >
                    <span>
                      <span className="block font-bold tracking-[-0.02em] transition-colors group-hover:text-brand">
                        {service.title}
                      </span>
                      <span className="mt-1.5 block text-sm text-ink-3">
                        {service.items.slice(0, 3).join(" · ")}
                      </span>
                    </span>
                    <WhatsAppIcon className="h-5 w-5 shrink-0 text-ink-3 transition-colors group-hover:text-brand" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-ground py-20 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead
              label="Before you call"
              title="Questions we get asked most."
            />
          </div>
          <div className="lg:col-span-7">
            <Faqs faqs={faqs} />
            <FaqSchema faqs={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
