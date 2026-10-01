"use client";

import { useState } from "react";

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${label}`}
      className="shrink-0 rounded-md px-2 py-1 font-mono text-xs text-muted transition-colors hover:bg-accent-soft hover:text-accent-soft-fg"
    >
      <span aria-live="polite">{state === "copied" ? "copied ✓" : state === "failed" ? "copy failed" : "copy"}</span>
    </button>
  );
}
