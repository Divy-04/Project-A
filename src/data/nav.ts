/**
 * The site's primary navigation, in one place.
 *
 * It used to live in `Header.tsx`, which was fine while the header was the
 * only thing that rendered it. Three components consume it now — the desktop
 * header, the footer's Pages column and the mobile tab bar — and the tab bar
 * is a client component, so importing it from `Header.tsx` would have pulled
 * the whole header (and everything it imports) into the client bundle.
 *
 * `label` is the full name used where there is room; `short` is the tab-bar
 * caption, which has a fifth of the screen to fit in. `icon` is a key rather
 * than a component so this file stays plain data and never imports JSX.
 */
export type NavItem = {
  href: string;
  label: string;
  short: string;
  icon: "home" | "work" | "about" | "contact";
};

/** Home leads, then the work. Order is deliberate — see CLAUDE.md. */
export const nav: NavItem[] = [
  { href: "/", label: "Home", short: "Home", icon: "home" },
  { href: "/gallery", label: "Our Work", short: "Work", icon: "work" },
  { href: "/about", label: "About", short: "About", icon: "about" },
  { href: "/contact", label: "Contact", short: "Contact", icon: "contact" },
];
