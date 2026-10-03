// Home page sections in order (Change Request #5):
// Hero → About (+ education, key numbers) → Experience → Projects → Skills
// (technical + soft) → Certificates (only when present) → Contact
export type SectionId = "hero" | "about" | "experience" | "projects" | "skills" | "certificates" | "contact";

const ORDER: { id: SectionId; label: string }[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

/** Visible sections; empty ones are dropped from both the page and the menu. */
export function homeSections({ hasCertificates }: { hasCertificates: boolean }) {
  return ORDER.filter((s) => s.id !== "certificates" || hasCertificates);
}
