import { NextResponse } from "next/server";
import { submitDubaiLead } from "@/lib/leads";
import { isEmail, requireFields, sanitize } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { allowed } = rateLimit(`dubai:${clientIp(req)}`);
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

  if (sanitize(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  if (!(await verifyTurnstile(body["cf-turnstile-response"], req, "dubai"))) {
    return NextResponse.json(
      { ok: false, error: "Please complete the bot check and try again." },
      { status: 422 },
    );
  }

  const required = requireFields(body, ["name", "email"]);
  if (!required.ok || !isEmail(body.email)) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid name and email." },
      { status: 422 },
    );
  }

  const result = await submitDubaiLead({
    name: String(body.name),
    email: String(body.email),
    phone: body.phone ? String(body.phone) : undefined,
    serviceInterest: body.serviceInterest
      ? String(body.serviceInterest)
      : undefined,
    message: body.message ? String(body.message) : undefined,
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't submit your enquiry right now. Please email info@renderbar.net.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
