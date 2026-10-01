import Link from "next/link";
import type {
  Certificate,
  Contact,
  Education,
  Experience,
  Profile,
  Project,
  SkillCategory,
} from "@/lib/content";
import { asset } from "@/lib/paths";
import { CopyButton } from "./CopyButton";
import { ProjectCover } from "./ProjectCover";
import { SkillIcon } from "./SkillIcon";
import { Section, TagList, buttonStyles, durationLabel, formatYearMonth } from "./ui";

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="hero" aria-label="Introduction" className="relative overflow-hidden">
      {/* subtle grid: the "tech" accent of the design direction */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
      />
      <div className="hero-in relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-10 pb-12 sm:px-6 sm:pt-20 sm:pb-24 md:grid-cols-[1fr_auto]">
        <div className="order-2 md:order-1">
          <p className="font-mono text-sm text-accent">
            Hi, I&apos;m {profile.nickname} 👋
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{profile.nameEn}</h1>
          <p lang="th" className="mt-2 text-lg text-muted">
            {profile.nameTh}
          </p>
          <p className="mt-6 inline-block rounded-md bg-accent-soft px-3 py-1 font-mono text-sm font-medium text-accent-soft-fg sm:text-base">
            {profile.title}
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed sm:text-xl">{profile.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={asset(profile.resume)} target="_blank" rel="noopener" className={buttonStyles.primary}>
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
              </svg>
              Download Resume
            </a>
            <a href="#contact" className={buttonStyles.secondary}>
              Contact
            </a>
          </div>
        </div>
        <div className="order-1 md:order-2">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, files served as-is */}
          <img
            src={asset(profile.photo)}
            alt={`Photo of ${profile.nameEn}`}
            width={320}
            height={320}
            fetchPriority="high"
            className="size-24 rounded-2xl border border-border bg-surface object-cover shadow-sm sm:size-36 md:size-64 lg:size-72"
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export function About({ profile }: { profile: Profile }) {
  return (
    <Section id="about" title="About Me">
      <div className="prose-content max-w-3xl text-base sm:text-lg" dangerouslySetInnerHTML={{ __html: profile.aboutHtml }} />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

const EXPERIENCE_TYPE: Record<Experience["type"], string> = {
  internship: "Internship",
  contract: "Contract",
  "full-time": "Full-time",
  "part-time": "Part-time",
};

export function ExperienceSection({
  items,
  projects,
}: {
  items: Experience[];
  projects: Project[];
}) {
  const titleOf = new Map(projects.map((p) => [p.slug, p.title]));
  return (
    <Section id="experience" title="Experience" className="bg-surface">
      <ol className="relative max-w-3xl border-l-2 border-border pl-6 sm:pl-8">
        {items.map((exp) => (
          <li key={exp.id} className="relative pb-12 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[31px] size-3.5 rounded-full border-2 border-accent bg-bg sm:-left-[39px]"
            />
            <p className="font-mono text-xs text-muted sm:text-sm">
              {formatYearMonth(exp.start)} — {formatYearMonth(exp.end)}
              <span className="mx-2">·</span>
              {durationLabel(exp.start, exp.end)}
            </p>
            <h3 className="mt-1 text-xl font-semibold">{exp.role}</h3>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted">
              <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-soft-fg">
                {EXPERIENCE_TYPE[exp.type]}
              </span>
              {exp.companyDescriptor && <span>{exp.companyDescriptor}</span>}
            </p>
            <div className="prose-content mt-4 text-[0.95rem]" dangerouslySetInnerHTML={{ __html: exp.bodyHtml }} />
            <div className="mt-4">
              <TagList items={exp.stack} label={`Tech stack used as ${exp.role}`} />
            </div>
            {exp.relatedProjects.length > 0 && (
              <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                {exp.relatedProjects.map((slug) => (
                  <Link key={slug} href={`/projects/${slug}/`} className="font-medium text-accent hover:underline">
                    Case study: {titleOf.get(slug)} →
                  </Link>
                ))}
              </p>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export const PROJECT_TYPE: Record<Project["type"], string> = {
  work: "Work",
  academic: "Academic",
  side: "Side Project",
};

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <Section id="projects" title="Projects">
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}/`}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-bg transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-lg hover:shadow-accent/10"
            >
              <div className="aspect-video overflow-hidden border-b border-border bg-surface">
                {p.cover || p.images[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={asset(p.cover ?? p.images[0].src)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width={640}
                    height={360}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <ProjectCover
                    slug={p.slug}
                    stack={p.stack}
                    label={p.title}
                    className="size-full transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="flex items-center justify-between gap-2 font-mono text-xs text-muted">
                  <span className="text-accent">{PROJECT_TYPE[p.type]}</span>
                  <span>{p.period}</span>
                </p>
                <h3 className="mt-2 text-lg font-semibold group-hover:text-accent">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
                <div className="mt-4">
                  <TagList items={p.stack} label="Tech stack" />
                </div>
                <span className="mt-5 text-sm font-medium text-accent">
                  Read case study <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export function SkillsSection({ categories }: { categories: SkillCategory[] }) {
  return (
    <Section id="skills" title="Skills & Tech Stack" className="bg-surface">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <div key={cat.name} className="rounded-xl border border-border bg-bg p-5">
            <h3 className="font-mono text-sm font-medium text-accent">{cat.name}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <li
                  key={item.name}
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm"
                >
                  <SkillIcon slug={item.icon} />
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Education                                                           */
/* ------------------------------------------------------------------ */

export function EducationSection({ items }: { items: Education[] }) {
  return (
    <Section id="education" title="Education">
      <ul className="grid max-w-3xl gap-5">
        {items.map((ed) => (
          <li key={ed.id} className="rounded-xl border border-border p-6">
            <p className="font-mono text-xs text-muted sm:text-sm">Graduated {ed.graduationYear}</p>
            <h3 className="mt-1 text-xl font-semibold">{ed.university}</h3>
            <p className="mt-2 text-muted">
              {ed.degree} · {ed.faculty} · {ed.major}
            </p>
            <p className="mt-3 inline-block rounded-md bg-accent-soft px-2.5 py-1 font-mono text-sm text-accent-soft-fg">
              GPA {ed.gpa.toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Certificates (only rendered when at least one exists)               */
/* ------------------------------------------------------------------ */

export function CertificatesSection({ items }: { items: Certificate[] }) {
  return (
    <Section id="certificates" title="Certificates" className="bg-surface">
      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map((c) => (
          <li key={c.id} className="flex flex-col rounded-xl border border-border bg-bg p-5">
            <h3 className="font-semibold">{c.name}</h3>
            <p className="mt-1 text-sm text-muted">
              {c.issuer} · {formatYearMonth(c.date.slice(0, 7))}
            </p>
            {c.verifyUrl && (
              <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer" className="mt-3 text-sm font-medium text-accent hover:underline">
                Verify credential ↗
              </a>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export function ContactSection({ contact }: { contact: Contact }) {
  const rows: { label: string; value: string; href?: string; copy?: boolean }[] = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}`, copy: true },
    { label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/[^\d+]/g, "")}`, copy: true },
    { label: "LINE", value: contact.lineId, copy: true },
    { label: "LinkedIn", value: prettyUrl(contact.linkedin), href: contact.linkedin },
    { label: "GitHub", value: prettyUrl(contact.github), href: contact.github },
    { label: "Location", value: contact.city },
  ];

  return (
    <Section id="contact" title="Contact">
      <p className="max-w-2xl text-lg text-muted">
        Feel free to get in touch — email is the fastest way to reach me.
      </p>
      <dl className="mt-8 grid max-w-3xl overflow-hidden rounded-xl border border-border">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-3 border-b border-border px-4 py-3 last:border-b-0 sm:px-5">
            <dt className="w-20 shrink-0 font-mono text-xs text-muted sm:w-24 sm:text-sm">{row.label}</dt>
            <dd className="min-w-0 flex-1">
              {row.href ? (
                <a
                  href={row.href}
                  {...(row.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="font-medium hover:text-accent hover:underline"
                >
                  {row.value}
                </a>
              ) : (
                <span className="font-medium">{row.value}</span>
              )}
            </dd>
            {row.copy && <CopyButton value={row.value} label={row.label} />}
          </div>
        ))}
      </dl>
    </Section>
  );
}

function prettyUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export function Footer({ name, sourceUrl }: { name: string; sourceUrl?: string }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {name}
        </p>
        {sourceUrl && (
          <p className="font-mono text-xs">
            Built with Next.js ·{" "}
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent hover:underline">
              view source
            </a>
          </p>
        )}
      </div>
    </footer>
  );
}

