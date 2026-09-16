import Link from "next/link";
import Logo from "./Logo";
import { SITE, NAV_LINKS, SERVICES } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-void-black">
      <div className="container-rb grid gap-10 py-14 md:grid-cols-12">
        {/* Brand */}
        <div className="md:col-span-5">
          <Logo variant="full" height={40} />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-mid-gray">
            {SITE.description}
          </p>
          <p className="mt-6 text-sm font-bold uppercase tracking-label text-signal-red">
            {SITE.tagline}
          </p>
        </div>

        {/* Services */}
        <nav aria-label="Services" className="md:col-span-3">
          <h2 className="label text-off-white">Services</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={s.href}
                  className="text-mid-gray transition-colors hover:text-off-white"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Explore */}
        <nav aria-label="Explore" className="md:col-span-2">
          <h2 className="label text-off-white">Explore</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-mid-gray transition-colors hover:text-off-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className="md:col-span-2">
          <h2 className="label text-off-white">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-mid-gray">
            <li>
              <a
                href={`tel:${SITE.phoneHref}`}
                className="transition-colors hover:text-off-white"
              >
                {SITE.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="transition-colors hover:text-off-white"
              >
                {SITE.email}
              </a>
            </li>
            <li>
              {SITE.address.locality}, {SITE.address.region}{" "}
              {SITE.address.postalCode}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-rb flex flex-col items-center justify-between gap-3 py-6 text-xs text-mid-gray sm:flex-row">
          <p>
            © {year} {SITE.legalName}. FAA Part 107 Licensed · Fully Insured.
          </p>
          <p className="flex items-center gap-4">
            <span>Jacksonville, FL</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
