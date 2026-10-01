// Serves out/ the way GitHub Pages does (under NEXT_PUBLIC_BASE_PATH, 404.html fallback).
// Usage: npm run preview   →  http://localhost:4173<basePath>/
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const OUT = path.resolve("out");
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const PORT = Number(process.env.PORT ?? 4173);
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".pdf": "application/pdf", ".woff2": "font/woff2", ".txt": "text/plain",
  ".json": "application/json", ".ico": "image/x-icon",
};

function resolve(urlPath) {
  if (BASE && !urlPath.startsWith(BASE)) return null;
  const rel = decodeURIComponent(urlPath.slice(BASE.length).split("?")[0]);
  let file = path.join(OUT, rel);
  if (!file.startsWith(OUT)) return null;
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  return fs.existsSync(file) ? file : null;
}

http
  .createServer((req, res) => {
    const file = resolve(req.url ?? "/");
    const target = file ?? path.join(OUT, "404.html");
    res.writeHead(file ? 200 : 404, { "Content-Type": TYPES[path.extname(target)] ?? "application/octet-stream" });
    fs.createReadStream(target).pipe(res);
  })
  .listen(PORT, () => console.log(`Serving out/ at http://localhost:${PORT}${BASE}/`));
