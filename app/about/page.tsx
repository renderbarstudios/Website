import type { Metadata } from "next";
import CTAStrip from "@/components/CTAStrip";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Renderbar Studios | Jacksonville Media Production",
  description:
    "Renderbar Studios is a Jacksonville, FL media production studio founded by an FAA Part 107 drone pilot and a 15-year UX leader. Licensed, insured, and locally rooted.",
  alternates: { canonical: "/about" },
};

const FOUNDERS = [
  {
    name: "Tigi Kuttamperoor",
    role: "Founder · FAA Part 107 Pilot & Media Producer",
    bio: "Tigi flies every mission and shapes every edit. An FAA Part 107 licensed drone pilot and media producer, he built Renderbar around a simple belief: the most useful footage is the footage no one else can get. He handles capture, color, and the cinematic story from takeoff to final cut.",
    initials: "TK",
  },
  {
    name: "Sharmilee Khona",
    role: "Founder · Experience & Operations",
    bio: "Sharmilee brings 15+ years of UX leadership — including time at Marriott — to how Renderbar works with clients. She designs the experience around every engagement: clear scopes, dependable timelines, and deliverables that actually get used. If the process feels effortless, that's her work.",
    initials: "SK",
  },
];

const CREDENTIALS = [
  { label: "Business", value: SITE.legalName },
  { label: "FAA", value: "Part 107 Licensed Remote Pilot" },
  { label: "Coverage", value: "Fully Insured" },
  { label: "Based In", value: "Jacksonville, FL 32223" },
  { label: "Serving", value: SITE.areaServed },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      {/* Header */}
      <section className="border-b border-white/10">
        <div className="container-rb py-20 sm:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Our Story</p>
            <h1 className="display text-balance text-off-white">
              We find the angles others miss.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-mid-gray">
              Renderbar Studios is a Jacksonville media production studio built
              on two crafts: documentation from the air and broadcasts that
              bring people together. We started with a camera, a drone, and a
              conviction that local businesses deserve production quality they
              usually can&apos;t afford — delivered by people they can actually
              reach.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-mid-gray">
              Today we document construction sites, roofs, and developments
              across Northeast Florida, and we livestream the weddings,
              services, and events that matter most. Same studio, same standard:{" "}
              <span className="font-bold text-signal-red">
                Motion. Story. Vision.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="container-rb py-20 sm:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">The Team</p>
          <h2 className="h2 text-balance text-off-white">
            Two founders, one standard.
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {FOUNDERS.map((f) => (
            <div key={f.name} className="card">
              {/* Placeholder for team photo — swap with next/image when available */}
              <div className="mb-5 flex aspect-[3/2] items-center justify-center rounded-lg border border-white/10 bg-void-black">
                <span className="text-4xl font-black text-white/15">
                  {f.initials}
                </span>
              </div>
              <h3 className="text-xl font-bold text-off-white">{f.name}</h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-label text-link-blue">
                {f.role}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-mid-gray">
                {f.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Credentials */}
      <section className="border-t border-white/10 bg-dark-surface/40">
        <div className="container-rb py-20 sm:py-24">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-3">Credentials</p>
            <h2 className="h2 text-balance text-off-white">
              Licensed, insured, and accountable.
            </h2>
          </div>
          <dl className="grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {CREDENTIALS.map((c) => (
              <div key={c.label} className="bg-dark-surface p-6">
                <dt className="text-xs font-bold uppercase tracking-label text-mid-gray">
                  {c.label}
                </dt>
                <dd className="mt-2 text-base font-semibold text-off-white">
                  {c.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CTAStrip
        title="Work with a studio that picks up the phone."
        subtitle="Local, licensed, and full-stack. Tell us what you're building or hosting."
      />
    </>
  );
}
