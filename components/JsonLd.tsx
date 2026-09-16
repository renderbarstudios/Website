import { SITE } from "@/lib/site";

/**
 * Renders a JSON-LD <script>. The data is always developer-controlled (never
 * user input); we still escape "<" to neutralize any accidental tag injection.
 */
export default function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

const ORG_ID = `${SITE.url}/#organization`;

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    image: `${SITE.url}/brand/logo/full_logo_knockout.png`,
    logo: `${SITE.url}/brand/logo/icon_on_black.png`,
    slogan: SITE.tagline,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    areaServed: SITE.areaServed,
    openingHours: SITE.hours,
    sameAs: [SITE.social.instagram, SITE.social.youtube, SITE.social.linkedin],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Drone Documentation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Event Livestreaming" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Short-Form Video" } },
    ],
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  priceRange: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.name,
    url: opts.url,
    provider: { "@type": "LocalBusiness", "@id": ORG_ID, name: SITE.name },
    areaServed: {
      "@type": "AdministrativeArea",
      name: `${SITE.areaServed} (${SITE.address.locality}, ${SITE.address.region})`,
    },
    offers: { "@type": "Offer", priceCurrency: "USD", description: opts.priceRange },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.date,
    dateModified: opts.date,
    author: { "@type": "Organization", name: opts.author },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/brand/logo/icon_on_black.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/blog/${opts.slug}`,
    },
  };
}
