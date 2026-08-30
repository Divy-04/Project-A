"use client";

import { useState } from "react";
import { ArrowIcon, WhatsAppIcon } from "@/components/icons";
import { services } from "@/data/services";
import { site, telLink, waLink } from "@/data/site";

type State = "idle" | "sending" | "sent" | "error" | "unavailable";

const field =
  "w-full rounded-sm border border-line-strong bg-surface px-4 py-3 text-[0.9375rem] text-ink placeholder:text-ink-3 transition-colors focus:border-ink focus:outline-none";

/**
 * Enquiry form.
 *
 * Posts to /api/enquiry, which relays to Telegram. The form deliberately
 * distinguishes "we could not deliver this" from "sent": if the endpoint is
 * unconfigured or Telegram is unreachable, the visitor is told plainly and
 * pointed at the phone, rather than being shown a thank-you for a message
 * that went nowhere.
 *
 * Call and WhatsApp remain the primary route and work with no JavaScript at
 * all; this is the third option, for the people who will not ring.
 */
export function EnquiryForm() {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState("sending");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        form.reset();
        setState("sent");
        return;
      }

      setState(res.status === 503 ? "unavailable" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-sm border border-line bg-surface p-8">
        <p className="eyebrow text-brand-ink">Message sent</p>
        <h3 className="mt-4 text-xl font-bold tracking-[-0.02em]">
          Thanks — we have it.
        </h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
          {site.owner} will come back to you, usually the same day. If it is
          urgent, calling is faster than waiting for a reply.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="link-wipe mt-6 text-sm font-semibold text-ink"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow text-ink-3">Your name</span>
          <input
            name="name"
            required
            maxLength={80}
            autoComplete="name"
            placeholder="Name"
            className={`mt-2.5 ${field}`}
          />
        </label>

        <label className="block">
          <span className="eyebrow text-ink-3">Phone</span>
          <input
            name="phone"
            required
            type="tel"
            maxLength={24}
            autoComplete="tel"
            placeholder="Mobile number"
            className={`mt-2.5 ${field}`}
          />
        </label>
      </div>

      <label className="block">
        <span className="eyebrow text-ink-3">What is it for</span>
        <select name="division" defaultValue="" className={`mt-2.5 ${field}`}>
          <option value="">Not sure yet</option>
          {services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="eyebrow text-ink-3">What do you need</span>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={1500}
          placeholder="Rough sizes, the room, and the town you are in — enough for us to come back with something useful."
          className={`mt-2.5 resize-y ${field}`}
        />
      </label>

      {/* Honeypot — hidden from people, tempting to bots. Not display:none,
          which some bots skip; off-screen and out of the tab order instead. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-brand px-6 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-70"
        >
          {state === "sending" ? "Sending…" : "Send enquiry"}
          {state !== "sending" && <ArrowIcon className="h-4 w-4" />}
        </button>

        <p className="text-[0.8125rem] text-ink-3">
          Or{" "}
          <a href={telLink} className="link-wipe font-semibold text-ink">
            call {site.phoneDisplay}
          </a>
        </p>
      </div>

      {(state === "error" || state === "unavailable") && (
        <p
          role="alert"
          className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-sm border border-brand/30 bg-brand-tint px-4 py-3 text-[0.875rem] text-ink"
        >
          {state === "unavailable"
            ? "The form is not connected yet."
            : "That did not send."}
          <a href={telLink} className="font-semibold text-brand-dark">
            Call {site.phoneDisplay}
          </a>
          <span className="text-ink-3">or</span>
          <a
            href={waLink(`Hello ${site.owner}, I found your website. `)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-brand-dark"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            message on WhatsApp
          </a>
        </p>
      )}
    </form>
  );
}
