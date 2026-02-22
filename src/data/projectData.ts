export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  descriptionLong?: string;
  image: string;
  gallery?: string[];
  category: string;
  date?: string;
  service?: string;
  techStack?: string[];
  overview?: string;
  challenges?: {
    title: string;
    description: string;
    solution: string;
  }[];
  results?: string[];
  features?: string[];
  role?: {
    role: string;
    responsibilities: string[];
  };
  isCTA?: boolean;
  testimonial?: {
    image: string;
    name: string;
    socialLink?: string;
    socialPlatform?: string;
    rating: number;
    text: string;
    role: string;
    company: string;
  };
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "blarecast",
    title: "Blarecast",
    description:
      "AI-powered music streaming app with pay-per-listen model built using Expo & Supabase.",
    descriptionLong:
      "Blarecast is a next-generation mobile music streaming platform built with Expo React Native. It replaces traditional subscription models with a flexible pay-per-listen system, enhanced by AI-driven personalization, social engagement, and gamified listening experiences.",
    image: "/images/projects/blarecast/hero.png",
    gallery: [
      "/images/projects/blarecast/auth.png",
      "/images/projects/blarecast/pricing.png",
      "/images/projects/blarecast/home.png",
      "/images/projects/blarecast/playlist.png",
      "/images/projects/blarecast/player.png",
      "/images/projects/blarecast/discover.png",
      "/images/projects/blarecast/library.png",
      "/images/projects/blarecast/gift.png",
      "/images/projects/blarecast/profile.png",
    ],
    category: "Mobile Application",
    date: "2025",
    service: "Product Engineering",
    techStack: [
      "React Native (Expo)",
      "Supabase",
      "Redux Toolkit",
      "RTK Query",
      "React Native Track Player",
      "Stripe",
      "Google Auth",
      "Google Cast",
    ],

    overview:
      "Blarecast reimagines music consumption through a custom pay-per-listen business model. Users create listening packages instead of buying subscriptions, while AI curates personalized playlists based on mood, behavior, and listening patterns. The goal was to deliver a smooth, Spotify-level streaming experience inside a scalable React Native architecture.",

    challenges: [
      {
        title: "Complex Animated Plan Selection UI",
        description:
          "The pricing/plan selection page had a highly modern and complex design in Figma. Recreating it natively in React Native was difficult due to advanced shapes and animated layout behavior.",
        solution:
          "After deep research and analyzing the web version of the product, I identified that the layout was SVG-driven. I rebuilt the UI using custom SVG components and structured positioning logic, achieving pixel-perfect rendering and smooth animations.",
      },
      {
        title: "Google Authentication + Supabase Integration",
        description:
          "Implementing Google Sign-In in a mobile environment was challenging since my background was primarily web. The authentication worked in development but failed in production due to redirect and OAuth configuration issues.",
        solution:
          "I configured Google Cloud Console properly, created OAuth credentials, and aligned redirect URLs between Supabase and the Expo environment. After moving the project from testing to production mode and fixing redirect mismatches, authentication worked seamlessly in both dev and production.",
      },
      {
        title: "Stripe Subscription & Payment Logic",
        description:
          "Implementing subscription logic for a pay-per-listen model required secure and reliable mobile payment handling.",
        solution:
          "I integrated Stripe using Stripe Sheet for mobile-optimized checkout, ensuring secure transactions and proper subscription state handling inside the app.",
      },
      {
        title: "Streaming Engine & Audio Performance",
        description:
          "Initially, the app used Expo-AV for streaming. However, it lacked advanced playback features like queue management, shuffle, loop, and background performance comparable to Spotify.",
        solution:
          "I migrated the audio engine to React Native Track Player. This enabled advanced queue control, background playback, shuffle, loop functionality, and significantly smoother streaming performance.",
      },
    ],

    results: [
      "Production-ready streaming architecture",
      "Secure OAuth authentication in live environment",
      "Stable Stripe-powered subscription flow",
      "Advanced queue, shuffle, and background playback system",
    ],

    features: [
      "AI-Curated Playlists",
      "Pay-Per-Listen Business Model",
      "Music Sharing with Friends",
      "Daily Listening Challenges",
      "Offline Playback",
      "Background Streaming",
      "Queue, Shuffle & Loop Controls",
      "Google Cast Integration",
    ],

    role: {
      role: "Product Engineer (Mobile Application)",
      responsibilities: [
        "Designed and developed entire mobile UI from scratch",
        "Architected pay-per-listen business logic",
        "Integrated Supabase authentication & database",
        "Implemented Google OAuth production setup",
        "Built Stripe subscription flow",
        "Migrated audio engine to React Native Track Player",
        "Managed global state with Redux Toolkit & RTK Query",
        "Optimized performance and playback stability",
      ],
    },
  },
  {
    id: "2",
    slug: "your-business-date",
    title: "Your Business Date",
    description:
      "Subscription-based professional dating & networking SaaS built with Next.js and real-time architecture.",
    descriptionLong:
      "Your Business Date is a business-focused dating and networking platform combining professional compatibility with romantic matching. Built using Next.js, the platform includes real-time messaging, integrated video calls, subscription monetization, intelligent filtering, and business advertising capabilities. The focus was performance, scalable state management, and seamless real-time user interaction.",
    image: "/images/projects/ybd/ybd-hero.png",
    gallery: [
      "/images/projects/ybd/ybd-hero.png",
      "/images/projects/ybd/ybd-chat.png",
      "/images/projects/ybd/ybd-blogs.png",
      "/images/projects/ybd/ybd-home.png",
    ],
    category: "Web SaaS Platform",
    date: "2024",
    service: "Frontend Engineering & System Logic Implementation",
    techStack: [
      "Next.js",
      "Redux Toolkit",
      "Firebase",
      "Socket.io",
      "Agora SDK",
      "Stripe",
      "Tailwind CSS",
      "Framer Motion",
      "Webhooks",
      "Email Services",
    ],

    overview:
      "A subscription-based SaaS platform designed for career-oriented individuals seeking professional networking and meaningful relationships. The platform combines advanced filtering, real-time chat, video calling, subscription management, and business advertising into a high-performance web architecture.",

    challenges: [
      {
        title: "Complex Multi-Step Registration & State Management",
        description:
          "The registration flow contained 9 multi-step forms with dynamic validation and API payload dependencies. State updates were inconsistent, causing payload mismatches and broken real-time updates.",
        solution:
          "After deep collaboration and understanding advanced Redux patterns, I restructured global and local state logic using Redux Toolkit. I separated UI state from API state, normalized form handling, and ensured consistent payload synchronization across steps.",
      },
      {
        title: "Broken Frontend Filtering Logic",
        description:
          "The swipe-based discovery page had complex filtering logic by profession, industry, location, and interests. Filters were not returning correct results due to mismatched payload structures.",
        solution:
          "I collaborated closely with the backend engineer to understand the API contract and filtering logic. After aligning request structures and refining frontend filtering conditions, the discovery system began returning accurate, real-time results.",
      },
      {
        title: "Real-Time Chat System Implementation",
        description:
          "This was my first implementation of a real-time chat system using Socket.io. Message syncing, read receipts, file sharing, and emoji support required careful state synchronization.",
        solution:
          "I implemented Socket.io listeners with structured event handling, managed message queues properly in Redux, and built support for image/document uploads and emoji rendering — creating a WhatsApp-like chat experience inside a SaaS platform.",
      },
      {
        title: "Audio & Video Calling with Agora SDK",
        description:
          "The Agora SDK documentation lacked clarity for certain edge cases. Calls were failing to connect despite correct logic implementation.",
        solution:
          "I carefully studied the SDK documentation, restructured the connection lifecycle, and ensured proper token handling and channel synchronization. After debugging connection flow and event triggers, audio/video calls became stable and production-ready.",
      },
    ],

    results: [
      "Stable real-time messaging & calling system",
      "Optimized multi-step onboarding architecture",
      "Accurate intelligent filtering system",
      "Seamless Stripe subscription integration",
    ],

    features: [
      "Swipe-Based Profile Discovery",
      "Advanced Professional Filtering",
      "Real-Time Messaging (Socket.io)",
      "Integrated Video Calling (Agora)",
      "Subscription-Based Monetization (Stripe)",
      "Business Advertising Portal",
      "Event & Networking Management",
      "AI-Based Compatibility Matching",
      "Analytics Dashboard",
    ],

    role: {
      role: "Frontend Engineer",
      responsibilities: [
        "Built complete UI architecture using Next.js & Tailwind",
        "Implemented API integration & business logic",
        "Structured multi-step registration flow",
        "Integrated Stripe subscription system",
        "Built real-time chat system using Socket.io",
        "Implemented Agora-based audio & video calling",
        "Handled animations using Framer Motion",
        "Collaborated with backend team for API alignment",
      ],
    },
  },
  {
    id: "3",
    slug: "e-axon",
    title: "E-Axon",
    description:
      "Multi-page digital solutions platform built with scalable frontend architecture.",
    descriptionLong:
      "E-Axon is a digital transformation platform designed to showcase agency services including quality assurance, application modernization, mobile app development, and AI integration. Built using Next.js, the platform focuses on performance, modular architecture, and scalable content management through optimized state handling.",
    image: "/images/projects/e-axon/hero.png",
    gallery: [
      "/images/projects/e-axon/hero.png",
      "/images/projects/e-axon/help-faq.png",
      "/images/projects/e-axon/services-stats.png",
      "/images/projects/e-axon/footer-process.png",
      "/images/projects/e-axon/service-details.png",
      "/images/projects/e-axon/work-details.png",
      "/images/projects/e-axon/about-story.png",
      "/images/projects/e-axon/about-details.png",
    ],
    category: "Web Platform",
    date: "2024",
    service: "Frontend Engineering",
    techStack: [
      "Next.js",
      "React",
      "Redux Toolkit",
      "Tailwind CSS",
      "GSAP",
      "JavaScript",
    ],

    overview:
      "E-Axon was built as a structured multi-page platform to present agency services in a scalable and performance-optimized way. The focus was on reusable architecture, dynamic routing, centralized service data handling, and modern animation systems to deliver a polished digital experience.",

    challenges: [
      {
        title: "Scalable State Management for Multi-Service Architecture",
        description:
          "The platform included 9 service pages, each requiring structured data handling. Managing service data individually across pages risked duplication and performance overhead.",
        solution:
          "I implemented a centralized Redux store to manage all service data efficiently. By storing and accessing service content through the global store, I reduced redundancy, improved performance, and simplified page rendering logic.",
      },
      {
        title: "Dynamic Routing with Complex UI Components",
        description:
          "Each service required its own detailed page with sliders, hero sections, tech stack components, and structured layouts. Building separate static pages would have increased code duplication.",
        solution:
          "I created a single dynamic service template using reusable components and Next.js dynamic routing. Service-specific data was injected from the Redux store, enabling scalable page generation with clean, maintainable architecture.",
      },
    ],

    results: [
      "Optimized multi-page architecture",
      "Reusable component-driven system",
      "Improved development efficiency",
      "High-performance responsive design",
    ],

    features: [
      "Dynamic Service Pages (9 Services)",
      "Reusable Component Architecture",
      "Centralized Redux Data Management",
      "Smooth GSAP Animations",
      "Fully Responsive Layout",
      "SEO-Friendly Next.js Routing",
    ],

    role: {
      role: "Frontend Engineer",
      responsibilities: [
        "Designed and developed full multi-page platform",
        "Implemented Redux Toolkit for structured service data management",
        "Built dynamic service pages using reusable components",
        "Integrated GSAP animations for modern UI transitions",
        "Ensured responsiveness across all devices",
        "Implemented email & call interaction logic in footer",
        "Optimized component reusability and maintainability",
      ],
    },
  },
  {
    id: "4",
    slug: "xelvo-creative",
    title: "Xelvo Creative",
    description:
      "Performance-focused design agency platform with integrated admin system and lead management.",
    descriptionLong:
      "Xelvo Creative is a premium single-page agency platform built for performance, scalability, and operational efficiency. Beyond converting a high-end Figma design into a pixel-perfect Next.js experience, the project evolved into a full-stack system including a custom-built admin dashboard for lead management, content control, and project updates.",
    image: "/images/projects/xelvo/hero.png",
    gallery: [
      "/images/projects/xelvo/hero-new.png",
      "/images/projects/xelvo/services.png",
      "/images/projects/xelvo/projects-skills.png",
      "/images/projects/xelvo/faqs-reviews.png",
      "/images/projects/xelvo/footer.png",
      "/images/projects/xelvo/admin.png",
      "/images/projects/xelvo/admin-projects.png",
      "/images/projects/xelvo/admin-reviews.png",
      "/images/projects/xelvo/admin-talent.png",
      "/images/projects/xelvo/admin-contact.png",
    ],
    category: "Web Platform",
    date: "2024",
    service: "Full Stack Engineering",
    techStack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Redux Toolkit",
      "GSAP",
      "ShadCN UI",
      "bcrypt.js",
      "Supabase Storage",
    ],

    overview:
      "Originally scoped as a high-end landing page, this project evolved into a complete performance-driven agency platform. I transformed a modern Figma design into a pixel-perfect, animated Next.js application and proposed an integrated admin dashboard to replace manual lead handling workflows. The result was a scalable system combining marketing presence with operational efficiency.",

    challenges: [
      {
        title: "Complex Premium UI Implementation",
        description:
          "The landing page design required precise animation timing, structured layouts, and high visual fidelity across devices.",
        solution:
          "I carefully translated the Figma design into a responsive Next.js implementation using GSAP for smooth animations, ensuring pixel-perfect accuracy and consistent performance across screen sizes.",
      },
      {
        title: "Building an Admin System from Scratch",
        description:
          "The client initially requested only a landing page. However, the agency managed leads manually through external tools, creating inefficiencies.",
        solution:
          "I proposed and developed a full admin dashboard as an internal system. The dashboard allows CRUD operations for projects and testimonials, lead status management (qualified, rejected, converted, hired), resume handling, and real-time content updates — giving the agency full operational control.",
      },
      {
        title: "Supabase Configuration & Security Policies",
        description:
          "Setting up Supabase required database structuring, storage bucket configuration, row-level security policies, and authentication handling.",
        solution:
          "I configured secure database schemas, implemented Supabase authentication, hashed credentials using bcrypt.js, and established protected admin routes. Storage buckets were configured for project assets and resume uploads with proper access control.",
      },
    ],

    results: [
      "High-performance marketing landing page",
      "Custom-built internal admin dashboard",
      "Structured lead qualification workflow",
      "Secure authentication & data handling",
      "Reduced manual agency operations",
    ],

    features: [
      "Pixel-Perfect Figma to Code Implementation",
      "GSAP-Based Smooth Animations",
      "Admin Dashboard with CRUD Control",
      "Lead Status Management System",
      "Secure Supabase Authentication",
      "Resume & Asset Storage Handling",
      "Fully Responsive Premium UI",
    ],

    role: {
      role: "Full Stack Engineer",
      responsibilities: [
        "Converted complex Figma design into production-ready Next.js app",
        "Architected and built custom admin dashboard",
        "Implemented Supabase backend & storage system",
        "Built authentication & protected admin routes",
        "Developed CRUD operations for projects & testimonials",
        "Created structured lead management workflow",
        "Integrated GSAP animations for premium UX",
      ],
    },
  },
];
