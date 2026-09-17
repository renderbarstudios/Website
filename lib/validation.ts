/**
 * lib/validation.ts — shared, dependency-free input validation & sanitization.
 * Used by all three API routes before anything is sent to Zoho.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length <= 254 &&
    EMAIL_RE.test(value.trim())
  );
}

/** Trim, collapse whitespace, strip control chars, and cap length. */
export function sanitize(value: unknown, maxLen = 2000): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\x00-\x1F\x7F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLen);
}

/** Multi-line sanitize that preserves newlines (for message/notes fields). */
export function sanitizeMultiline(value: unknown, maxLen = 4000): string {
  if (typeof value !== "string") return "";
  return value
    // Strip control chars except tab (\x09) and newline (\x0A).
    .replace(/[\x00-\x08\x0B-\x1F\x7F]/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .trim()
    .slice(0, maxLen);
}

/**
 * Split a single display name into Zoho's First_Name / Last_Name.
 * Last word = Last_Name; the rest = First_Name. Single word → Last_Name.
 */
export function splitName(fullName: string): {
  First_Name?: string;
  Last_Name: string;
} {
  const parts = sanitize(fullName, 150).split(" ").filter(Boolean);
  if (parts.length === 0) return { Last_Name: "Unknown" };
  if (parts.length === 1) return { Last_Name: parts[0] };
  const last = parts.pop() as string;
  return { First_Name: parts.join(" "), Last_Name: last };
}

export interface ValidationResult {
  ok: boolean;
  errors: string[];
}

/** Validate required string fields are present and non-empty after trim. */
export function requireFields(
  data: Record<string, unknown>,
  fields: string[],
): ValidationResult {
  const errors: string[] = [];
  for (const f of fields) {
    if (!sanitize(data[f], 4000)) errors.push(f);
  }
  return { ok: errors.length === 0, errors };
}
