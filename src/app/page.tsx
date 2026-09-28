import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <main className="foundation-page">
      <p className="foundation-label text-meta">Portfolio V3 / Foundation</p>
    </main>
  );
}
