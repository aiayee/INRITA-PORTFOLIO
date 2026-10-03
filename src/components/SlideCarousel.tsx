"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type Slide = { src: string; alt: string; caption?: string };

/**
 * Swipeable slide viewer (CSS scroll-snap) with arrows, dots and keyboard
 * support. Works as a plain horizontal scroller without JavaScript.
 */
export function SlideCarousel({ slides, fallback }: { slides: Slide[]; fallback?: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  if (slides.length === 0) return <>{fallback}</>;

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const next = (i + slides.length) % slides.length;
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Project slides"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
    >
      <div
        ref={track}
        tabIndex={0}
        className="flex snap-x snap-mandatory overflow-x-auto rounded-2xl border border-border bg-surface-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((s, i) => (
          <figure
            key={s.src}
            className="w-full shrink-0 snap-center"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.src}
              alt={s.alt}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className="aspect-video w-full object-contain"
            />
            {s.caption && <figcaption className="px-4 pt-2 pb-3 text-sm text-muted">{s.caption}</figcaption>}
          </figure>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex gap-1.5" aria-hidden="true">
            {slides.map((s, i) => (
              <span
                key={s.src}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-accent" : "w-1.5 bg-border"}`}
              />
            ))}
          </div>
          <p className="font-mono text-xs text-muted" aria-live="polite">
            {index + 1} / {slides.length}
          </p>
          <div className="flex gap-2">
            {[
              { label: "Previous slide", d: "M15 6l-6 6 6 6", to: index - 1 },
              { label: "Next slide", d: "M9 6l6 6-6 6", to: index + 1 },
            ].map((b) => (
              <button
                key={b.label}
                type="button"
                aria-label={b.label}
                onClick={() => go(b.to)}
                className="grid size-11 place-items-center rounded-full border border-border text-fg transition-colors hover:border-accent hover:text-accent"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={b.d} />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
