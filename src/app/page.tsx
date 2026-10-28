import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

// Placeholder while Portfolio V4 is rebuilt (tasks/todo.md). Replaced in T12.
export default function HomePage() {
  return (
    <main style={{ display: "grid", minHeight: "100vh", placeItems: "center", padding: 24 }}>
      <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 14, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        Imran Safdar · Portfolio V4 in progress
      </p>
    </main>
  );
}
