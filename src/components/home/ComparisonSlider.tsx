"use client";
import { useState } from "react";
import Image from "next/image";

export function ComparisonSlider({
  beforeSrc,
  afterSrc,
  alt = "Comparison",
}: {
  beforeSrc: string;
  afterSrc: string;
  alt?: string;
}) {
  const [position, setPosition] = useState(50);
  // Nothing here is optimised by Next (images.unoptimized): Sanity URLs arrive
  // resized and encoded by the CDN, and the local fallbacks are pre-compressed
  // WebP. Below the fold, so neither image is preloaded.

  return (
    <section className="shell my-20">
      <div
        className="relative mx-auto aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-xl border border-line bg-ink shadow-[0_18px_45px_rgba(20,20,20,0.12)]"
      >
        <Image
          src={afterSrc}
          alt={`${alt}, after`}
          fill
          className="object-cover"
        />
        <Image
          src={beforeSrc}
          alt={`${alt}, before`}
          fill
          className="object-cover"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(20,20,20,0.15)]"
          style={{ left: `${position}%` }}
        >
          <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-brand text-white shadow-lg">
            <span aria-hidden="true" className="text-lg leading-none">&#8596;</span>
          </span>
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 top-4 flex justify-between px-4 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white drop-shadow-md"
          aria-hidden="true"
        >
          <span>Before</span>
          <span>After</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label="Compare before and after images"
          aria-valuetext={`${position}% before, ${100 - position}% after`}
          className="absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </section>
  );
}

