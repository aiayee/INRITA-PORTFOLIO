import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { renderMarkdown } from "./markdown";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PUBLIC_DIR = path.join(process.cwd(), "public");

/* ------------------------------------------------------------------ */
/* Field helpers                                                       */
/* ------------------------------------------------------------------ */

// YAML turns `2024-01-15` into a Date; normalise back to a string first.
const dateString = (pattern: RegExp, hint: string) =>
  z.preprocess(
    (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
    z.string().regex(pattern, `must look like ${hint}`),
  );

const yearMonth = dateString(/^\d{4}-(0[1-9]|1[0-2])$/, "YYYY-MM (e.g. 2024-06)");
const publicFile = z.string().startsWith("/", "must start with / (a path inside public/)");
const text = z.string().trim().min(1, "must not be empty");
const stack = z.array(text).min(1, "list at least one technology");

/* ------------------------------------------------------------------ */
/* Schemas                                                             */
/* ------------------------------------------------------------------ */

const profileSchema = z.object({
  nameEn: text,
  nameTh: text,
  nickname: text,
  title: text,
  tagline: text,
  photo: publicFile,
  resume: publicFile.endsWith(".pdf", "must be a .pdf file"),
});

const contactSchema = z.object({
  email: z.email(),
  phone: text,
  lineId: text,
  city: text,
  linkedin: z.url(),
  github: z.url(),
});

const skillsSchema = z.object({
  categories: z
    .array(
      z.object({
        name: text,
        items: z
          .array(
            z.object({
              name: text,
              // Slug from https://simpleicons.org, e.g. "python", "apacheairflow"
              icon: z.string().optional(),
            }),
          )
          .min(1),
      }),
    )
    .min(1),
});

const experienceSchema = z.object({
  role: text,
  companyDescriptor: z.string().optional(),
  type: z.enum(["internship", "contract", "full-time", "part-time"]),
  start: yearMonth,
  end: z.union([yearMonth, z.literal("present")]),
  stack,
  relatedProjects: z.array(z.string()).default([]),
});

const educationSchema = z.object({
  degree: text,
  university: text,
  faculty: text,
  major: text,
  graduationYear: z.number().int().min(1950).max(2100),
  gpa: z.number().min(0).max(4),
});

const projectSchema = z.object({
  title: text,
  summary: text,
  type: z.enum(["work", "academic", "side"]),
  period: text,
  stack,
  order: z.number().int(),
  // Card + case-study header image. Without it the card uses the first gallery
  // image, and otherwise a generated cover (see ProjectCover).
  cover: publicFile.optional(),
  images: z
    .array(
      z.object({
        src: publicFile,
        alt: text, // describes the image for screen readers
        caption: z.string().optional(),
      }),
    )
    .default([]),
  slidesPdf: publicFile.endsWith(".pdf", "must be a .pdf file").optional(),
  github: z.url().optional(),
});

const certificateSchema = z.object({
  name: text,
  issuer: text,
  date: dateString(/^\d{4}-\d{2}(-\d{2})?$/, "YYYY-MM or YYYY-MM-DD"),
  verifyUrl: z.url().optional(),
});

/* ------------------------------------------------------------------ */
/* Loading + validation                                                */
/* ------------------------------------------------------------------ */

class ContentError extends Error {
  constructor(file: string, problems: string[]) {
    super(
      `\n\n✖ Invalid content in ${path.relative(process.cwd(), file)}\n` +
        problems.map((p) => `   - ${p}`).join("\n") +
        "\n",
    );
    this.name = "ContentError";
  }
}

function readFile(file: string) {
  if (!fs.existsSync(file)) throw new ContentError(file, ["file is missing"]);
  return matter(fs.readFileSync(file, "utf8"));
}

function parse<T extends z.ZodType>(schema: T, file: string, data: unknown): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ContentError(
      file,
      result.error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`),
    );
  }
  return result.data;
}

function assertPublicFiles(file: string, paths: (string | undefined)[]) {
  const missing = paths.filter(
    (p): p is string => !!p && !fs.existsSync(path.join(PUBLIC_DIR, decodeURI(p))),
  );
  if (missing.length) {
    throw new ContentError(
      file,
      missing.map((p) => `${p}: file not found in public/`),
    );
  }
}

// Local images/links written in Markdown bodies, e.g. ![x](/images/a.png)
function localLinks(markdown: string): string[] {
  const visible = markdown.replace(/<!--[\s\S]*?-->/g, "");
  return [...visible.matchAll(/\]\((\/[^)\s]+)/g)].map((m) => m[1]);
}

function listMarkdown(dir: string): string[] {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .sort()
    .map((f) => path.join(full, f));
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

export type Profile = z.infer<typeof profileSchema> & { aboutHtml: string };
export type Contact = z.infer<typeof contactSchema>;
export type SkillCategory = z.infer<typeof skillsSchema>["categories"][number];
export type Experience = z.infer<typeof experienceSchema> & { id: string; bodyHtml: string };
export type Education = z.infer<typeof educationSchema> & { id: string };
export type Project = z.infer<typeof projectSchema> & { slug: string; bodyHtml: string };
export type Certificate = z.infer<typeof certificateSchema> & { id: string };

export const CASE_STUDY_SECTIONS = [
  "Business Context",
  "My Role",
  "Approach",
  "Results",
  "Lessons Learned",
] as const;

export function getProfile(): Profile {
  const file = path.join(CONTENT_DIR, "profile.md");
  const { data, content } = readFile(file);
  const profile = parse(profileSchema, file, data);
  if (!content.trim()) throw new ContentError(file, ["body (About text) must not be empty"]);
  assertPublicFiles(file, [profile.photo, profile.resume, ...localLinks(content)]);
  return { ...profile, aboutHtml: renderMarkdown(content) };
}

export function getContact(): Contact {
  const file = path.join(CONTENT_DIR, "contact.md");
  return parse(contactSchema, file, readFile(file).data);
}

export function getSkills(): SkillCategory[] {
  const file = path.join(CONTENT_DIR, "skills.md");
  return parse(skillsSchema, file, readFile(file).data).categories;
}

export function getProjects(): Project[] {
  const projects = listMarkdown("projects").map((file) => {
    const { data, content } = readFile(file);
    const project = parse(projectSchema, file, data);

    const headings = [...content.matchAll(/^##\s+(.+?)\s*$/gm)].map((m) => m[1]);
    const missing = CASE_STUDY_SECTIONS.filter((s) => !headings.includes(s));
    if (missing.length) {
      throw new ContentError(
        file,
        missing.map((s) => `body is missing the section heading "## ${s}"`),
      );
    }
    assertPublicFiles(file, [
      project.cover,
      project.slidesPdf,
      ...project.images.map((i) => i.src),
      ...localLinks(content),
    ]);

    return {
      ...project,
      slug: path.basename(file, ".md"),
      bodyHtml: renderMarkdown(content),
    };
  });

  const seen = new Map<number, string>();
  for (const p of projects) {
    const other = seen.get(p.order);
    if (other) {
      throw new ContentError(path.join(CONTENT_DIR, "projects", `${p.slug}.md`), [
        `order: ${p.order} is already used by ${other}.md`,
      ]);
    }
    seen.set(p.order, p.slug);
  }
  return projects.sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getExperience(): Experience[] {
  const slugs = new Set(getProjects().map((p) => p.slug));
  return listMarkdown("experience")
    .map((file) => {
      const { data, content } = readFile(file);
      const exp = parse(experienceSchema, file, data);
      const unknown = exp.relatedProjects.filter((s) => !slugs.has(s));
      if (unknown.length) {
        throw new ContentError(
          file,
          unknown.map((s) => `relatedProjects: no project file content/projects/${s}.md`),
        );
      }
      return { ...exp, id: path.basename(file, ".md"), bodyHtml: renderMarkdown(content) };
    })
    .sort((a, b) => b.start.localeCompare(a.start)); // newest first
}

export function getEducation(): Education[] {
  return listMarkdown("education")
    .map((file) => ({
      ...parse(educationSchema, file, readFile(file).data),
      id: path.basename(file, ".md"),
    }))
    .sort((a, b) => b.graduationYear - a.graduationYear);
}

export function getCertificates(): Certificate[] {
  return listMarkdown("certificates")
    .map((file) => ({
      ...parse(certificateSchema, file, readFile(file).data),
      id: path.basename(file, ".md"),
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}
