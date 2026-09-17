import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import JsonLd, { breadcrumbSchema, localBusinessSchema } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Renderbar Studios | Jacksonville, FL",
  description:
    "Get in touch with Renderbar Studios in Jacksonville, FL. Call (904) 431-7006 or send a message about drone documentation, event livestreaming, or short-form video.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Renderbar Studios",
    description:
      "Call (904) 431-7006 or send a message about drone documentation, event livestreaming, or short-form video.",
    url: `${SITE.url}/contact`,
    images: [`${SITE.url}/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Renderbar Studios",
    description:
      "Call (904) 431-7006 or send a message about drone documentation, event livestreaming, or short-form video.",
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <section className="border-b border-white/10">
        <div className="container-rb py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="eyebrow mb-4">Contact</p>
              <h1 className="display text-balance text-off-white">
                Let&apos;s talk about your project.
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-mid-gray">
                Drone documentation, an event to livestream, or a content engine
                to build — tell us what you have in mind and we&apos;ll get back
                within one business day.
              </p>

              <dl className="mt-10 space-y-6">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-label text-mid-gray">
                    Phone
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${SITE.phoneHref}`}
                      className="text-lg font-bold text-off-white transition-colors hover:text-signal-red"
                    >
                      {SITE.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-label text-mid-gray">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-lg font-bold text-off-white transition-colors hover:text-signal-red"
                    >
                      {SITE.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-label text-mid-gray">
                    Studio
                  </dt>
                  <dd className="mt-1 text-lg font-bold text-off-white">
                    {SITE.address.locality}, {SITE.address.region}{" "}
                    {SITE.address.postalCode}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-label text-mid-gray">
                    Hours
                  </dt>
                  <dd className="mt-1 text-base text-off-white/90">
                    Mon–Fri, 9am–6pm ET
                  </dd>
                </div>
              </dl>
              <p className="mt-10 text-sm font-bold uppercase tracking-label text-signal-red">
                {SITE.tagline}
              </p>
            </div>

            <div className="card h-fit">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
