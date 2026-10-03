import {
  About,
  CertificatesSection,
  ContactSection,
  ExperienceSection,
  Hero,
  ProjectsSection,
  SkillsSection,
} from "@/components/sections";
import {
  getCertificates,
  getContact,
  getEducation,
  getExperience,
  getProfile,
  getProjects,
  getSkills,
  getSoftSkills,
} from "@/lib/content";

// Order follows src/lib/sections.ts (Change Request #5).
export default function HomePage() {
  const profile = getProfile();
  const contact = getContact();
  const projects = getProjects();
  const experience = getExperience();
  const certificates = getCertificates();

  return (
    <>
      <Hero profile={profile} contact={contact} />
      <About profile={profile} experience={experience} education={getEducation()[0]} />
      <ExperienceSection items={experience} projects={projects} />
      <ProjectsSection projects={projects} />
      <SkillsSection categories={getSkills()} softSkills={getSoftSkills()} />
      {certificates.length > 0 && <CertificatesSection items={certificates} />}
      <ContactSection contact={contact} />
    </>
  );
}
