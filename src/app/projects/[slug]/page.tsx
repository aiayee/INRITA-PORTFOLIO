import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCover } from "@/components/ProjectCover";
import { PROJECT_TYPE } from "@/components/sections";
import { SkillIcon } from "@/components/SkillIcon";
import { SlideCarousel } from "@/components/SlideCarousel";
import { buttonStyles, reveal } from "@/components/ui";
import { getProject, getProjects } from "@/lib/content";
import { asset } from "@/lib/paths";

// Static export: every case study is generated at build time; unknown slugs → 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.title, description: project.summary } : {};
}

// Icon per case-study heading; anything else falls back to the dot.
const SECTION_ICON: Record<string, string> = {
  "Business Context": "M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6",
  "My Role": "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  Approach: "M4 6h16M4 12h10M4 18h6",
  Results: "M5 13l4 4L19 7",
  "Lessons Learned": "M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19l1-5.8L3.5 9.2l5.9-.9z",
};

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const projects = getProjects();
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) notFound();

  const project = projects[i];
  const prev = projects[i - 1];
  const next = projects[i + 1];
  const slides = project.images.map((img) => ({ ...img, src: asset(img.src) }));

  // "Approach" (usually long) spans the full width; the other cards pair up,
  // and an unpaired last card stretches so the grid has no hole.
  const wide = new Set<number>();
  const paired: number[] = [];
  project.sections.forEach((s, n) => (s.title === "Approach" ? wide.add(n) : paired.push(n)));
  if (paired.length % 2 === 1) wide.add(paired[paired.length - 1]);

  return (
    <article className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 -left-40 size-[32rem] bg-[radial-gradient(closest-side,var(--glow-a),transparent)]" />
      <div aria-hidden="true" className="pointer-events-none absolute top-20 -right-40 size-[30rem] bg-[radial-gradient(closest-side,var(--glow-c),transparent)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {/* breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-3 text-sm">
          <Link
            href="/#projects"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 font-medium transition-colors hover:border-accent hover:text-accent"
          >
            <span aria-hidden="true">←</span> Back
          </Link>
          <ol className="flex min-w-0 items-center gap-2 text-muted">
            <li>
              <Link href="/#projects" className="hover:text-fg">
                Projects
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li aria-current="page" className="truncate font-medium text-fg">
              {project.title}
            </li>
          </ol>
        </nav>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
          {/* left: intro */}
          <div className="hero-in">
            <p className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted sm:text-sm">
              <span className="rounded-full bg-accent-soft px-3 py-1 text-accent-soft-fg">{PROJECT_TYPE[project.type]}</span>
              <span>{project.period}</span>
            </p>
            <h1 className="mt-5 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl">{project.title}</h1>
            <div aria-hidden="true" className="mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-accent to-transparent" />
            <p className="mt-6 text-lg leading-relaxed text-muted">{project.summary}</p>

            <dl className="mt-8 grid grid-cols-2 gap-3 sm:max-w-md">
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
                <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent-soft-fg" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />
                  </svg>
                </span>
                <div className="flex flex-col-reverse">
                  <dt className="text-xs text-muted">Technologies</dt>
                  <dd className="text-xl font-extrabold">{project.stack.length}</dd>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
                <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent-soft-fg" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 6h16M4 12h16M4 18h10" />
                  </svg>
                </span>
                <div className="flex flex-col-reverse">
                  <dt className="text-xs text-muted">Case study sections</dt>
                  <dd className="text-xl font-extrabold">{project.sections.length}</dd>
                </div>
              </div>
            </dl>

            {(project.slidesPdf || project.github) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.slidesPdf && (
                  <a href={asset(project.slidesPdf)} target="_blank" rel="noopener" className={buttonStyles.primary}>
                    View full slides (PDF)
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className={buttonStyles.secondary}>
                    GitHub ↗
                  </a>
                )}
              </div>
            )}

            <h2 className="mt-10 flex items-center gap-2 text-lg font-bold">
              <span className="font-mono text-accent" aria-hidden="true">
                &lt;/&gt;
              </span>
              Technologies used
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <li
                  key={t}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-1.5 font-mono text-[0.8rem] transition-colors hover:border-accent hover:text-accent"
                >
                  <span className="text-accent empty:hidden">
                    <SkillIcon slug={t} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* right: slides */}
          <div className="hero-in [--reveal-delay:150ms]">
            <SlideCarousel
              slides={slides}
              fallback={
                <div className="overflow-hidden rounded-2xl border border-border bg-surface-2">
                  <ProjectCover slug={project.slug} stack={project.stack} label={project.title} className="aspect-video w-full" />
                </div>
              }
            />
          </div>
        </div>

        {/* case study sections as cards */}
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {project.sections.map((s, n) => (
            <section
              key={s.title}
              {...reveal(n)}
              aria-labelledby={`cs-${n}`}
              className={`rounded-3xl border border-border bg-surface p-6 sm:p-8 ${wide.has(n) ? "md:col-span-2" : ""}`}
            >
              <h2 id={`cs-${n}`} className="flex items-center gap-3 text-xl font-bold">
                <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent-soft-fg" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={SECTION_ICON[s.title] ?? "M12 12h.01"} />
                  </svg>
                </span>
                {s.title}
              </h2>
              <div className="xp-bullets prose-content mt-5" dangerouslySetInnerHTML={{ __html: s.html }} />
            </section>
          ))}
        </div>

        <nav aria-label="More projects" className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
          {prev ? (
            <Link href={`/projects/${prev.slug}/`} className="group rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent">
              <span className="text-xs text-muted">← Previous project</span>
              <span className="mt-1 block font-semibold group-hover:text-accent">{prev.title}</span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {next && (
            <Link href={`/projects/${next.slug}/`} className="group rounded-2xl border border-border bg-surface p-5 text-right transition-colors hover:border-accent">
              <span className="text-xs text-muted">Next project →</span>
              <span className="mt-1 block font-semibold group-hover:text-accent">{next.title}</span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
