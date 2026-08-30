"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/data/nav";
import { site, telLink } from "@/data/site";
import { ChatIcon, HomeIcon, InfoIcon, PhoneIcon, WorkIcon } from "./icons";

/**
 * App-style bottom navigation for phones and tablets.
 *
 * This replaces two things that used to be separate: a hamburger in the
 * header that opened a dropdown, and a sticky Call/WhatsApp bar down here.
 * Two navigation mechanisms on one screen is one too many, and the header
 * sheet was the only part of the site that rendered content only after a tap.
 *
 * Every destination is now a permanent tab, which is both what a phone user
 * expects and better for us: the links are in the served HTML on every page
 * rather than behind a button.
 *
 * Call keeps the centre slot in brand red. For a trade business it is the
 * highest-converting element on the site and it must not lose its position to
 * navigation — most visitors arrive on a phone and want to talk to someone.
 * WhatsApp moved up to the header, where it sits within the same thumb arc
 * and no longer competes with the gallery's filter rail for the bottom edge.
 *
 * The bar is deliberately flat rather than carrying a raised centre button:
 * a floating action button pokes ~14px above the bar, and on /gallery the
 * division rail docks directly on top of this and would collide with it.
 */
const icons = {
  home: HomeIcon,
  work: WorkIcon,
  about: InfoIcon,
  contact: ChatIcon,
} as const;

/** "/" only matches itself; every other tab also owns its child routes, so
 *  /gallery/modular-kitchen-motipura still lights up Work. */
function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileTabBar() {
  const pathname = usePathname();

  const tabs = nav.map((item) => {
    const Icon = icons[item.icon];
    const on = isActive(pathname, item.href);

    return (
      <li key={item.href}>
        <Link
          href={item.href}
          aria-current={on ? "page" : undefined}
          className="flex flex-col items-center gap-1 py-0.5"
        >
          <span
            className={`tab-pill flex h-8 w-full max-w-[3.5rem] items-center justify-center rounded-full ${
              on ? "bg-brand-tint text-brand" : "text-ink-3"
            }`}
          >
            <Icon className="h-[1.375rem] w-[1.375rem]" />
          </span>
          <span
            className={`text-[0.625rem] leading-none font-semibold tracking-[0.01em] ${
              on ? "text-ink" : "text-ink-3"
            }`}
          >
            {item.short}
          </span>
        </Link>
      </li>
    );
  });

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-surface lg:hidden"
    >
      <ul className="grid grid-cols-5 items-center gap-1 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {tabs.slice(0, 2)}

        <li>
          <a
            href={telLink}
            aria-label={`Call ${site.phoneDisplay}`}
            className="flex h-[3.25rem] flex-col items-center justify-center gap-1 rounded-2xl bg-brand text-white shadow-[0_6px_16px_-8px_rgba(217,58,40,0.9)]"
          >
            <PhoneIcon className="h-[1.125rem] w-[1.125rem]" />
            <span className="text-[0.625rem] leading-none font-semibold tracking-[0.01em]">
              Call
            </span>
          </a>
        </li>

        {tabs.slice(2)}
      </ul>
    </nav>
  );
}
