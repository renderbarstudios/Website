import { NextResponse } from "next/server";
import { submitDroneLead } from "@/lib/leads";
import { isEmail, requireFields, sanitize } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { allowed } = rateLimit(`drone:${clientIp(req)}`);
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

  // Job site address is required for the airspace pre-check.
  const required = requireFields(body, [
    "name",
    "email",
    "phone",
    "jobSiteAddress",
  ]);
  if (!required.ok || !isEmail(body.email)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Please provide your name, email, phone, and job site address.",
      },
      { status: 422 },
    );
  }

  const result = await submitDroneLead({
    name: String(body.name),
    email: String(body.email),
    phone: String(body.phone),
    company: body.company ? String(body.company) : undefined,
    jobSiteAddress: String(body.jobSiteAddress),
    packageInterest: body.packageInterest
      ? String(body.packageInterest)
      : undefined,
    notes: body.notes ? String(body.notes) : undefined,
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't submit your request right now. Please call (904) 431-7006.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
