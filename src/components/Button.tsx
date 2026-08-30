import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm text-sm font-semibold tracking-tight transition-colors duration-150 whitespace-nowrap";

const sizes = {
  md: "h-11 px-5",
  lg: "h-12 px-6 text-[0.9375rem]",
  sm: "h-9 px-4 text-[0.8125rem]",
} as const;

const variants = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  dark: "bg-ink text-white hover:bg-slate-2",
  outline:
    "border border-line-strong bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-white",
  ghostLight:
    "border border-white/25 bg-transparent text-white hover:border-white hover:bg-white hover:text-ink",
  solidLight: "bg-white text-ink hover:bg-white/90",
} as const;

type Props = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: Props) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const isExternal = /^(https?:|tel:|mailto:)/.test(href);

  if (isExternal) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
