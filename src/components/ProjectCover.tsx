import { findIcon } from "./SkillIcon";

/**
 * Generated cover for projects without their own image: an abstract
 * "pipeline" of the project's tech stack. Contains no real system details,
 * so it is safe for confidential work projects. Colours follow the theme.
 */
export function ProjectCover({
  slug,
  stack,
  label,
  className = "",
}: {
  slug: string;
  stack: string[];
  label: string;
  className?: string;
}) {
  const seed = hash(slug);
  const nodes = stack.slice(0, 4);
  const W = 640;
  const H = 360;
  const gap = W / (nodes.length + 1);
  const points = nodes.map((name, i) => ({
    name,
    x: gap * (i + 1),
    // Deterministic zig-zag so each project gets its own shape.
    y: H / 2 + (((seed >>> (i * 3)) % 5) - 2) * 14 + (i % 2 ? 22 : -22),
    icon: findIcon(name),
  }));
  const gid = `cover-${slug}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-label={`${label} illustration`}>
      <defs>
        <linearGradient id={`${gid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--accent-soft)" />
          <stop offset="1" stopColor="var(--surface)" />
        </linearGradient>
        <pattern id={`${gid}-dots`} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="var(--accent)" opacity="0.18" />
        </pattern>
        <radialGradient id={`${gid}-glow`} cx={0.2 + (seed % 60) / 100} cy="0.3" r="0.6">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.25" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${gid}-bg)`} />
      <rect width={W} height={H} fill={`url(#${gid}-glow)`} />
      <rect width={W} height={H} fill={`url(#${gid}-dots)`} />

      {points.slice(1).map((p, i) => {
        const a = points[i];
        const mid = (a.x + p.x) / 2;
        return (
          <path
            key={p.name}
            d={`M${a.x} ${a.y} C ${mid} ${a.y}, ${mid} ${p.y}, ${p.x} ${p.y}`}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeDasharray="8 8"
            opacity="0.6"
          />
        );
      })}

      {points.map((p) => (
        <g key={p.name} transform={`translate(${p.x - 44} ${p.y - 44})`}>
          <rect width="88" height="88" rx="22" fill="var(--bg)" stroke="var(--accent)" strokeOpacity="0.45" strokeWidth="2" />
          {p.icon ? (
            <svg x="24" y="24" width="40" height="40" viewBox="0 0 24 24">
              <path d={p.icon.path} fill="var(--accent)" />
            </svg>
          ) : (
            <text x="44" y="52" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="22" fontWeight="700" fill="var(--accent)">
              {p.name.slice(0, 3)}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}
