// Single source of truth for the home page order (confirmed in requirements):
// Hero → About → Experience → Projects → Skills → Education → Certificates → Contact
export type SectionId =
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "education"
  | "certificates"
  | "contact";

const ORDER: { id: SectionId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

/** Visible sections; empty ones are dropped from both the page and the menu. */
export function homeSections({ hasCertificates }: { hasCertificates: boolean }) {
  return ORDER.filter((s) => s.id !== "certificates" || hasCertificates);
}
