"use client";

import React from "react";
import AnimatedButton from "@/components/shared/AnimatedButton";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import DynamicCard from "@/components/shared/DynamicCard";
import { cn } from "@/lib/utils";

import { Rocket, Briefcase, Paintbrush, Layout } from "lucide-react";

interface ClientCard {
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
}

const clients: ClientCard[] = [
  {
    title: "Digital Agencies",
    description:
      "For agencies that need a reliable development partner to execute clean, scalable work — without hand-holding or shortcuts.",
    icon: Layout,
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "SaaS Founders",
    description:
      "For founders turning ideas into real products — MVPs, dashboards, internal tools, and customer-facing platforms built to scale.",
    icon: Rocket,
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Small Businesses",
    description:
      "For businesses investing in digital products, not quick fixes — where code quality, performance, and UX actually matter.",
    icon: Briefcase,
    gradient: "from-orange-500/20 to-yellow-500/20",
  },
  {
    title: "Freelancers",
    description:
      "For creative professionals and freelancers who need technical expertise to bring their complex design visions to life.",
    icon: Paintbrush,
    gradient: "from-green-500/20 to-emerald-500/20",
  },
];

export default function WhoIWorkWith() {
  return (
    <Section className="relative flex flex-col justify-center items-center gap-[84px]">
      <SectionHeader
        className="max-w-[60%] items-center gap-[8px]"
        title="Who I Usually "
        description="I work with people building serious products — not just websites. Teams that care about quality, clarity, and long-term impact."
        badgeText="Who I Work With"
        gradientText="Work With"
      />
      <AnimatedButton onClick={() => {}}>
        Let&apos;s Build It Right
      </AnimatedButton>

      {/* Client Cards Grid - Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-10 gap-6 w-full max-w-[1240px]">
        {clients.map((client, index) => {
          const colSpan =
            index === 0 || index === 3 ? "md:col-span-6" : "md:col-span-4";
          const Icon = client.icon;

          return (
            <DynamicCard
              key={client.title}
              className={cn(
                "max-w-none min-h-[420px] flex flex-col p-8 group transition-all duration-500",
                colSpan,
                "col-span-1",
              )}
            >
              {/* Icon with Glowing Effect */}
              <div className="relative w-fit h-fit z-10 p-5 rounded-2xl bg-[#0080FF]">
                <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
              </div>

              {/* Bottom Content Area */}
              <div className="mt-auto flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  <h4 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    {client.title}
                  </h4>
                </div>

                <p className="text-md md:text-lg font-medium text-white/50 leading-relaxed max-w-[90%]">
                  {client.description}
                </p>
              </div>
            </DynamicCard>
          );
        })}
      </div>
    </Section>
  );
}
