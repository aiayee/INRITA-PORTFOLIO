import Link from "next/link";
import { buttonStyles } from "@/components/ui";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:py-32">
      <p className="font-mono text-sm text-accent">HTTP 404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Page not found</h1>
      <p className="mt-4 text-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link href="/" className={`${buttonStyles.primary} mt-8`}>
        Back to home
      </Link>
    </div>
  );
}
