import React from "react";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import SectionSeparator from "@/components/shared/SectionSeparator";

const sections = [
  {
    title: "Information Collected",
    content:
      "This website may collect basic information you voluntarily provide — such as your name, email address, and project details — when you use the contact form or book a call via Calendly. No data is collected passively without your interaction.",
  },
  {
    title: "How Your Information Is Used",
    content:
      "Information you provide is used solely to respond to your inquiry, schedule a discovery call, or discuss a potential project. Your data is never sold, shared with third parties, or used for marketing without your explicit consent.",
  },
  {
    title: "Third-Party Services",
    content:
      "This site integrates Calendly for scheduling. When you book a call, you interact directly with Calendly's platform, which has its own privacy policy. Basic analytics may be used to understand site traffic — no personally identifiable data is stored through analytics.",
  },
  {
    title: "Cookies",
    content:
      "This website may use minimal cookies to support core functionality (e.g., smooth scroll, session preferences). No tracking or advertising cookies are used. You can disable cookies in your browser settings without affecting core content.",
  },
  {
    title: "Data Security",
    content:
      "Any information shared through this site is handled with care. While no online system is 100% secure, reasonable measures are in place to protect your data from unauthorized access or misuse.",
  },
  {
    title: "Your Rights",
    content:
      "You have the right to request access to, correction of, or deletion of any personal information you've shared. To exercise these rights, contact via the details below.",
  },
  {
    title: "Contact",
    content:
      "For privacy-related requests or concerns, reach out at imransafdar360@gmail.com or through the Contact page.",
  },
];

export default function PrivacyContent() {
  return (
    <main className="w-full py-[120px] flex flex-col gap-[64px]">
      {/* Hero Header */}
      <Section className="flex flex-col items-center gap-[16px] text-center max-w-[780px] mx-auto">
        <SectionHeader
          badgeText="Legal"
          title="Privacy "
          gradientText="Policy"
          description="Your privacy matters. This page explains what information is collected on this website and how it is handled."
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
          This privacy policy applies to this portfolio website only and was
          last reviewed in February 2026. It may be updated periodically.
        </p>
      </Section>
    </main>
  );
}
