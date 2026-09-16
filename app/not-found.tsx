import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="container-rb flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="display text-off-white">This shot didn&apos;t land.</h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-mid-gray">
        The page you&apos;re looking for has moved or never existed. Let&apos;s
        get you back to solid ground.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="btn-primary">
          Back Home
        </Link>
        <Link href="/contact" className="btn-secondary">
          Contact Us
        </Link>
      </div>
    </section>
  );
}
