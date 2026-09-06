import { NextResponse } from "next/server";

/**
 * Enquiry relay → email, via Brevo.
 *
 * This exists for one reason: the API key must never reach the browser.
 * Calling Brevo straight from the form would put the key in the page source,
 * and anyone reading it could send 300 emails a day as us. So the browser
 * posts here, and only this function, running on the server, knows the key.
 *
 * Configure with three environment variables (never committed — .env* is
 * gitignored; the same three go onto the host at deployment):
 *   BREVO_API_KEY   from brevo.com → SMTP & API → API Keys
 *   ENQUIRY_FROM    a sender address verified in Brevo (Senders)
 *   ENQUIRY_TO      where enquiries land — the business Gmail
 *
 * With any of them missing the endpoint returns 503 and the form tells the
 * visitor to call or WhatsApp instead — it never fails silently and never
 * pretends a message was sent.
 *
 * Brevo is only the postman. The form collects no customer email, so there is
 * nothing to reply to; the owner rings the number in the message. Swapping
 * providers later means changing this file and nothing else.
 *
 * This is the only non-static route on the site. Every page is still
 * prerendered; this is a function the host runs on demand, which Cloudflare
 * Pages, Netlify and Vercel all support on their free tiers.
 */

export const dynamic = "force-dynamic";

const MAX = { name: 80, phone: 24, message: 1500, division: 60 } as const;

const SENDER_NAME = "AADI Enterprise website";

const clean = (value: unknown, limit: number) =>
  typeof value === "string" ? value.trim().slice(0, limit) : "";

const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(request: Request) {
  const apiKey = process.env.BREVO_API_KEY;
  const from = process.env.ENQUIRY_FROM;
  const to = process.env.ENQUIRY_TO;

  if (!apiKey || !from || !to) {
    return NextResponse.json(
      { ok: false, error: "not-configured" },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad-request" }, { status: 400 });
  }

  // Honeypot: a field hidden from people but not from most bots. Anything
  // that fills it gets a 200 so the bot believes it succeeded and moves on.
  if (clean(body.website, 100)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, MAX.name);
  const phone = clean(body.phone, MAX.phone);
  const division = clean(body.division, MAX.division);
  const message = clean(body.message, MAX.message);

  if (!name || !phone || !message) {
    return NextResponse.json({ ok: false, error: "missing" }, { status: 400 });
  }

  const subject = `New enquiry — ${name}${division ? ` · ${division}` : ""}`;

  const textContent = [
    "New enquiry from the website",
    "",
    `Name:     ${name}`,
    `Phone:    ${phone}`,
    division ? `Division: ${division}` : "",
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  /* Plain and short on purpose: this is read on a phone, and the phone
     number is the one thing that has to be tappable. */
  const htmlContent = `<!doctype html><html><body style="margin:0;padding:24px;background:#faf9f7;font-family:Arial,Helvetica,sans-serif;color:#141414">
<div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e8e4df;border-radius:6px;padding:24px">
  <p style="margin:0 0 16px;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#cf3624">New enquiry — website</p>
  <table cellpadding="0" cellspacing="0" style="font-size:15px;line-height:1.5">
    <tr><td style="padding:4px 16px 4px 0;color:#6b665f">Name</td><td style="padding:4px 0"><strong>${esc(name)}</strong></td></tr>
    <tr><td style="padding:4px 16px 4px 0;color:#6b665f">Phone</td><td style="padding:4px 0"><a href="tel:${esc(phone.replace(/[^\d+]/g, ""))}" style="color:#141414;font-weight:700;text-decoration:none">${esc(phone)}</a></td></tr>
    ${division ? `<tr><td style="padding:4px 16px 4px 0;color:#6b665f">Division</td><td style="padding:4px 0">${esc(division)}</td></tr>` : ""}
  </table>
  <p style="margin:20px 0 0;padding-top:16px;border-top:1px solid #e8e4df;font-size:15px;line-height:1.6;white-space:pre-wrap">${esc(message)}</p>
</div>
</body></html>`;

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: SENDER_NAME, email: from },
        to: [{ email: to }],
        subject,
        textContent,
        htmlContent,
        tags: ["website-enquiry"],
      }),
    });

    if (!res.ok) {
      // Brevo's own error text is useful in logs but must not reach the
      // browser — it can echo back part of the request.
      console.error("Brevo sendEmail failed", res.status, await res.text());
      return NextResponse.json(
        { ok: false, error: "delivery" },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Brevo sendEmail threw", error);
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
