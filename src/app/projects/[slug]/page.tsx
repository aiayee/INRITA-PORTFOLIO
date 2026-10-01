import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECT_TYPE } from "@/components/sections";
import { ProjectCover } from "@/components/ProjectCover";
import { TagList, buttonStyles } from "@/components/ui";
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

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const projects = getProjects();
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) notFound();

  const project = projects[i];
  const prev = projects[i - 1];
  const next = projects[i + 1];

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <Link href="/#projects" className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent">
        <span aria-hidden="true">←</span> Back to Projects
      </Link>

      <header className="mt-8 border-b border-border pb-8">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted sm:text-sm">
          <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-accent-soft-fg">{PROJECT_TYPE[project.type]}</span>
          <span>{project.period}</span>
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{project.summary}</p>
        <div className="mt-6">
          <TagList items={project.stack} label="Tech stack" />
        </div>
        {(project.slidesPdf || project.github) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.slidesPdf && (
              <a href={asset(project.slidesPdf)} target="_blank" rel="noopener" className={buttonStyles.primary}>
                View full slides (PDF)
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className={buttonStyles.secondary}>
                View on GitHub ↗
              </a>
            )}
          </div>
        )}
      </header>

      <div className="mt-8 aspect-video overflow-hidden rounded-xl border border-border bg-surface">
        {project.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset(project.cover)}
            alt={`${project.title} cover`}
            width={1280}
            height={720}
            className="size-full object-cover"
          />
        ) : (
          <ProjectCover slug={project.slug} stack={project.stack} label={project.title} className="size-full" />
        )}
      </div>

      <div className="prose-content mt-10 text-base sm:text-[1.0625rem]" dangerouslySetInnerHTML={{ __html: project.bodyHtml }} />

      {project.images.length > 0 && (
        <section aria-labelledby="gallery-title" className="mt-14">
          <h2 id="gallery-title" className="text-[1.375rem] font-bold tracking-tight">
            <span className="font-mono font-medium text-accent">## </span>Gallery
          </h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {project.images.map((img, n) => (
              <li key={img.src} className={project.images.length % 2 === 1 && n === 0 ? "sm:col-span-2" : ""}>
                <figure>
                  <a
                    href={asset(img.src)}
                    target="_blank"
                    rel="noopener"
                    className="block overflow-hidden rounded-xl border border-border bg-surface"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(img.src)}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      className="aspect-video w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                    />
                  </a>
                  {img.caption && <figcaption className="mt-2 text-sm text-muted">{img.caption}</figcaption>}
                </figure>
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav aria-label="More projects" className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
        {prev ? (
          <Link href={`/projects/${prev.slug}/`} className="group rounded-xl border border-border p-4 hover:border-accent">
            <span className="text-xs text-muted">← Previous project</span>
            <span className="mt-1 block font-medium group-hover:text-accent">{prev.title}</span>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
        {next && (
          <Link href={`/projects/${next.slug}/`} className="group rounded-xl border border-border p-4 text-right hover:border-accent">
            <span className="text-xs text-muted">Next project →</span>
            <span className="mt-1 block font-medium group-hover:text-accent">{next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
