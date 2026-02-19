import React from "react";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import SectionSeparator from "@/components/shared/SectionSeparator";

const sections = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing and using this website (imran-devify.com), you accept and agree to be bound by these Terms & Conditions. If you do not agree, please discontinue use of the site.",
  },
  {
    title: "Services Described",
    content:
      "This portfolio website is for informational purposes only. It showcases the skills, services, and past work of Imran Safdar — a Full-Stack Engineer and React Native developer. Descriptions of services do not constitute a binding contract until a formal agreement is signed.",
  },
  {
    title: "Intellectual Property",
    content:
      "All content on this website — including text, design, graphics, code snippets, and project showcases — is the intellectual property of Imran Safdar unless otherwise credited. You may not reproduce, redistribute, or use any content without prior written permission.",
  },
  {
    title: "Third-Party Links",
    content:
      "This site may contain links to external platforms (e.g., GitHub, LinkedIn, Calendly). These are provided for convenience only. Imran Safdar is not responsible for the content, privacy practices, or reliability of any third-party websites.",
  },
  {
    title: "Limitation of Liability",
    content:
      "This website is provided 'as is' without any warranties. Imran Safdar shall not be liable for any direct, indirect, or incidental damages arising from the use or inability to use this website or its content.",
  },
  {
    title: "Changes to Terms",
    content:
      "These terms may be updated at any time without prior notice. Continued use of the site following any changes constitutes your acceptance of the revised terms.",
  },
  {
    title: "Contact",
    content:
      "For any questions regarding these Terms & Conditions, reach out via the Contact page or email directly at imransafdar360@gmail.com.",
  },
];

export default function TermsContent() {
  return (
    <main className="w-full py-[120px] flex flex-col gap-[64px]">
      {/* Hero Header */}
      <Section className="flex flex-col items-center gap-[16px] text-center max-w-[780px] mx-auto">
        <SectionHeader
          badgeText="Legal"
          title="Terms & "
          gradientText="Conditions"
          description="Please read these terms carefully before engaging with or using any content on this website."
        />
        <p className="text-white/40 text-sm mt-2">
          Last updated: February 2026
        </p>
      </Section>

      <SectionSeparator
        orientation="horizontal"
        color="FFFFFF"
        centerOpacity={0.08}
        className="max-w-[1440px] mx-auto w-full px-4 md:px-6"
      />

      {/* Content Sections */}
      <Section className="flex flex-col gap-[40px] max-w-[780px] mx-auto">
        {sections.map((section, index) => (
          <div key={index} className="flex flex-col gap-[12px]">
            <div className="flex items-center gap-3">
              <span
                className="text-[13px] font-mono font-medium px-2 py-0.5 rounded"
                style={{
                  background: "rgba(0,128,255,0.1)",
                  color: "#0080FF",
                  border: "1px solid rgba(0,128,255,0.2)",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="text-[20px] md:text-[22px] font-semibold text-white leading-snug font-sora">
                {section.title}
              </h2>
            </div>
            <p className="text-[15px] md:text-[16px] leading-[26px] text-white/60 pl-[42px]">
              {section.content}
            </p>
          </div>
        ))}
      </Section>

      <SectionSeparator
        orientation="horizontal"
        color="FFFFFF"
        centerOpacity={0.08}
        className="max-w-[1440px] mx-auto w-full px-4 md:px-6"
      />

      {/* Footer note */}
      <Section className="max-w-[780px] mx-auto text-center">
        <p className="text-white/40 text-sm leading-relaxed">
          These terms govern your use of this website only. Service-specific
          agreements are established separately through direct communication.
        </p>
      </Section>
    </main>
  );
}
