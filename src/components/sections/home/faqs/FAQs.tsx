import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "What types of projects do you usually work on?",
      answer:
        "I primarily work with SaaS founders, digital agencies, and growing businesses building scalable web or mobile products. Most projects involve full product development — from architecture planning to production deployment — including subscription systems, real-time features, and performance-focused builds.",
    },
    {
      question: "Do you handle both frontend and backend development?",
      answer:
        "Yes. I build complete systems — from backend architecture and database design to frontend interfaces and mobile apps. This ensures your product stays consistent, optimized, and scalable across all layers.",
    },
    {
      question: "Can you help improve or scale an existing product?",
      answer:
        "Absolutely. If your product is already live but struggling with performance, scalability, or messy architecture, I can refactor, optimize, and restructure it for long-term stability and growth.",
    },
    {
      question: "How do you ensure the product is scalable?",
      answer:
        "Scalability is designed early — not added later. I focus on clean system architecture, structured APIs, optimized database indexing, and modular code organization so your product can handle growth without major rewrites.",
    },
    {
      question: "Do you work on fixed-price or long-term partnerships?",
      answer:
        "Both. Some clients need a clearly defined product build. Others prefer ongoing technical partnership for continuous development and scaling. We define the engagement model based on project scope and growth goals.",
    },
    {
      question: "What technologies do you specialize in?",
      answer:
        "I specialize in MERN stack (MongoDB, Express, React, Node.js), Next.js, and React Native (Expo) — primarily for SaaS platforms and scalable mobile applications.",
    },
    {
      question: "How do we get started?",
      answer:
        "Start with a strategy call. We’ll discuss your product idea, growth goals, technical requirements, and timeline — then map out the right approach before development begins.",
    },
  ];

  return (
    <Section className="max-w-[1080px] mx-auto relative flex flex-col justify-center items-center gap-[44px] lg:gap-[84px]">
      <SectionHeader
        className="max-w-[80%] lg:max-w-[60%] items-center gap-[8px]"
        title="Everything You Might "
        description="Clear expectations. Transparent process. No surprises — just structured product development built for long-term growth."
        badgeText="FAQs"
        gradientText="Want to Know"
      />

      {/* FAQ Accordion */}
      <Accordion
        defaultValue="item-0"
        type="single"
        collapsible
        className="w-full flex flex-col gap-4"
      >
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="p-px rounded-[12px] bg-linear-to-r from-[#080808] via-[#666666] to-[#080808] border-none"
          >
            <div className="w-full h-full rounded-[19px] bg-[#080808] px-6 transition-all duration-300">
              <AccordionTrigger
                className="hover:no-underline py-6 cursor-pointer"
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  color: "#FFFFFF",
                }}
              >
                <span className="flex items-center gap-3 font-sora font-semibold">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: "#00C7FE" }}
                  />
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent
                className="pb-6 text-white/70"
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  paddingLeft: "1.75rem",
                }}
              >
                {faq.answer}
              </AccordionContent>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
