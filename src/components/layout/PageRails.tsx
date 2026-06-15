/**
 * PageRails — two whisper-quiet vertical "blueprint" rails framing the page's
 * content column, running the full viewport height behind all content.
 *
 * Fixed to the viewport and rendered outside the Locomotive scroll container
 * so the rails stay perfectly still while the page scrolls under them — a
 * stable structural frame, not a moving line.
 *
 * Sits at -z-10 (behind in-flow content, above the body background) and is
 * pointer-events-none, so it never intercepts clicks or covers text.
 *
 * Alignment: the rails share the `container` frame (max-w-[1600px], centered)
 * but inset by clamp(12px, 2.5vw, 48px) — a SMALLER inset than the container's
 * own padding (clamp(24px, 5vw, 96px)). That difference is the gap between the
 * rails and the content, and it scales: ~12px on mobile, up to 48px on wide
 * screens. Content never touches the rails. (Keep in sync with globals.css
 * `@utility container` and SectionDivider.)
 */
export default function PageRails() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="relative mx-auto h-full w-full max-w-[1600px]">
        <span className="absolute inset-y-0 left-[clamp(12px,2.5vw,48px)] w-px bg-white/[0.12]" />
        <span className="absolute inset-y-0 right-[clamp(12px,2.5vw,48px)] w-px bg-white/[0.12]" />
      </div>
    </div>
  );
}
