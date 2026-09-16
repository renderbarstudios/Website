import Link from "next/link";
import Image from "next/image";
import type { MDXComponents } from "mdx/types";

/** In-article image with caption. Use in MDX as <Figure src alt caption />. */
function Figure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-10">
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/10">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-xs text-mid-gray">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Brand-styled renderers for MDX blog content. */
export const mdxComponents: MDXComponents = {
  Figure,
  // Markdown image fallback (![alt](src)) — styled, lazy-loaded.
  img: ({ src = "", alt = "" }) => (
    <Figure src={String(src)} alt={String(alt)} />
  ),
  h2: (props) => (
    <h2
      className="mt-12 text-h2 font-extrabold tracking-tighter2 text-off-white"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-8 text-h3 font-bold text-off-white" {...props} />
  ),
  p: (props) => (
    <p className="mt-5 text-base leading-relaxed text-off-white/85" {...props} />
  ),
  ul: (props) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 text-off-white/85" {...props} />
  ),
  ol: (props) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-6 text-off-white/85"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  strong: (props) => (
    <strong className="font-bold text-off-white" {...props} />
  ),
  hr: () => <hr className="my-10 border-white/10" />,
  blockquote: (props) => (
    <blockquote
      className="mt-6 border-l-2 border-signal-red pl-5 italic text-mid-gray"
      {...props}
    />
  ),
  a: ({ href = "#", ...props }) => {
    const isInternal = href.startsWith("/");
    if (isInternal) {
      return <Link href={href} className="link" {...props} />;
    }
    return (
      <a
        href={href}
        className="link"
        rel="noopener noreferrer"
        target="_blank"
        {...props}
      />
    );
  },
};
