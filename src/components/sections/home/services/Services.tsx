import React from "react";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import ImageCard from "@/components/shared/ImageCard";
import DynamicCard from "@/components/shared/DynamicCard";
import {
  LuGauge,
  LuLayers,
  LuLayoutDashboard,
  LuTabletSmartphone,
} from "react-icons/lu";
import SectionSeparator from "@/components/shared/SectionSeparator";
import SectionBadge from "@/components/shared/SectionBadge";
import { useDeviceType } from "@/hooks/use-mobile";
import { CheckCircle2 } from "lucide-react";
import IconBox from "@/components/shared/IconBox";

const services = [
  {
    title: "Product Architecture & System Design",
    description:
      "Before writing code, I design the system. Clear backend structure. Scalable database design. Defined API contracts. This prevents future rewrites and scaling issues.",
    category: "Architecture",
    icon: LuLayers,
    bullets: [
      "Scalable backend & database architecture",
      "Secure authentication & role-based systems",
      "Clean API structure for long-term maintainability",
    ],
  },
  {
    title: "Web Application Development",
    description:
      "High-performance SaaS platforms built with clarity and structure. Fast interfaces. Clean state management. Real-world usability.",
    category: "Web Development",
    icon: LuLayoutDashboard,
    bullets: [
      "Scalable React & Next.js applications",
      "Optimized frontend-backend integration",
      "Subscription logic & payment integration (Stripe)",
    ],
  },
  {
    title: "Mobile App Development (React Native & Expo)",
    description:
      "Cross-platform apps engineered for performance and stability. Not just apps that work — apps that handle real users.",
    category: "Mobile Apps",
    icon: LuTabletSmartphone,
    bullets: [
      "iOS & Android apps from one codebase",
      "Background tasks, offline storage & API integration",
      "Smooth performance & scalable architecture",
    ],
  },
  {
    title: "Performance & Growth Optimization",
    description:
      "Products slow down when growth isn’t planned. I optimize systems at both frontend and backend layers to ensure your product stays fast as usage increases.",
    category: "Optimization",
    icon: LuGauge,
    bullets: [
      "Database indexing & query optimization",
      "Efficient state handling & rendering",
      "Performance-focused refactoring & scaling strategy",
    ],
  },
];

const Services = () => {
  const { isMobile, isTablet } = useDeviceType();

  return (
    <Section
      id="services"
      className="relative flex flex-col lg:flex-row justify-center gap-[84px]"
    >
      <div className="static lg:sticky top-40 self-start hidden lg:block">
        <ImageCard image="/images/profile-pic.avif" alt="Services" />
      </div>
      <div className="w-full lg:max-w-[50%] flex flex-col gap-[84px]">
        <SectionHeader
          className="gap-[8px]"
          title="Building Products That "
          description="I partner with founders and agencies to design, build, and scale SaaS and mobile products — structured with strong architecture, performance, and long-term growth in mind."
          badgeText="Core Product Expertise"
          gradientText="Scale With Confidence"
          isAbout={isMobile || isTablet ? false : true}
        />

        <div className="flex flex-col gap-6">
          {services.map((service, index) => (
            <DynamicCard
              key={index}
              className="relative max-w-full lg:max-w-[590px] min-h-fit p-8"
            >
              <div className="flex flex-col gap-[44px]">
                <div className="flex justify-between items-start">
                  <IconBox icon={service.icon} size="lg" />
                  <SectionBadge className="text-sm" text={service.category} />
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-bold text-white font-sora">
                    {service.title}
                  </h3>
                  <p className="text-md text-white/60 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="w-full max-w-[50%]">
                  <SectionSeparator
                    orientation="horizontal"
                    color="FFFFFF"
                    centerOpacity={0.25}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  {service.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#0080FF] shrink-0" />
                      <span className="text-white/80 font-medium">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </DynamicCard>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Services;
