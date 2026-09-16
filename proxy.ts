import { NextResponse, type NextRequest } from "next/server";

const BLOCKED_COUNTRIES = new Set(["CN", "RU"]);

export function proxy(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country");

  if (country && BLOCKED_COUNTRIES.has(country)) {
    return new NextResponse("Not available in your region.", { status: 451 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
