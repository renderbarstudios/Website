/**
 * Central site configuration — single source of truth for NAP (name, address,
 * phone), navigation, services, packages, and the hero verticals.
 * Imported by layout, pages, JSON-LD, sitemap, and metadata.
 */

export const SITE = {
  name: "Renderbar Studios",
  legalName: "Renderbar Studios LLC",
  tagline: "Motion. Story. Vision.",
  description:
    "Renderbar Studios is a Jacksonville, FL media production studio. FAA Part 107 licensed drone documentation, event livestreaming, and short-form video for contractors, developers, and event hosts across Northeast Florida.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://renderbar.net",
  phone: "(904) 431-7006",
  phoneHref: "+19044317006",
  email: "info@renderbar.net",
  address: {
    locality: "Jacksonville",
    region: "FL",
    postalCode: "32223",
    country: "US",
  },
  geo: {
    // Approx. Jacksonville 32223 (Mandarin) centroid
    latitude: 30.1626,
    longitude: -81.6347,
  },
  areaServed: "Northeast Florida",
  hours: "Mo-Fr 09:00-18:00",
  social: {
    instagram: "https://www.instagram.com/renderbarstudios",
    youtube: "https://www.youtube.com/@renderbarstudios",
    linkedin: "https://www.linkedin.com/company/renderbar-studios",
  },
} as const;

