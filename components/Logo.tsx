import Image from "next/image";
import { SITE } from "@/lib/site";

type LogoVariant = "full" | "icon" | "wordmark";

interface LogoProps {
  variant?: LogoVariant;
  /** Rendered pixel height; width scales automatically. */
  height?: number;
  className?: string;
  priority?: boolean;
}

const SOURCES: Record<
  LogoVariant,
  { src: string; ratio: number; alt: string }
> = {
  // ratio = width / height of the source asset
  full: {
    src: "/brand/logo/full_logo_knockout.png",
    ratio: 5.674,
    alt: `${SITE.name} logo`,
  },
  wordmark: {
    src: "/brand/logo/wordmark_light.png",
    ratio: 4.2,
    alt: `${SITE.name} wordmark`,
  },
  icon: {
    src: "/brand/logo/icon_on_black.png",
    ratio: 1.086,
    alt: `${SITE.name} icon`,
  },
};

/**
 * Brand logo. Never recolor, stretch, or add shadows — we only scale uniformly.
 * Min digital height honored via the `height` prop (default 32px).
 */
export default function Logo({
  variant = "full",
  height = 36,
  className = "",
  priority = false,
}: LogoProps) {
  const { src, ratio, alt } = SOURCES[variant];
  const width = Math.round(height * ratio);
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={`${width}px`}
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}
