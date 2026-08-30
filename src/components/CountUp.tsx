"use client";

import { useEffect, useRef } from "react";

/**
 * Number that counts up when it first scrolls into view.
 *
 * The finished value is what renders on the server and what sits in the HTML.
 * The animation only ever writes to the DOM node afterwards, so a crawler, a
 * failed hydration or a reduced-motion preference all get the correct number
 * immediately — the count is decoration on top of a value that is already
 * right, never a prerequisite for seeing it.
 */
export function CountUp({
  value,
  suffix = "",
  duration = 1100,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let start = 0;

    const step = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      // ease-out cubic: fast off the mark, settles onto the real number
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = `${Math.round(value * eased)}${suffix}`;
      if (t < 1) raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );

    io.observe(el);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      el.textContent = `${value}${suffix}`;
    };
  }, [value, suffix, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
