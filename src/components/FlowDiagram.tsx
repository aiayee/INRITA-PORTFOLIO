/**
 * Data-flow diagram from plain text steps ("Label | note"). Horizontal and
 * wrapping on wide screens, a vertical chain on phones. Real list markup, so
 * it reads correctly to screen readers as an ordered sequence.
 */
export function FlowDiagram({ flows }: { flows: string[][] }) {
  return (
    <div className="grid gap-6">
      {flows.map((flow, f) => (
        <ol
          key={f}
          aria-label={f === 0 ? "Main flow" : `Additional flow ${f}`}
          className="flex flex-col items-stretch gap-0 sm:flex-row sm:flex-wrap sm:items-center sm:gap-y-4"
        >
          {flow.map((step, i) => {
            const [label, note] = step.split("|").map((s) => s.trim());
            const last = i === flow.length - 1;
            return (
              <li key={`${step}-${i}`} className="flex flex-col items-center sm:flex-row">
                <span
                  className={`flow-node w-full rounded-2xl border px-4 py-3 text-center sm:w-auto ${
                    i === 0 || last ? "border-accent/60 bg-accent-soft" : "border-border bg-surface-2"
                  }`}
                  style={{ animationDelay: `${(f * flow.length + i) * 90}ms` }}
                >
                  <span className="block text-sm font-semibold">{label}</span>
                  {note && <span className="mt-0.5 block font-mono text-[0.7rem] text-muted">{note}</span>}
                </span>
                {!last && (
                  <span aria-hidden="true" className="flow-arrow text-accent">
                    <svg viewBox="0 0 24 24" className="size-5 rotate-90 sm:rotate-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12h15M14 6l6 6-6 6" />
                    </svg>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      ))}
    </div>
  );
}
