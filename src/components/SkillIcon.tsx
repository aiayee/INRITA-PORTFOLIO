import * as simpleIcons from "simple-icons";

type SimpleIcon = { slug: string; title: string; path: string };

// Server-only lookup: only the SVG paths that are actually used end up in the HTML.
const bySlug = new Map<string, SimpleIcon>(
  Object.values(simpleIcons as Record<string, unknown>)
    .filter((v): v is SimpleIcon => typeof v === "object" && v !== null && "slug" in v && "path" in v)
    .map((icon) => [icon.slug, icon]),
);

export function SkillIcon({ slug }: { slug?: string }) {
  const icon = slug ? bySlug.get(slug) : undefined;
  if (!icon) return null;
  return (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="currentColor" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}
