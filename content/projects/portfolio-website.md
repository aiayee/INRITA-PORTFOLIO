---
title: "This Portfolio Website"
summary: "A static, content-driven portfolio where every section is generated from validated Markdown files and deployed automatically."
type: side
period: "2026"
stack: [Next.js, TypeScript, Tailwind CSS, Zod, GitHub Actions, GitHub Pages]
order: 6
github: https://github.com/aiayee/INRITA-PORTFOLIO
cover: /images/projects/portfolio/portfolio-home.png
images:
  - src: /images/projects/portfolio/portfolio-home.png
    alt: "Portfolio Website — Homepage screenshot"
    caption: "Homepage — Hero, About, Experience, Projects, Skills & Contact"
---

## Business Context

I needed one link that shows my experience and projects clearly to both
recruiters and technical interviewers, and that I can update in minutes
without touching UI code.

## My Role

Owner of the content and maintenance: I update the Markdown files and the
pipeline publishes the site.

## Approach

The site treats content like a small data pipeline:

- **Source** – Markdown files with YAML frontmatter in `content/`.
- **Validation** – every file is checked against a Zod schema at build time.
  A missing field, a wrong date format or a broken file path fails the build
  with a message pointing to the exact file and field.
- **Transform** – Markdown is rendered to HTML at build time; raw HTML in the
  content is stripped.
- **Load** – Next.js static export produces plain HTML/CSS, and GitHub Actions
  deploys it to GitHub Pages on every push to `main`.

There is no server, no database and no tracking.

## Results

- Updating the site means editing a text file and pushing a commit.
- Bad content can never reach production: the previous version stays online
  until the build passes.
- Fully static pages that load fast on mobile and work in light and dark mode.

## Lessons Learned

Applying data-engineering habits (schemas, validation at the boundary,
automated pipelines) to a website makes it far easier to maintain.
