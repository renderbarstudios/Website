"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_VERTICALS } from "@/lib/site";
import StageTimeline from "./StageTimeline";

const AUTO_MS = 6000;
const COUNT = HERO_VERTICALS.length;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Respect prefers-reduced-motion (no auto-advance).
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const go = useCallback((dir: 1 | -1) => {
    setIndex((i) => (i + dir + COUNT) % COUNT);
  }, []);
  const goTo = useCallback((i: number) => setIndex(i), []);

  // Auto-advance, paused on hover/focus or reduced motion.
  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => go(1), AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, reduced, go]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Drone documentation by industry"
      className="relative isolate overflow-hidden bg-void-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* One semantic H1 for the page (SEO + a11y), visually hidden. */}
      <h1 className="sr-only">
        Renderbar Studios — FAA Part 107 drone documentation for commercial,
        residential, roofing, HVAC, and real estate projects in Jacksonville and
        Northeast Florida.
      </h1>

      <div className="relative h-[640px] min-h-[80svh] w-full sm:h-[680px]">
        {HERO_VERTICALS.map((v, i) => {
          const active = i === index;
          return (
            <div
              key={v.key}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${COUNT}: ${v.name}`}
              aria-hidden={!active}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <Image
                src={v.image}
                alt={v.imageAlt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
              {/* Legibility overlays */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-void-black via-void-black/80 to-void-black/30"
                aria-hidden
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-void-black via-transparent to-void-black/40"
                aria-hidden
              />

              <div className="container-rb relative flex h-full flex-col justify-center">
                <div
                  className={`max-w-2xl transition-all duration-700 ${
                    active
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0"
                  }`}
                >
                  <p className="eyebrow mb-4">
                    Drone Documentation · {v.name}
                  </p>
                  <StageTimeline className="mb-6" />
                  <h2 className="display text-off-white">{v.name}</h2>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-off-white/85">
                    {v.valueProp}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link href="/drone" className="btn-primary">
                      Get a Free Aerial Quote →
                    </Link>
                    <Link href="/services" className="btn-secondary">
                      All Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Prev / Next */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-void-black/50 p-3 text-off-white backdrop-blur transition-colors hover:border-white/60 hover:bg-void-black/70 sm:flex"
        >
          <Chevron dir="left" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-void-black/50 p-3 text-off-white backdrop-blur transition-colors hover:border-white/60 hover:bg-void-black/70 sm:flex"
        >
          <Chevron dir="right" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-3">
          {HERO_VERTICALS.map((v, i) => {
            const active = i === index;
            return (
              <button
                key={v.key}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to ${v.name} slide`}
                aria-current={active ? "true" : undefined}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  active
                    ? "w-8 bg-signal-red"
                    : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Live region for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Slide ${index + 1} of ${COUNT}: ${HERO_VERTICALS[index].name}. ${HERO_VERTICALS[index].valueProp}`}
      </div>
    </section>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {dir === "left" ? (
        <polyline points="15 18 9 12 15 6" />
      ) : (
        <polyline points="9 18 15 12 9 6" />
      )}
    </svg>
  );
}
