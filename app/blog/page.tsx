import Link from "next/link";
import type { Metadata } from "next";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { getAllPosts, formatDate } from "@/lib/blog";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog | Production, Drones & Local Marketing",
  description:
    "Insights on drone documentation, event livestreaming, and growing a contracting or events business in Jacksonville and Northeast Florida — from Renderbar Studios.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Renderbar Studios Blog",
    description:
      "Field notes on documentation, broadcasts, and growth for contractors, developers, and event hosts across Northeast Florida.",
    url: `${SITE.url}/blog`,
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      <section className="border-b border-white/10">
        <div className="container-rb py-20 sm:py-24">
          <p className="eyebrow mb-4">The Renderbar Blog</p>
          <h1 className="display max-w-3xl text-balance text-off-white">
            Field notes on documentation, broadcasts, and growth.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-mid-gray">
            Practical insights for contractors, developers, and event hosts
            across Northeast Florida.
          </p>
        </div>
      </section>

      <section className="container-rb py-16 sm:py-20">
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="card group flex flex-col transition-colors hover:border-white/25"
            >
              <div className="flex flex-wrap items-center gap-2">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-label text-link-blue"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mt-4 text-xl font-bold leading-snug text-off-white">
                <Link
                  href={`/blog/${post.slug}`}
                  className="transition-colors group-hover:text-signal-red"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-mid-gray">
                {post.description}
              </p>
              <div className="mt-6 flex items-center gap-3 text-xs text-mid-gray">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden>·</span>
                <span>{post.readingTime}</span>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 text-sm font-bold uppercase tracking-label text-signal-red"
                aria-label={`Read ${post.title}`}
              >
                Read Article →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
