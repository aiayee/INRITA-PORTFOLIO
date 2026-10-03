import { findIcon } from "./SkillIcon";

export type ContactKind = "email" | "phone" | "line" | "linkedin" | "github" | "location";

// One palette for every channel so the card reads as a set; the tile fills
// with the accent when its row (a .group) is hovered.
const TILE =
  "bg-accent-soft text-accent-soft-fg transition-colors duration-200 group-hover:bg-accent group-hover:text-accent-fg";

const OUTLINE: Partial<Record<ContactKind, React.ReactNode>> = {
  email: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  ),
  location: (
    <>
      <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
};

export function ContactIcon({ kind, className = "size-10" }: { kind: ContactKind; className?: string }) {
  const brand = kind === "line" ? findIcon("line") : kind === "github" ? findIcon("github") : undefined;

  return (
    <span aria-hidden="true" className={`grid shrink-0 place-items-center rounded-xl ${TILE} ${className}`}>
      {brand ? (
        <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
          <path d={brand.path} />
        </svg>
      ) : kind === "linkedin" ? (
        // simple-icons no longer ships the LinkedIn mark; a plain "in" wordmark instead.
        <span className="font-sans text-base leading-none font-bold">in</span>
      ) : (
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {OUTLINE[kind]}
        </svg>
      )}
    </span>
  );
}
