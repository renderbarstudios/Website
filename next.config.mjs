/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== "production";

/**
 * Content-Security-Policy.
 * - self + Google Fonts, plus two client-side third parties:
 *     Google Analytics (gtag.js) and the Zoho SalesIQ chat widget.
 * - The Zoho SalesIQ *widget* is client-side by design, so its widget/CDN hosts
 *   belong here. The Zoho CRM *lead* calls (lib/zoho.ts) remain server-side only
 *   and are intentionally NOT represented in this CSP.
 * - 'unsafe-inline' is required for Next.js hydration/runtime inline scripts and
 *   styles in a static-first app without per-request nonces. 'unsafe-eval' and
 *   websocket connect-src are added in development only (React Fast Refresh).
 */
// Google Analytics hosts
const GA_SCRIPT = "https://www.googletagmanager.com";
const GA_CONNECT =
  "https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com";
const GA_IMG =
  "https://www.googletagmanager.com https://*.google-analytics.com";
// Zoho SalesIQ widget hosts
const ZOHO_SCRIPT =
  "https://salesiq.zohopublic.com https://*.zohopublic.com https://*.zohostatic.com https://*.zohocdn.com";
const ZOHO_CONNECT =
  "https://*.zohopublic.com https://*.zoho.com https://*.zohostatic.com https://*.zohocdn.com wss://*.zoho.com wss://*.zohopublic.com";
const ZOHO_IMG =
  "https://*.zohopublic.com https://*.zohostatic.com https://*.zohocdn.com https://*.zoho.com";
const ZOHO_FRAME =
  "https://salesiq.zohopublic.com https://*.zohopublic.com https://*.zoho.com";
const ZOHO_ASSETS = "https://*.zohostatic.com https://*.zohocdn.com";
const TURNSTILE = "https://challenges.cloudflare.com";

const csp = [
  `default-src 'self'`,
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${GA_SCRIPT} ${ZOHO_SCRIPT} ${TURNSTILE}`,
  `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com ${ZOHO_ASSETS}`,
  `font-src 'self' https://fonts.gstatic.com data: ${ZOHO_ASSETS}`,
  `img-src 'self' data: blob: ${GA_IMG} ${ZOHO_IMG}`,
  `connect-src 'self'${isDev ? " ws: wss:" : ""} ${GA_CONNECT} ${ZOHO_CONNECT} ${TURNSTILE}`,
  `frame-src 'self' ${ZOHO_FRAME} ${TURNSTILE}`,
  `media-src 'self' ${ZOHO_ASSETS}`,
  `frame-ancestors 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `object-src 'none'`,
  `manifest-src 'self'`,
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
]
  .join("; ")
  .concat(";");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    root: import.meta.dirname,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
