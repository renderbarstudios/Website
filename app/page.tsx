import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import HeroCarousel from "@/components/HeroCarousel";
import TrustBar from "@/components/TrustBar";
import FlagshipSection from "@/components/FlagshipSection";
import CTAStrip from "@/components/CTAStrip";
import JsonLd, { localBusinessSchema, breadcrumbSchema } from "@/components/JsonLd";
import { getService } from "@/lib/site";

export const metadata: Metadata = {
  title: "Jacksonville Drone Documentation & Event Livestreaming",
  description:
    "Renderbar Studios is a Jacksonville media production studio. FAA Part 107 drone documentation for construction, roofing & real estate, plus multi-camera event livestreaming across Northeast Florida.",
  alternates: { canonical: "/" },
};

const shortForm = getService("short-form");

const WHY = [
  {
    title: "Local",
    body: "Jacksonville-rooted and Northeast Florida-focused. We know the airspace, the venues, and the people. When you call, you reach the people flying the mission.",
  },
  {
    title: "Full-stack",
    body: "Pre-production, capture, edit, and delivery under one roof. Drone, livestream, and short-form — one studio, one standard, no handoffs.",
  },
  {
    title: "Results-first",
    body: "Documentation that wins claims, footage that fills seats, and content that earns attention. Every deliverable is built to move your business.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }])} />

      <HeroCarousel />
      <TrustBar />

      {/* Intro */}
      <section className="container-rb py-20 text-center sm:py-24">
        <p className="eyebrow mb-4">Motion. Story. Vision.</p>
        <h2 className="h2 mx-auto max-w-3xl text-balance text-off-white">
          A Jacksonville production studio built around two things you can&apos;t
          fake: altitude and reliability.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-mid-gray">
          We document projects from the air and broadcast the moments that
          matter — for contractors, developers, roofers, and event hosts across
          Northeast Florida.
        </p>
      </section>

      {/* Flagships */}
      <FlagshipSection service={getService("drone")} />
      <div className="border-t border-white/5" />
      <FlagshipSection service={getService("livestream")} reverse />

      {/* Secondary — Short-Form Video */}
      <section className="border-t border-white/10 bg-dark-surface/40">
        <div className="container-rb grid items-center gap-8 py-16 md:grid-cols-3">
          <div className="md:col-span-2">
            <p className="eyebrow mb-3">{shortForm.eyebrow}</p>
            <h2 className="h2 text-off-white">{shortForm.name}</h2>
            <p className="mt-3 text-h3 font-bold text-signal-red">
              {shortForm.tagline}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-mid-gray">
              {shortForm.summary}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <Link href={shortForm.href} className="btn-primary">
                See Short-Form Plans
              </Link>
              <span className="text-sm font-semibold text-mid-gray">
                {shortForm.priceRange}
              </span>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10">
            <Image
              src={shortForm.image}
              alt={shortForm.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why Renderbar */}
      <section className="container-rb py-20 sm:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Why Renderbar</p>
          <h2 className="h2 text-balance text-off-white">
            The studio contractors and event hosts come back to.
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
      </section>

      <CTAStrip />
    </>
  );
}
