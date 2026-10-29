import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

// Placeholder while Portfolio V4 is rebuilt (tasks/todo.md). Shows the four font roles; replaced in T12.
export default function HomePage() {
  return (
    <main className="mx-auto grid min-h-screen w-[var(--frame)] content-center gap-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.04em] text-text-3">/ 00 / Portfolio V4 in progress</p>
      <h1 className="font-display text-[clamp(3.6rem,10.5vw,9.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em]">
        Imran
        <br />
        Safdar
      </h1>
      <p className="font-script text-accent">Hi, I&apos;m Imran</p>
      <p className="max-w-[54ch] text-text-2">
        Full-stack engineer for products that are already live. This page is a temporary placeholder while the new
        portfolio is built.
      </p>
    </main>
  );
}
