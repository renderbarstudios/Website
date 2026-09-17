import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import DubaiForm from "@/components/forms/DubaiForm";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dubai Drone, Livestreaming & Video Production",
  description:
    "Renderbar Studios is now operating in Dubai. Cinematic drone documentation, multi-camera event livestreaming, and short-form video for developers, contractors, and event hosts across the UAE. GCAA-aligned, fully insured.",
  alternates: { canonical: "/dubai" },
  // Private for now: reachable by direct URL (e.g. for investors) but kept out
  // of search indexes, the nav, the footer, and the sitemap.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Renderbar Studios — Now Operating in Dubai",
    description:
      "Drone documentation, livestreaming, and video production for Dubai and the UAE. GCAA-aligned, fully insured.",
    url: `${SITE.url}/dubai`,
    images: [`${SITE.url}/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Renderbar Studios — Now Operating in Dubai",
    description:
      "Drone documentation, livestreaming, and video production for Dubai and the UAE. GCAA-aligned, fully insured.",
  },
  keywords: [
    "Dubai drone services",
    "drone photography Dubai",
    "construction documentation Dubai",
    "event livestreaming Dubai",
    "video production UAE",
    "GCAA drone Dubai",
  ],
};

// NOTE: AED figures below are INDICATIVE placeholders pending confirmed UAE
// rates — swap the `fromPrice` values once finalized.
const DUBAI_SERVICES = [
  {
    name: "Drone Documentation",
    tagline: "Document the build from the air.",
    summary:
      "Recurring aerial photo and video of construction, real estate, and developments across the UAE — investor-ready progress from groundwork to handover.",
    fromPrice: "From AED 1,650 / mo",
    image: "/images/dubai/dubai-downtown.jpg",
    imageAlt:
      "Aerial night view of downtown Dubai and Sheikh Zayed Road from above",
    bullets: [
      "GCAA-aligned, fully insured operations",
      "Pre-build → construction → completion coverage",
      "Edited 4K stills and cinematic video",
    ],
  },
  {
    name: "Event Livestreaming",
    tagline: "Reach guests across every time zone.",
    summary:
      "Multi-camera livestreaming for conferences, galas, weddings, and corporate events — broadcast-quality streams with a recorded archive.",
    fromPrice: "From AED 2,600 / event",
    image: "/images/wedding_livestream.png",
    imageAlt: "Multi-camera livestream production of an event",
    bullets: [
      "Multi-camera switching, professional audio",
      "Stream to any platform or private link",
      "Edited recording delivered after",
    ],
  },
  {
    name: "Short-Form Video",
    tagline: "Stay in the feed, every week.",
    summary:
      "Vertical video built for Reels, TikTok, and Shorts — a monthly content engine to keep your brand in front of the UAE audience.",
    fromPrice: "From AED 2,600 / mo",
    image: "/images/video_production_edit.png",
    imageAlt: "Short-form vertical video editing",
    bullets: [
      "Scripted, shot, and edited verticals",
      "Hooks and captions tuned for retention",
      "Consistent monthly publishing",
    ],
  },
];

const DUBAI_TRUST = [
  "Now Operating in Dubai",
  "GCAA-Aligned Operations",
  "Fully Insured",
  "Serving the UAE",
];

const WHY = [
  {
    title: "On the ground in the UAE",
    body: "We bring a global production standard to the Emirates — and we work to local norms, permits, and timelines, not against them.",
  },
  {
    title: "Full-stack studio",
    body: "Drone, livestream, and short-form under one roof. One team, one standard, from pre-production to final delivery.",
  },
  {
    title: "Built to convert",
    body: "Documentation that wins trust, broadcasts that fill the room, and content that earns attention — every deliverable works for your business.",
  },
];

export default function DubaiPage() {
  const dubaiServiceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Drone Documentation, Livestreaming & Video Production",
    serviceType: "Media Production",
    description: metadata.description,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    areaServed: {
      "@type": "City",
      name: "Dubai",
      containedInPlace: { "@type": "Country", name: "United Arab Emirates" },
    },
    url: `${SITE.url}/dubai`,
  };

  return (
    <>
      <JsonLd data={dubaiServiceLd} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Dubai", path: "/dubai" },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <Image
          src="/images/dubai/dubai-skyline.jpg"
          alt="The Dubai skyline at night — the Burj Khalifa and Business Bay towers reflected in the water"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-void-black via-void-black/80 to-void-black/40"
          aria-hidden
        />
        <div className="container-rb relative py-24 sm:py-32">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Now Operating in Dubai · GCAA-Aligned</p>
            <h1 className="display text-balance text-off-white">
              Dubai in motion. Your story, from above.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-off-white/85">
              Renderbar Studios has landed in the UAE. Cinematic drone
              documentation, multi-camera livestreaming, and short-form video —
              built for developers, contractors, and event hosts who expect a
              production standard that matches the city.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#enquire" className="btn-primary">
                Request a Dubai Quote →
              </a>
              <a href="#services" className="btn-secondary">
                See Services
              </a>
            </div>
            <p className="mt-6 text-sm font-bold uppercase tracking-label text-signal-red">
              {SITE.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="border-b border-white/10 bg-dark-surface/60">
        <div className="container-rb flex flex-wrap items-center justify-center gap-x-3 gap-y-2 py-4 text-center">
          {DUBAI_TRUST.map((point, i) => (
            <span key={point} className="flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-label text-off-white/80 sm:text-xs">
                {point}
              </span>
              {i < DUBAI_TRUST.length - 1 && (
                <span className="text-signal-red" aria-hidden>
                  ·
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Services */}
      <section id="services" className="container-rb scroll-mt-20 py-20 sm:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">What We Do in the UAE</p>
          <h2 className="h2 text-balance text-off-white">
            One studio, three ways to be seen.
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {DUBAI_SERVICES.map((s) => (
            <div key={s.name} className="card flex flex-col">
              <div className="relative mb-5 aspect-video overflow-hidden rounded-lg border border-white/10">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-off-white">{s.name}</h3>
              <p className="mt-1 text-sm font-bold text-signal-red">
                {s.tagline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-mid-gray">
                {s.summary}
              </p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-sm text-off-white/90"
                  >
                    <svg
                      className="mt-1 shrink-0"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#6CC520"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm font-semibold text-off-white">
                {s.fromPrice}
              </p>
              <a href="#enquire" className="btn-secondary mt-4 w-full">
                Enquire
              </a>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-mid-gray">
          Pricing shown is indicative — final AED rates are confirmed on quote.
        </p>
      </section>

      {/* Why Renderbar in Dubai */}
      <section className="border-t border-white/10 bg-dark-surface/40">
        <div className="container-rb py-20 sm:py-24">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-3">Why Renderbar</p>
            <h2 className="h2 text-balance text-off-white">
              A global standard, delivered locally.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {WHY.map((item, i) => (
              <div key={item.title} className="card">
                <span className="text-sm font-black text-signal-red">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-lg font-bold text-off-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mid-gray">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section
        id="enquire"
        className="scroll-mt-20 border-t border-white/10"
      >
        <div className="container-rb grid gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow mb-3">Request a Quote</p>
            <h2 className="h2 text-balance text-off-white">
              Let&apos;s create something for Dubai.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-mid-gray">
              Tell us about your project or event anywhere in the UAE. We&apos;ll
              get back within one business day with availability and an AED
              quote.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-off-white/90">
              <li>🛰️ GCAA-aligned, fully insured operations</li>
              <li>🎥 Drone · Livestream · Short-form, one studio</li>
              <li>✉️ {SITE.email}</li>
            </ul>
            <p className="mt-8 text-sm font-bold uppercase tracking-label text-signal-red">
              {SITE.tagline}
            </p>
          </div>
          <div className="card h-fit">
            <DubaiForm />
          </div>
        </div>
      </section>

      {/* Back to main site */}
      <div className="border-t border-white/10 bg-void-black">
        <div className="container-rb flex flex-col items-center justify-between gap-3 py-6 text-sm text-mid-gray sm:flex-row">
          <span>Looking for our U.S. operations?</span>
          <Link href="/" className="link">
            Visit Renderbar Studios Jacksonville →
          </Link>
        </div>
      </div>
    </>
  );
}
