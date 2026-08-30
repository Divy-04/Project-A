import Link from "next/link";
import { WordmarkStacked } from "./Wordmark";
import { FooterMap } from "./FooterMap";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "./icons";
import { site, telLink } from "@/data/site";
import { services } from "@/data/services";
import { nav } from "@/data/nav";

/**
 * Three bands: a masthead, a row of columns, and the legal line.
 *
 * The columns were ruled with hairlines at one point; the client asked for
 * them gone. What keeps the row from reading as ragged without them is
 * alignment rather than borders — every column starts at the same top edge,
 * every heading is the same `eyebrow` at the same baseline, and every block
 * under a heading is set off by the same `mt-5`. Keep those three consistent
 * and the columns hold together on their own.
 *
 * The map is last in the DOM, so it lands at the bottom of the phone stack
 * without any CSS `order` that would desync the tab sequence.
 */

const heading = "eyebrow text-white/50";

export function Footer() {
  const year = 2026;

  return (
    <footer className="grain setout setout-dark wash-dark relative mt-auto overflow-hidden bg-slate text-white/70">
      <div className="relative z-10 shell flex flex-col gap-8 pt-12 pb-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:pt-14 lg:pb-12">
        <WordmarkStacked />
        <p className="max-w-md text-[0.9375rem] leading-relaxed text-white/55 lg:text-right">
          Measured on your wall, built on our bench and fitted by the same
          team — across {site.address.city} and {site.address.district} since{" "}
          {site.establishedYear}.
        </p>
      </div>

      <div className="relative z-10 shell pb-14 lg:pb-16">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* NAP — the block search engines read for local signals */}
          <div className="sm:col-span-2 lg:col-span-3">
            <h2 className={heading}>Visit us</h2>
            <address className="mt-5 space-y-3.5 text-sm not-italic">
              <p className="flex items-start gap-3">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.city}, Dist. {site.address.district}
                  <br />
                  {site.address.state} {site.address.postalCode}
                </span>
              </p>
              <p className="flex items-center gap-3">
                <PhoneIcon className="h-4 w-4 shrink-0 text-brand" />
                <a href={telLink} className="hover:text-white">
                  {site.phoneDisplay}
                </a>
              </p>
              <p className="flex items-start gap-3">
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <a
                  href={`mailto:${site.email}`}
                  className="break-all hover:text-white"
                >
                  {site.email}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <ClockIcon className="h-4 w-4 shrink-0 text-brand" />
                <span>{site.hoursShort}</span>
              </p>
            </address>
          </div>

          <div className="lg:col-span-2">
            <h2 className={heading}>Services</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="transition-colors hover:text-white"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className={heading}>Pages</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {/* `nav` carries Home itself now — don't prepend a second one */}
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Wrapped rather than one town per line. Nine stacked towns would
              run far deeper than the three- and four-item columns beside it,
              which is precisely the unevenness the borders were hiding. */}
          <div className="lg:col-span-2">
            <h2 className={heading}>Service area</h2>
            <p className="mt-5 text-sm leading-relaxed">
              {site.serviceAreas.join(" · ")}
            </p>
          </div>

          {/* No heading on this one. The map is a bordered block that already
              says "Get directions" inside it, so a label above it only pushed
              it out of line — with the label gone its top edge sits level with
              the other four headings and the row reads flush across the top.

              Last in the DOM: bottom of the phone stack, right of the row. */}
          <div className="sm:col-span-2 lg:col-span-3">
            <FooterMap />
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10">
        <div className="footer-base shell flex flex-col gap-3 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Proprietor: {site.owner}.
          </p>
          <p>{site.credential}</p>
        </div>
      </div>
    </footer>
  );
}
