import type { ReactNode } from "react";

export function Section({
  id,
  title,
  children,
  className = "",
}: {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-16 sm:py-20 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id={`${id}-title`} className="mb-10 text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
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
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-colors min-h-11";

export const buttonStyles = {
  primary: `${buttonBase} bg-accent text-accent-fg hover:opacity-90`,
  secondary: `${buttonBase} border border-border text-fg hover:border-accent hover:text-accent`,
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
