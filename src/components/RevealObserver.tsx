"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Adds `is-visible` to every [data-reveal] element as it scrolls into view.
 * Hiding only applies when <html> has the `js` class (set before paint), so
 * content is never hidden for visitors without JavaScript.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const all = [...document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)")];
    if (!("IntersectionObserver" in window)) {
      all.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    // Whatever is already on screen shows right away, without waiting for
    // the observer (which never fires in a background tab).
    const els = all.filter((el) => {
      const inView = el.getBoundingClientRect().top < window.innerHeight;
      if (inView) el.classList.add("is-visible");
      return !inView;
    });
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
