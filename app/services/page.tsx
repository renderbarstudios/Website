import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PackageGrid from "@/components/PackageGrid";
import CTAStrip from "@/components/CTAStrip";
import JsonLd, { breadcrumbSchema, serviceSchema } from "@/components/JsonLd";
import { SERVICES, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services & Pricing | Drone, Livestreaming & Short-Form Video",
  description:
    "Renderbar Studios services and pricing: FAA Part 107 drone documentation ($450–$5,000/mo), event livestreaming ($699–$6,000/event), and short-form video ($699–$1,999/mo) in Jacksonville, FL.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services & Pricing | Renderbar Studios",
    description:
      "FAA Part 107 drone documentation, event livestreaming, and short-form video pricing in Jacksonville, FL.",
    url: `${SITE.url}/services`,
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      {SERVICES.map((s) => (
        <JsonLd
          key={s.slug}
          data={serviceSchema({
            name: s.name,
            description: s.summary,
            url: `${SITE.url}${s.href}`,
            priceRange: s.priceRange,
          })}
        />
      ))}

      {/* Header */}
      <section className="border-b border-white/10">
        <div className="container-rb py-20 text-center sm:py-24">
          <p className="eyebrow mb-4">Services &amp; Pricing</p>
          <h1 className="display mx-auto max-w-4xl text-balance text-off-white">
            One studio. Three ways to put your story in motion.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-mid-gray">
            Transparent pricing, predictable scheduling, and production quality
            that holds up — for contractors, developers, and event hosts across
            Northeast Florida.
          </p>
        </div>
      </section>

      {SERVICES.map((s, i) => (
        <section
          key={s.slug}
          id={s.slug}
          className={`scroll-mt-20 ${
            i % 2 === 1 ? "border-y border-white/10 bg-dark-surface/40" : ""
          }`}
        >
          <div className="container-rb py-20 sm:py-24">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                {s.flagship && (
                  <span className="mb-4 inline-block rounded-full bg-signal-red/15 px-3 py-1 text-[10px] font-bold uppercase tracking-label text-signal-red">
                    Flagship Service
                  </span>
                )}
                <p className="eyebrow mb-3">{s.eyebrow}</p>
                <h2 className={s.flagship ? "h2 text-off-white" : "h3 text-off-white"}>
                  {s.name}
                </h2>
                <p className="mt-3 text-h3 font-bold text-signal-red">
                  {s.tagline}
                </p>
                <p className="mt-5 text-base leading-relaxed text-mid-gray">
                  {s.summary}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link href={s.href} className="btn-primary">
                    {s.flagship ? `Explore ${s.name}` : "Get Started"}
                  </Link>
                  <span className="text-sm font-semibold text-mid-gray">
                    {s.priceRange}
                  </span>
                </div>
              </div>
              <div
                className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 ${
                  i % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="mt-14">
              <PackageGrid
                packages={s.packages}
                ctaHref={s.flagship ? s.href : "/contact"}
                ctaLabel="Request Quote"
              />
            </div>
          </div>
        </section>
      ))}

      <CTAStrip />
    </>
  );
}
