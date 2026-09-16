import { NextResponse } from "next/server";
import { submitLivestreamLead } from "@/lib/leads";
import { isEmail, requireFields, sanitize } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { allowed } = rateLimit(`livestream:${clientIp(req)}`);
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

  const required = requireFields(body, ["name", "email", "phone"]);
  if (!required.ok || !isEmail(body.email)) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid name, email, and phone." },
      { status: 422 },
    );
  }

  const result = await submitLivestreamLead({
    name: String(body.name),
    email: String(body.email),
    phone: String(body.phone),
    eventType: body.eventType ? String(body.eventType) : undefined,
    eventDate: body.eventDate ? String(body.eventDate) : undefined,
    venue: body.venue ? String(body.venue) : undefined,
    guestCount: body.guestCount ? String(body.guestCount) : undefined,
    notes: body.notes ? String(body.notes) : undefined,
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't submit your booking right now. Please call (904) 431-7006.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
