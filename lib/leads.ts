import "server-only";
import { createLead, type ZohoResult } from "./zoho";
import { splitName, sanitize, sanitizeMultiline } from "./validation";

/**
 * lib/leads.ts — thin, form-shaped wrapper over lib/zoho.ts.
 *
 * The API routes call THIS module, not zoho.ts directly, so that all CRM auth
 * and the token cache stay isolated in one place. A future client portal,
 * booking calendar, or invoice tracker can reuse lib/zoho.ts the same way.
 */

/** Build the Zoho Description from labeled key/value extras (drops empties). */
function buildDescription(
  extras: Array<[string, string | undefined]>,
): string {
  const lines = extras
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}: ${v!.trim()}`);
  lines.push(`Submitted: ${new Date().toISOString()}`);
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Contact form
// ---------------------------------------------------------------------------
export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  serviceInterest?: string;
  message?: string;
}

export function submitContactLead(p: ContactPayload): Promise<ZohoResult> {
  const { First_Name, Last_Name } = splitName(p.name);
  return createLead({
    First_Name,
    Last_Name,
    Email: sanitize(p.email, 254),
    Phone: sanitize(p.phone, 40),
    Lead_Source: "Website Contact Form",
    Description: buildDescription([
      ["Service Interest", sanitize(p.serviceInterest, 120)],
      ["Message", sanitizeMultiline(p.message)],
    ]),
  });
}

// ---------------------------------------------------------------------------
// Drone lead form
// ---------------------------------------------------------------------------
export interface DronePayload {
  name: string;
  company?: string;
  phone: string;
  email: string;
  jobSiteAddress: string;
  packageInterest?: string;
  notes?: string;
}

export function submitDroneLead(p: DronePayload): Promise<ZohoResult> {
  const { First_Name, Last_Name } = splitName(p.name);
  return createLead({
    First_Name,
    Last_Name,
    Email: sanitize(p.email, 254),
    Phone: sanitize(p.phone, 40),
    Company: sanitize(p.company, 200),
    Lead_Source: "Drone Lead Form",
    Description: buildDescription([
      ["Job Site Address", sanitize(p.jobSiteAddress, 300)],
      ["Package Interest", sanitize(p.packageInterest, 120)],
      ["Notes", sanitizeMultiline(p.notes)],
    ]),
  });
}

// ---------------------------------------------------------------------------
// Livestream booking form
// ---------------------------------------------------------------------------
export interface LivestreamPayload {
  name: string;
  email: string;
  phone: string;
  eventType?: string;
  eventDate?: string;
  venue?: string;
  guestCount?: string;
  notes?: string;
}

export function submitLivestreamLead(
  p: LivestreamPayload,
): Promise<ZohoResult> {
  const { First_Name, Last_Name } = splitName(p.name);
  return createLead({
    First_Name,
    Last_Name,
    Email: sanitize(p.email, 254),
    Phone: sanitize(p.phone, 40),
    Lead_Source: "Livestream Booking Form",
    Description: buildDescription([
      ["Event Type", sanitize(p.eventType, 120)],
      ["Event Date", sanitize(p.eventDate, 40)],
      ["Venue", sanitize(p.venue, 200)],
      ["Guest Count", sanitize(p.guestCount, 40)],
      ["Notes", sanitizeMultiline(p.notes)],
    ]),
  });
}

// ---------------------------------------------------------------------------
// Dubai landing page (new-market lead capture)
// ---------------------------------------------------------------------------
export interface DubaiPayload {
  name: string;
  email: string;
  phone?: string;
  serviceInterest?: string;
  message?: string;
}

export function submitDubaiLead(p: DubaiPayload): Promise<ZohoResult> {
  const { First_Name, Last_Name } = splitName(p.name);
  return createLead({
    First_Name,
    Last_Name,
    Email: sanitize(p.email, 254),
    Phone: sanitize(p.phone, 40),
    Lead_Source: "Dubai Landing Page",
    Description: buildDescription([
      ["Market", "Dubai, UAE"],
      ["Service Interest", sanitize(p.serviceInterest, 120)],
      ["Message", sanitizeMultiline(p.message)],
    ]),
  });
}

// FUTURE: booking confirmation could create a Zoho CRM Deal + Calendar event here.
