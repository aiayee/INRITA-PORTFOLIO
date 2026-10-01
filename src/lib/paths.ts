// Prefix for everything served from /public. Next.js adds basePath to <Link>
// routes on its own, but not to plain <a href> / <img src> pointing at files.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return path.startsWith("/") ? `${basePath}${path}` : path;
}

export function isExternal(href: string): boolean {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}
