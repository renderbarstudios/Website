import Image from "next/image";
import type { Metadata } from "next";
import DroneForm from "@/components/forms/DroneForm";
import PackageGrid from "@/components/PackageGrid";
import StageTimeline from "@/components/StageTimeline";
import JsonLd, { serviceSchema, breadcrumbSchema } from "@/components/JsonLd";
import { getService, SITE } from "@/lib/site";

const service = getService("drone");

export const metadata: Metadata = {
  title: "Drone Documentation in Jacksonville | FAA Part 107",
  description:
    "FAA Part 107 licensed aerial documentation for construction, roofing, and real estate in Jacksonville. Monthly retainers capture every project from pre-construction to completion. Packages $450–$5,000/mo.",
  alternates: { canonical: "/drone" },
  openGraph: {
    title: "Jacksonville Drone Documentation | Renderbar Studios",
    description:
      "Recurring FAA Part 107 aerial documentation for construction, roofing & real estate across Northeast Florida.",
    url: `${SITE.url}/drone`,
    images: [`${SITE.url}/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jacksonville Drone Documentation | Renderbar Studios",
    description:
      "Recurring FAA Part 107 aerial documentation for construction, roofing & real estate across Northeast Florida.",
  },
};

const INCLUDED = [
  "FAA Part 107 licensed pilot, fully insured, airspace pre-checked",
  "Scheduled recurring flights on a predictable monthly cadence",
  "Edited 4K stills and cinematic video, color-graded and delivered",
  "Organized cloud galleries you can share with owners and insurers",
  "Pre-construction → construction → post-construction timeline",
  "Same-week turnaround on standard deliverables",
];

const USE_CASES = [
  {
    role: "Roofing Contractors",
    body: "Document tear-off, dry-in, and final inspection from above. Insurance-ready evidence that speeds claims and settles disputes before they start.",
  },
  {
    role: "General Contractors",
    body: "Give owners and lenders a clear, recurring view of progress. Catch issues early and keep every stakeholder aligned without another site visit.",
  },
  {
    role: "Developers",
    body: "Market the vision and track the build at once — investor updates, leasing assets, and a complete visual record from groundbreaking to ribbon-cutting.",
  },
];

export default function DronePage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Drone Documentation",
          description: service.summary,
          url: `${SITE.url}/drone`,
          priceRange: service.priceRange,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Drone Documentation", path: "/drone" },
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
            <StageTimeline className="mb-6" />
            <h1 className="display text-balance text-off-white">
              Site photos from the ground miss what matters.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-off-white/85">
              Renderbar documents your project from the air on a monthly
              retainer — capturing the full story from pre-construction to
              completion. The record owners trust, insurers accept, and buyers
              remember.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#quote" className="btn-primary">
                Get a Free Aerial Quote →
              </a>
              <span className="text-sm font-semibold text-mid-gray">
                {service.priceRange}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="container-rb py-20 sm:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">What&apos;s Included</p>
          <h2 className="h2 text-balance text-off-white">
            A complete aerial record, handled end to end.
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
      </section>

      {/* Use cases */}
      <section className="border-t border-white/10 bg-dark-surface/40">
        <div className="container-rb py-20 sm:py-24">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-3">Built For Your Vertical</p>
            <h2 className="h2 text-balance text-off-white">
              Documentation that does a specific job.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {USE_CASES.map((uc) => (
              <div key={uc.role} className="card">
                <h3 className="text-lg font-bold text-off-white">{uc.role}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mid-gray">
                  {uc.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="container-rb py-20 sm:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Monthly Retainers</p>
          <h2 className="h2 text-balance text-off-white">
            Pick a cadence. We handle the rest.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-mid-gray">
            Every package is a monthly retainer — predictable scheduling,
            predictable budget, a growing visual archive of your work.
          </p>
        </div>
        <PackageGrid
          packages={service.packages}
          ctaHref="#quote"
          ctaLabel="Request Quote"
        />
      </section>

      {/* Quote form */}
      <section
        id="quote"
        className="scroll-mt-20 border-t border-white/10 bg-dark-surface/40"
      >
        <div className="container-rb grid gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow mb-3">Free Aerial Quote</p>
            <h2 className="h2 text-balance text-off-white">
              Tell us about your job site.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-mid-gray">
              Share your site address and we&apos;ll run an FAA airspace
              pre-check before recommending a package. No obligation — just a
              clear plan and an honest quote.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-off-white/90">
              <li>📍 Airspace pre-check on every job site</li>
              <li>📞 {SITE.phone}</li>
              <li>✉️ {SITE.email}</li>
            </ul>
          </div>
          <div className="card">
            <DroneForm />
          </div>
        </div>
      </section>
    </>
  );
}
