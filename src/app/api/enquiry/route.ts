import { NextResponse } from "next/server";

/**
 * Enquiry relay → Telegram.
 *
 * This exists for one reason: the bot token must never reach the browser.
 * Calling api.telegram.org straight from the form would put the token in the
 * page source, and anyone reading it could take the bot over — send messages
 * as it, read its history, spam it. So the browser posts here, and only this
 * function, running on the server, knows the token.
 *
 * Configure with two environment variables (never committed — .env* is
 * gitignored):
 *   TELEGRAM_BOT_TOKEN   from @BotFather
 *   TELEGRAM_CHAT_ID     the chat to deliver into
 *
 * With either missing the endpoint returns 503 and the form tells the visitor
 * to call or WhatsApp instead — it never fails silently and never pretends a
 * message was sent.
 *
 * This is the only non-static route on the site. Every page is still
 * prerendered; this is a function the host runs on demand, which Cloudflare
 * Pages, Netlify and Vercel all support on their free tiers.
 */

export const dynamic = "force-dynamic";

const MAX = { name: 80, phone: 24, message: 1500, division: 60 } as const;

const clean = (value: unknown, limit: number) =>
  typeof value === "string" ? value.trim().slice(0, limit) : "";

/** Telegram's HTML parse mode only needs these three escaped. */
const esc = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
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

  const text = [
    "<b>New enquiry — website</b>",
    "",
    `<b>Name:</b> ${esc(name)}`,
    `<b>Phone:</b> ${esc(phone)}`,
    division ? `<b>Division:</b> ${esc(division)}` : "",
    "",
    esc(message),
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      },
    );

    if (!res.ok) {
      // Telegram's own error text is useful in logs but must not reach the
      // browser — it echoes back part of the request.
      console.error("Telegram sendMessage failed", res.status, await res.text());
      return NextResponse.json(
        { ok: false, error: "delivery" },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Telegram sendMessage threw", error);
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
