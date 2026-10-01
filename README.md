# Data Engineer Portfolio

A static, content-driven portfolio site. Every section is generated from
validated Markdown files and deployed to GitHub Pages on each push.

**Stack:** Next.js (static export) · TypeScript · Tailwind CSS · Zod · GitHub Actions · GitHub Pages

## How it works

```
content/*.md ──► Zod schema validation ──► Markdown → HTML ──► next build (static) ──► GitHub Pages
 (source)          (build fails on bad data)   (raw HTML stripped)      out/                (deploy)
```

- **No server, database or tracking.** The output is plain HTML/CSS with a little JS
  for the theme toggle and mobile menu.
- **Content is data.** Each file in `content/` is checked against a schema in
  [`src/lib/content.ts`](src/lib/content.ts). A missing field, invalid date or a
  path to a file that does not exist fails the build with the exact file and field.
- **Not indexed.** Every page carries `noindex, nofollow`; the site is meant to be
  shared by link only.

## Project structure

```
content/               ← all editable content (see docs/CONTENT-GUIDE.md)
  profile.md           hero + About text
  contact.md
  skills.md
  experience/*.md
  education/*.md
  projects/*.md        one file per case study (file name = URL slug)
  certificates/*.md    section is hidden while empty
public/                images, resume.pdf, slides
src/
  app/                 pages: home, /projects/[slug], 404
  components/          UI sections, navbar, theme toggle
  lib/content.ts       loading + validation
scripts/               post-build checks, local Pages-like server
docs/REQUIREMENTS.md   requirement document
```

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev          # http://localhost:3000
```

Check everything the CI checks (types, content validation, build, output):

```bash
npm run check
```

Preview the production build exactly as GitHub Pages serves it:

```bash
NEXT_PUBLIC_BASE_PATH=/INRITA-PORTFOLIO npm run build
NEXT_PUBLIC_BASE_PATH=/INRITA-PORTFOLIO npm run preview   # http://localhost:4173/INRITA-PORTFOLIO/
```

## Deploy

1. Push the repository to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
   type check → build (validates content) → verify output → deploy.
   The base path (`/<repo-name>`) is detected automatically.

Pull requests run the same checks without deploying.
