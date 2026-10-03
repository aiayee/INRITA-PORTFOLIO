"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * Extra content that continues straight under what is already shown, with the
 * toggle button below it. Collapsing only happens when JS runs (html.js), so
 * without JavaScript everything is simply visible and the button is hidden.
 */
export function MoreDetails({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <>
      <div id={id} className={`xp-more ${open ? "is-open" : ""}`}>
        <div className="min-h-0 overflow-hidden">{children}</div>
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="xp-toggle mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-sm font-semibold text-accent transition-colors hover:border-accent"
      >
        {open ? "Hide details" : "View details"}
        <svg
          viewBox="0 0 24 24"
          className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </>
  );
}
