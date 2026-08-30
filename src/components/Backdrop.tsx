/**
 * Decorative backdrops.
 *
 * There is no photography on this site yet, and full-bleed background images
 * are the one thing that genuinely has to wait for it. These fill the gap
 * without a single file: line drawings in the same technical hand as the
 * scroll-section scenes, sized large and set very faint behind a band.
 *
 * All of it is `aria-hidden`, absolutely positioned and `pointer-events-none`,
 * and every one of them inherits its tint from `currentColor` — so the parent
 * decides how loud it is, and nothing here can affect layout or contrast on
 * its own.
 */

/**
 * A partition elevation — frame, mullions, transom and a door leaf, with the
 * dimension lines a set-out drawing would carry. This is the shape the
 * business actually makes, which is why it works as a watermark where a stock
 * pattern would not.
 */
export function ElevationBackdrop({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 460"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`pointer-events-none absolute select-none ${className}`}
    >
      {/* outer frame */}
      <rect x="40" y="40" width="440" height="360" />
      {/* transom */}
      <path d="M40 120h440" />
      {/* mullions */}
      <path d="M186 120v280M334 120v280" />
      {/* transom lights */}
      <path d="M113 40v80M260 40v80M407 40v80" />
      {/* door leaf in the centre bay, with its handle and swing */}
      <rect x="200" y="136" width="120" height="248" strokeWidth="2.5" />
      <path d="M292 250v40" strokeWidth="4" strokeLinecap="round" />
      <path d="M200 384a248 248 0 0 0 120-248" strokeDasharray="5 9" />
      {/* glazing bars in the outer bays */}
      <path d="M40 260h146M334 260h146" strokeWidth="1.5" />
      {/* dimension line beneath */}
      <path d="M40 428v-16M480 428v-16M40 420h440" strokeWidth="1.5" />
      <path d="M52 414l-12 6 12 6M468 414l12 6-12 6" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * A kitchen run in elevation — wall units, worktop, base run and a tall
 * housing. The counterpart to the partition, for pages where the furniture
 * division leads.
 */
export function KitchenBackdrop({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 400"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`pointer-events-none absolute select-none ${className}`}
    >
      {/* wall units */}
      <rect x="40" y="40" width="300" height="96" />
      <path d="M190 40v96" />
      {/* tall housing */}
      <rect x="368" y="40" width="152" height="264" />
      <path d="M368 176h152" />
      {/* worktop */}
      <path d="M28 214h324" strokeWidth="5" />
      {/* base run */}
      <rect x="40" y="214" width="300" height="90" />
      <path d="M140 214v90M240 214v90" />
      {/* plinth and floor */}
      <path d="M56 304v22h268v-22M12 326h536" strokeWidth="1.5" />
      {/* handles */}
      <g strokeWidth="4" strokeLinecap="round">
        <path d="M182 92v28M198 92v28M132 240v26M148 240v26M376 130v26" />
      </g>
    </svg>
  );
}

/**
 * The partition mark at watermark scale, bleeding off whichever edge it is
 * positioned against.
 *
 * Redrawn rather than reusing `Mark`: stroke width scales with the viewBox,
 * so `Mark`'s 2 units on a 24-unit box would come out around 50px thick at
 * this size. A hairline is the whole point of a watermark.
 */
export function MarkWatermark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.35"
      strokeLinecap="square"
      className={`pointer-events-none absolute select-none ${className}`}
    >
      <rect x="2.5" y="2.5" width="19" height="19" />
      <path d="M12 2.5V21.5" />
      <path d="M2.5 10H12" />
    </svg>
  );
}