export const NAV_LINKS = [
  { href: "/drone", label: "Drone" },
  { href: "/livestream", label: "Livestream" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export type ServiceSlug = "drone" | "livestream" | "short-form";

export interface PricePackage {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  featured?: boolean;
}

export interface Service {
  slug: ServiceSlug;
  name: string;
  flagship: boolean;
  eyebrow: string;
  tagline: string;
  summary: string;
  priceRange: string;
  href: string;
  image: string;
  imageAlt: string;
  bullets: string[];
  packages: PricePackage[];
}

export const SERVICES: Service[] = [
  {
    slug: "drone",
    name: "Drone Documentation",
    flagship: true,
    eyebrow: "FAA Part 107 Licensed · Flagship",
    tagline: "Document the build others never see.",
    summary:
      "Recurring aerial photo and video that captures every project from pre-construction through completion. Investor-ready progress, insurance-grade records, and listing-ready showcases — flown on a monthly retainer.",
    priceRange: "$450–$5,000/mo",
    href: "/drone",
    image: "/images/drone_site_comparison.png",
    imageAlt:
      "Aerial drone documentation of a Jacksonville construction site progressing over time",
    bullets: [
      "Pre-construction → construction → post-construction coverage",
      "Construction, roofing, real estate, HVAC, commercial verticals",
      "FAA Part 107 licensed, fully insured, airspace pre-checked",
      "Edited stills + 4K video delivered on a predictable monthly cadence",
    ],
    packages: [
      {
        name: "Progress",
        price: "$450",
        cadence: "/mo",
        blurb: "Single-site monthly documentation for active builds.",
        features: [
          "1 flight per month",
          "25 edited aerial stills",
          "60-sec progress edit",
          "Cloud gallery delivery",
        ],
      },
      {
        name: "Documentation",
        price: "$1,200",
        cadence: "/mo",
        blurb: "The standard for GCs and developers tracking a project.",
        featured: true,
        features: [
          "2 flights per month",
          "60 edited aerial stills",
          "2-min cinematic edit",
          "Pre/construction/post timeline",
          "Insurance-ready archive",
        ],
      },
      {
        name: "Portfolio",
        price: "$2,500",
        cadence: "/mo",
        blurb: "Multi-site coverage for active builders and roofers.",
        features: [
          "Up to 4 sites / 4 flights",
          "150 edited stills",
          "Per-site cinematic edits",
          "Priority scheduling",
        ],
      },
      {
        name: "Enterprise",
        price: "$5,000",
        cadence: "/mo",
        blurb: "Portfolio-wide documentation with dedicated production.",
        features: [
          "Unlimited sites (scoped)",
          "Dedicated pilot + editor",
          "Branded deliverables",
          "Same-week turnaround",
        ],
      },
    ],
  },
  {
    slug: "livestream",
    name: "Event Livestreaming",
    flagship: true,
    eyebrow: "Multi-Camera Broadcast · Flagship",
    tagline: "Reach the people who can't be there.",
    summary:
      "Professional multi-camera livestreaming for weddings, religious services, memorials, nonprofit galas, and corporate conferences. Broadcast-quality video, reliable streams, and a recorded archive.",
    priceRange: "$699–$6,000/event",
    href: "/livestream",
    image: "/images/wedding_livestream.png",
    imageAlt:
      "Multi-camera livestream production of a Jacksonville event",
    bullets: [
      "Multi-camera switching with professional audio",
      "Stream to YouTube, Facebook, Vimeo, or private link",
      "On-site technical director — no dropouts, no surprises",
      "Edited recording delivered after the event",
    ],
    packages: [
      {
        name: "Single Cam",
        price: "$699",
        cadence: "/event",
        blurb: "One camera, clean audio, reliable single-destination stream.",
        features: [
          "1 operated camera",
          "Pro audio capture",
          "Stream to 1 platform",
          "Full recording delivered",
        ],
      },
      {
        name: "Multi-Cam",
        price: "$1,800",
        cadence: "/event",
        blurb: "Three-camera switched broadcast for weddings & services.",
        featured: true,
        features: [
          "3 cameras, live switching",
          "Mixed multi-source audio",
          "Lower-thirds & graphics",
          "Stream to 2 platforms",
          "Edited highlight + full recording",
        ],
      },
      {
        name: "Conference",
        price: "$3,500",
        cadence: "/event",
        blurb: "Full-day corporate and nonprofit event production.",
        features: [
          "Up to 4 cameras",
          "Slides & presenter capture",
          "Branded streaming page",
          "On-site director + assistant",
        ],
      },
      {
        name: "Production",
        price: "$6,000",
        cadence: "/event",
        blurb: "Large-scale, multi-room or multi-day broadcast.",
        features: [
          "Custom camera plan",
          "Multi-room / multi-day",
          "Redundant streaming",
          "Post-event edit package",
        ],
      },
    ],
  },
  {
    slug: "short-form",
    name: "Short-Form Video",
    flagship: false,
    eyebrow: "Reels · TikTok · Shorts",
    tagline: "Stay in the feed, every week.",
    summary:
      "Vertical video built for Reels, TikTok, and Shorts. A monthly content engine that keeps your brand in front of the people you want to reach across Northeast Florida.",
    priceRange: "$699–$1,999/mo",
    href: "/services#short-form",
    image: "/images/video_production_edit.png",
    imageAlt: "Short-form vertical video editing for social media",
    bullets: [
      "Scripted, shot, and edited vertical video",
      "Hooks and captions optimized for retention",
      "Consistent monthly publishing cadence",
      "Repurposed from your shoots and events",
    ],
    packages: [
      {
        name: "Starter",
        price: "$699",
        cadence: "/mo",
        blurb: "4 vertical videos a month to build momentum.",
        features: [
          "4 edited verticals / mo",
          "Captions + hooks",
          "1 shoot day",
        ],
      },
      {
        name: "Growth",
        price: "$1,299",
        cadence: "/mo",
        blurb: "8 videos a month with a real content plan.",
        featured: true,
        features: [
          "8 edited verticals / mo",
          "Content calendar",
          "2 shoot days",
          "Trend & sound research",
        ],
      },
      {
        name: "Brand",
        price: "$1,999",
        cadence: "/mo",
        blurb: "12+ videos with full creative direction.",
        features: [
          "12+ edited verticals / mo",
          "Creative direction",
          "Priority editing",
          "Monthly performance review",
        ],
      },
    ],
  },
];

export function getService(slug: ServiceSlug): Service {
  const svc = SERVICES.find((s) => s.slug === slug);
  if (!svc) throw new Error(`Unknown service: ${slug}`);
  return svc;
}

/** Service-interest options for the general contact form dropdown. */
export const SERVICE_INTERESTS = [
  "Drone Documentation",
  "Event Livestreaming",
  "Short-Form Video",
  "Multiple Services",
  "Something Else",
] as const;

/** Hero verticals — the 5 rotating banners. */
export interface HeroVertical {
  key: string;
  name: string;
  valueProp: string;
  image: string;
  imageAlt: string;
}

export const HERO_VERTICALS: HeroVertical[] = [
  {
    key: "commercial",
    name: "Commercial",
    valueProp:
      "Ground-up commercial builds, documented for investors from groundbreaking to grand opening.",
    image: "/images/drone_site_comparison.png",
    imageAlt: "Aerial view of a commercial construction site in Jacksonville",
  },
  {
    key: "residential",
    name: "Residential",
    valueProp:
      "Custom homes and developments captured before, during, and after — the whole story from the air.",
    image: "/images/drone_luxury_comparison.png",
    imageAlt: "Aerial documentation of a custom residential build",
  },
  {
    key: "roofing",
    name: "Roofing",
    valueProp:
      "Insurance-ready documentation from tear-off to final inspection — proof at every stage.",
    image: "/images/drone_roof_comparison.png",
    imageAlt: "Aerial roofing documentation showing tear-off through completion",
  },
  {
    key: "hvac",
    name: "HVAC",
    valueProp:
      "Rooftop unit installs and system documentation that ground-level photos simply can't show.",
    image: "/images/drone_site_comparison.png",
    imageAlt: "Aerial documentation of rooftop HVAC unit installation",
  },
  {
    key: "real-estate",
    name: "Real Estate",
    valueProp:
      "Listing-ready aerials that frame the property, the lot, and the location in their best light.",
    image: "/images/drone_florida.png",
    imageAlt: "Aerial real estate photography of a Northeast Florida property",
  },
];

/** Construction documentation stages, color-coded per brand. */
export const DOC_STAGES = [
  { label: "Pre-Construction", color: "electric-blue" as const },
  { label: "Construction", color: "signal-red" as const },
  { label: "Post-Construction", color: "live-green" as const },
];

export const TRUST_POINTS = [
  "FAA Part 107 Licensed",
  "Jacksonville-Based",
  "Fully Insured",
  "Serving Northeast Florida",
];
