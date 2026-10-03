"use client";

import { useEffect, useState } from "react";

/**
 * Types each role, pauses, deletes it, then moves to the next one.
 * Server HTML (and reduced-motion / no-JS visitors) shows the first role.
 */
export function RoleTyper({ roles }: { roles: string[] }) {
  const [text, setText] = useState(roles[0] ?? "");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (roles.length < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAnimate(true);

    let i = 0;
    let len = roles[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (deleting) {
        len -= 1;
        if (len === 0) {
          deleting = false;
          i = (i + 1) % roles.length;
        }
      } else {
        len += 1;
        if (len === roles[i].length) deleting = true;
      }
      setText(roles[i].slice(0, len));
      // Hold a finished word, breathe before the next one, delete faster than typing.
      const delay = deleting ? (len === roles[i].length ? 1800 : 35) : len === 0 ? 300 : 70;
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 2200);
    return () => clearTimeout(timer);
  }, [roles]);

  return (
    <>
      {/* Screen readers get the whole list once instead of a flickering word. */}
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true">
        {text}
        {animate && <span className="typer-caret" />}
      </span>
    </>
  );
}
