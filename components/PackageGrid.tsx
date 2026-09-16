import Link from "next/link";
import type { PricePackage } from "@/lib/site";

export default function PackageGrid({
  packages,
  ctaHref,
  ctaLabel = "Request This",
}: {
  packages: PricePackage[];
  ctaHref: string;
  ctaLabel?: string;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {packages.map((pkg) => (
        <div
          key={pkg.name}
          className={`card flex flex-col ${
            pkg.featured
              ? "border-signal-red/60 ring-1 ring-signal-red/30"
              : ""
          }`}
        >
          {pkg.featured && (
            <span className="mb-3 inline-block w-fit rounded-full bg-signal-red px-3 py-1 text-[10px] font-bold uppercase tracking-label text-white">
              Most Popular
            </span>
          )}
          <h3 className="text-lg font-bold text-off-white">{pkg.name}</h3>
          <p className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-black text-off-white">
              {pkg.price}
            </span>
            <span className="text-sm text-mid-gray">{pkg.cadence}</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-mid-gray">
            {pkg.blurb}
          </p>
          <ul className="mt-5 flex-1 space-y-2.5">
            {pkg.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-off-white/90">
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
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <Link
            href={ctaHref}
            className={`mt-6 ${pkg.featured ? "btn-primary" : "btn-secondary"} w-full`}
          >
            {ctaLabel}
          </Link>
        </div>
      ))}
    </div>
  );
}
