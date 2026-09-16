import Image from "next/image";
import type { Metadata } from "next";
import LivestreamForm from "@/components/forms/LivestreamForm";
import PackageGrid from "@/components/PackageGrid";
import JsonLd, { serviceSchema, breadcrumbSchema } from "@/components/JsonLd";
import { getService, SITE } from "@/lib/site";

const service = getService("livestream");

export const metadata: Metadata = {
  title: "Event Livestreaming in Jacksonville | Multi-Camera Broadcast",
  description:
    "Professional multi-camera livestreaming in Jacksonville for weddings, religious services, memorials, galas, and corporate conferences. Reliable streams and edited recordings. $699–$6,000/event.",
  alternates: { canonical: "/livestream" },
  openGraph: {
    title: "Jacksonville Event Livestreaming | Renderbar Studios",
    description:
      "Multi-camera livestreaming for weddings, services, memorials, galas, and conferences across Northeast Florida.",
    url: `${SITE.url}/livestream`,
  },
};

const EVENT_TYPES = [
  { name: "Weddings", body: "Bring the ceremony to family who can't travel." },
  { name: "Religious Services", body: "Reliable weekly streams for your congregation." },
  { name: "Memorials", body: "A dignified way for everyone to say goodbye." },
  { name: "Nonprofit Galas", body: "Widen your reach and raise more, live." },
  { name: "Corporate Conferences", body: "Broadcast keynotes and sessions, branded." },
  { name: "Special Events", body: "Concerts, launches, and community moments." },
];

const INCLUDED = [
  "Multi-camera capture with live switching",
  "Professional, mixed multi-source audio",
  "On-site technical director — no dropouts, no surprises",
  "Stream to YouTube, Facebook, Vimeo, or a private link",
  "Lower-thirds, titles, and branded graphics",
  "Edited recording and highlights delivered after the event",
];

export default function LivestreamPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Event Livestreaming",
          description: service.summary,
          url: `${SITE.url}/livestream`,
          priceRange: service.priceRange,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Event Livestreaming", path: "/livestream" },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-void-black via-void-black/85 to-void-black/40"
          aria-hidden
        />
        <div className="container-rb relative py-24 sm:py-32">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">{service.eyebrow}</p>
            <h1 className="display text-balance text-off-white">
              Reach the people who can&apos;t be there.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-off-white/85">
              Broadcast-quality, multi-camera livestreaming for the moments that
              matter. We bring the gear, run the show, and deliver a polished
              recording — so everyone has a seat, wherever they are.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#availability" className="btn-primary">
                Check Availability →
              </a>
              <span className="text-sm font-semibold text-mid-gray">
                {service.priceRange}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Event types */}
      <section className="container-rb py-20 sm:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Events We Stream</p>
          <h2 className="h2 text-balance text-off-white">
            Every moment deserves a wider audience.
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EVENT_TYPES.map((e) => (
            <div key={e.name} className="card">
              <h3 className="text-lg font-bold text-off-white">{e.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mid-gray">
                {e.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What's included */}
      <section className="border-t border-white/10 bg-dark-surface/40">
        <div className="container-rb py-20 sm:py-24">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-3">What&apos;s Included</p>
            <h2 className="h2 text-balance text-off-white">
              A broadcast crew, without the broadcast budget.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {INCLUDED.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-lg border border-white/10 bg-dark-surface p-5"
              >
                <svg
                  className="mt-0.5 shrink-0"
                  width="18"
                  height="18"
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
                <span className="text-sm text-off-white/90">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="container-rb py-20 sm:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Event Packages</p>
          <h2 className="h2 text-balance text-off-white">
            From a single camera to a full production.
          </h2>
        </div>
        <PackageGrid
          packages={service.packages}
          ctaHref="#availability"
          ctaLabel="Check Availability"
        />
      </section>

      {/* Availability form */}
      <section
        id="availability"
        className="scroll-mt-20 border-t border-white/10 bg-dark-surface/40"
      >
        <div className="container-rb grid gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow mb-3">Check Availability</p>
            <h2 className="h2 text-balance text-off-white">
              Tell us about your event.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-mid-gray">
              Send us your date and the essentials. We&apos;ll confirm
              availability and send a tailored quote within one business day.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-off-white/90">
              <li>🎥 Multi-camera crews, fully insured</li>
              <li>📞 {SITE.phone}</li>
              <li>✉️ {SITE.email}</li>
            </ul>
          </div>
          <div className="card">
            <LivestreamForm />
          </div>
        </div>
      </section>
    </>
  );
}
