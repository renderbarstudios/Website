import "server-only";

/**
 * lib/zoho.ts — Server-only Zoho CRM integration layer.
 *
 * This module is the SINGLE place that holds Zoho auth + token-cache logic.
 * It is imported only by API routes (server-side). Credentials are read from
 * environment variables and never reach the browser.
 *
 * The data-center is driven entirely by ZOHO_ACCOUNTS_DOMAIN / ZOHO_API_DOMAIN:
 *   US:        accounts.zoho.com        / www.zohoapis.com
 *   EU:        accounts.zoho.eu         / www.zohoapis.eu
 *   India:     accounts.zoho.in         / www.zohoapis.in
 *   Australia: accounts.zoho.com.au     / www.zohoapis.com.au
 *
 * FUTURE: a client portal, booking calendar, or invoice tracker can reuse the
 * same `getAccessToken()` token cache below to call other Zoho modules
 * (Deals, Contacts, Invoices) without touching the lead forms.
 */

const ACCOUNTS_DOMAIN =
  process.env.ZOHO_ACCOUNTS_DOMAIN?.replace(/\/$/, "") ||
  "https://accounts.zoho.com";
const API_DOMAIN =
  process.env.ZOHO_API_DOMAIN?.replace(/\/$/, "") || "https://www.zohoapis.com";

// ---------------------------------------------------------------------------
// In-memory access-token cache. Persists for the lifetime of the serverless
// instance, so we do NOT request a fresh token on every form submit.
// ---------------------------------------------------------------------------
interface TokenCache {
  token: string;
  expiresAt: number; // epoch ms
}
let tokenCache: TokenCache | null = null;

// Refresh ~5 minutes before the real expiry to avoid edge-of-expiry failures.
const EXPIRY_SKEW_MS = 5 * 60 * 1000;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/**
 * Returns a valid Zoho access token, refreshing via the refresh_token grant
 * only when the cached token is missing or near expiry.
 */
export async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (tokenCache && tokenCache.expiresAt - EXPIRY_SKEW_MS > now) {
    return tokenCache.token;
  }

  const clientId = requireEnv("ZOHO_CLIENT_ID");
  const clientSecret = requireEnv("ZOHO_CLIENT_SECRET");
  const refreshToken = requireEnv("ZOHO_REFRESH_TOKEN");

  const params = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
  });

  const res = await fetch(`${ACCOUNTS_DOMAIN}/oauth/v2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
    cache: "no-store",
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    // Logged server-side only.
    console.error("[zoho] token refresh failed", res.status, detail);
    throw new Error("Zoho token refresh failed");
  }

  const data = (await res.json()) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
  };

  if (data.error || !data.access_token) {
    console.error("[zoho] token refresh error payload", data.error);
    throw new Error("Zoho token refresh returned no access_token");
  }

  const expiresInMs = (data.expires_in ?? 3600) * 1000;
  tokenCache = {
    token: data.access_token,
    expiresAt: now + expiresInMs,
  };

  return tokenCache.token;
}

// ---------------------------------------------------------------------------
// Lead creation
// ---------------------------------------------------------------------------
export interface ZohoLeadFields {
  Last_Name: string;
  First_Name?: string;
  Email?: string;
  Phone?: string;
  Company?: string;
  Lead_Source: string;
  Description?: string;
  [key: string]: string | undefined;
}

export type ZohoResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

/**
 * Create a Lead in Zoho CRM. Retries once with a forced token refresh if the
 * first attempt returns 401 (token invalidated server-side).
 */
export async function createLead(fields: ZohoLeadFields): Promise<ZohoResult> {
  try {
    const result = await postLead(fields);
    return result;
  } catch (err) {
    console.error("[zoho] createLead failed", err);
    return { ok: false, error: "crm_unavailable" };
  }
}

async function postLead(
  fields: ZohoLeadFields,
  isRetry = false,
): Promise<ZohoResult> {
  const token = await getAccessToken();

  const res = await fetch(`${API_DOMAIN}/crm/v2/Leads`, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: [fields] }),
    cache: "no-store",
  });

  // Token expired / invalidated — force-refresh once and retry.
  if (res.status === 401 && !isRetry) {
    tokenCache = null;
    return postLead(fields, true);
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[zoho] create lead HTTP error", res.status, detail);
    return { ok: false, error: "crm_error" };
  }

  const json = (await res.json()) as {
    data?: Array<{ code?: string; details?: { id?: string }; message?: string }>;
  };

  const record = json.data?.[0];
  if (record?.code === "SUCCESS" && record.details?.id) {
    return { ok: true, id: record.details.id };
  }

  console.error("[zoho] create lead non-success payload", record?.code, record?.message);
  return { ok: false, error: "crm_rejected" };
}

// FUTURE: booking flow creates a Zoho CRM Deal here.
// export async function createDeal(fields: ZohoDealFields): Promise<ZohoResult> { ... }
// FUTURE: invoice tracker reads/writes the Invoices module using getAccessToken().
