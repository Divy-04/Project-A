"use client";
import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { PhoneIcon } from "./icons";
import { nav } from "@/data/nav";
import { telLink } from "@/lib/links";
import type { SiteSettings } from "@/sanity/types";
import { usePathname } from "next/navigation";
/**
 * On large screens this is the whole navigation. Below `lg` the destinations
 * live in `MobileTabBar` at the bottom of the screen, so the header keeps
 * only the wordmark and one action.
 *
 * That action is WhatsApp rather than Call: Call has the centre slot in the
 * tab bar, and putting it in both places wastes the header on a duplicate.
 * Both of the ways a customer actually gets in touch stay one tap away, in
 * two different corners.
 *
 * A client component (for the active-route highlight), so the settings it
 * needs arrive as props from the layout rather than being fetched here.
 */
export function Header({
  settings,
}: {
  settings: Pick<SiteSettings, "name" | "phone" | "phoneDisplay">;
}) {
  const pathname = usePathname();
  const tel = telLink(settings);
  return (

    <header className="sticky top-0 z-40 border-b border-line bg-ground/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-2 md:h-[4.5rem] md:gap-6">
        <Link href="/" aria-label={`${settings.name} Aluminium · Glass · PVC · Furniture — home`} className="shrink-0">
          <Wordmark />
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${pathname === item.href ? 'text-red-600 hover:text-red-600' : 'text-ink-2 hover:text-ink'}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={tel}
          className="hidden min-w-28 items-center justify-center gap-2 rounded-sm bg-brand px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-dark lg:inline-flex"
        >
          <PhoneIcon className="h-3.5 w-3.5" />
          Get a quote
        </a>

        <a
          href={tel}
          aria-label={`Get a quote — call ${settings.phoneDisplay}`}
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-brand px-2.5 text-xs font-semibold text-white lg:hidden"
        >
          <PhoneIcon className="h-4 w-4" />
          Get a quote
        </a>
      </div>
    </header>
  );
}
