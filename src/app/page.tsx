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

  const render: Record<SectionId, () => React.ReactNode> = {
    about: () => <About profile={profile} />,
    experience: () => <ExperienceSection items={getExperience()} projects={projects} />,
    projects: () => <ProjectsSection projects={projects} />,
    skills: () => <SkillsSection categories={getSkills()} />,
    education: () => <EducationSection items={getEducation()} />,
    certificates: () => <CertificatesSection items={certificates} />,
    contact: () => <ContactSection contact={getContact()} />,
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
