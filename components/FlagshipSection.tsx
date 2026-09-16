import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/site";

export default function FlagshipSection({
  service,
  reverse = false,
}: {
  service: Service;
  reverse?: boolean;
}) {
  return (
    <section className="container-rb py-20 sm:py-24">
      <div
        className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Visual */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-void-black/60 to-transparent"
            aria-hidden
          />
        </div>

        {/* Copy */}
        <div>
          <p className="eyebrow mb-3">{service.eyebrow}</p>
          <h2 className="h2 text-balance text-off-white">{service.name}</h2>
          <p className="mt-3 text-h3 font-bold text-signal-red">
            {service.tagline}
          </p>
          <p className="mt-5 text-base leading-relaxed text-mid-gray">
            {service.summary}
          </p>
          <ul className="mt-6 space-y-3">
            {service.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-off-white/90">
                <svg
                  className="mt-0.5 shrink-0"
                  width="16"
                  height="16"
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
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href={service.href} className="btn-primary">
              Explore {service.name}
            </Link>
            <span className="text-sm font-semibold text-mid-gray">
              {service.priceRange}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
