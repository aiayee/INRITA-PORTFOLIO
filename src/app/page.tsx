import {
  About,
  CertificatesSection,
  ContactSection,
  EducationSection,
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
} from "@/lib/content";
import { homeSections, type SectionId } from "@/lib/sections";

export default function HomePage() {
  const profile = getProfile();
  const projects = getProjects();
  const certificates = getCertificates();

  const visible = homeSections({ hasCertificates: certificates.length > 0 });
  const index = (id: SectionId) => String(visible.findIndex((s) => s.id === id) + 1).padStart(2, "0");

  const render: Record<SectionId, () => React.ReactNode> = {
    about: () => <About profile={profile} index={index("about")} />,
    experience: () => <ExperienceSection items={getExperience()} projects={projects} index={index("experience")} />,
    projects: () => <ProjectsSection projects={projects} index={index("projects")} />,
    skills: () => <SkillsSection categories={getSkills()} index={index("skills")} />,
    education: () => <EducationSection items={getEducation()} index={index("education")} />,
    certificates: () => <CertificatesSection items={certificates} index={index("certificates")} />,
    contact: () => <ContactSection contact={getContact()} index={index("contact")} />,
  };

  return (
    <>
      <Hero profile={profile} />
      {visible.map((s) => (
        <div key={s.id}>{render[s.id]()}</div>
      ))}
    </>
  );
}
