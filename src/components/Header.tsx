import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { PhoneIcon, WhatsAppIcon } from "./icons";
import { nav } from "@/data/nav";
import { site, telLink, waLink } from "@/data/site";

/**
 * On large screens this is the whole navigation. Below `lg` the destinations
 * live in `MobileTabBar` at the bottom of the screen, so the header keeps
 * only the wordmark and one action.
 *
 * That action is WhatsApp rather than Call: Call has the centre slot in the
 * tab bar, and putting it in both places wastes the header on a duplicate.
 * Both of the ways a customer actually gets in touch stay one tap away, in
 * two different corners.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ground/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <Link href="/" aria-label={`${site.name} — home`} className="shrink-0">
          <Wordmark />
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-ink-2 transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={telLink}
          className="hidden items-center gap-2 rounded-sm bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark lg:inline-flex"
        >
          <PhoneIcon className="h-3.5 w-3.5" />
          {site.phoneDisplay}
        </a>

        <a
          href={waLink(
            `Hello ${site.owner}, I found your website and would like a quote for `,
          )}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message us on WhatsApp"
          className="inline-flex h-10 items-center gap-2 rounded-full bg-[#1da851] pr-4 pl-3 text-sm font-semibold text-white lg:hidden"
        >
          <WhatsAppIcon className="h-[1.125rem] w-[1.125rem]" />
          WhatsApp
        </a>
      </div>
    </header>
  );
}
