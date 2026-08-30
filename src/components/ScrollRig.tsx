"use client";

import { useEffect } from "react";

/** Fraction of the viewport height used as the activation line. */
const LINE = 0.72;

/** Portion of a step spent resting on its scene before the camera pans on. */
const HOLD = 0.68;

/** Per-frame easing toward the target. Lower is heavier. */
const DAMP = 0.09;

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const smoothstep = (t: number) => t * t * (3 - 2 * t);

/**
 * Scroll rig for the "How it works" sequence. Renders nothing.
 *
 * Publishes onto the section:
 *   --pan  camera position across the panel strip, 0 → n-1
 *   --gp   overall progress, 0 → 1 (drives the progress rail)
 * and onto each panel:
 *   --sp   that panel's own progress, 0 → 1
 *
 * The per-panel `--sp` matters. A single shared value has to reset from 1 to 0
 * every time the active step changes, and easing across that discontinuity
 * plays the incoming scene backwards before it plays forwards — which is
 * exactly the reverse-then-forward flicker this replaced. Each panel now gets
 * a progress derived from its own spacer: zero before it is reached, rising
 * through it, and pinned at one afterwards. Monotonic, so damping it can never
 * run a scene in reverse.
 *
 * Other constraints:
 *  - Bails out entirely under prefers-reduced-motion.
 *  - The rAF loop only runs while the section is near the viewport.
 *  - Reads all layout first, writes only custom properties after.
 *  - Adds no element and changes no box size, so it cannot shift layout.
 */
export function ScrollRig({ targetId }: { targetId: string }) {
  useEffect(() => {
    const root = document.getElementById(targetId);
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const track = root.querySelector<HTMLElement>("[data-hiw-track]");
    const stepEls = [...root.querySelectorAll<HTMLElement>("[data-hiw-step]")];
    const panelEls = [...root.querySelectorAll<HTMLElement>("[data-hiw-panel]")];
    if (!track || stepEls.length === 0 || panelEls.length !== stepEls.length) {
      return;
    }

    const last = stepEls.length - 1;
    root.dataset.enhanced = "true";

    let raf = 0;
    let active = -1;
    let primed = false;
    const curSp = new Array(stepEls.length).fill(0);
    let curPan = 0;
    let curGp = 0;

    const targetSp = new Array(stepEls.length).fill(0);

    const frame = () => {
      // ---- read ----
      const line = window.innerHeight * LINE;
      let index = 0;

      for (let i = 0; i < stepEls.length; i++) {
        const rect = stepEls[i].getBoundingClientRect();
        targetSp[i] =
          rect.height > 0 ? clamp01((line - rect.top) / rect.height) : 0;
        if (rect.top <= line) index = i;
      }

      const within = targetSp[index];
      const panWithin =
        within <= HOLD ? 0 : smoothstep((within - HOLD) / (1 - HOLD));
      const targetPan = Math.min(last, index + panWithin);
      const targetGp = clamp01((index + within) / stepEls.length);

      // ---- write ----
      if (!primed) {
        for (let i = 0; i < curSp.length; i++) curSp[i] = targetSp[i];
        curPan = targetPan;
        curGp = targetGp;
        primed = true;
      } else {
        for (let i = 0; i < curSp.length; i++) {
          curSp[i] += (targetSp[i] - curSp[i]) * DAMP;
        }
        curPan += (targetPan - curPan) * DAMP;
        curGp += (targetGp - curGp) * DAMP;
      }

      for (let i = 0; i < panelEls.length; i++) {
        panelEls[i].style.setProperty("--sp", curSp[i].toFixed(4));
      }
      root.style.setProperty("--pan", curPan.toFixed(4));
      root.style.setProperty("--gp", curGp.toFixed(4));

      if (index !== active) {
        active = index;
        root.dataset.active = String(index);
      }

      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!raf) raf = requestAnimationFrame(frame);
        } else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { rootMargin: "300px 0px" },
    );

    io.observe(track);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      delete root.dataset.enhanced;
      delete root.dataset.active;
      root.style.removeProperty("--pan");
      root.style.removeProperty("--gp");
      panelEls.forEach((el) => el.style.removeProperty("--sp"));
    };
  }, [targetId]);

  return null;
}
