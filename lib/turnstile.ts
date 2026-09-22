import { clientIp } from "@/lib/rate-limit";

type SiteverifyResult = {
  success?: boolean;
  action?: string;
  hostname?: string;
};

function expectedHostnames() {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  let productionHostname: string;

  try {
    productionHostname = new URL(
      configuredSiteUrl || "https://renderbar.net",
    ).hostname.toLowerCase();
  } catch {
    return new Set<string>();
  }

  const localHostnames = new Set(["localhost", "127.0.0.1", "::1"]);
  if (process.env.NODE_ENV === "production" && localHostnames.has(productionHostname)) {
    return new Set<string>();
  }

  const hostnames = new Set([productionHostname]);
  // The site is reachable at both the apex and www hostnames.
  if (!productionHostname.startsWith("www.")) {
    hostnames.add(`www.${productionHostname}`);
  }
  if (process.env.NODE_ENV !== "production") {
    hostnames.add("localhost");
    hostnames.add("127.0.0.1");
    hostnames.add("::1");
  }
  return hostnames;
}

export async function verifyTurnstile(
  token: unknown,
  req: Request,
  expectedAction: string,
) {
  const secret = process.env.TURNSTILE_SECRET ?? process.env.TURNSTILE_SECRET_KEY;
  const hostnames = expectedHostnames();
  if (
    !secret ||
    typeof token !== "string" ||
    token.length === 0 ||
    token.length > 2048 ||
    hostnames.size === 0
  ) {
    return false;
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret,
          response: token,
          remoteip: clientIp(req),
        }),
        signal: AbortSignal.timeout(5000),
      },
    );
    const result = (await response.json()) as SiteverifyResult;
    return (
      response.ok &&
      result.success === true &&
      result.action === expectedAction &&
      typeof result.hostname === "string" &&
      hostnames.has(result.hostname.toLowerCase())
    );
  } catch {
    return false;
  }
}
