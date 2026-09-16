import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SITE } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

// Public client-side IDs (not secrets). Loaded site-wide in production only,
// so localhost traffic never reaches GA and the chat widget isn't loaded in dev.
const GA_MEASUREMENT_ID = "G-Y88K67L3X6";
const ZOHO_SALESIQ_WIDGET =
  "siq25cdb7d7ba1835b2b011fa784936feaf704c1a7c61cc1d5d216a76b6f3ade6b4";
const thirdPartyEnabled = process.env.NODE_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Jacksonville Drone Documentation & Livestreaming`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Jacksonville drone documentation",
    "FAA Part 107 Jacksonville",
    "construction progress photos Jacksonville",
    "event livestreaming Jacksonville",
    "Northeast Florida aerial video",
    "Renderbar Studios",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="min-h-screen bg-void-black text-off-white antialiased">
        {/* Google Analytics (gtag.js) — site-wide, production only */}
        {thirdPartyEnabled && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-gtag" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
            </Script>
          </>
        )}

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-signal-red focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />

        {/* Zoho SalesIQ live chat — loaded last (lazy), production only.
            This is the client-side chat widget; the server-side CRM lead flow
            in lib/zoho.ts is separate and unaffected. */}
        {thirdPartyEnabled && (
          <>
            <Script id="zsiq-init" strategy="lazyOnload">
              {`window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}`}
            </Script>
            <Script
              id="zsiqscript"
              src={`https://salesiq.zohopublic.com/widget?wc=${ZOHO_SALESIQ_WIDGET}`}
              strategy="lazyOnload"
            />
          </>
        )}
      </body>
    </html>
  );
}
