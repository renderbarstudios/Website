import "server-only";

/**
 * lib/rate-limit.ts — in-memory token-bucket rate limiter (per key, usually IP).
 * Sufficient for v1 on a single serverless instance. For multi-region scale,
 * swap this for a shared store (e.g. Upstash Redis) without changing callers.
 */

interface Bucket {
  tokens: number;
  updatedAt: number;
}

const buckets = new Map<string, Bucket>();

interface RateLimitOptions {
  /** Max requests allowed in the window. */
  capacity?: number;
  /** Window length in milliseconds the capacity refills over. */
  windowMs?: number;
}

/**
 * Returns { allowed, remaining }. Refills continuously (token bucket) so a
 * client that backs off recovers capacity smoothly.
 */
export function rateLimit(
  key: string,
  { capacity = 5, windowMs = 60_000 }: RateLimitOptions = {},
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const refillRate = capacity / windowMs; // tokens per ms
  const existing = buckets.get(key);

  let tokens: number;
  if (!existing) {
    tokens = capacity;
  } else {
    const elapsed = now - existing.updatedAt;
    tokens = Math.min(capacity, existing.tokens + elapsed * refillRate);
  }

  if (tokens < 1) {
    buckets.set(key, { tokens, updatedAt: now });
    return { allowed: false, remaining: 0 };
  }

  tokens -= 1;
  buckets.set(key, { tokens, updatedAt: now });

  // Opportunistic cleanup to bound memory growth.
  if (buckets.size > 5000) {
    buckets.forEach((b, k) => {
      if (now - b.updatedAt > windowMs * 4) buckets.delete(k);
    });
  }

  return { allowed: true, remaining: Math.floor(tokens) };
}

/** Best-effort client IP extraction from a Next.js Request. */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return (
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}
