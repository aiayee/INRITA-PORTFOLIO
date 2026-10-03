"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

export type Slide = { src: string; alt: string; caption?: string };

const AUTOPLAY_MS = 4000;

/**
 * Slide viewer: main image that advances on its own, a thumbnail strip with
 * arrows underneath, and a full-screen viewer when the image is clicked.
 * Autoplay pauses on hover/focus, while the viewer is open, when the tab is
 * hidden, and is off for visitors who prefer reduced motion.
 */
export function SlideCarousel({ slides, fallback }: { slides: Slide[]; fallback?: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const strip = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const swipeX = useRef<number | null>(null);
  const swiped = useRef(false); // a swipe must not also count as a click
  const count = slides.length;

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  // Reduced motion: never start autoplay.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  // Autoplay
  useEffect(() => {
    if (!playing || hovered || zoomed || count < 2) return;
    const t = setTimeout(() => {
      if (document.visibilityState === "visible") go(index + 1);
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [playing, hovered, zoomed, index, count, go]);

  // Keep the active thumbnail visible inside the strip (without moving the page).
  useEffect(() => {
    const el = strip.current;
    const thumb = el?.children[index] as HTMLElement | undefined;
    if (!el || !thumb) return;
    const left = thumb.offsetLeft - (el.clientWidth - thumb.clientWidth) / 2;
    el.scrollTo({ left, behavior: "smooth" });
  }, [index]);

  // Full-screen viewer
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (zoomed && !d.open) d.showModal();
    if (!zoomed && d.open) d.close();
  }, [zoomed]);

  if (count === 0) return <>{fallback}</>;

  const slide = slides[index];
  const keys = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(index + 1);
    if (e.key === "ArrowLeft") go(index - 1);
  };
  const swipe = {
    onPointerDown: (e: React.PointerEvent) => (swipeX.current = e.clientX),
    onPointerUp: (e: React.PointerEvent) => {
      if (swipeX.current === null) return;
      const dx = e.clientX - swipeX.current;
      swipeX.current = null;
      swiped.current = Math.abs(dx) > 40;
      if (swiped.current) go(index + (dx < 0 ? 1 : -1));
    },
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Project slides"
      onKeyDown={keys}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {/* main image */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-2" {...swipe}>
        <button
          type="button"
          onClick={() => {
            if (swiped.current) swiped.current = false;
            else setZoomed(true);
          }}
          aria-label={`View slide ${index + 1} full screen`}
          className="group relative block aspect-video w-full cursor-zoom-in"
        >
          {slides.map((s, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={s.src}
              src={s.src}
              alt={i === index ? s.alt : ""}
              aria-hidden={i !== index}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
              className={`absolute inset-0 size-full object-contain transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          <span className="absolute right-3 bottom-3 grid size-11 place-items-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-transform group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
            </svg>
          </span>
        </button>
        {/* autoplay progress */}
        {playing && count > 1 && (
          <span
            key={`${index}-${hovered || zoomed}`}
            aria-hidden="true"
            className={`slide-progress absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent ${hovered || zoomed ? "[animation-play-state:paused]" : ""}`}
            style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
          />
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 text-sm">
        <p className="min-w-0 truncate text-muted" aria-live={playing ? "off" : "polite"}>
          <span className="font-mono text-xs">
            {index + 1} / {count}
          </span>
          {slide.caption && <span className="ml-2">{slide.caption}</span>}
        </p>
        {count > 1 && (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
              {playing ? <path d="M7 5h3v14H7zM14 5h3v14h-3z" /> : <path d="M8 5l11 7-11 7z" />}
            </svg>
          </button>
        )}
      </div>

      {/* thumbnail strip */}
      {count > 1 && (
        <div className="mt-3 flex items-center gap-2">
          <ArrowButton dir="prev" onClick={() => go(index - 1)} />
          <div
            ref={strip}
            className="flex min-w-0 flex-1 gap-2 overflow-x-auto scroll-smooth py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show slide ${i + 1}${s.caption ? `: ${s.caption}` : ""}`}
                aria-current={i === index ? "true" : undefined}
                className={`w-[calc(25%-0.375rem)] min-w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  i === index ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt="" decoding="async" draggable={false} className="aspect-video w-full object-cover" />
              </button>
            ))}
          </div>
          <ArrowButton dir="next" onClick={() => go(index + 1)} />
        </div>
      )}

      {/* full-screen viewer */}
      <dialog
        ref={dialog}
        onClose={() => setZoomed(false)}
        onClick={(e) => e.target === e.currentTarget && setZoomed(false)}
        onKeyDown={keys}
        aria-label="Slide viewer"
        className="m-auto max-h-none max-w-none bg-transparent p-0 text-white backdrop:bg-black/85"
      >
        <div className="flex h-[100dvh] w-[100vw] flex-col items-center justify-center gap-4 p-4 sm:p-8" onClick={(e) => e.target === e.currentTarget && setZoomed(false)} {...swipe}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={slide.src} alt={slide.alt} className="max-h-[80dvh] max-w-full rounded-lg object-contain shadow-2xl" draggable={false} />
          <p className="text-center text-sm text-white/80">
            <span className="font-mono">
              {index + 1} / {count}
            </span>
            {slide.caption && <span className="ml-2">{slide.caption}</span>}
          </p>
          {count > 1 && (
            <div className="flex gap-3">
              <ArrowButton dir="prev" onClick={() => go(index - 1)} dark />
              <ArrowButton dir="next" onClick={() => go(index + 1)} dark />
            </div>
          )}
          <button
            type="button"
            onClick={() => setZoomed(false)}
            aria-label="Close viewer"
            className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/25"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </dialog>
    </div>
  );
}

function ArrowButton({ dir, onClick, dark }: { dir: "prev" | "next"; onClick: () => void; dark?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous slide" : "Next slide"}
      className={`grid size-11 shrink-0 place-items-center rounded-full border transition-colors ${
        dark ? "border-white/25 bg-white/10 hover:bg-white/25" : "border-border text-fg hover:border-accent hover:text-accent"
      }`}
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={dir === "prev" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
      </svg>
    </button>
  );
}
