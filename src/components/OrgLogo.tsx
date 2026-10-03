import { asset } from "@/lib/paths";

const SKIP = new Set(["co", "ltd", "inc", "llc", "plc", "public", "company", "limited", "of", "the", "and"]);

/** "Siam Piwat Co., Ltd." → "SP", "King Mongkut's University of Technology Thonburi" → "KMUTT" */
function initials(name: string): string {
  return name
    .split(/[\s,.]+/)
    .filter((w) => w && !SKIP.has(w.toLowerCase()) && /^[A-Z]/.test(w))
    .map((w) => w[0])
    .join("")
    .slice(0, 5);
}

/**
 * Company / university logo. Sits on a white tile so logos made for light
 * backgrounds stay legible in dark mode. Falls back to initials.
 * Spans only, so it is valid inside <summary>.
 */
export function OrgLogo({ src, name, className = "" }: { src?: string; name: string; className?: string }) {
  const base = "grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl border border-border";
  if (src) {
    return (
      <span className={`${base} bg-white p-1 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(src)} alt={`${name} logo`} width={40} height={40} loading="lazy" className="size-full object-contain" />
      </span>
    );
  }
  const text = initials(name) || name.slice(0, 2).toUpperCase();
  return (
    <span
      aria-hidden="true"
      className={`${base} bg-accent-soft font-mono font-bold text-accent-soft-fg ${text.length > 3 ? "text-[0.6rem]" : "text-sm"} ${className}`}
    >
      {text}
    </span>
  );
}
