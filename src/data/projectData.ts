export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  client?: string;
  date?: string;
  service?: string;
  techStack?: string[];
  isCTA?: boolean;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "PetSnap",
    description:
      "Capturing heartfelt moments for past 5 years. Trusted by 120+ happy pet parents across London.",
    image:
      "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPetMock.423bd46e.png&w=1080&q=75",
    category: "Web Design",
    client: "PetSnap",
    date: "2024",
    service: "Full Stack Dev",
    techStack: ["React", "Tailwind", "GSAP"],
  },
  {
    id: "2",
    title: "Fizle",
    description:
      "For digital institutions, our onboarding system helps the user successful start the journey.",
    image:
      "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FMarkitMock.91eccd8b.png&w=1080&q=75",
    category: "UX/UI Design",
    client: "Fizle",
    date: "2024",
    service: "Product Design",
    techStack: ["Next.js", "Framer Motion", "Stripe"],
  },
  {
    id: "3",
    title: "Xion",
    description:
      "Trusted by 1M+ creators around the world. Create scroll-stopping visuals with just one prompt.",
    image:
      "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FXionMock.673a96ac.png&w=1080&q=75",
    category: "SaaS Platform",
    client: "Xion Corp",
    date: "2023",
    service: "Dashboard Dev",
    techStack: ["React", "D3.js", "Tailwind"],
  },
  {
    id: "4",
    title: "Vinh Lei",
    description:
      "Trusted by founders. We help brands stand out in a crowded market with unique identity.",
    image:
      "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FVinhMockup.36fc6310.png&w=1080&q=75",
    category: "Branding",
    client: "Vinh Lei",
    date: "2023",
    service: "UI/UX & Branding",
    techStack: ["Next.js", "Three.js", "GSAP"],
  },
];
