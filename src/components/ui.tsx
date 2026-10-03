import type { CSSProperties, ReactNode } from "react";

/** Spread onto an element to fade it in on scroll; `step` staggers siblings. */
export function reveal(step = 0) {
  return {
    "data-reveal": "",
    style: { "--reveal-delay": `${Math.min(step, 8) * 80}ms` } as CSSProperties,
  };
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-xs text-muted">
      {children}
    </span>
  );
}

export function TagList({ items, label }: { items: string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-all duration-200 ease-out min-h-12";

export const buttonStyles = {
  primary: `${buttonBase} bg-accent text-accent-fg hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_var(--accent)]`,
  secondary: `${buttonBase} border border-border text-fg hover:-translate-y-0.5 hover:border-accent hover:text-accent`,
};

export function formatYearMonth(value: string): string {
  if (value === "present") return "Present";
  const [y, m] = value.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function durationLabel(start: string, end: string): string {
  const now = new Date();
  const [sy, sm] = start.split("-").map(Number);
  const [ey, em] =
    end === "present" ? [now.getUTCFullYear(), now.getUTCMonth() + 1] : end.split("-").map(Number);
  const months = (ey - sy) * 12 + (em - sm) + 1; // inclusive of both months
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return [years && `${years} yr${years > 1 ? "s" : ""}`, rest && `${rest} mo${rest > 1 ? "s" : ""}`]
    .filter(Boolean)
    .join(" ");
}
