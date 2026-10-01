import * as simpleIcons from "simple-icons";

type SimpleIcon = { slug: string; title: string; path: string };

// Server-only lookup: only the SVG paths that are actually used end up in the HTML.
const all = Object.values(simpleIcons as Record<string, unknown>).filter(
  (v): v is SimpleIcon => typeof v === "object" && v !== null && "slug" in v && "path" in v,
);
const bySlug = new Map(all.map((icon) => [icon.slug, icon]));
const byTitle = new Map(all.map((icon) => [normalize(icon.title), icon]));

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/** Finds an icon by slug ("apacheairflow") or display name ("Apache Airflow", "BigQuery"). */
export function findIcon(nameOrSlug?: string): SimpleIcon | undefined {
  if (!nameOrSlug) return undefined;
  const key = normalize(nameOrSlug);
  if (!key) return undefined;
  return (
    bySlug.get(nameOrSlug) ??
    byTitle.get(key) ??
    bySlug.get(key) ??
    // e.g. "BigQuery" → "googlebigquery"
    (key.length >= 5 ? all.find((icon) => icon.slug.endsWith(key)) : undefined)
  );
}

export function SkillIcon({ slug, className = "size-4" }: { slug?: string; className?: string }) {
  const icon = findIcon(slug);
  if (!icon) return null;
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0`} fill="currentColor" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}
