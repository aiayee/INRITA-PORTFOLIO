// Post-build checks on the static output in out/ (run by CI after `next build`).
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("out");
const errors = [];
const check = (ok, msg) => ok || errors.push(msg);

function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return e.name === "_next" ? [] : htmlFiles(p);
    return e.name.endsWith(".html") ? [p] : [];
  });
}

check(fs.existsSync(OUT), "out/ does not exist — run `npm run build` first");
if (!errors.length) {
  for (const f of ["index.html", "404.html", "robots.txt", ".nojekyll"]) {
    check(fs.existsSync(path.join(OUT, f)), `missing out/${f}`);
  }

  const projectsDir = path.resolve("content/projects");
  const slugs = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".md") && !f.startsWith("_")).map((f) => f.slice(0, -3));
  for (const slug of slugs) {
    check(fs.existsSync(path.join(OUT, "projects", slug, "index.html")), `missing case study page for "${slug}"`);
  }

  const pages = htmlFiles(OUT);
  for (const file of pages) {
    const html = fs.readFileSync(file, "utf8");
    const rel = path.relative(OUT, file);
    check(/<meta name="robots" content="[^"]*noindex/.test(html), `${rel}: missing noindex robots meta`);
    check(html.includes('http-equiv="Content-Security-Policy"'), `${rel}: missing CSP meta`);
  }
  console.log(`Checked ${pages.length} HTML pages, ${slugs.length} case studies.`);
}

if (errors.length) {
  console.error("✖ Build verification failed:\n" + errors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}
console.log("✓ Build verification passed");
