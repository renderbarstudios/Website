import { NextResponse } from "next/server";
import { submitContactLead } from "@/lib/leads";
import { isEmail, requireFields, sanitize } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function verifyTurnstile(token: unknown, req: Request) {
  const secret = process.env.TURNSTILE_SECRET ?? process.env.TURNSTILE_SECRET_KEY;
  if (!secret || typeof token !== "string" || token.length === 0 || token.length > 2048) {
    return false;
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret,
          response: token,
          remoteip: clientIp(req),
        }),
        signal: AbortSignal.timeout(5000),
      },
    );
    const result = (await response.json()) as { success?: boolean };
    return response.ok && result.success === true;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  // Rate limit (per IP, in-memory token bucket).
  const { allowed } = rateLimit(`contact:${clientIp(req)}`);
  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  // Honeypot: real users never fill this hidden field.
  if (sanitize(body.website, 200)) {
    return NextResponse.json({ ok: true }); // silently accept, drop the bot
  }

  if (!(await verifyTurnstile(body["cf-turnstile-response"], req))) {
    return NextResponse.json(
      { ok: false, error: "Please complete the bot check and try again." },
      { status: 422 },
    );
  }

  // Server-side validation.
  const required = requireFields(body, ["name", "email"]);
  if (!required.ok || !isEmail(body.email)) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid name and email." },
      { status: 422 },
    );
  }

  const result = await submitContactLead({
    name: String(body.name),
    email: String(body.email),
    phone: body.phone ? String(body.phone) : undefined,
    serviceInterest: body.serviceInterest
      ? String(body.serviceInterest)
      : undefined,
    message: body.message ? String(body.message) : undefined,
  });

  if (!result.ok) {
    // Never leak Zoho detail to the client.
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't submit your message right now. Please call (904) 431-7006.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
