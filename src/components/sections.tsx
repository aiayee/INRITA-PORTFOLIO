import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
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
import { ContactIcon, type ContactKind } from "./ContactIcon";
import { CopyButton } from "./CopyButton";
import { OrgLogo } from "./OrgLogo";
import { ProjectCover } from "./ProjectCover";
import { RoleTyper } from "./RoleTyper";
import { SkillIcon } from "./SkillIcon";
import { TagList, buttonStyles, durationLabel, formatYearMonth, reveal } from "./ui";

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-accent uppercase before:h-px before:w-7 before:bg-accent">
      {children}
    </p>
  );
}

function Head({ id, eyebrow, title, aside }: { id: string; eyebrow: string; title: ReactNode; aside?: ReactNode }) {
  return (
    <div {...reveal()} className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={`${id}-title`} className="mt-3 text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl">
          {title}
        </h2>
      </div>
      {aside && <div className="max-w-sm text-muted">{aside}</div>}
    </div>
  );
}

function Shell({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative py-20 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

const btnPrimary = buttonStyles.primary;
const btnGhost = buttonStyles.secondary;

const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

const stagger = (step: number) => ({ "--reveal-delay": `${step * 90}ms` }) as CSSProperties;

/* ------------------------------------------------------------------ */
/* Part 1 — Hero                                                       */
/* ------------------------------------------------------------------ */

export function Hero({ profile, contact }: { profile: Profile; contact: Contact }) {
  const [first, ...rest] = profile.nameEn.split(" ");
  const roles = profile.roles.length ? profile.roles : [profile.title];
  const socials: { kind: ContactKind; label: string; href: string }[] = [
    { kind: "linkedin", label: "LinkedIn", href: contact.linkedin },
    { kind: "github", label: "GitHub", href: contact.github },
    { kind: "email", label: "Email", href: `mailto:${contact.email}` },
  ];

  return (
    <section id="hero" aria-label="Introduction" className="relative overflow-hidden">
      {/* corner light — the only background effect on the page */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-glow absolute -top-40 -left-40 size-[34rem] bg-[radial-gradient(closest-side,var(--glow-b),transparent)]" />
        <div className="hero-glow absolute -top-48 -right-32 size-[36rem] bg-[radial-gradient(closest-side,var(--glow-c),transparent)] [animation-delay:-6s]" />
        <div className="absolute top-1/3 left-1/2 size-[28rem] -translate-x-1/2 bg-[radial-gradient(closest-side,var(--glow-a),transparent)]" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div>
          <p className="hero-in font-medium tracking-[0.25em] text-muted uppercase" style={stagger(0)}>
            Hello, I&apos;m
          </p>
          <h1 className="hero-in mt-4 text-[clamp(2.1rem,10.5vw,3rem)] leading-[1.02] font-extrabold tracking-tight [overflow-wrap:normal] sm:text-6xl lg:text-7xl" style={stagger(1)}>
            {first}
            {rest.length > 0 && (
              <>
                <br />
                {rest.join(" ")}
              </>
            )}
          </h1>
          <p lang="th" className="hero-in mt-3 text-muted" style={stagger(2)}>
            {profile.nameTh}
          </p>

          <p className="hero-in mt-6 text-xl font-semibold text-muted sm:text-2xl" style={stagger(3)}>
            {profile.title}
          </p>
          <p className="hero-in mt-1 min-h-[1.5em] text-2xl font-extrabold sm:text-3xl" style={stagger(3)}>
            <span className="role-underline">
              <RoleTyper roles={roles} />
            </span>
          </p>

          <ul className="hero-in mt-7 flex gap-2" style={stagger(4)} aria-label="Profiles">
            {socials.map((s) => (
              <li key={s.kind}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group block"
                >
                  <ContactIcon kind={s.kind} className="size-11" />
                </a>
              </li>
            ))}
          </ul>

          <p className="hero-in mt-7 max-w-xl text-lg leading-relaxed" style={stagger(5)}>
            {profile.tagline}
          </p>

          <div className="hero-in mt-9 flex flex-wrap gap-3" style={stagger(6)}>
            <a href="#projects" className={btnPrimary}>
              View Projects <ArrowUpRight />
            </a>
            <a href="#contact" className={btnGhost}>
              Contact Me
            </a>
          </div>
        </div>

        {/* profile card */}
        <div className="hero-in mx-auto w-full max-w-sm" style={stagger(3)}>
          <div className="profile-card group relative overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(profile.photo)}
              alt={`Photo of ${profile.nameEn}`}
              width={480}
              height={600}
              fetchPriority="high"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />

            <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/60 p-3 text-white backdrop-blur-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(profile.photo)} alt="" width={40} height={40} className="size-10 rounded-full object-cover object-top" />
              <div className="min-w-0 flex-1 leading-tight">
                <p className="truncate text-sm font-semibold">{profile.nickname}</p>
                <p className="truncate text-xs text-white/70">{contact.city}</p>
              </div>
              <a
                href="#contact"
                className="inline-flex min-h-11 items-center rounded-full bg-white/10 px-4 text-xs font-semibold transition-colors hover:bg-white hover:text-black"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Part 2 — About (card: hanging badge + text + key numbers)           */
/* ------------------------------------------------------------------ */

/** "2025-01" → years until now, rounded down to half years ("1.5+"). */
function yearsSince(start: string): string {
  const [y, m] = start.split("-").map(Number);
  const now = new Date();
  const months = (now.getUTCFullYear() - y) * 12 + (now.getUTCMonth() + 1 - m);
  const half = Math.floor(months / 6) / 2;
  return half >= 0.5 ? `${half}+` : "<1";
}

export function About({
  profile,
  experience,
  education,
}: {
  profile: Profile;
  experience: Experience[];
  education?: Education;
}) {
  const earliest = experience.reduce((min, e) => (e.start < min ? e.start : min), experience[0]?.start ?? "");
  const stats = [
    ...(earliest ? [{ value: yearsSince(earliest), label: "Years experience" }] : []),
    ...profile.stats,
  ].slice(0, 4);

  return (
    <Shell id="about">
      <div
        {...reveal()}
        className="relative grid gap-10 rounded-[2rem] border border-accent/30 bg-surface/60 p-6 sm:p-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14 lg:p-12"
      >
        {/* hanging ID badge */}
        <div className="relative mx-auto w-56 sm:w-64 lg:mx-0 lg:-mt-12">
          <div className="badge-swing">
            <div aria-hidden="true" className="mx-auto h-28 w-1 rounded-full bg-gradient-to-b from-transparent to-muted" />
            <div aria-hidden="true" className="mx-auto -mt-1 h-4 w-8 rounded-md border-2 border-muted" />
            <div className="mt-1 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(profile.photo)} alt="" width={320} height={400} loading="lazy" className="aspect-[4/5] w-full object-cover" />
              <div className="px-4 py-3 text-center">
                <p className="font-bold">{profile.nickname}</p>
                <p className="font-mono text-xs text-muted">{profile.title}</p>
              </div>
            </div>
          </div>
          <a href={asset(profile.resume)} target="_blank" rel="noopener" className={`${btnPrimary} mt-12 w-full justify-center`}>
            Download Resume
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
            </svg>
          </a>
        </div>

        <div className="min-w-0">
          <h2 id="about-title" className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            About <span className="text-accent">Me</span>
          </h2>
          {profile.quote && <p className="mt-4 border-l-2 border-accent pl-4 text-lg text-muted italic">{profile.quote}</p>}
          <div className="prose-content mt-6 text-base sm:text-lg" dangerouslySetInnerHTML={{ __html: profile.aboutHtml }} />

          {stats.length > 0 && (
            <dl className="mt-10 grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
              {stats.map((s, i) => (
                <div key={s.label} {...reveal(i + 1)} className="flex flex-col-reverse">
                  <dt className="mt-1 text-xs font-semibold tracking-[0.12em] text-muted uppercase">{s.label}</dt>
                  <dd className="text-4xl font-extrabold tracking-tight text-accent">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
            {education && (
              <div className="flex min-w-0 items-center gap-4">
                <OrgLogo src={education.logo} name={education.university} />
                <div className="min-w-0 leading-snug">
                  <p className="text-xs font-medium text-muted uppercase">Education · {education.graduationYear}</p>
                  <p className="font-semibold">{education.university}</p>
                  <p className="text-sm text-muted">
                    {education.degree} · {education.major} · GPA {education.gpa.toFixed(2)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* Part 3 — Experience (timeline, highlights + "View details")         */
/* ------------------------------------------------------------------ */

export function ExperienceSection({ items, projects }: { items: Experience[]; projects: Project[] }) {
  const titleOf = new Map(projects.map((p) => [p.slug, p.title]));
  return (
    <Shell id="experience" className="bg-surface/40">
      <Head
        id="experience"
        eyebrow="Experience"
        title={
          <>
            Where I&apos;ve shipped
            <br />
            data to production
          </>
        }
      />
      <ol className="timeline relative grid gap-6 pl-10 sm:pl-14">
        {items.map((exp, i) => {
          return (
            <li key={exp.id} {...reveal(i + 1)} className="relative">
              <span
                aria-hidden="true"
                className="absolute top-8 -left-10 grid size-6 place-items-center rounded-full border-2 border-accent bg-bg sm:-left-14"
              >
                <span className="size-2 rounded-full bg-accent" />
              </span>
              <article className="rounded-3xl border border-border bg-surface p-6 transition-colors hover:border-accent/50 sm:p-8">
                <div className="flex flex-wrap items-start gap-x-5 gap-y-3">
                  <OrgLogo src={exp.logo} name={exp.companyDescriptor ?? exp.role} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h3 className="text-xl font-bold sm:text-2xl">{exp.role}</h3>
                      <p className="font-mono text-xs text-muted sm:text-sm">
                        {formatYearMonth(exp.start)} — {formatYearMonth(exp.end)} · {durationLabel(exp.start, exp.end)}
                      </p>
                    </div>
                    {exp.companyDescriptor && <p className="mt-2 text-sm text-muted">{exp.companyDescriptor}</p>}
                  </div>
                </div>

                <div className="xp-bullets prose-content mt-5" dangerouslySetInnerHTML={{ __html: exp.bodyHtml }} />

                {exp.relatedProjects.length > 0 && (
                  <a
                    href="#projects"
                    title={exp.relatedProjects.map((slug) => titleOf.get(slug)).join(", ")}
                    className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent hover:underline"
                  >
                    Selected Work Projects <span aria-hidden="true">→</span>
                  </a>
                )}

                <div className="mt-5">
                  <TagList items={exp.stack} label={`Tech stack used as ${exp.role}`} />
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* Part 4 — Projects (cards; details live on /projects/<slug>)         */
/* ------------------------------------------------------------------ */

export const PROJECT_TYPE: Record<Project["type"], string> = {
  work: "Work",
  academic: "Academic",
  side: "Side Project",
};

/** "Retail POS Sales — End-to-End Data Pipeline" → ["Retail POS Sales", "End-to-End Data Pipeline"] */
function splitTitle(title: string): [string, string?] {
  const [main, ...rest] = title.split(/\s+[—–]\s+/);
  return [main, rest.join(" — ") || undefined];
}

function ProjectCard({ p, featured = false }: { p: Project; featured?: boolean }) {
  const [main, sub] = splitTitle(p.title);
  return (
    <Link
      href={`/projects/${p.slug}/`}
      className={`group grid h-full overflow-hidden rounded-3xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-[0_30px_60px_-30px_rgba(124,58,237,0.55)] ${
        featured ? "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]" : "grid-rows-[auto_1fr]"
      }`}
    >
      <div className={`overflow-hidden border-border bg-surface-2 ${featured ? "aspect-video border-b lg:aspect-auto lg:border-r lg:border-b-0" : "aspect-video border-b"}`}>
        {p.cover || p.images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset(p.cover ?? p.images[0].src)}
            alt=""
            loading="lazy"
            decoding="async"
            width={640}
            height={360}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        ) : (
          <ProjectCover slug={p.slug} stack={p.stack} label={p.title} className="size-full transition-transform duration-500 group-hover:scale-[1.05]" />
        )}
      </div>
      <div className={`flex flex-col ${featured ? "p-6 sm:p-10" : "p-6"}`}>
        <p className="flex items-center justify-between gap-2 font-mono text-xs tracking-[0.12em] text-muted uppercase">
          <span className="text-accent">{featured ? `${PROJECT_TYPE[p.type]} · Featured` : PROJECT_TYPE[p.type]}</span>
          {p.period && <span className="tracking-normal normal-case">{p.period}</span>}
        </p>
        <h3 className={`mt-3 leading-tight font-extrabold transition-colors group-hover:text-accent ${featured ? "text-3xl" : "text-xl"}`}>
          {main}
          {sub && <span className={`mt-1 block font-semibold text-muted ${featured ? "text-xl" : "text-base"}`}>{sub}</span>}
        </h3>
        {featured && <p className="mt-4 leading-relaxed text-muted">{p.summary}</p>}
        <p className="mt-4 flex-1 font-mono text-[0.8rem] leading-relaxed text-fg/80">{p.stack.slice(0, featured ? 9 : 5).join(" · ")}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
          Read case study
          <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const work = projects.filter((p) => p.type === "work");
  const other = projects.filter((p) => p.type !== "work");
  const [featured, ...restWork] = work;

  return (
    <Shell id="projects">
      <Head
        id="projects"
        eyebrow="Projects"
        title="Selected Work Projects"
        aside="Each case study covers the business context, my role, the data flow and what I delivered."
      />
      {featured && (
        <div {...reveal(1)}>
          <ProjectCard p={featured} featured />
        </div>
      )}
      {restWork.length > 0 && (
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {restWork.map((p, i) => (
            <li key={p.slug} {...reveal(i + 2)}>
              <ProjectCard p={p} />
            </li>
          ))}
        </ul>
      )}

      {other.length > 0 && (
        <>
          <h3 {...reveal()} className="mt-20 mb-8 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Academic &amp; Side Projects
          </h3>
          <ul className="grid gap-6 sm:grid-cols-2">
            {other.map((p, i) => (
              <li key={p.slug} {...reveal(i + 1)}>
                <ProjectCard p={p} />
              </li>
            ))}
          </ul>
        </>
      )}
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* Part 5 — Skills (5.1 technical bento, 5.2 soft skills)              */
/* ------------------------------------------------------------------ */

// Column spans that give the technical-skills grid its bento rhythm
// (rows of 3 cards). A short last row stretches so it never leaves a hole.
const SPANS = ["lg:col-span-6", "lg:col-span-3", "lg:col-span-3", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4"];
function spanFor(i: number, total: number): string {
  const lastRow = total - (total % 3 || 3);
  if (i >= lastRow && total % 3 === 1) return "lg:col-span-12";
  if (i >= lastRow && total % 3 === 2) return "lg:col-span-6";
  return SPANS[i % SPANS.length];
}

export function SkillsSection({ categories, softSkills }: { categories: SkillCategory[]; softSkills: string[] }) {
  return (
    <Shell id="skills" className="bg-surface/40">
      <Head id="skills" eyebrow="Toolbox" title="Skills & Tech Stack" />

      <h3 {...reveal()} className="mb-5 font-mono text-sm tracking-[0.14em] text-muted uppercase">
        Technical skills
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
        {categories.map((cat, i) => (
          <div
            key={cat.name}
            {...reveal(i)}
            className={`rounded-3xl border border-border bg-surface p-6 transition-colors hover:border-accent/50 ${spanFor(i, categories.length)}`}
          >
            <h4 className="font-mono text-xs tracking-[0.14em] text-muted uppercase">{cat.name}</h4>
            <ul className="mt-4 flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <li
                  key={item.name}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-2 px-3 py-1.5 font-mono text-[0.8rem] transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  <span className="text-accent empty:hidden">
                    <SkillIcon slug={item.icon} />
                  </span>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {softSkills.length > 0 && (
        <>
          <h3 {...reveal()} className="mt-14 mb-5 font-mono text-sm tracking-[0.14em] text-muted uppercase">
            Soft skills
          </h3>
          <ul {...reveal(1)} className="flex flex-wrap gap-3">
            {softSkills.map((s) => (
              <li
                key={s}
                className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-5 py-3 font-medium transition-colors hover:border-accent"
              >
                <svg viewBox="0 0 24 24" className="size-4 text-accent" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12l5 5L20 7" />
                </svg>
                {s}
              </li>
            ))}
          </ul>
        </>
      )}
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* Certificates (only rendered when at least one exists)               */
/* ------------------------------------------------------------------ */

export function CertificatesSection({ items }: { items: Certificate[] }) {
  return (
    <Shell id="certificates">
      <Head id="certificates" eyebrow="Credentials" title="Certificates" />
      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map((c, i) => (
          <li key={c.id} {...reveal(i + 1)} className="flex flex-col rounded-3xl border border-border bg-surface p-6">
            <h3 className="font-semibold">{c.name}</h3>
            <p className="mt-1 text-sm text-muted">
              {c.issuer} · {formatYearMonth(c.date.slice(0, 7))}
            </p>
            {c.verifyUrl && (
              <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer" className="mt-3 text-sm font-semibold text-accent hover:underline">
                Verify credential ↗
              </a>
            )}
          </li>
        ))}
      </ul>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* Part 6 — Contact                                                    */
/* ------------------------------------------------------------------ */

export function ContactSection({ contact }: { contact: Contact }) {
  const items: { kind: ContactKind; label: string; value: string; href?: string; copy?: boolean; wide?: boolean }[] = [
    { kind: "phone", label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/[^\d+]/g, "")}`, copy: true },
    { kind: "line", label: "LINE", value: contact.lineId, copy: true },
    { kind: "linkedin", label: "LinkedIn", value: linkedinName(contact.linkedin), href: contact.linkedin },
    { kind: "github", label: "GitHub", value: prettyUrl(contact.github).replace(/^github\.com\//, ""), href: contact.github },
    { kind: "location", label: "Location", value: contact.city, wide: true },
  ];

  return (
    <Shell id="contact">
      <div
        {...reveal()}
        className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-accent-soft via-surface to-surface p-8 sm:p-12"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-24 size-96 bg-[radial-gradient(closest-side,var(--glow-a),transparent)]" />
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center">
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h2 id="contact-title" className="mt-3 text-5xl font-extrabold tracking-tight">
              Let&apos;s talk data.
            </h2>
            <p className="mt-3 text-muted">Email is the fastest way to reach me.</p>
            <div className="mt-7 flex flex-wrap items-center gap-2">
              <a href={`mailto:${contact.email}`} className={btnPrimary}>
                {contact.email}
              </a>
              <CopyButton value={contact.email} label="Email" />
            </div>
          </div>
          <dl className="grid gap-2 sm:grid-cols-2">
            {items.map((row) => (
              <div
                key={row.label}
                className={`group flex min-w-0 items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-accent-soft/60 ${row.wide ? "sm:col-span-2" : ""}`}
              >
                <ContactIcon kind={row.kind} className="size-12" />
                <div className="min-w-0">
                  <dt className="font-mono text-[0.7rem] tracking-[0.14em] text-muted uppercase">{row.label}</dt>
                  <dd className="flex items-center gap-1">
                    {row.href ? (
                      <a
                        href={row.href}
                        {...(row.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="min-w-0 font-semibold hover:text-accent hover:underline"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <span className="min-w-0 font-semibold">{row.value}</span>
                    )}
                    {row.copy && <CopyButton value={row.value} label={row.label} />}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Shell>
  );
}

/** "…/in/inrita-warajirawiroj-18a35426a" → "Inrita Warajirawiroj" (drops LinkedIn's random suffix). */
function linkedinName(url: string): string {
  const slug = prettyUrl(url).replace(/^.*\/in\//, "").replace(/-[0-9a-z]*\d[0-9a-z]*$/i, "");
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
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
