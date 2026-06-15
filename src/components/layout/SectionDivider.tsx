/**
 * SectionDivider — a faint full-bleed horizontal hairline placed between major
 * sections. Spans the full viewport width (edge to edge), matching the footer's
 * top border — NOT clamped to the content frame. The vertical PageRails stay
 * inset, so each divider crosses them like a blueprint grid line. Kept at 10%
 * white to sit with the rails as one quiet system.
 */
export default function SectionDivider() {
  return <div aria-hidden className="h-px w-full bg-white/[0.1]" />;
}
