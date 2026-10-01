import type { NextConfig } from "next";

// GitHub Pages serves this site from /<repo-name>. The deploy workflow sets
// NEXT_PUBLIC_BASE_PATH automatically; locally it is empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
