export type CaseStudy = {
  id: string;
  name: string;
  tag: string;
  live: boolean;
  problem: string;
  decision: string;
  outcome: string;
  stack: string[];
  imageSrc?: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "blarecast",
    name: "Blarecast",
    tag: "MOBILE · AI · 2025",
    live: true,
    problem:
      "A pay-per-listen music app needed Spotify-grade playback — background streaming, queue, shuffle, loop — but the team had built it on Expo-AV, which couldn't handle any of it cleanly.",
    decision:
      "I migrated the entire audio engine to React Native Track Player and rebuilt the playback layer around it. Same call for the pricing screen: the Figma design was SVG-driven, so I rebuilt it natively in SVG instead of approximating in React Native primitives. Pixel-parity, no compromise.",
    outcome:
      "Production-ready streaming with background playback, queue control, shuffle, and loop. Google OAuth working in production after fixing the Supabase redirect chain. Stripe subscription flow live. AI-curated playlists shipping.",
    stack: [
      "React Native",
      "Expo",
      "Supabase",
      "RN Track Player",
      "Stripe",
      "Redux Toolkit",
    ],
    imageSrc: "/images/projects/blarecast/hero.webp",
  },
  {
    id: "your-business-date",
    name: "Your Business Date",
    tag: "WEB SAAS · REAL-TIME · 2024",
    live: true,
    problem:
      "A professional networking SaaS with nine multi-step onboarding forms, Socket.io chat, Agora video calls, and Stripe subscriptions — and a state layer where form payloads and real-time updates kept colliding.",
    decision:
      "Restructured global state in Redux Toolkit by separating UI state from API state, normalized form handling, and built proper Socket.io event handling with message queues in Redux. For Agora, restructured the connection lifecycle and token handling instead of patching call failures.",
    outcome:
      "Stable real-time messaging and video calling in production. Nine-step onboarding with consistent payload sync. Accurate professional filtering by industry, location, and interests. Stripe subscriptions live.",
    stack: ["Next.js", "Redux Toolkit", "Socket.io", "Agora SDK", "Stripe", "Firebase"],
  },
  {
    id: "xelvo-creative",
    name: "Xelvo Creative",
    tag: "FULL-STACK · INTERNAL TOOLS · 2024",
    live: true,
    problem:
      "Client scoped a landing page. But their agency was running leads through external tools manually — losing data, losing time. A landing page wouldn't fix that.",
    decision:
      "Proposed and built a full admin dashboard alongside the marketing site. Supabase backend with row-level security, bcrypt auth, protected admin routes, CRUD for projects and testimonials, and a lead status workflow — qualified, rejected, converted, hired.",
    outcome:
      "Marketing site and internal operations system, both shipped. Agency stopped running leads through spreadsheets. Founder feedback: real operational value for the agency.",
    stack: ["Next.js", "TypeScript", "Supabase", "ShadCN UI", "GSAP", "bcrypt"],
  },
  {
    id: "e-axon",
    name: "E-Axon",
    tag: "WEB PLATFORM · SCALABLE ARCHITECTURE · 2024",
    live: true,
    problem:
      "Nine service pages, each with its own hero, slider, tech stack, and detailed content. Building nine static pages was an obvious dead end.",
    decision:
      "Built a single dynamic service template using Next.js dynamic routing, with all service data centralized in a Redux store. One template, nine routes, zero duplication.",
    outcome:
      "Nine production service pages from one component tree. Adding a tenth service is a data entry, not a new page. GSAP-driven motion across the platform. Fully responsive.",
    stack: ["Next.js", "React", "Redux Toolkit", "GSAP", "Tailwind"],
  },
];
