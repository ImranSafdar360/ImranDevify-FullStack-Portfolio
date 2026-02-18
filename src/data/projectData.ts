export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  descriptionLong?: string;
  image: string;
  gallery?: string[];
  category: string;
  client?: string;
  date?: string;
  service?: string;
  techStack?: string[];
  challenge?: string;
  solution?: string;
  results?: string[];
  features?: string[];
  liveLink?: string;
  role?: string;
  testimonial?: {
    name: string;
    role: string;
    company: string;
    image: string;
    text: string;
    rating: number;
    socialLink?: string;
    socialPlatform?: string;
  };
  isCTA?: boolean;
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "petsnap",
    title: "PetSnap",
    description:
      "Capturing heartfelt moments for past 5 years. Trusted by 120+ happy pet parents across London.",
    descriptionLong:
      "PetSnap is a comprehensive platform designed for pet owners and professional photographers to connect and capture lasting memories. Our goal was to create an intuitive, emotionally resonant experience that simplifies the booking process while showcasing high-quality photography.",
    image:
      "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPetMock.423bd46e.png&w=1080&q=75",
    gallery: [
      "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPetMock.423bd46e.png&w=1080&q=75",
      "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FMarkitMock.91eccd8b.png&w=1080&q=75",
      "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FXionMock.673a96ac.png&w=1080&q=75",
    ],
    category: "Web Design",
    client: "PetSnap Studio",
    date: "2024",
    service: "Full Stack Dev",
    techStack: ["React", "Tailwind", "GSAP", "Node.js"],
    challenge:
      "The client struggled with a fragmented booking system and a website that didn't reflect the warmth and professionalism of their photography brand.",
    solution:
      "We built a custom Next.js application with a seamless booking flow, integrated payment gateway, and a stunning gallery system that emphasizes visual storytelling.",
    results: [
      "45% increase in online bookings",
      "2x user engagement on gallery pages",
      "Reduced administrative overhead by 60%",
    ],
    features: [
      "Smart Booking Calendar",
      "Real-time Photo Previews",
      "Secure Payment Integration",
    ],
    liveLink: "https://petsnap.com",
    role: "Lead Full Stack Developer & UI/UX Designer",
    testimonial: {
      name: "Sarah Jenkins",
      role: "Founder",
      company: "PetSnap Studio",
      image:
        "https://img.freepik.com/free-photo/young-businesswoman-smiling-camera_197531-11176.jpg",
      text: "The new platform has completely transformed how we do business. The booking system is seamless, and our clients love the new gallery experience. It reflects our brand perfectly.",
      rating: 5,
      socialPlatform: "Twitter",
      socialLink: "#",
    },
  },
  {
    id: "2",
    slug: "fizle",
    title: "Fizle",
    description:
      "For digital institutions, our onboarding system helps the user successful start the journey.",
    descriptionLong:
      "Fizle is a modern fintech onboarding solution that aims to reduce friction in the digital banking signup process. By focusing on user psychology and minimalist design, we created a flow that feels effortless and secure.",
    image:
      "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FMarkitMock.91eccd8b.png&w=1080&q=75",
    gallery: [
      "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FMarkitMock.91eccd8b.png&w=1080&q=75",
      "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FXionMock.673a96ac.png&w=1080&q=75",
      "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FVinhMockup.36fc6310.png&w=1080&q=75",
    ],
    category: "UX/UI Design",
    client: "Fizle Bank",
    date: "2024",
    service: "Product Design",
    techStack: ["Next.js", "Framer Motion", "Stripe", "Clerk"],
    challenge:
      "High drop-off rates during the KYC (Know Your Customer) process were hindering growth for Fizle's digital banking platform.",
    solution:
      "Implementation of a multi-step, animated onboarding flow with progressive disclosure and instant validation to keep users engaged and informed.",
    results: [
      "30% reduction in bounce rate",
      "25% higher completion rate for KYC",
      "Positive feedback on mobile UX",
    ],
    features: [
      "Dynamic Multi-Step Forms",
      "Automated Document Validation",
      "Biometric Integration Design",
    ],
    liveLink: "https://fizle.io",
    role: "Senior Product Designer",
    testimonial: {
      name: "Mark Thompson",
      role: "CEO",
      company: "Fizle Bank",
      image:
        "https://img.freepik.com/premium-photo/man-wearing-glasses-blue-shirt-with-white-shirt-that-says-he-is-wearing-blue-shirt_1289061-1605.jpg",
      text: "Working with the team was a game-changer. Our onboarding drop-off rates plummeted, and the user feedback has been overwhelmingly positive. The design is clean, intuitive, and secure.",
      rating: 5,
      socialPlatform: "LinkedIn",
      socialLink: "#",
    },
  },
  {
    id: "3",
    slug: "xion",
    title: "Xion",
    description:
      "Trusted by 1M+ creators around the world. Create scroll-stopping visuals with just one prompt.",
    descriptionLong:
      "Xion is an AI-powered creative platform that allows users to generate high-fidelity visuals using simple text prompts. Our work focused on the dashboard experience, making complex AI tools accessible to creators of all skill levels.",
    image:
      "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FXionMock.673a96ac.png&w=1080&q=75",
    gallery: [
      "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FXionMock.673a96ac.png&w=1080&q=75",
      "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FVinhMockup.36fc6310.png&w=1080&q=75",
      "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPetMock.423bd46e.png&w=1080&q=75",
    ],
    category: "SaaS Platform",
    client: "Xion Corp",
    date: "2023",
    service: "Dashboard Dev",
    techStack: ["React", "D3.js", "Tailwind", "Python"],
    challenge:
      "The existing AI interface was too technical for non-designers, leading to underutilization of the tool's advanced features.",
    solution:
      "A complete redesign of the workspace, introducing a 'Natural Language First' approach and real-time visual feedback loops.",
    results: [
      "1M+ active monthly users",
      "4.8/5 average user rating",
      "Increased feature adoption by 70%",
    ],
    features: [
      "Prompt-to-Image Canvas",
      "Real-time Style Tuning",
      "Batch Export Management",
    ],
    liveLink: "https://xion.ai",
    role: "Frontend Engineer",
    testimonial: {
      name: "David Lee",
      role: "Product Lead",
      company: "Xion Corp",
      image:
        "https://img.freepik.com/free-photo/front-view-man-posing-outdoors_23-2151038658.jpg",
      text: "The redesign of our creator dashboard was pivotal. It made high-end AI tools accessible to everyone, not just experts. Our user engagement metrics have never been higher.",
      rating: 5,
      socialPlatform: "Instagram",
      socialLink: "#",
    },
  },
  {
    id: "4",
    slug: "vinh-lei",
    title: "Vinh Lei",
    description:
      "Trusted by founders. We help brands stand out in a crowded market with unique identity.",
    descriptionLong:
      "Vinh Lei is a premium fashion brand that needed a digital experience as refined as their physical products. We focused on high-end animations and smooth transitions to create a luxury shopping environment.",
    image:
      "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FVinhMockup.36fc6310.png&w=1080&q=75",
    gallery: [
      "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FVinhMockup.36fc6310.png&w=1080&q=75",
      "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPetMock.423bd46e.png&w=1080&q=75",
      "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FMarkitMock.91eccd8b.png&w=1080&q=75",
    ],
    category: "Branding",
    client: "Vinh Lei",
    date: "2023",
    service: "UI/UX & Branding",
    techStack: ["Next.js", "Three.js", "GSAP", "Shopify"],
    challenge:
      "The client wanted to move away from a standard e-commerce template to a bespoke 'digital flagship' store that tells their story.",
    solution:
      "Development of a 3D-infused product showcase using Three.js and high-performance animations with GSAP, integrated with a custom Shopify backend.",
    results: [
      "Average session duration increased by 4 min",
      "15% increase in premium line sales",
      "Award-winning digital experience",
    ],
    features: [
      "3D Product Interactive Lab",
      "Immersive Storytelling Scroll",
      "Custom Checkout Flow",
    ],
    liveLink: "https://vinhlei.com",
    role: "Creative Director",
    testimonial: {
      name: "Lena Vinh",
      role: "Creative Director",
      company: "Vinh Lei",
      image:
        "https://img.freepik.com/free-photo/close-up-beautiful-girl-portrait-with-purple-hair_23-2150799937.jpg",
      text: "A truly exceptional partner. They translated our luxury brand values into a digital experience that is both stunning and highly functional. Our digital flagship is now our strongest asset.",
      rating: 5,
      socialPlatform: "Twitter",
      socialLink: "#",
    },
  },
];
