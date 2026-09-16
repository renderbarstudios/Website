import Link from "next/link";
import { SITE } from "@/lib/site";

export default function CTAStrip({
  title = "Let's put your project in motion.",
  subtitle = "Tell us what you're building or hosting. We'll bring the cameras, the craft, and the plan.",
  primary = { href: "/drone", label: "Get a Free Aerial Quote" },
  secondary = { href: "/contact", label: "Talk to Us" },
}: {
  title?: string;
  subtitle?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-dark-surface">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(60% 120% at 100% 0%, rgba(224,26,26,0.25), transparent 60%), radial-gradient(50% 100% at 0% 100%, rgba(43,58,158,0.25), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="container-rb relative flex flex-col items-start gap-8 py-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="h2 text-balance text-off-white">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-mid-gray">
            {subtitle}
          </p>
          <p className="mt-5 text-sm font-bold uppercase tracking-label text-signal-red">
            {SITE.tagline}
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href={primary.href} className="btn-primary">
            {primary.label}
          </Link>
          <Link href={secondary.href} className="btn-secondary">
            {secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
