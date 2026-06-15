import { cn } from "@/lib/utils";

/**
 * Numbered rounded pill eyebrow — "/ 03 / SELECTED WORK".
 * Replaces the plain mono eyebrows on the redesigned home sections.
 *
 * Named SectionNumberBadge (not SectionBadge) on purpose: the legacy
 * SectionBadge component is still imported by ~18 legacy pages/sections
 * with a different API, so this is a parallel component, not a rewrite.
 */
export default function SectionNumberBadge({
  number,
  label,
  className,
}: {
  number: string;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-elevated px-4 py-1.5 font-mono text-mono-xs uppercase tracking-wider",
        className
      )}
    >
      <span className="text-text-subtle">/</span>
      <span className="text-accent">{number}</span>
      <span className="text-text-subtle">/</span>
      <span className="text-text-muted">{label}</span>
    </span>
  );
}
