import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  author: string;
  readingTime: string;
  tags: string[];
}

export interface Post extends PostMeta {
  content: string;
}

function readSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

function parse(slug: string): Post | null {
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);
  const file = fs.existsSync(mdxPath)
    ? mdxPath
    : fs.existsSync(mdPath)
      ? mdPath
      : null;
  if (!file) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? "1970-01-01"),
    author: String(data.author ?? "Renderbar Studios"),
    readingTime: String(data.readingTime ?? "4 min read"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    content,
  };
}

/** All posts, newest first. */
export function getAllPosts(): PostMeta[] {
  return readSlugs()
    .map(parse)
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((p): PostMeta => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      date: p.date,
      author: p.author,
      readingTime: p.readingTime,
      tags: p.tags,
    }));
}

export function getPostBySlug(slug: string): Post | null {
  return parse(slug);
}

export function getAllSlugs(): string[] {
  return readSlugs();
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  if (!y || !m || !d) return iso;
  return `${months[m - 1]} ${d}, ${y}`;
}
