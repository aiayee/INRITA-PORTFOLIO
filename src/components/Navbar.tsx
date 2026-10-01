"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export type NavItem = { id: string; label: string };

type Props = {
  brand: string;
  items: NavItem[];
  resumeHref: string;
};

export function Navbar({ brand, items, resumeHref }: Props) {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const active = useActiveSection(onHome ? items.map((i) => i.id) : []);

  // Full-screen mobile menu: lock page scroll and close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/85 backdrop-blur-md">
        <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
          <Link href="/" className="font-mono text-sm font-semibold tracking-tight" onClick={() => setOpen(false)}>
            <span className="text-accent">~/</span>
            {brand}
          </Link>
  
          <ul className="ml-auto hidden items-center gap-1 lg:flex">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={href(item.id)}
                  aria-current={active === item.id ? "true" : undefined}
                  className={`rounded-md px-3 py-2 text-sm transition-colors hover:text-fg ${
                    active === item.id ? "font-medium text-accent" : "text-muted"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
  
          <div className="ml-auto flex items-center gap-1 lg:ml-2">
            <ThemeToggle />
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener"
              className="hidden rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90 sm:inline-block"
            >
              Resume
            </a>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-lg text-fg hover:bg-accent-soft lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Outside <header>: its backdrop-filter would otherwise become the
          containing block for this fixed overlay and collapse it to 0px. */}
      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-bg lg:hidden">
          <ul className="flex flex-col px-4 py-6">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={href(item.id)}
                  onClick={() => setOpen(false)}
                  className={`block border-b border-border py-4 text-lg ${
                    active === item.id ? "font-medium text-accent" : "text-fg"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-4">
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener"
              className="block rounded-lg bg-accent px-4 py-3 text-center font-medium text-accent-fg"
            >
              Download Resume
            </a>
          </div>
        </div>
      )}
    </>
  );
}

/** Id of the section currently under the navbar (scroll spy). */
function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    if (!key) return;
    const list = key.split(",");
    let frame = 0;
    const update = () => {
      frame = 0;
      let current: string | null = null;
      for (const id of list) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      // At the very bottom the last (often short) section should win.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = list[list.length - 1];
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [key]);

  return active;
}
