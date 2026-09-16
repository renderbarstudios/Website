import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/MDXComponents";
import JsonLd, { articleSchema, breadcrumbSchema } from "@/components/JsonLd";
import CTAStrip from "@/components/CTAStrip";
import { getAllSlugs, getPostBySlug, formatDate } from "@/lib/blog";
import { SITE } from "@/lib/site";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${SITE.url}/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.description,
          slug: post.slug,
          date: post.date,
          author: post.author,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <article className="border-b border-white/10">
        <div className="container-rb max-w-3xl py-16 sm:py-20">
          <Link
            href="/blog"
            className="text-xs font-bold uppercase tracking-label text-mid-gray transition-colors hover:text-off-white"
          >
            ← Back to Blog
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-label text-link-blue"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-5 text-h2 font-black leading-tight tracking-tighter2 text-off-white sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-mid-gray">
            {post.description}
          </p>
          <div className="mt-6 flex items-center gap-3 text-xs text-mid-gray">
            <span>{post.author}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
          </div>

          <div className="mt-10">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </div>
      </article>

      <CTAStrip />
    </>
  );
}
